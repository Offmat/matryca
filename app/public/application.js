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

/* exported EditFrame */
class EditFrame {
  constructor(frame){
    this.frame = frame;
  }

  call (){
    this.draw();
  }

  draw () {
    $(this.frame).each( function(index, value) {
      $('tr[y="' + index + '"]').children().each( function(e){
        $(this).css("background-color", 'rgb(' + value[e].join(', ') + ')');
        $(this).attr('data-target', value[e]);
      });
    });
  }
}

/* exported FrameForm */
class FrameForm {
  constructor () {
    this.colorsArray = [255, 0, 0];
  }

  run () {
    this._initializeColorPicker();
    this._initializeGetColorEvent();
    this._initializeSaveDataEvent();
    this._initializeShowDataEvent();
    this._initializeUpdateCellEvent();
  }

  _initializeColorPicker () {
    this.demoColorPicker = new iro.ColorPicker("#color-picker-container", {
      width: 320,
      height: 320,
      color: "#f00",
      display: 'inline'
    });
  }

  _initializeGetColorEvent () {
    $('#color-picker-container').on('click', this._getColor.bind(this));
  }

  _initializeSaveDataEvent () {
    $('#save-data').on('click', this._saveData.bind(this));
  }

  _initializeShowDataEvent () {
    $('#show-data').on('click', this._showData.bind(this));
  }

  _initializeUpdateCellEvent () {
    $('.cell').on('click', e => {
      this._updateCell(e);
    });
  }

  _getColor () {
    this.colorsArray = Object.values(this.demoColorPicker.color.rgb)
  }

  _updateCell (element) {
    this._applyData(element);
    this._applyColor(element);
  }

  _saveData () {
    var path = '/new';
    this._sendRequest(this._readData(), path);
  }

  _showData () {
    var data = this._readData();
    var path = '/show';
    this._sendRequest(data, path);
  }

  _applyData (element) {
    element.target.dataset.target = this.colorsArray;
  }

  _applyColor (element) {
    $(element.target).css("background-color", this._makeColor(this.colorsArray));
  }

  _makeColor (array) {
    return 'rgb(' + array.join(', ') + ')';
  }

  _readData () {
    var matrixArray = [];
    $('tr').each( function () {
      var rowArray = [];
      $(this).children().each( function () {
        rowArray.push($(this).attr('data-target').split(',').map(e => Number(e)));
      });
      $(this).data('target')
      matrixArray.push(rowArray);
    });
    return matrixArray;
  }

  _sendRequest (data, path) {
    $.ajax({
      method: 'post',
      url: path,
      data: { data: JSON.stringify(data), name: this._readName(), method: 'PATCH' },
      error: function(data) {
        console.log(data);
      }
    });
  }

  _readName () {
    return $('#name').val()
  }
}

class IndexFrames {
  constructor(frame) {
    this.rgbdata = frame;
  }

  call () {
    var c = document.getElementById("frame");
    var ctx = c.getContext("2d");
    var r,g,b;
    for(var i=0; i< rgbdata.length; i++){
    	for(var j=0; j< rgbdata[0].length; j++){
    		r = rgbdata[i][j][0];
    		g = rgbdata[i][j][1];
    		b = rgbdata[i][j][2];
    		ctx.fillStyle = "rgba("+r+","+g+","+b+", 1)";
    		ctx.fillRect( j, i, 1, 1 );
    	}
    }
  }
}

(function() {
    $(document).ready(function () {

    });

    $(window).scroll(function () {

    });

})($ || jQuery);
/* global EditFrame */
/* exported UploadImage */
class UploadImage {
  constructor(){
    this.input = '[name=image]';
  }

  call (){
    this._addInputListener();
  }

  _addInputListener () {
    $(this.input).on('change', function(e) {
      this._readFile(e.target.files[0]);
    }.bind(this));
  }

  _readFile(file) {
    let reader = new FileReader();
    reader.addEventListener("load", function(e) {
      this._getPixels(e.target.result);
    }.bind(this));
    reader.readAsDataURL(file);
  }

  _getPixels(dataURL) {
    let image = new Image();
    image.src = dataURL;
    image.addEventListener('load', e => {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var pixels = context.getImageData(0, 0, 21, 15).data;
      var frame = this._generateArrOfArrs(pixels);
      this._drawFrame(frame);
    });
  }

  _generateArrOfArrs (pixels) {
    let arrOfArrs = [];
    let rowArray = [];
    let cellColorArray = [];
    let cellsPerRowCounter = 0;
    $(pixels).each( function(index, number) {
      if (cellsPerRowCounter < 21) {
        if ((index + 1) % 4 != 0) {
          cellColorArray.push(number);
        } else {
          rowArray.push(cellColorArray)
          cellColorArray = [];
          cellsPerRowCounter++;
        }
      } else {
        arrOfArrs.push(rowArray);
        cellColorArray.push(number);
        rowArray = [];
        cellsPerRowCounter = 0;
      }
    })
    arrOfArrs.push(rowArray)
    return arrOfArrs;
  }

  _drawFrame (frame) {
    new EditFrame(frame).call();
  }
}
