/**
 * 地图鼠标事件类
 */
import { Feature, Map, View } from 'ol'
import { toLonLat, get as getProjection } from 'ol/proj'
import { Translate, Select, DragBox } from 'ol/interaction'
import { platformModifierKeyOnly, always } from 'ol/events/condition'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import olMapDefault from './OlMap'
let moveTimer = null
class OlMapMouseEvent {
  constructor(map = new Map(), nodeLayer, lineLayer, olMap) {
    this.olMap = olMap || olMapDefault
    this.map = map
    this.nodeLayer = nodeLayer
    this.lineLayer = lineLayer
    // 存临时绘制的图层
    this.drawLayer = new VectorLayer({
      zIndex: 10,
      source: new VectorSource(),
    })
    this.pointermoveListener = null
    this.contextmenuListener = null
    this.onContextMenuCallBack = () => {} // 右键菜单的回调函数
    this.translateInteraction = null // 移动节点交互功能的实例
    this.onTranslateCallBack = () => {} // 移动节点的回调函数
    this.selectInteraction = null // 选择节点交互功能的实例
    this.onSelectCallBack = () => {} // 选择节点的回调函数

    this.drawBoxSelectInteraction = null // 框选节点的回调函数
  }
  // 鼠标移动事件
  onPointMoveEvent(event) {
    const onMove = (event) => {
      const pixel = this.map.getEventPixel(event.originalEvent)
      const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => {
        return feature
      })
      this.nodeLayer
        .getSource()
        .getFeatures()
        .forEach((feature) => {
          feature.setStyle(feature._defaultStyle)
        })
      this.lineLayer
        .getSource()
        .getFeatures()
        .forEach((feature) => {
          feature.setStyle(feature._defaultStyle)
        })
      this.selectInteraction
        .getFeatures()
        .getArray()
        .forEach((feature) => {
          feature.setStyle(feature._selectStyle)
        })
      if (feature) {
        feature.setStyle(feature._hoverStyle)
      }
    }
    moveTimer && clearTimeout(moveTimer)
    moveTimer = setTimeout(() => {
      onMove(event)
      moveTimer = null
    }, 0)
  }
  // 鼠标右键事件
  onContextmenuEvent(event) {
    event.preventDefault() //屏蔽自带的右键事件
    const pixel = this.map.getEventPixel(event.originalEvent)
    const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature
    })

    if (typeof this.onContextMenuCallBack === 'function') {
      this.onContextMenuCallBack(event, feature?.values_?.data, feature)
    }
  }
  // 初始化基础事件 鼠标移动事件、鼠标右键事件
  initDefaultEvent() {
    if (!this.map) return
    this.forbidDefaultEvent()
    // 鼠标移动事件
    this.pointermoveListener = this.map.on('pointermove', this.onPointMoveEvent.bind(this)).listener
    // 鼠标右键事件
    this.contextmenuListener = this.map.on('contextmenu', this.onContextmenuEvent.bind(this)).listener
  }
  // 禁止默认事件
  forbidDefaultEvent() {
    // 卸载鼠标移动事件
    this.pointermoveListener && this.map.un('pointermove', this.pointermoveListener)
    this.pointermoveListener = null
    // 卸载鼠标右键事件
    this.contextmenuListener && this.map.un('contextmenu', this.contextmenuListener)
    this.contextmenuListener = null
  }
  // 初始化拖拽事件
  initTranslateEvent() {
    if (!this.map) return
    // 支持拖拽
    this.translateInteraction = new Translate({
      layers: [this.nodeLayer],
    })
    // 拖拽动作结束 回调函数
    this.translateInteraction.on('translateend', ({ coordinate, startCoordinate, features }) => {
      const feature = features.pop()
      if (typeof this.onTranslateCallBack === 'function') {
        this.onTranslateCallBack({
          data: feature.values_.data, // 返回数据
          pos: toLonLat(coordinate, this.mapProj), // 返回拖拽后的 经纬度
          startPos: toLonLat(startCoordinate, this.mapProj), // 返回拖拽前的 经纬度
        })
      }
    })
    this.map.addInteraction(this.translateInteraction)
  }
  // 禁止拖拽事件
  forbidTranslateEvent() {
    this.map.removeInteraction(this.translateInteraction)
  }
  // 允许拖拽事件
  allowTranslateEvent() {
    this.forbidTranslateEvent()
    this.map.addInteraction(this.translateInteraction)
  }
  // 初始化选择事件
  initSelectEvent() {
    if (!this.map) return
    // 允许点击
    this.selectInteraction = new Select({
      layers: [this.nodeLayer, this.lineLayer],
      toggleCondition: this.olMap.singleSelect ? '' : platformModifierKeyOnly,
      style: (feature) => {
        return feature._selectStyle || null
      },
    })
    // 选择节点的回调函数
    this.selectInteraction.on('select', () => {
      if (typeof this.onSelectCallBack === 'function') {
        const features = this.selectInteraction.getFeatures().getArray()
        this.onSelectCallBack({
          datas: features.map((feature) => feature.values_.data), // 返回所选的数据
          features,
        })
      }
    })
    this.map.addInteraction(this.selectInteraction)
  }
  // 禁止选择事件
  forbidSelectEvent() {
    this.map.removeInteraction(this.selectInteraction)
  }
  // 允许选择事件
  allowSelectEvent() {
    this.forbidSelectEvent()
    this.map.addInteraction(this.selectInteraction)
  }
  // 框选事件
  initDrawBoxSelectEvent() {
    this.map.addLayer(this.drawLayer)
    this.drawBoxSelectInteraction = new DragBox({
      condition: platformModifierKeyOnly,
    })
    this.drawBoxSelectInteraction.on('boxdrag', () => {
      this.selectRefresh()
    })
    this.drawBoxSelectInteraction.on('boxend', () => {
      const extent = this.drawBoxSelectInteraction.getGeometry().getExtent()
      this.nodeLayer.getSource().forEachFeatureIntersectingExtent(extent, (feature) => {
        this.selectInteraction.getFeatures().push(feature)
      })
      this.lineLayer.getSource().forEachFeatureIntersectingExtent(extent, (feature) => {
        this.selectInteraction.getFeatures().push(feature)
      })
      setTimeout(() => {
        this.selectInteraction.dispatchEvent('select')
      }, 0)
    })
    this.map.addInteraction(this.drawBoxSelectInteraction)
  }
  // 允许框选事件
  allowDrawBoxSelectEvent() {
    this.forbidDrawBoxSelectEvent()
    this.map.addInteraction(this.drawBoxSelectInteraction)
  }
  // 禁止框选事件
  forbidDrawBoxSelectEvent() {
    this.map.removeInteraction(this.drawBoxSelectInteraction)
  }
  selectRefresh() {
    this.selectInteraction && this.selectInteraction.getFeatures().clear()
    this.selectInteraction.dispatchEvent('select')
  }
  onSelectNode(data) {
    this.selectRefresh()
    const feature = this.olMap.findNodeById(data._id)
    this.selectInteraction.getFeatures().push(feature)
    this.selectInteraction.dispatchEvent('select')
  }
  // 刷新
  refresh() {
    this.selectRefresh()
  }
}

export default OlMapMouseEvent
