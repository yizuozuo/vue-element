/**
 * heatmap.js v2.0.5 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license 
 *
 * Modified by Yi Lei <github@qq.com> 2018-09-18 09:37:00
 */

// Heatmap Config stores default values and will be merged with instance config
const HeatmapConfig = {
  defaultRadius: 40,
  defaultRenderer: 'canvas2d',
  defaultGradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
  defaultMaxOpacity: 1,
  defaultMinOpacity: 0,
  defaultBlur: .85,
  defaultXField: 'x',
  defaultYField: 'y',
  defaultValueField: 'value', 
  plugins: {}
}

const Store = (function StoreClosure() {
  const Store = function Store(config) {
    this._coordinator = {}
    this._data = []
    this._radi = []
    this._min = 10
    this._max = 1
    this._xField = config['xField'] || config.defaultXField
    this._yField = config['yField'] || config.defaultYField
    this._valueField = config['valueField'] || config.defaultValueField

    if (config["radius"]) {
      this._cfgRadius = config["radius"]
    }
  }

  const defaultRadius = HeatmapConfig.defaultRadius

  Store.prototype = {
    // when forceRender = false -> called from setData, omits renderall event
    _organiseData: function(dataPoint, forceRender) {
        var x = dataPoint[this._xField];
        var y = dataPoint[this._yField];
        var radi = this._radi;
        var store = this._data;
        var max = this._max;
        var min = this._min;
        var value = dataPoint[this._valueField] || 1;
        var radius = dataPoint.radius || this._cfgRadius || defaultRadius;

        if (!store[x]) {
          store[x] = []
          radi[x] = []
        }

        if (!store[x][y]) {
          store[x][y] = value
          radi[x][y] = radius
        } else {
          store[x][y] += value
        }
        var storedVal = store[x][y]

        if (storedVal > max) {
          if (!forceRender) {
            this._max = storedVal
          } else {
            this.setDataMax(storedVal)
          }
          return
        } else if (storedVal < min) {
          if (!forceRender) {
            this._min = storedVal
          } else {
            this.setDataMin(storedVal)
          }
          return
        } else {
          return { 
            x: x, 
            y: y,
            value: value, 
            radius: radius,
            min: min,
            max: max 
          }
        }
    },
    _unOrganizeData: function() {
      var unorganizedData = []
      var data = this._data
      var radi = this._radi

      for (let x in data) {
        if (data.hasOwnProperty(x)) {
          for (let y in data[x]) {
            if (data[x].hasOwnProperty(y)) {
              unorganizedData.push({
                x: x,
                y: y,
                radius: radi[x][y],
                value: data[x][y]
              })
            }
          }
        }
      }
      return {
        min: this._min,
        max: this._max,
        data: unorganizedData
      };
    },
    _onExtremaChange: function() {
      this._coordinator.emit('extremachange', {
        min: this._min,
        max: this._max
      });
    },
    addData: function() {
      if (arguments[0].length > 0) {
        var dataArr = arguments[0]
        var dataLen = dataArr.length
        while (dataLen--) {
          this.addData.call(this, dataArr[dataLen])
        }
      } else {
        // add to store  
        var organisedEntry = this._organiseData(arguments[0], true)
        if (organisedEntry) {
          // if it's the first datapoint initialize the extremas with it
          if (this._data.length === 0) {
            this._min = this._max = organisedEntry.value
          }
          this._coordinator.emit('renderpartial', {
            min: this._min,
            max: this._max,
            data: [organisedEntry]
          })
        }
      }
      return this
    },
    setData: function(data) {
      var dataPoints = data.data
      var pointsLen = dataPoints.length

      // reset data arrays
      this._data = []
      this._radi = []

      for(var i = 0; i < pointsLen; i++) {
        this._organiseData(dataPoints[i], false)
      }

      this._max = data.max
      this._min = data.min || 0
      
      this._onExtremaChange()
      this._coordinator.emit('renderall', this._getInternalData())
      return this
    },
    removeData: function() {
      // TODO: implement
    },
    setDataMax: function(max) {
      this._max = max;
      this._onExtremaChange()
      this._coordinator.emit('renderall', this._getInternalData())
      return this
    },
    setDataMin: function(min) {
      this._min = min;
      this._onExtremaChange()
      this._coordinator.emit('renderall', this._getInternalData())
      return this;
    },
    setCoordinator: function(coordinator) {
      this._coordinator = coordinator
    },
    _getInternalData: function() {
      return { 
        max: this._max,
        min: this._min, 
        data: this._data,
        radi: this._radi 
      }
    },
    getData: function() {
      return this._unOrganizeData()
    }
  }

  return Store
})()

