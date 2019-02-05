/* exported FrameForm */
class FrameForm {
  constructor () {
    this.colorsArray = [255, 0, 0];
    this.colorPicker = '#color-picker-container';
    this.saveDataButton = '#save-data';
    this.showDataButton = '#show-data';
    this.matrix = '.matrix-table';
    this.cells = '.cell';
    this.pipette = '#pipette';
  }

  run () {
    this._initializeColorPicker();
    this._initializeGetColorEvent();
    this._initializeSaveDataEvent();
    this._initializeShowDataEvent();
    this._initializeUpdateCellEvent();
    this._initializePipette();
  }

  _initializeColorPicker () {
    this.frameColorPicker = new iro.ColorPicker("#color-picker-container", {
      width: 320,
      height: 320,
      color: "#f00",
      display: 'inline'
    });
  }

  _initializeGetColorEvent () {
    $(this.colorPicker).on('click', this._getColor.bind(this));
  }

  _initializeSaveDataEvent () {
    $(this.saveDataButton).on('click', this._saveData.bind(this));
  }

  _initializeShowDataEvent () {
    $(this.showDataButton).on('click', this._showData.bind(this));
  }

  _initializeUpdateCellEvent () {
    this._setCursor('crosshair');
    $(this.cells).on('click', e => {
      this._updateCell(e);
    });
  }

  _initializePipette () {
    $(this.pipette).on('click', e => {
      this._initializeCollectColorEvent();
    })
  }

  _initializeCollectColorEvent () {
    this._setCursor('grab'); // cant use svg - already in public :( (css sucks)
    $(this.cells).unbind();
    $(this.cells).on('click', e => {
      this._collectColor(e);
    });
  }

  _getColor () {
    this.colorsArray = Object.values(this.frameColorPicker.color.rgb)
  }

  _setCursor (value) {
    $(this.matrix).css('cursor', value);
  }

  _updateCell (element) {
    this._applyData(element);
    this._applyColor(element);
  }

  _collectColor (element) {
    this.colorsArray = $(element.target).attr('data-target').split(',').map(e => Number(e));
    this._setColorPicker();
    $(this.cells).unbind();
    this._initializeUpdateCellEvent();
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

  _setColorPicker () {
    var color = this.colorsArray;
    this.frameColorPicker.color.rgb = {r: color[0], g: color[1], b: color[2]};
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
