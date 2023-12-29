import configData from '@/config'
import {
  // LinearRing,
  LineString,
  Point,
  Polygon,
  MultiLineString,
  MultiPolygon,
  Circle as CircleShape,
  // Circle,
} from 'ol/geom'
import { Style, Fill, Icon, Stroke, Text, Circle } from 'ol/style'

const defaultColors = { red: '#ff5757', blue: '#03b3db', green: '#31ff23' }
const defaultPaddingValue = 4
const defaultNodeTextPadding = [32, defaultPaddingValue, defaultPaddingValue, defaultPaddingValue]
const defaultFontsize = 14
const defaultFontheight = 19 //fontsize改变，对应的高度也会改变
const defaultFont = `bold ${defaultFontsize}px 黑体`

function getFontWidthByCanvas(text) {
  let fontWidth = 0
  if (text) {
    const olLayers = document.getElementsByClassName('ol-layer')
    if (olLayers && olLayers.length > 0) {
      const canvas = olLayers[0].firstChild
      const context = canvas.getContext('2d')
      context.font = defaultFont
      const metrics = context.measureText(text)
      fontWidth = metrics.width
    }
  }
  return fontWidth
}
function getRenderNodeSize(textWidth, imageSize) {
  const imageWidth = imageSize[0] + defaultPaddingValue * 2
  const width = imageWidth > textWidth ? imageWidth : textWidth
  const textHeight = defaultFontheight + defaultNodeTextPadding[0] + defaultNodeTextPadding[2]
  const height = imageSize[1] > textHeight ? imageSize[1] : textHeight
  return [width, height]
}

// 资源节点样式
export function setImgNodeStyle(data, node) {
  // console.log(data)
  return new Promise((res) => {
    let image = new Image()
    let lineDash = null
    let padding = defaultNodeTextPadding

    const fontWidth = getFontWidthByCanvas(data._name || data.name || '')
    const textWidth = fontWidth + padding[1] + padding[3]
    // 根据图片大小计算 高亮边框大小
    const getStyle = (img) => {
      const nodeSize = getRenderNodeSize(textWidth, [node._imgWidth, node._imgHeight])
      if (nodeSize)
        if (nodeSize[0] > textWidth) {
          const lrPaddingValue = Math.ceil(nodeSize[0] - fontWidth) / 2
          padding = [padding[0], lrPaddingValue, padding[2], lrPaddingValue]
        }
      if (nodeSize && nodeSize.length >= 2) {
        const width = nodeSize[0]
        const height = nodeSize[1]
        const wdashLine = Math.floor((width * 2) / 10)
        lineDash = [wdashLine, width - 2 * wdashLine, wdashLine, 0]
        const hdashLine = Math.floor((height * 2) / 10)
        lineDash = lineDash.concat([hdashLine, height - 2 * hdashLine, hdashLine, 0])
      }
      const defaultImageStyle = {
        src: img, //当前元素图片地址为空的情况备用替换图像
        rotation: data.rotation ? data.rotation : 0,
        crossOrigin: 'anonymous',
        scale: node._scale,
        color: data._color,
      }
      const defaultTextStyle = {
        font: defaultFont,
        offsetY: 20,
        backgroundFill: new Stroke({
          color: 'rgba(0,0,0,0.01)',
        }),
        // 文本填充样式
        fill: new Fill({
          color: data._color,
        }),
        padding,
        text: data._name || data.name || '',
      }
      // 节点高亮的样式 被选中的样式
      node._selectStyle = new Style({
        image: new Icon(defaultImageStyle),
        text: new Text({
          ...defaultTextStyle,
          backgroundStroke: new Stroke({
            color: defaultColors.green,
            width: 2,
            lineDash,
          }),
        }),
      })
      node._hoverStyle = new Style({
        image: new Icon(defaultImageStyle),
        text: new Text({
          ...defaultTextStyle,
          backgroundStroke: new Stroke({
            color: 'rgba(255, 255, 255, 0.5)',
            width: 2,
            lineDash,
          }),
        }),
      })
      // 节点样式
      node._defaultStyle = new Style({
        image: new Icon(defaultImageStyle),
        text: new Text(defaultTextStyle),
      })
      return node._defaultStyle
    }

    if (data._img) {
      image.src = data._img
    } else {
      node._imgHeight = 16
      node._imgWidth = 16
      node._scale = 1
      res(getStyle(require('./default.png')))
      image = null
    }


    image.onload = () => {
      node._imgHeight = 30
      node._imgWidth = 30
      node._scale = 30 / image.width
      res(getStyle(data._img))
      image = null
    }
    // 图片加载失败则替换为默认图片
    image.onerror = () => {
      node._imgHeight = 16
      node._imgWidth = 16
      res(getStyle(require('./default.png')))
      image = null
    }
  })
}

export function setLineStyle(data, line) {
  line._hoverStyle = new Style({
    fill: new Fill({
      color: data._color,
    }),
    stroke: new Stroke({
      color: data._color,
      width: 5,
      lineDash: [5, 10],
      lineCap: 'square',
    }),
  })
  line._selectStyle = new Style({
    fill: new Fill({
      color: defaultColors.green,
    }),
    stroke: new Stroke({
      color: defaultColors.green,
      width: 4,
    }),
  })
  line._defaultStyle = new Style({
    fill: new Fill({
      color: data._color,
    }),
    stroke: new Stroke({
      color: data._color,
      width: 3,
      lineDash: [5, 10],
      lineCap: 'square',
    }),
  })
  return line._defaultStyle
}
