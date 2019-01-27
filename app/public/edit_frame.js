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
      });
    });
  }
}
