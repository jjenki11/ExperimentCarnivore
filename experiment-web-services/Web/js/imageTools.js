

var imageTools = function (){	

	var m = new mathPack();
	
	function scaleImage( filename )
	{

	}

  function set3DWindow(canvas)
  {
      var black = new Pre3d.RGBA(0, 0, 0, 1);
      var white = new Pre3d.RGBA(1, 1, 1, 1);

      var screen_canvas = document.getElementById('ThreeDWin');
      var renderer = new Pre3d.Renderer(screen_canvas);

      var cubes = [ ];

      for (var i = 0; i < 10; ++i) {
        for (var j = 0; j < 10; ++j) {
          for (var k = 0; k < 10; ++k) {
            if (i == 0 || j == 0 || k == 0 ||
                i == 9 || j == 9 || k == 9) {
              var cube = Pre3d.ShapeUtils.makeCube(0.5);
              var transform = new Pre3d.Transform();
              transform.translate(i - 5, j - 5, k - 5);
              cubes.push({
                shape: cube,
                color: new Pre3d.RGBA(i / 10, j / 10, k / 10, 0.3),
                trans: transform});
            }
          }
        }
      }

      var num_cubes = cubes.length;
      var cur_white = false;  // Default to black background.

      function draw() {
        for (var i = 0; i < num_cubes; ++i) {
          var cube = cubes[i];
          renderer.fill_rgba = cube.color;
          renderer.transform = cube.trans;
          renderer.bufferShape(cube.shape);
        }

        if (cur_white) {
          renderer.ctx.setFillColor(1, 1, 1, 1);
        } else {
          renderer.ctx.setFillColor(0, 0, 0, 1);
        }
        renderer.drawBackground();

        renderer.drawBuffer();
        renderer.emptyBuffer();
      }

      renderer.camera.focal_length = 2.5;
      // Have the engine handle mouse / camera movement for us.
      DemoUtils.autoCamera(renderer, 0, 0, -30, 0.40, -1.06, 0, draw);

      document.addEventListener('keydown', function(e) {
        if (e.keyCode != 84)  // t
          return;

        if (cur_white) {
          document.body.className = "black";
        } else {
          document.body.className = "white";
        }
        cur_white = !cur_white;
        draw();
      }, false);

      draw();
      return true;
    
  };
  
  function load3DCanvas()
  {
        var canvas = document.createElement('ThreeDWin');
        div = document.getElementById('ThreeDWin'); 
        canvas.id     = "CursorLayer";
        canvas.width  = 1224;
        canvas.height = 768;
        canvas.style.zIndex   = 8;
        canvas.style.position = "absolute";
        canvas.style.border   = "1px solid";
        div.appendChild(canvas)
  };

	function loadCanvas(id) 
	{
        var canvas = document.createElement('canvas');
        div = document.getElementById(id); 
        canvas.id     = "CursorLayer";
        canvas.width  = 1224;
        canvas.height = 768;
        canvas.style.zIndex   = 8;
        canvas.style.position = "absolute";
        canvas.style.border   = "1px solid";
        div.appendChild(canvas)
  };

  function returnPTestImageArray(imageArr, numImages, userImage, controlImage)
  {
  
    //imageArr is all possible images
    //numImages is desired size of test set
    //userImage is the user's selected image
    //controlImage is the neutral intra stimulus image (gray)
    
    /*
      the goal here: 
        1) pick (numImages-1) random images out of imageArr, put into array with userImage appended at end
        2) assign random numbers 0-numImages-1 to each image
        3) sort image set
        4) make new array Ptest
        5) prepend controlImage to Ptest
        6) for each image in set, append (a: imageSet[i] followed by b: controlImage) to Ptest
        return Ptest        
    */
    
    function getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    var createNumberLine = function(start, upperBound)
    {
      var len = upperBound - start;
      var i = 0;
      var numLine = [];
      while(i<=len){
        numLine.push(start+i);
        i++;
      }
      return numLine;    
    };
    
    
    var numset = getRandomSubarray(createNumberLine(0,numImages), numImages);
    var tmp = [];
    tmp.push(userImage);
    for(var j = 0; j < numImages; j++)
    {
    
      tmp.push(imageArr[j]);
    }
//    imageArr = userImag.push(imageArr);
    imageArr = tmp;
//    imageArr.push(userImage);
    var tmpImgArr = [];
    // 2 second gray image wait..
    tmpImgArr.push(controlImage);
    tmpImgArr.push(controlImage);
    
    // 3
    tmpImgArr.push("images/3.png");
    tmpImgArr.push(controlImage);
    
    // 2
    tmpImgArr.push("images/2.png");
    tmpImgArr.push(controlImage);
    
    // 1
    tmpImgArr.push("images/1.png");
    tmpImgArr.push(controlImage);
    
    for(var i = 0; i < numImages; i++)
    {
      tmpImgArr.push(tmp[numset[i]]);
      tmpImgArr.push(controlImage);
    }
    
    // 2 second gray image wait..
    tmpImgArr.push(controlImage);
    tmpImgArr.push(controlImage);
    
    return tmpImgArr;
  }
	
	function setImage(canvas, url, w, h)
	{
		var context = canvas.getContext('2d');
		canvas.height = (w!=null) ? w : 750;
		canvas.width = (h!=null) ? h : 750;
		base_image = new Image();
		base_image.src = url;
		base_image.onload = function(){
			context.drawImage(base_image, 0, 0, (w!=null) ? w : 750, (h!=null) ? h : 750);
		}
	};

// TBD
	function setPixel(canvas, i, j, r, g, b)
	{
		var c=document.getElementById('imagery');
		var ctx=c.getContext("2d");
		var img=document.getElementById(imageHandle);
		ctx.drawImage(img,0,0);
		var imgData=ctx.getImageData(0,0,c.width,c.height);
		// get pixel linear index
		var linIndex = ((i+1)*4) * (j+1);
		imgData.data[linIndex] = r;
		imgData.data[linIndex+1] = g;
		imgData.data[linIndex+2] = b;
		imgData.data[linIndex+3] = g;
		ctx.putImageData(imgData,0,0);		
	};
//TBD - FIX
	function getRows(imageHandle)
	{
        var c=document.getElementById('imagery');
        var ctx=c.getContext("2d");
        var rows = []
        var values = [];
        var imageWidth = c.width;
        var imageHeight = c.height;
        var imgData=ctx.getImageData(0,0,c.width,c.height);
        for(var y = 0; y < imageWidth; y++) {
          // loop through each row
          for(var x = 0; x < imageHeight; x++) {
          	if(x != 0)
          	{
          		var red = imgData.data[((imageHeight * y) + x) * 4];
            	var green = imgData.data[((imageHeight * y) + x) * 4 + 1];
            	var blue = imgData.data[((imageHeight * y) + x) * 4 + 2];
	            var alpha = imgData.data[((imageHeight * y) + x) * 4 + 3];
          		values.push(red);
          		values.push(green);
          		values.push(blue);
          		//values.push(alpha);
          	}
          }
          rows.push(values);
          values = [];
        }
        return rows;
	};
// TBD - FIX
	function getColumns(imageHandle)
	{
        var c=document.getElementById('imagery');
		var ctx=c.getContext("2d");
        var cols = [];
        var values = [];
        var imageWidth = c.width;
        var imageHeight = c.height;
        var imgData=ctx.getImageData(0,0,c.width,c.height);
        for(var y = 0; y < imageHeight; y++) {
          // loop through each column
          for(var x = 0; x < imageWidth; x++) {
          	if(x == 0)
          	{
          		var red = imgData.data[((imageWidth * y) + x) * 4];
            	var green = imgData.data[((imageWidth * y) + x) * 4 + 1];
            	var blue = imgData.data[((imageWidth * y) + x) * 4 + 2];
	            var alpha = imgData.data[((imageWidth * y) + x) * 4 + 3];
          		values.push(red);
          		values.push(green);
          		values.push(blue);
          		//values.push(alpha);
          	}
          }
          cols.push(values);
          values = [];
        }
        return cols;
	};

	function invert(imageHandle)
	{
		var c=document.getElementById('imagery');
		var ctx=c.getContext("2d");
		var img=document.getElementById(imageHandle);
		ctx.drawImage(img,0,0);
		var imgData=ctx.getImageData(0,0,c.width,c.height);
		// invert colors
		for (var i=0;i<imgData.data.length;i+=4)
		{
			imgData.data[i]=255-imgData.data[i];
			imgData.data[i+1]=255-imgData.data[i+1];
			imgData.data[i+2]=255-imgData.data[i+2];
			imgData.data[i+3]=255;
		}
		ctx.putImageData(imgData,0,0);
	};

	function gray(imageHandle)
	{
		var c=document.getElementById('imagery');
		var ctx=c.getContext("2d");
		var img=document.getElementById(imageHandle);
		ctx.drawImage(img,0,0);
		var imgData=ctx.getImageData(0,0,c.width,c.height);
		// average rgb and set r,g,b each to average
		for (var i=0;i<imgData.data.length;i+=4)
		{
			var a = m.average([imgData.data[i],imgData.data[i+1],imgData.data[i+2]]);
			imgData.data[i]= a;
			imgData.data[i+1]= a;
			imgData.data[i+2]= a;
			imgData.data[i+3]= 255;
		}
		ctx.putImageData(imgData,0,0);
	};

	function binary(imageHandle, thresh)
	{
		var c=document.getElementById('imagery');
		var ctx=c.getContext("2d");
		var img=document.getElementById(imageHandle);
		ctx.drawImage(img,0,0);
		var imgData=ctx.getImageData(0,0,c.width,c.height);
		// binarize image
		for (var i=0;i<imgData.data.length;i+=4)
		{
			var a = m.average([imgData.data[i],imgData.data[i+1],imgData.data[i+2]]);
			if(a >= (thresh || 127))
			{
				a = 255;
			}
			else
			{
				a = 0;
			}
			imgData.data[i]= a;
			imgData.data[i+1]= a;
			imgData.data[i+2]= a;
			imgData.data[i+3]= 255;
		}
		ctx.putImageData(imgData,0,0);
	};
	
	function hist(imageHandle, direction)
	{
		var data = [];
		var ret = [];
		if(direction == 'vertical')
		{
			data = getColumns(imageHandle);
		}
		else	//direction = horizontal
		{
			data = getRows(imageHandle);
		}
		for(var i = 0; i < data.length; i++)
		{
			ret.push([(i+1), (m.sum(data[i]))]);
		}
		return ret;
	};
	
    /**
     *    Returns array of keys from a map
     */    
	var keyList = function(obj)
    {
        var k = [];
        for(var name in obj)
        { 
            k.push(name); 
        }
        return k;
    };
    /**
     *    Returns array of values from a map
     */    
    var valueList = function(obj)
    {
        var v = [];
        for(var name in obj)
        { 
            v.push(obj[name]); 
        }
        return v;    
    };
	
	return {
	  scaleImage: scaleImage,
	  returnPTestImageArray: returnPTestImageArray,
		invert: invert,
		setImage: setImage,
		loadCanvas: loadCanvas,
		load3DCanvas: load3DCanvas,
		set3DWindow: set3DWindow,
		gray: gray,
		binary: binary,
		hist: hist,
	};

};
