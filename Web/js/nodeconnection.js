
var nodeConnection = function()
{

  var socket = new io.connect('http://localhost:8444');
  var plugins = null;
  
  function send(msgType, data)
  {
    socket.emit(msgType, data);
  };
  
  function attachHandler(msgType, handler)
  {
    socket.on(msgType, handler);
  };
  
  function detachHandler(msgType, handler)
  {
    socket.removeListener(msgType, handler);
  };

	socket.on('success', function(data){
		alert(data);
	});

	/*socket.on('response', function (stream) {
		var buffer = '';
		stream.on('data', function (data) {
			buffer += data.toString().replace(/(octave:)[0-9]+>/, '').replace(/(\r\n|\n|\r)/gm,'');
		    });
		stream.on('end', function () { 
			console.log(buffer);
			$('textarea[id="out"]').append(buffer);
		    });
		    });*/
	
	socket.on('response', function(data){
		var box = $('textarea#out');
		console.log(data.message);
		if(data.message === undefined){} 
		else
		{
		  box.val(box.val() + data.message);
		}
	});
	
	socket.emit("init", {message:"start"});

	$('#submitConsole').on("click", function(){	
		var console = $('textarea[id="console"]').val();		
		var res = validateInput(console);
	  //socket.emit('request', {message: "a = 5;\nb = 10;\nz =  a + b;\ndisp(z)"});
		socket.emit('request', {message: res});
	});
	
	$('#enterPass').on("click", function(){
	  socket.emit('passwordEntered', {});
	});
	
	//TBD generalize this approach later - this is for basic functionality for the case of a 2d plot
	socket.on('plot_data', function(data) {	  
    plugins.updatePlotWindow(data);
	});
	
	socket.on('image_data', function(data) {
	  plugins.makeImageWindow(data);
	});
	
	socket.on('clear_data', function(data) {
	  plugins.clearWindows();
	});
	
	socket.on('show_event', function(data) {
	  console.log(data);
	});
	
	socket.on('keyLog', function(data) {
	  console.log(data);
	});
	
	function validateInput(input)
	{
	  var ss = input.split(' ');
	  var console = input;
	  
	  if(ss.length >= 1)
	  {	  
	    if(ss[0] === 'exit')
	    {
	      socket.emit('disconnect',{});
	    }	    
	    else if(ss[0] === 'clc')
	    {
	      socket.emit('clear', {});
	    }  
	    else if(ss[0] === 'plot')
	    {
	      var ys = 0; var xs = 0;
		    var xs = plugins.makeArrayFromString(ss[1].replace(/[\[\]]+/g, ''));
		    if(ss[2]){		      
		      ys = plugins.makeArrayFromString(ss[2].replace(/[\[\]]+/g, ''));  //we either got input in 3rd arg
		    } else {
		      ys = plugins.createNumberLine(0, xs.length);                      //or we have to make a number line
		    }
		    socket.emit('plot', {message: {x: xs, y: ys}});
		    console = "(disp('plot entered'))";
		    return console;
	    }	    
	    else if(ss[0] === 'image')
	    {
	      var path = ss[1] || "images/scream.jpg";
	      socket.emit('image', {message: path});
	      console = "(disp('displaying image from "+path+"'))";	    
	      return console;
	    }
	    else 
	    { 
	      return console;
	    }
	  }
	  else
	  {
	    return console;
	  }	
	};
	
	function init(pluginHandler)
	{
	  plugins = pluginHandler;
	};
	
	return { 
	  init          : init,
	  send          : send,
	  attachHandler : attachHandler,
	  detachHandler : detachHandler
	};
};