const Canvas2dRenderer = (function Canvas2dRendererClosure() {
  const _getColorPalette = function(config) {
    const gradientConfig = config.gradient || config.defaultGradient
    const paletteCanvas = document.createElement('canvas')
    const paletteCtx = paletteCanvas.getContext('2d')

    paletteCanvas.width = 256
    paletteCanvas.height = 1

    const gradient = paletteCtx.createLinearGradient(0, 0, 256, 1)
    for (const key in gradientConfig) {
      if (gradientConfig.hasOwnProperty(key)) {
        gradient.addColorStop(key, gradientConfig[key])
      }
    }

    paletteCtx.fillStyle = gradient
    paletteCtx.fillRect(0, 0, 256, 1)

    return paletteCtx.getImageData(0, 0, 256, 1).data
  }

  const _getPointTemplate = function(radius, blurFactor) {
    const tplCanvas = document.createElement('canvas')
    const tplCtx = tplCanvas.getContext('2d')
    const x = radius
    const y = radius
    tplCanvas.width = tplCanvas.height = radius*2

    if (blurFactor == 1) {
      tplCtx.beginPath()
      tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false)
      tplCtx.fillStyle = 'rgba(0,0,0,1)'
      tplCtx.fill()
    } else {
      const gradient = tplCtx.createRadialGradient(x, y, radius*blurFactor, x, y, radius)
      gradient.addColorStop(0, 'rgba(0,0,0,1)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      tplCtx.fillStyle = gradient
      tplCtx.fillRect(0, 0, 2*radius, 2*radius)
    }

    return tplCanvas
  }

  const _prepareData = function(data) {
    const renderData = []
    const min = data.min
    const max = data.max
    const radi = data.radi
    data = data.data

    const xValues = Object.keys(data)
    let xValuesLen = xValues.length

    while(xValuesLen--) {
      const xValue = xValues[xValuesLen]
      const yValues = Object.keys(data[xValue])
      let yValuesLen = yValues.length
      while(yValuesLen--) {
        const yValue = yValues[yValuesLen]
        const value = data[xValue][yValue]
        const radius = radi[xValue][yValue]
        renderData.push({
          x: xValue,
          y: yValue,
          value: value,
          radius: radius
        })
      }
    }

    return {
      min: min,
      max: max,
      data: renderData
    }
  }

  function Canvas2dRenderer(config) {
    const container = config.container
    const shadowCanvas = this.shadowCanvas = document.createElement('canvas')
    const canvas = this.canvas = config.canvas || document.createElement('canvas')
    this._renderBoundaries = [10000, 10000, 0, 0]

    const computed = getComputedStyle(config.container) || {}

    canvas.className = 'heatmap-canvas'

    this._width = canvas.width = shadowCanvas.width = config.width || +(computed.width.replace(/px/,''))
    this._height = canvas.height = shadowCanvas.height = config.height || +(computed.height.replace(/px/,''))

    this.shadowCtx = shadowCanvas.getContext('2d')
    this.ctx = canvas.getContext('2d')

    canvas.style.cssText = shadowCanvas.style.cssText = 'position:absolute;left:0;top:0;'
    container.style.position = 'relative'
    container.appendChild(canvas)

    this._palette = _getColorPalette(config)
    this._templates = {}

    this._setStyles(config)
  }

  Canvas2dRenderer.prototype = {
    renderPartial: function(data) {
      if (data.data.length > 0) {
        this._drawAlpha(data)
        this._colorize()
      }
    },
    renderAll: function(data) {
      // reset render boundaries
      this._clear()
      if (data.data.length > 0) {
        this._drawAlpha(_prepareData(data))
        this._colorize()
      }
    },
    _updateGradient: function(config) {
      this._palette = _getColorPalette(config)
    },
    updateConfig: function(config) {
      if (config['gradient']) {
        this._updateGradient(config)
      }
      this._setStyles(config)
    },
    setDimensions: function(width, height) {
      this._width = width
      this._height = height
      this.canvas.width = this.shadowCanvas.width = width
      this.canvas.height = this.shadowCanvas.height = height
    },
    _clear: function() {
      this.shadowCtx.clearRect(0, 0, this._width, this._height)
      this.ctx.clearRect(0, 0, this._width, this._height)
    },
    _setStyles: function(config) {
      this._blur = (config.blur == 0)?0:(config.blur || config.defaultBlur)

      if (config.backgroundColor) {
        this.canvas.style.backgroundColor = config.backgroundColor
      }

      this._width = this.canvas.width = this.shadowCanvas.width = config.width || this._width
      this._height = this.canvas.height = this.shadowCanvas.height = config.height || this._height

      this._opacity = (config.opacity || 0) * 255
      this._maxOpacity = (config.maxOpacity || config.defaultMaxOpacity) * 255
      this._minOpacity = (config.minOpacity || config.defaultMinOpacity) * 255
      this._useGradientOpacity = !!config.useGradientOpacity
    },
    _drawAlpha: function(data) {
      var min = this._min = data.min
      var max = this._max = data.max
      data = data.data || []
      var dataLen = data.length
      // on a point basis?
      var blur = 1 - this._blur

      while(dataLen--) {
        var point = data[dataLen]
        var x = point.x
        var y = point.y
        var radius = point.radius
        // if value is bigger than max
        // use max as value
        var value = Math.min(point.value, max)
        var rectX = x - radius
        var rectY = y - radius
        var shadowCtx = this.shadowCtx

        var tpl;
        if (!this._templates[radius]) {
          this._templates[radius] = tpl = _getPointTemplate(radius, blur)
        } else {
          tpl = this._templates[radius]
        }
        // value from minimum / value range
        // => [0, 1]
        var templateAlpha = (value-min)/(max-min)
        // this fixes #176: small values are not visible because globalAlpha < .01 cannot be read from imageData
        shadowCtx.globalAlpha = templateAlpha < .01 ? .01 : templateAlpha

        shadowCtx.drawImage(tpl, rectX, rectY)

        // update renderBoundaries
        if (rectX < this._renderBoundaries[0]) {
          this._renderBoundaries[0] = rectX
        }
        if (rectY < this._renderBoundaries[1]) {
          this._renderBoundaries[1] = rectY
        }
        if (rectX + 2*radius > this._renderBoundaries[2]) {
          this._renderBoundaries[2] = rectX + 2*radius
        }
        if (rectY + 2*radius > this._renderBoundaries[3]) {
          this._renderBoundaries[3] = rectY + 2*radius
        }
      }
    },
    _colorize: function() {
      var x = this._renderBoundaries[0]
      var y = this._renderBoundaries[1]
      var width = this._renderBoundaries[2] - x
      var height = this._renderBoundaries[3] - y
      var maxWidth = this._width
      var maxHeight = this._height
      var opacity = this._opacity
      var maxOpacity = this._maxOpacity
      var minOpacity = this._minOpacity
      var useGradientOpacity = this._useGradientOpacity

      if (x < 0) {
        x = 0
      }

      if (y < 0) {
        y = 0
      }

      if (x + width > maxWidth) {
        width = maxWidth - x
      }

      if (y + height > maxHeight) {
        height = maxHeight - y
      }

      var img = this.shadowCtx.getImageData(x, y, width, height)
      var imgData = img.data
      var len = imgData.length
      var palette = this._palette

      for (var i = 3; i < len; i += 4) {
        var alpha = imgData[i]
        var offset = alpha * 4

        if (!offset) {
          continue
        }

        var finalAlpha

        if (opacity > 0) {
          finalAlpha = opacity
        } else if (alpha > maxHeight) {
          finalAlpha = maxOpacity
        } else if(alpha < minOpacity) {
          finalAlpha = minOpacity
        } else {
          finalAlpha = alpha
        }

        img.data[i-3] = palette[offset]
        img.data[i-2] = palette[offset + 1]
        img.data[i-1] = palette[offset + 2]
        img.data[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha
      }

      this.ctx.putImageData(img, x, y)
      this._renderBoundaries = [1000, 1000, 0, 0]
    },
    getValueAt: function(point) {
      var value
      var shadowCtx = this.shadowCtx
      var img = shadowCtx.getImageData(point.x, point.y, 1, 1)
      var data = img.data[3]
      var max = this._max
      var min = this._min

      value = (Math.abs(max-min) * (data/255)) >> 0

      return value
    },
    getDataURL: function() {
      return this.canvas.toDataURL()
    }
  }

  return Canvas2dRenderer
})()

const Renderer = (function RendererClosure() {
  let rendererFn = false
  if (HeatmapConfig['defaultRenderer'] === 'canvas2d') {
    rendererFn = Canvas2dRenderer
  }
  return rendererFn
})()

const Util = {
  merge: function() {
    const merged = {}
    const argsLen = arguments.length
    for (let i = 0; i < argsLen; i++) {
      const obj = arguments[i]
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          merged[key] = obj[key]
        }
      }
    }
    return merged
  }
}

