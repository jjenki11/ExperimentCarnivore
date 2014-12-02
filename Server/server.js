var io = require('socket.io').listen(8444);
var ss = require('socket.io-stream');
var child = require('child_process');


io.sockets.on('connection', function(socket){
  
  var initial = true;
  var watch;
    
  var keyEventHistory = { up: [], down: [] };  
  var mouseEventHistory = { move: [], click: { up: [], down: [] }  };
  
  function clearHistory()
  {
    mouseEventHistory = { move: [], click: { up: [], down: [] } };    
    keyEventHistory = { up: [], down: [] };    
  };
  
  console.log('connection started');
  socket.emit('success', 'Server heard your request.');
  
  socket.on('disconnect', function(){
    console.log('finishing watch');
    console.log(watch);
    if(typeof watch != 'undefined')
    {
        watch.kill();
    }
  });

  socket.on('request', function(requestData){
    console.log('data recieved');
    console.log('process about to start');
    watch = child.spawn('octave', ['-i', '-q', '--verbose']);
    watch.stdin.setEncoding = 'utf-8';
    console.log('process started');

     watch.stdout.on('data', function(data){
      console.log('stdout  data - ' + data.toString());
      var parsed = data.toString().replace(/(octave:)[0-9]+>/, '');
        console.log('size of parsed: ',parsed.length);
      if(parsed.length == 2){
        parsed = data.toString().replace(/error: product: /, '');
        return;
      }
      console.log('parsed data ' + parsed);
      console.log('data length ' + parsed.trim().length);
      if(parsed.trim().length > 0)
          socket.emit('response',{message: parsed});
     });
  
    watch.stderr.on('data', function(data){
      console.log('error occurred ' + data.toString());
      socket.emit('response',data.toString())
        });

    watch.on('exit', function(code){
      console.log('process exited with code ' + code);
        });

    watch.stdin.write(requestData.message);    
    watch.stdin.end();

    //ss(socket).emit('response', watch.stdout);

  });
  
  socket.on('plot', function(data) {
    var d1 = []; var d2 = [];  var pairs = [];
    for(var idx in data.message.x){ d1.push(data.message.x[idx]);   }
    for(var idx in data.message.y){ d2.push(data.message.y[idx]);   }
    for(var idx in data.message.x){ pairs.push([d1[idx], d2[idx]]); }
    socket.emit('plot_data', pairs);
  });
  
  socket.on('image', function(data) {
    socket.emit('image_data', data);
  });
  
  socket.on('clear', function(data){
    socket.emit('clear_data', data);
  });
  
/*  keep one of the following (inter_key v. intra_key) commented to avoid overwriting */
  socket.on('passwordEntered', function(data){      
    socket.emit('inter_key_times', keyEventHistory);      
     
    //socket.emit('intra_key_times', keyEventHistory);    
    clearHistory();
  });
  
  socket.on('input_update', function(data){
    socket.emit('new_input', data.message.y);
    socket.emit('user_history', {}); 
  });
  socket.on('sensor', function(data){
    switch(data.source) 
    {    
      case 'keyboard': 
        updateKeyHistory(data); 
        break;
      case 'mouse': 
        updateMouseHistory(data);
        //socket.emit('show_event', JSON.stringify(mouseEventHistory)); // show mouse log history
        break;
    }
  });
  
  function updateKeyHistory(data)
  {
    if(data.enumeration === 'keyUp') 
    {
      keyEventHistory.up.push({time: data.timestamp, key: data.value.index});
    } else 
    {
      keyEventHistory.down.push({time: data.timestamp, key: data.value.index});
    }
  };
  
  function updateMouseHistory(data)
  {
    if(data.enumeration === 'upClick') 
    {
      mouseEventHistory.click.up.push({time: data.timestamp});
    } else if(data.enumeration === 'downClick') 
    {
      mouseEventHistory.click.down.push({time: data.timestamp});
    } else 
    {
      mouseEventHistory.move.push({time: data.timestamp, pos: data.value});
    }
  };
  
});

