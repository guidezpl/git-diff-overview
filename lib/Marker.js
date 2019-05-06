const etch = require('etch');
const $ = etch.dom;

module.exports =
class Marker {
  constructor({layer, startLine, endLine}) {
    var linesScrollPastEnd = 0;
    if (atom.config.get('editor.scrollPastEnd')) {
      const fontSize = atom.config.get('editor.fontSize');
      const lineHeight = atom.config.get('editor.lineHeight');
      linesScrollPastEnd = (atom.windowDimensions.height - 96) / (fontSize * lineHeight);
    }
    var lineCount = layer.markerView.editor.getLineCount() + linesScrollPastEnd;
    var percent = (startLine * 100) / lineCount;
    var percentHeight = (Math.max(endLine-startLine, 0.5) * 100) / lineCount;

    this.style = {
      top: `${percent}%`,
      height: `${percentHeight}%`,
    };

    etch.initialize(this);
  }

  update() {
    return etch.update(this);
  }

  render () {
    return (
      $.div({
        className: `git-scroll-marker`,
        style: this.style
      })
    );
  }

  destroy() {
    etch.destroy(this);
  }
};