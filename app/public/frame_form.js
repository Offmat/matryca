var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  width: 320,
  height: 320,
  color: "#f00",
  display: 'inline'
});

colorsArray = [255, 0, 0]

function getColor () {
  colorsArray = Object.values(demoColorPicker.color.rgb)
}

function updateCell (element) {
  this.applyData(element);
  this.applyColor(element);
}

function applyData (element) {
  element.dataset.target = colorsArray;
}

function applyColor (element) {
  $(element).css("background-color", makeColor(colorsArray));
}

function makeColor (array) {
  return 'rgb(' + array.join(', ') + ')';
}

function readData () {
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

function readName () {
  return $('#name').val()
}

function sendRequest (data, path) {
  $.ajax({
    method: 'post',
    url: path,
    data: { data: JSON.stringify(data), name: readName() },
    error: function(data) {
      console.log(data);
    }
  });
}

function saveData () {
  var data = readData();
  var path = '/new';
  sendRequest(data, path);
}

function showData () {
  var data = readData();
  var path = '/show';
  sendRequest(data, path);
}
