/**
 * 地图绘制相关事件类
 */
import * as ol from 'ol'
import { LineString, Polygon } from 'ol/geom.js'
import { Feature, Map, View } from 'ol'
import { transform, fromLonLat } from 'ol/proj'
import { Point } from 'ol/geom'
import { Snap, Draw } from 'ol/interaction'
import olMapDefault from './OlMap'
import { setImgNodeStyle, setLineStyle } from './olMapStyle'

class olMapDrawEvent {
  constructor(map = new Map(), nodeLayer, lineLayer, olMap) {
    this.olMap = olMap || olMapDefault
    this.map = map
    this.nodeLayer = nodeLayer
    this.lineLayer = lineLayer
    this.drawLineInteraction = null
    this._drawLineData = {} // 绘制连线的入参
    this._drawLineToFrom = [] // 绘制连线的起始结束节点
    this.onDrawCallBack = () => {}
    this.snapInteraction = null
    this._layers = {}
  }
  // 添加节点
  addNode(data, pos) {
    if (!this.nodeLayer) return
    return new Promise((res, rej) => {
      let node = new Feature({
        geometry: new Point(pos),
        rotate: true,
        data: data,
        id: data._id || data.id || '',
      })
      node.setId(data._id || data.id)
      setImgNodeStyle(data, node).then((style) => {
        const source = this.nodeLayer.getSource()
        source.addFeature(node)
        node.setStyle(style)
        res(node)
      })
      node.getGeometry().on('change', this._updateLinePos.bind(this))
    })
  }
  editNode(data, pos) {
    if (!this.nodeLayer) return
    const node = this.olMap.findNodeById(data._id)
    if (!node) return
    node.getGeometry().setCoordinates(fromLonLat(pos, this.olMap.mapProj))
    Object.keys(data).forEach((key) => {
      node.values_.data[key] = data[key]
    })
    setImgNodeStyle(data, node).then(() => {
      node.setStyle(node._selectStyle)
    })
  }
  // 更新线的位置
  _updateLinePos() {
    const lines = this.lineLayer.getSource().getFeatures()
    const disposeLines = []
    lines.forEach((line) => {
      const fromNode = line._fromNode
      const toNode = line._toNode
      if (fromNode && !fromNode.disposed && toNode && !toNode.disposed) {
        const points = [fromNode.getGeometry().getCoordinates(), toNode.getGeometry().getCoordinates()]
        line.getGeometry().setCoordinates(points)
      } else {
        line._fromNode = null
        line._toNode = null
        disposeLines.push(line)
      }
    })
    this.removeLines(disposeLines)
  }
  addLine(data) {
    if (!this.lineLayer) return
    const fromNode = this.olMap.findNodeById(data._fromId)
    const toNode = this.olMap.findNodeById(data._toId)
    data._name = `${fromNode.getData()._name} -> ${toNode.getData()._name}`
    if (fromNode && toNode) {
      const points = [fromNode.getGeometry().getCoordinates(), toNode.getGeometry().getCoordinates()]
      let line = new Feature({
        geometry: new LineString(points),
        data,
        id: data._id || data.id || '',
      })
      line.setId(data._id || data.id)
      line.setStyle(setLineStyle(data, line))
      const source = this.lineLayer.getSource()
      source.addFeature(line)
      line._fromNode = fromNode
      line._toNode = toNode
    }
  }
  editLine(data) {
    if (!this.lineLayer) return
    const line = this.olMap.findLineById(data._id)
    if (!line) return
    Object.keys(data).forEach((key) => {
      line.values_.data[key] = data[key]
    })
  }
  // 删除所选实例
  removeSelect() {
    if (!this.olMap.mouseEvent.selectInteraction) return
    const arr = [...this.olMap.mouseEvent.selectInteraction.getFeatures().getArray()]
    this.removeNodes(arr)
    this.removeLines(arr)
  }
  // 根据id删除实例
  removeNodeById(id) {
    if (!this.nodeLayer) return
    const node = this.nodeLayer.getSource().getFeatureById(id)
    if (node) this.removeNodes([node])
  }
  // 删除指定实例
  removeNodes(features) {
    if (!this.nodeLayer || !Array.isArray(features) || features.length <= 0) return
    features.forEach((feature) => {
      this.nodeLayer.getSource().removeFeature(feature)
      this.olMap.mouseEvent?.selectInteraction.getFeatures().remove(feature)
      feature.dispose()
    })
    this.olMap.mouseEvent?.selectInteraction.dispatchEvent('select')
    this._updateLinePos()
  }
  removeLines(features) {
    if (!this.lineLayer || !Array.isArray(features) || features.length <= 0) return
    features.forEach((feature) => {
      this.lineLayer.getSource().removeFeature(feature)
      this.olMap.mouseEvent?.selectInteraction.getFeatures().remove(feature)
      feature.dispose()
    })
    this.olMap.mouseEvent?.selectInteraction.dispatchEvent('select')
  }
  // 初始化绘制线事件
  initDrawLineEvent() {
    this._drawLineToFrom = []
    this.drawLineInteraction = new Draw({
      type: 'LineString',
      stopClick: true,
      maxPoints: 2,
      minPoints: 2,
      condition: (event) => {
        let flag = false
        let features = this.map.getFeaturesAtPixel(event.pixel)
        const source = this.nodeLayer.getSource()
        features.some((feature) => {
          if (source.hasFeature(feature)) {
            flag = true
            this._drawLineToFrom.push(feature)
            return true
          }
        })
        return flag // 限制,必须连到节点才允许连线
      },
    })
    this.snapInteraction = new Snap({
      source: this.nodeLayer.getSource(),
      pixelTolerance: 20,
    })
    this.drawLineInteraction.on('drawend', (event) => {
      if (typeof this.onDrawCallBack === 'function') {
        if (this._drawLineToFrom.length < 2 || this._drawLineToFrom[0] === this._drawLineToFrom[1]) {
          this._drawLineToFrom = []
          return
        }
        this.onDrawCallBack({
          from: this._drawLineToFrom[0].getData(),
          to: this._drawLineToFrom[1].getData(),
          data: this._drawLineData,
          event,
        })
      }
      this._drawLineToFrom = []
    })
  }
  // 允许绘制线
  allowDrawLineEvent(data) {
    this._drawLineData = data || {}
    this.forbidDrawLineEvent()
    this.map.addInteraction(this.drawLineInteraction)
    this.map.addInteraction(this.snapInteraction)
  }
  // 禁止绘制线
  forbidDrawLineEvent() {
    this.map.removeInteraction(this.drawLineInteraction)
    this.map.removeInteraction(this.snapInteraction)
  }
  // 刷新
  refresh() {}
}

export default olMapDrawEvent