// Heatmap Constructor
const Heatmap = (function HeatmapClosure() {
  const Coordinator = (function CoordinatorClosure() {
    function Coordinator() {
      this.cStore = {}
    }

    Coordinator.prototype = {
      on: function(evtName, callback, scope) {
        const cStore = this.cStore
        if (!cStore[evtName]) {
          cStore[evtName] = []
        }
        cStore[evtName].push((function(data) {
          return callback.call(scope, data)
        }))
      },
      emit: function(evtName, data) {
        const cStore = this.cStore
        if (cStore[evtName]) {
          const len = cStore[evtName].length
          for (let i = 0; i < len; i++) {
            const callback = cStore[evtName][i]
            callback(data)
          }
        }
      }
    }

    return Coordinator
  })()

  const _connect = function(scope) {
    const renderer = scope._renderer
    const coordinator = scope._coordinator
    const store = scope._store

    coordinator.on('renderpartial', renderer.renderPartial, renderer)
    coordinator.on('renderall', renderer.renderAll, renderer)
    coordinator.on('extremachange', function(data) {
      scope._config.onExtremaChange &&
      scope._config.onExtremaChange({
        min: data.min,
        max: data.max,
        gradient: scope._config['gradient'] || scope._config['defaultGradient']
      })
    })
    store.setCoordinator(coordinator)
  }

  function Heatmap() {
    const config = this._config = Util.merge(HeatmapConfig, arguments[0] || {})
    this._coordinator = new Coordinator()
    if (config['plugin']) {
      const pluginToLoad = config['plugin']
      if (!HeatmapConfig.plugins[pluginToLoad]) {
        throw new Error('Plugin \''+ pluginToLoad + '\' not found. Maybe it was not registered.')
      } else {
        var plugin = HeatmapConfig.plugins[pluginToLoad]
        // set plugin renderer and store
        this._renderer = new plugin.renderer(config)
        this._store = new plugin.store(config)
      }
    } else {
      this._renderer = new Renderer(config)
      this._store = new Store(config)
    }
    _connect(this)
  }

  Heatmap.prototype = {
    addData: function() {
      this._store.addData.apply(this._store, arguments)
      return this
    },
    removeData: function() {
      this._store.removeData && this._store.removeData.apply(this._store, arguments)
      return this
    },
    setData: function() {
      this._store.setData.apply(this._store, arguments);
      return this
    },
    setDataMax: function() {
      this._store.setDataMax.apply(this._store, arguments)
      return this
    },
    setDataMin: function() {
      this._store.setDataMin.apply(this._store, arguments)
      return this
    },
    configure: function(config) {
      this._config = Util.merge(this._config, config)
      this._renderer.updateConfig(this._config)
      this._coordinator.emit('renderall', this._store._getInternalData())
      return this
    },
    repaint: function() {
      this._coordinator.emit('renderall', this._store._getInternalData())
      return this
    },
    getData: function() {
      return this._store.getData()
    },
    getDataURL: function() {
      return this._renderer.getDataURL()
    },
    getValueAt: function(point) {
      if (this._store.getValueAt) {
        return this._store.getValueAt(point)
      } else  if (this._renderer.getValueAt) {
        return this._renderer.getValueAt(point)
      } else {
        return null
      }
    }
  }

  return Heatmap
})()

export default  {
  create: function(config) {
    return new Heatmap(config)
  },
  register: function(pluginKey, plugin) {
    HeatmapConfig.plugins[pluginKey] = plugin
  }
}
