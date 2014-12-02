var pluginHandler = function(){

	var hashMap = {}; // for variables
	var funcMap = {}; // for functions

	var mathUtils = new MathOps();
	//var pageObj = {index: {nav: 0, mid: 0, low: 0}};

/* THIS is where we do all the setting of page sections to 
	give the illusion of only 1 url and fast performance!
*/
	function setTop(A)
	{
		$("#nav").html(A).draggable();
	};

	function setMid(A)
	{
		$("#mid").html(A).draggable();
	};

	function setLow(A)
	{
		$("#low").html(A).draggable();
	};

	function setImage(A)
	{
		$("#image").html(A).draggable();
	};
	
	function setConsole(A)
	{
		$("#console").html(A);
	};
	
	function setVarExplorer(A)
	{
		$("#vars").html(A);
	};
	
	function setOutput(A)
	{
		$("#out").html(A);
	};
	
	function setPass(A)
	{
	  $("#pass").html(A);
	};
	
	function returnArray(inp)
	{
		return mathUtils.vectorN(hashMap.getItem(inp));
	};

	function retVariableFromMap(inp)
	{
		var txt = "";
		txt +=inp;
		var x = hashMap.getItem(""+inp);
		console.log("Key: (" + inp + "), Val: ("+x+")");
		if(!x){return ;}
		if(x.length > 1){
			if(x[0].length > 0){
				return mathUtils.matN(x, x.length, x[0].length);
			}
			else {
				return mathUtils.vectorN(x);
			}
		}
		return parseFloat(hashMap.getItem(txt));
	}

	function setMap(Hm)
	{
		hashMap = Hm;
	};

	function clearMap()
	{
		hashMap.clear();
	};	

	function makeHashMap()
	{
		setMap(new HashTable());
	};

	function functionHandler(data)
	{
		return data.split('(')[0];
	};

	function submitHandle()
	{
		var input=document.getElementById("console").value.replace(/\s/g, '');		
		console.log(input);
				console.log(input);
						console.log(input);
		$("#vars").val("");

		var vec = input.split('{');

		var fun = input.split('\(');
		var eql = input.split('=');
		var add = input.split('+');
		var sub = input.split('-');
		var mul = input.split('*');
		var div = input.split('/');

		var v1 = 0;
		var v2 = 0;
		var opt = "";
		var outcome = 0;

		if(fun.length == 2){
			v1 = fun[0];
			v2 = fun[1].replace(/\)/g, '');
			console.log("V1: "+v1);
			console.log("V2: "+retVariableFromMap(v2));

			if(v1 === 'avg'){
				console.log("AVG: "+mathUtils.averageVec(retVariableFromMap(v2)));
			} else if(v1 === 'image'){
				console.log("SHOWING IMAGE: "+retVariableFromMap(v2));
				makeImageWindow(retVariableFromMap(v2));
			} else if(v1 === 'eye'){
				var s = mathUtils.eye(parseInt(v2));
				mathUtils.printMatrix(s);
			} else {
				// unknown
			}
		}

		if(vec.length == 2){

			var x = vec[1].substring(0, (vec[1].length - 1));
			var y = x.split(',');
			console.log(x);

			mathUtils.printVectorN(x);
			hashMap.setItem(vec[0], mathUtils.vectorN(y));
			//mathUtils.printMatrix(I);
			//console.log("AVERAGE: "+aI);

			//console.log(mathUtils.printVectorN(mathUtils.vectorN(vec[1].split(','))));
		}

		if(eql.length == 2){ // we found equals
			v1 = eql[0];
			v2 = eql[1];//.replace(/=/g, '');
			opt = " <- "; //fancy notation to assign
			outcome = " (variable assignment)";
			hashMap.setItem(eql[0], v2[1]);
		} else if(add.length == 2){
			v1 = retVariableFromMap(add[0]);
			v2 = retVariableFromMap(add[1]);
			opt = '+';
			outcome = v1 + v2;
		} else if(sub.length == 2){
			v1 = retVariableFromMap(sub[0]);
			v2 = retVariableFromMap(sub[1]);
			opt = '-';
			outcome = v1 - v2;
		} else if(mul.length == 2){
			v1 = retVariableFromMap(mul[0]);
			v2 = retVariableFromMap(mul[1]);
			opt = '*';
			outcome = v1 * v2;
		} else if(div.length == 2){
			v1 = retVariableFromMap(div[0]);
			v2 = retVariableFromMap(div[1]);
			opt = '/';
			outcome = v1 / v2;
		} else {
			/*
			if(fun.length ==2){
				var x = fun[1].split(')')[0];
				//console.log(returnArray(x));
				//console.log("AVG OF "+mathUtils.printVectorN(mathUtils.vectorN(x))+ " = " + mathUtils.averageVec(mathUtils.vectorN(x)));
			}*/
			if(input === 'clear'){
				makeHashMap();
				document.getElementById("out").value = "ready...";
			} else if(input === 'erase'){
				clearImage();
			} else if(input === 'plot'){
				updateOutputConsole("TBD implement plot...");
				return;
			} else {
				console.log("YOU DID NOT HAVE ENTER IN TEXT");
				document.getElementById("out").value = (input[0]+ " = "+retVariableFromMap(input[0]));
			}	
		} 
		updateVariableEditor();
		updateOutputConsole(v1+" "+opt+" "+v2+" = "+outcome);
	};	

	function makeInputWindow()
	{
		var txt = "<div id=\"console\" class=\"ui-widget-content\">Console Window";
			txt+="<textarea id=\"console\" onBlur=\"javascript:if(this.value==''){this.value=this.defaultValue;}\" onFocus=\"javascript:if(this.value==this.defaultValue){this.value='';}\"></textarea></div>";
			txt+="</div>";	
			//	This shit basically parses the input and does basic calculator stuff		
			    //	$("#submitConsole").bind('click', submitConsole);			
			setConsole(txt);
	};
	
	function clearWindows()
	{
	  $("#out").val("");
	  $("#console").val("");
	};
	
	function makePasswordEntry()
	{
	  var txt = "<div id=\"pass\">Enter Password:";
		    txt+="<input id=\"passInput\"></input><button id=\"enterPass\">Enter</button></div>";
		setPass(txt);
	};

	function makeVariableEditor()
	{
		var txt = "<div>Variable Editor";
			txt+="<textarea id=\"vars\" value=\"YO\">Message</textarea></div>";
			makeHashMap();
			setVarExplorer(txt);
	};

	function makeOutputTerminal()
	{
		var txt = "<div>Output Window";
			txt+="<textarea id=\"out\"></textarea></div>";
			setOutput(txt);
	};

	function makeImage()
	{
		var txt = "<canvas id=\"imagery\"><img src=\"images/scream.jpg\" alt=\"scream\" style=\"width:250px;height:250px;visibility:hidden;\"></canvas>";
		return txt;
	};


	function convertBMPToImageData(data) {
		var Width = data.width;
		var Height = data.height;
		var data = bmp.data;
		var bmpdata = data.data;
		var stride = data.stride;

		for (var y = 0; y < Height; ++y) {
 			for (var x = 0; x < Width; ++x) {
  				var index1 = (x+Width*(Height-y))*4;
    			var index2 = x * 3 + stride * y;
    			data[index1] = bmpdata[index2 + 2];
  				data[index1 + 1] = bmpdata[index2 + 1];
    			data[index1 + 2] = bmpdata[index2];
    			data[index1 + 3] = 255;  	// the alpha channel
   			}
  		}
  		console.log(data.length);
  		return data;
  	};

