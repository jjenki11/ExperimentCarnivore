

var imageTools = function (){	

	var m = new mathPack();

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

	function setImage(canvas, url)
	{
		var context = canvas.getContext('2d');
		base_image = new Image();
		base_image.src = url;
		base_image.onload = function(){
			context.drawImage(base_image, 0, 0);
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
		invert: invert,
		setImage: setImage,
		loadCanvas: loadCanvas,
		gray: gray,
		binary: binary,
		hist: hist,
	};

};
