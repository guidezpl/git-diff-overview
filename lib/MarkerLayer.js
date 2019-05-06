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

  addMarker(startLine, endLine) {
    const marker = $(Marker, {layer: this, startLine, endLine})
    this.markers.push(marker)
  }

  clear() {
    this.markers = []
    return this.update()
  }

  update(props, children) {
    return etch.update(this)
  }

  render () {
    return (
      $.div({className: `${this.className} git-scroll-marker-layer`}, this.markers)
    )
  }
}
