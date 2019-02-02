/* exported DrawCanvases */
class DrawCanvases {
  constructor () {
    this.frameContainers = '.frame-container';
  }

  run () {
    this._drawCanvases();
  }

  _drawCanvases () {
    $(this.frameContainers).each( function(index, frameContainer) {
      var imagePlaceholder = frameContainer.firstElementChild;
      var frameArray = JSON.parse(imagePlaceholder.dataset.target);
      this._drawCanvas(frameArray, imagePlaceholder, this._canvas(frameContainer.id));
    }.bind(this))
  }

  _drawCanvas (array, imageSpan, canvas) {
    imageSpan.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    $(array).each( function(i, row) {
      for (var j = 0; j < row.length; j++) {
        ctx.fillStyle = 'rgb(' + row[j].join(', ') + ')';
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    })
  }

  _canvas (containerId) {
    var canvas = document.createElement('canvas');
    canvas.id = containerId;
    canvas.width = 210;
    canvas.height = 150;
    canvas.style.border = "1px solid";
    return canvas;
  }
}
