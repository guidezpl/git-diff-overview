const etch = require('etch')
const $ = etch.dom

const MarkerLayer = require("./MarkerLayer")

module.exports =
class MarkerView {
  constructor() {
    this.markerLayerMap = new Map()
    etch.initialize(this)
  }

  attachToEditor(editor) {
    this.editor = editor
    const editorView = atom.views.getView(editor)
    const scrollBarView = editorView.getElementsByClassName("vertical-scrollbar")[0]
    scrollBarView.parentNode.insertBefore(this.element, scrollBarView.nextSibling)
  }

  getLayer(name) {
    var layer = this.markerLayerMap.get(name)

    if (!layer) {
      layer = new MarkerLayer(this, name)
      this.element.appendChild(layer.element)
      this.markerLayerMap.set(name, layer)
    }

    return layer
  }

  update() {
    return etch.update(this)
  }

  render () {
    return (
      $.div({className: "git-scroll-marker-view"})
    )
  }

  async destroy() {
    await etch.destroy(this)
  }
}
