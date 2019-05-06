const etch = require('etch')
const $ = etch.dom

module.exports =
class Marker {
  constructor({layer, startLine, endLine, linesScrollPastEnd}) {
    const lineCount = layer.markerView.editor.getLineCount() + linesScrollPastEnd
    const percent = (startLine * 100) / lineCount
    const percentHeight = (Math.max(endLine-startLine, 0.5) * 100) / lineCount

    this.style = {
      top: `${percent}%`,
      height: `${percentHeight}%`,
    }

    etch.initialize(this)
  }

  update(props, children) {
    return etch.update(this)
  }

  render() {
    return (
      $.div({
        className: `git-scroll-marker`,
        style: this.style
      })
    )
  }
}
