import { fromLonLat, toLonLat, get as getProjection } from 'ol/proj'
import { add as addTransfrom, remove as removeTransform } from 'ol/proj/transforms'
import { toEPSG4326 } from 'ol/proj/epsg3857'
import { Map, View, Feature } from 'ol'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { defaults } from 'ol/control'
import { mousePositionControl, localLayer } from './openLayerHelper'
import configData from '@/config'
import { CoordinateSystemTypes, MapCenterPosition } from '@/common/baseConstants'
import OlMapMouseEvent from './olMapMouseEvent'
import olMapDrawEvent from './olMapDrawEvent'

Feature.prototype.getData = function () {
  return this.values_.data
}

function fixTo4326(input, optOutput, optDimension) {
  const output = toEPSG4326(input, optOutput, optDimension)
  const { length } = output
  const dimension = optDimension > 1 ? optDimension : 2
  for (let i = 0; i < length; i += dimension) {
    output[i] %= 360
    if (output[i] < -180) {
      output[i] += 360
    }
    if (output[i] > 180) {
      output[i] -= 360
    }
  }
  return output
}

function limit4326(input, optOutput, optDimension) {
  let output = optOutput || input
  if (!optOutput) {
    return output
  }
  const dimension = optDimension > 1 ? optDimension : 2
  for (let i = 0; i < length; i += dimension) {
    output[i] %= 360
    if (output[i] < -180) {
      output[i] += 360
    }
    if (output[i] > 180) {
      output[i] -= 360
    }
  }
  return output
}

function replaceProj() {
  const epsg3857 = getProjection('EPSG:3857')
  const epsg4326 = getProjection('EPSG:4326')
  removeTransform(epsg3857, epsg4326)
  removeTransform(epsg4326, epsg4326)
  addTransfrom(epsg3857, epsg4326, fixTo4326)
  addTransfrom(epsg4326, epsg4326, limit4326)
}
// 矫正坐标系不让其到外面
replaceProj()

class OlMapClass {
  constructor(opt = {}) {
    this.map = null
    this.mapSetConfig = {
      zoom: 5,
      center: [MapCenterPosition.Longitude, MapCenterPosition.Latitude],
      rotation: 1,
    }
    this.singleSelect = !!opt?.singleSelect // 是否单选模式
    this.mapProj = ''
    this.mousePosition = null
    this._layerCollection = {} // 所有图层集合
    this.nodeLayer = null // 默认图层, 图片+文字形式
    this.lineLayer = null // 默认图层, 连线
    this.drawEvent = null // 绘制事件
    this.mouseEvent = null // 移动事件
  }
  // 初始化地图
  initMap(id) {
    if (!id) return
    if (this.map) {
      this.map.dispose() // 防止多次初始化地图
      this.map = null
    }
    let baseMapTileData = configData.baseOlMapTileData
    console.log(baseMapTileData, 777, configData);
    this.nodeLayer = new VectorLayer({
      zIndex: 2,
      source: new VectorSource(),
    })
    this.lineLayer = new VectorLayer({
      zIndex: 1,
      source: new VectorSource(),
    })
    this.map = new Map({
      target: id,
      layers: [localLayer(), this.nodeLayer, this.lineLayer],
      view: new View({
        center: this.mapSetConfig.center,
        zoom: this.mapSetConfig.zoom,
        constrainResolution: true,
        rotation: this.mapSetConfig.rotation * (Math.PI / 180),
        minZoom: 3, // 最小缩放级别
        maxZoom: 15, // 最大缩放级别
        projection: baseMapTileData.projection ? baseMapTileData.projection : CoordinateSystemTypes.WebMercator,
      }),
      controls: defaults({
        // 设置地图控件，默认的三个控件都不显示
        attribution: false,
        zoom: false,
        rotate: false,
      }),
    })
    this.drawEvent = new olMapDrawEvent(this.map, this.nodeLayer, this.lineLayer, this)
    this.mouseEvent = new OlMapMouseEvent(this.map, this.nodeLayer, this.lineLayer, this)
    this.mapProj = this.map.getView().getProjection()
    this.map._orin_getCoordinateFromPixel = this.map.getCoordinateFromPixel
    // 矫正坐标系 防止超出范围
    this.map.getCoordinateFromPixel = (pixel, flag) => {
      let loc = this.map._orin_getCoordinateFromPixel(pixel)
      if (loc && flag) {
        const loc2 = toLonLat(loc, this.mapProj)
        loc2[0] = loc2[0] % 360
        if (loc2[0] < -180) {
          loc2[0] += 360
        }
        if (loc2[0] > 180) {
          loc2[0] -= 360
        }
        loc = fromLonLat(loc2, this.mapProj)
      }
      return loc
    }
    // 初始化鼠标事件 详情 -> ./OlMapMouseEvent.js
    this.mouseEvent.initDefaultEvent()
    this.mouseEvent.initTranslateEvent()
    this.mouseEvent.initSelectEvent()
    if (!this.singleSelect) {
      this.mouseEvent.initDrawBoxSelectEvent()
    }
    this.drawEvent.initDrawLineEvent()

    // 显示当前鼠标所在位置
    setTimeout(() => {
      if (document.getElementById('ol-mouse-position')) {
        this.mousePosition = mousePositionControl('ol-mouse-position')
        this.map.addControl(this.mousePosition)
      }
    }, 0)
  }
  // 设置地图初始化选项
  setMapSetConfig(config) {
    if (config)
      Object.keys(this.mapSetConfig).forEach((key) => {
        this.mapSetConfig[key] = config[key] ?? this.mapSetConfig[key]
      })
  }
  // 提取地图元素的数据
  _getFeature(feature) {
    if (feature) {
      const position = toLonLat(feature.getGeometry().getCoordinates(), this.mapProj)
      return {
        ...feature.getData(),
        position,
        lon: position[0],
        lat: position[1],
      }
    }
  }
  getAllData() {
    const nodeFeatures = this.nodeLayer.getSource().getFeatures()
    const nodes = nodeFeatures.map((feature) => this._getFeature(feature))
    const lineFeatures = this.lineLayer.getSource().getFeatures()
    const lines = lineFeatures.map((feature) => feature.getData())
    return {
      nodes,
      lines,
      nodeFeatures,
      lineFeatures,
    }
  }
  getDataById(id) {
    const node = this.findNodeById(id)
    const line = this.findLineById(id)
    const feature = node || line
    return this._getFeature(feature)
  }
  findNodeById(id) {
    return this.nodeLayer.getSource().getFeatureById(id)
  }
  findLineById(id) {
    return this.lineLayer.getSource().getFeatureById(id)
  }
  // 根据ID定位节点
  fitNodeById(id) {
    const feature = this.findNodeById(id)
    if (feature) {
      const extend = feature.getGeometry()
      this.map.getView().fit(extend, {
        maxZoom: 6,
      })
    }
  }
  // 刷新
  refresh() {
    this.mouseEvent.refresh()
    this.drawEvent.refresh()
    this.nodeLayer.getSource().refresh()
    this.lineLayer.getSource().refresh()
  }
}
const olMap = new OlMapClass()
window.olMap = olMap
export default olMap
export { OlMapClass }
