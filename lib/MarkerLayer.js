const etch = require('etch');
const $ = etch.dom;

const Marker = require("./Marker");

module.exports =
class MarkerLayer {
  constructor(markerView, className) {
    this.className = className;
    this.markerView = markerView;

    this.markers = new Map();

    etch.initialize(this);
  }

  syncToMarkerLayer(markerLayer) {
    markerLayer.onDidUpdate(function() {
      setTimeout(async function() {
        let atomMarkers = markerLayer.getMarkers();

        await this.clear();

        for (const marker of atomMarkers) {
          let line = marker.getBufferRange().start.row;
          this.addMarker(line);
        }
      }.bind(this));
    }.bind(this));
  }

  addMarker(startLine, endLine) {
    if (!this.markers.get(startLine)) {
      const marker = $(Marker, {layer: this, startLine, endLine})
      this.markers.set(startLine, marker);

      this.update();
    }
  }

  clear() {
    this.markers.clear();
    return this.update();
  }

  update(props, children) {
    return etch.update(this);
  }

  render () {
    return (
      $.div({className: `${this.className} git-scroll-marker-layer`}, Array.from(this.markers.values()))
    );
  }

  async destroy() {
    await etch.destroy(this);
  }
};