/*	tabling until we decide on image rep'n */
  	function viewImageMatrix(data)
  	{	
  		convertBMPToImageData(data)
  	};

  	function drawImage(data)
  	{
		if(!data)
			data = "images/scream.bmp";  	

		var img = new Image();
		img.src = data;
  		var can = document.getElementById('canvas1');
  		var con = can.getContext('2d');
  		var imgData = con.getImageData(0, 0, can.height, can.width);
  		try{
 		    con.putImageData(imgData, 0, 0);
		    con.drawImage(img, 0, 0);
		  } catch(err) {
		    //something to handle the issue
		    data = "images/scream.bmp"
		    con.putImageData(imgData, 0, 0);
		    con.drawImage(img, 0, 0);
		  }
  	};

  	function clearImage(){
  		var can = document.getElementById('canvas1');
  		can.getContext('2d').clearRect(0, 0, can.width, can.height);
  		can.getContext('2d').clearRect ( x , y , w , h );
  	};

	function makeImageWindow(data)
	{		
 		drawImage(data);				
	};

	function paintCanvas()
	{
		setImage("<canvas id=\"canvas1\" width=\"512\" height=\"512\"> Fail ... </canvas>");
	}

	function updateInputWindow()
	{
		document.getElementById("console").value = " > ";
	};

	function updateVariableEditor()
	{
		var txt = "";
		for(var k in hashMap.items){
			txt += k + "    " + hashMap.getItem(k) + "\n";
		}
		document.getElementById("vars").value = (txt);
	};

	function updateOutputConsole(txt)
	{
		document.getElementById("out").value = txt;
	};
	
	function updatePlotWindow(data)
	{
	  $("#centerContent").html("<div id=\"content\"><div class=\"demo-container\"><div id=\"placeholder\" class=\"demo-placeholder\"></div></div></div>");
	  $.plot("#placeholder", [ data ] );
	};
	
	function hideByHandle(handle)
	{
	  $(handle).hide();
	};
	
	function hideList(list)
	{
	  for(var idx in list)
	  {
	    hideByHandle(list[idx]);
	  }
	};
	
	function showByHandle(handle)
	{
	  return $(handle).show();
	};
	
	function showList(list)
	{
	  var l = [];
	  for(var idx in list)
	  {
	    l.push(showByHandle(list[idx]));
	  }
	  return l;
	};
	
	function setContent(dest, content)
	{
	  $(dest).html($(content));
	  showByHandle(content);
	};
	
	function appendToHandle(dest, content)
	{
	  $(dest).append(showList(content));
	};

  function createDroppable(dest, accepter, dropper)
  {
    $(dest).droppable({
			accept: accepter,
			drop:   dropper	
		});
  };
  
  function createDraggableItems(list)
  {
    for(var idx in list)
    {
      $(list[idx]).draggable({
			  helper:	function () { return $(this).clone().appendTo('body').css('zIndex',5).show(); },
			  cursor:	'move'
		  });
    }    
  };
  
  function makeArrayFromString(str)
  {
    var array = [];
    var sp = str.split(',');
    for(var idx in sp)
    {
      var tr = sp[idx].replace(/\s/g, '');  //get rid of spaces grr
      array.push(tr);
    }
    return array;  
  };
  
  function createNumberLine(start, upperBound)
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
  
	return {
		makeInputWindow: makeInputWindow,
		makeVariableEditor:makeVariableEditor,
		makeOutputTerminal:makeOutputTerminal,
		makeImageWindow:makeImageWindow,
		makePasswordEntry:makePasswordEntry,
		paintCanvas:paintCanvas,
		updateVariableEditor:updateVariableEditor,
		updateInputWindow:updateInputWindow,
		updateOutputConsole:updateOutputConsole,
		clearWindows:clearWindows,
		makeImage:makeImage,
		submitHandle:submitHandle,
		updatePlotWindow:updatePlotWindow,
		hideList:hideList,
		showList:showList,
		setContent:setContent,
		appendToHandle:appendToHandle,
		createDroppable:createDroppable,
		createDraggableItems:createDraggableItems,
		makeArrayFromString:makeArrayFromString,
		createNumberLine:createNumberLine,
	};
};
