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
