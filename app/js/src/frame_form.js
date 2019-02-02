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
