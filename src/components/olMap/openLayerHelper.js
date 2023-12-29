import 'ol/ol.css'
import { OSM, XYZ } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { MousePosition } from 'ol/control'
import { createStringXY } from 'ol/coordinate'
import configData from '@/config'
import { CoordinateSystemTypes } from '@/common/baseConstants'
export const baseURL = process.env.BASE_URL

export function lonlattoWebMercator(lon, lat) {
  let x = (lon * 20037508.34) / 180
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)
  y = (y * 20037508.34) / 180
  return [x, y]
}
export function webMercator2lonlat(x, y) {
  let lon = (x / 20037508.34) * 180
  let lat = (y / 20037508.34) * 180
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2)
  // let res=transform([x,y],EPSG3857,EPSG4326)
  return [lon, lat]
}
//实例化鼠标位置经纬度控件
export function mousePositionControl(id = '11', cN = '11') {
  return new MousePosition({
    coordinateFormat: createStringXY(4), //坐标格式
    projection: CoordinateSystemTypes.Geographic, //地图投影坐标系
    className: `custom-mouse-position ${cN}`, //坐标信息显示样式,cN:自定义类名
    target: document.getElementById(id), // 显示鼠标位置信息的目标容器
    undefinedHTML: '不在范围内', //未定义坐标的标记
  })
}

// 地图图层
export function rasterLayer() {
  return new TileLayer({
    source: new OSM(),
  })
}
export function localLayer() {
  let baseMapTileData = configData.baseOlMapTileData
  console.log('uuuu', baseMapTileData)
  // baseMapTileData.url = '/layer/{z}/{x}/{y}.png'
  const isTileMapService = baseMapTileData?.isTileMapService
  return new TileLayer({
    source: new XYZ({
      url: isTileMapService ? baseMapTileData.url : null,
      tileUrlFunction: isTileMapService
        ? null
        : function (tilecoord) {
            const selfZ = tilecoord[0] - 1
            const x = tilecoord[1]
            const y = tilecoord[2]
            const z = tilecoord[0]
            let url = baseMapTileData.url
            url = url.replace('{z}', z).replace('{y}', y).replace('{x}', x).replace('{selfZ}', selfZ)
            return url
          },
      projection: baseMapTileData.projection ? baseMapTileData.projection : CoordinateSystemTypes.Geographic,
      // projection: CoordinateSystemTypes.Geographic,
      crossOrigin: 'anonymous',
    }),
  })
}

//十六进制颜色值转成rgba
export function colorRgb(str, opacity) {
  let sColor = str.toLowerCase()
  if (sColor) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')'
  } else {
    return sColor
  }
}
