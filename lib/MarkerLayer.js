const etch = require('etch')
const $ = etch.dom

const Marker = require("./Marker")

module.exports =
class MarkerLayer {
  constructor(markerView, className) {
    this.className = className
    this.markerView = markerView

    this.markers = []

    etch.initialize(this)
  }

  syncToMarkerLayer(markerLayer) {
    markerLayer.onDidUpdate(function() {
      setTimeout(async function() {
        let atomMarkers = markerLayer.getMarkers()

        await this.clear()

        for (const marker of atomMarkers) {
          let line = marker.getBufferRange().start.row
          this.addMarker(line)
        }
      }.bind(this))
    }.bind(this))
  }

  calculateLinesScrollPastEnd() {
    if (atom.config.get('editor.scrollPastEnd')) {
      const fontSize = atom.config.get('editor.fontSize')
      const lineHeight = atom.config.get('editor.lineHeight')
      this.linesScrollPastEnd = (atom.windowDimensions.height - 150) / (fontSize * lineHeight)
    } else {
      this.linesScrollPastEnd = 0;
    }
  }

  addMarker(startLine, endLine) {
    const marker = $(Marker, {layer: this, startLine, endLine, linesScrollPastEnd: this.linesScrollPastEnd})
    this.markers.push(marker)
  }

  clear() {
    this.markers = []
    return this.update()
  }

  update(props, children) {
    this.calculateLinesScrollPastEnd();
    return etch.update(this)
  }

  render () {
    return (
      $.div({className: `${this.className} git-scroll-marker-layer`}, this.markers)
    )
  }
}
