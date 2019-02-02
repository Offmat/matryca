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
