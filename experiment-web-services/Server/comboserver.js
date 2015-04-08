/* EEG spatial analysis structure */
var EEG_Struct = function(){
  var EEGHistory  = [];
  var EEGStruct = {};
  
  var regionA = []; // front left   (nodes AF3, F3 , FC5, F7)
  var regionB = []; // front right  (nodes AF4, F4 , FC6, F8)
  var regionC = []; // back left    (nodes T7 , CMS, P7 , O1)
  var regionD = []; // back right   (nodes T8 , DRL, P8 , O2)
  var gyro    = []; // 2D gyro      (x,y)
  
  var Front  = {};
  var Back   = {};
  var Left   = {};
  var Right  = {};
  var GyroXY = {};
  
  return {  
    // initialize the EEGStruct
    init:    
    function()
    {    
      var x = {  
        "counter":   [],
        "AF3":       [],
        "F7":        [],
        "F3":        [],
        "FC5":       [],
        "T7":        [],
        "P7":        [],
        "O1":        [],
        "O2":        [],
        "P8":        [],
        "T8":        [],
        "FC6":       [],
        "F4":        [],
        "F8":        [],
        "AF4":       [],
        "GYROX":     [],
        "GYROY":     [],
        "Timestamp": []
      };
      EEGStruct = x;
    },
      // reset all arrays to be empty after pushing them to history
    clearStruct:
    function(){
      EEGHistory.push(EEGStruct);
      EEGStruct = 
      {  
        "counter":   [],
        "AF3":       [],
        "F7":        [],
        "F3":        [],
        "FC5":       [],
        "T7":        [],
        "P7":        [],
        "O1":        [],
        "O2":        [],
        "P8":        [],
        "T8":        [],
        "FC6":       [],
        "F4":        [],
        "F8":        [],
        "AF4":       [],
        "GYROX":     [],
        "GYROY":     [],
        "Timestamp": []
      };
  },
    
    // add newly split string array
    addData: 
    function(sharedData){  
      EEGStruct["counter"].push(sharedData[0]); 
      EEGStruct["AF3"].push(sharedData[1]);
      EEGStruct["F7"].push(sharedData[2]);
      EEGStruct["F3"].push(sharedData[3]);
      EEGStruct["FC5"].push(sharedData[4]);
      EEGStruct["T7"].push(sharedData[5]);
      EEGStruct["P7"].push(sharedData[6]);
      EEGStruct["O1"].push(sharedData[7]);
      EEGStruct["O2"].push(sharedData[8]);
      EEGStruct["P8"].push(sharedData[9]);
      EEGStruct["T8"].push(sharedData[10]);
      EEGStruct["FC6"].push(sharedData[11]);
      EEGStruct["F4"].push(sharedData[12]);
      EEGStruct["F8"].push(sharedData[13]);
      EEGStruct["AF4"].push(sharedData[14]);
      EEGStruct["GYROX"].push(sharedData[15]);
      EEGStruct["GYROY"].push(sharedData[16]);
      EEGStruct["Timestamp"].push(sharedData[17]);  
      
      regionA = [];
      regionB = [];
      regionC = [];
      regionD = [];
      gyro    = [];
      
      //FRONT LEFT

      regionA.push("Front_Left");  //where
      regionA.push(sharedData[1]); // A1: AF3
      regionA.push(sharedData[3]); // A2: F3
      regionA.push(sharedData[4]); // A3: FC5
      regionA.push(sharedData[2]); // A4: F7
      regionA.push(sharedData[0]);  // timestamp
      
      //FRONT RIGHT

      regionB.push("Front_Right");  // where
      regionB.push(sharedData[14]); // B1: AF4
      regionB.push(sharedData[12]); // B2: F4
      regionB.push(sharedData[11]); // B3: FC6
      regionB.push(sharedData[13]); // B4: F8
      regionB.push(sharedData[0]);  // timestamp
      
      //BACK RIGHT
      
      regionC.push("Back_Right");   // where
      regionC.push(sharedData[10]); // C1: T8
      // REF NODE -> regionC.push(sharedData[12]); // C2: DRL
      regionC.push(sharedData[9]);  // C3: P8
      regionC.push(sharedData[8]);  // C4: O2
      regionC.push(sharedData[0]);  // timestamp
      
      //BACK LEFT

      regionD.push("Back_Left");   // where
      regionD.push(sharedData[5]); // D1: T7
      // REF NODE -> regionD.push(sharedData[3]); // D2: CMS 
      regionD.push(sharedData[6]); // D3: P7
      regionD.push(sharedData[7]); // D4: O1
      regionD.push(sharedData[0]);  // timestamp
      
      //GYRIZZLES

      gyro.push("gyro");            //where
      gyro.push(sharedData[15]);    // G1: gyroX
      gyro.push(sharedData[16]);    // G2: gyroY
      gyro.push(sharedData[0]);  // timestamp
     
      Front = {
        "Left" : regionA,
        "Right": regionB
      };
      Back  = {
        "Left" : regionD,
        "Right": regionC
      };
      Left  = {
        "Front": Front["Left"],
        "Back" : Back["Right"]
      };
      Right = {
        "Front": Front["Right"],
        "Back" : Back["Left"]
      };      
      GyroXY = {
        "Gyro" : gyro
      };
      
    },
    
    setDataRegion:
    function(region, data){
      
    },
    getDataRegion:
    function(region){
      
      if(region === "front")
      {
        return Front;
      }
      else if(region === "back")
      {
        return Back;
      }
      else if(region === "left")
      {
        return Left;
      }
      else if(region === "right")
      {
        return Right;
      }
      else if(region === "gyro")
      {
        return GyroXY;
      }
      else
      {
        console.log("WTF M8?");
        return null;
      }    
    },   
    
    // get history of EEGStructs
    getHistory:
    function(){
      return EEGHistory;
    },
    
    // return current EEGStruct
    getData:
    function(){
      return EEGStruct;
    },
    //   add element to history and clear  structure if time is past threshold
    gateObjectSize: 
    function(t){
      if( (Date.now() - lastSample ) > t )
      {        
        EEGHistory.push(EEGStruct);
        this.clearStruct();        
        lastSample = Date.now();
      }
   },
  };
};

/*

  This is a file containing 
    
    1) a socket.io listener/emitter for bi-directional 
       UI communication on port 8444
    2) a net server listening for Emotiv traffic which
       can emit data blobs to the UI

*/
  
  var verbose     = false;
  
  var cua = '/home/cua-telehealth/Desktop/';
  var jeff = '/home/jeff/Desktop/development/keystrokes/ExperimentCarnivore/experiment-web-services/Data/';
  
  var other = ['????'];
  
  var EEGStruct = new EEG_Struct();
  

  
  /* set this to where you're located (for now, 
     need to process.env for the path to Server and 
     find location from there, or get user to input path)
  */
  var location = cua;

  EEGStruct.init();
  EEGStruct.clearStruct();
  
  var ReadFile = function(filename)
  {
    console.log('file to be read: ',filename);
    fs.readFileSync(filename, "utf8", function(err, data) {
      if(err) {throw err;}
      else{
        return data.toString();
      }
    });
  };
 
  // move these outta here!
  
  var RandomVector = function(rows)
  {
    var v = [];
    for(var i = 0; i < rows; i++)
    {
      v.push(Math.random());
    }
    return v;
  };
  
  var ArrayToCommaDelimString = function(arr)
  {
    var str = "";
    
    for(var i =0; i < arr.length; i++)
    {
      if(i == arr.length) {
        str += arr[i];
      }
      else {
        str += arr[i] + ",";
      }
    }
    
    return str;
  };
  
  var newDataEvent = function(data)
  {   
    var sharedData = [];
    sharedData = data.toString().split(",");
    sharedData[0] = idx++;             
      
    return sharedData;
  };

  var MockSignal = function(s)
  {
  
    var x = setInterval(function(){
    
      var rand = RandomVector(18);
      
      var str = ArrayToCommaDelimString(rand);
      
      var chop = str.toString().replace(/,_/, '\r\n');    
      WriteLine(location+'mockDataFile.txt', chop);
      
      var splitData = newDataEvent(str);      
      EEGStruct.addData(splitData);       
      
      // uncomment below to see 20 second window then clear
      //gateObjectSize(20000);
      
      
      var data = EEGStruct.getData();
      
      var d1 = data["counter"];
      var d2 = data["O1"];
      var d3 = data["O2"];
      
      var pairs = [];
      var pairs2 = [];
      
      for(var idx in d1){ pairs.push([d1[idx], d2[idx]]); }          
      for(var idx in d1){ pairs2.push([d1[idx], d3[idx]]); }
      
      s.emit('plot_data', pairs);
      
    }, 200);  
  }
  
  
  // establish connection to UI / Emotiv service
                /*    (1)     */
                
  ﻿var io = require('socket.io').listen(8444, '127.0.0.1');
  var ss = require('socket.io-stream');
  var child = require('child_process');
  var fs = require('fs');
  


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
        console.log(require('./DB.js').createDB());
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

    });
    
    socket.on('emotiv_sup', function(dataIn) {
      
        var data = EEGStruct.getData();
        
        console.log("SUP, you chose these attributes: ",dataIn.a1, dataIn.a2,dataIn.a3);
        if(data["counter"].length > 0){
          
          var d1 = data[dataIn.a1];
          var d2 = data[dataIn.a2];
          var d3 = data[dataIn.a3];
          
          var pairs = [];
          var pairs2 = [];

          for(var idx in d1){ pairs.push([d1[idx], d2[idx]]); }          
          for(var idx in d1){ pairs2.push([d1[idx], d3[idx]]); }
          
          socket.emit('plot_data', pairs);
        }
    });
    
    socket.on('plot', function(data) {
      var d1 = []; var d2 = [];  var pairs = [];
      for(var idx in data.message.x){ d1.push(data.message.x[idx]);   }
      for(var idx in data.message.y){ d2.push(data.message.y[idx]);   }
      for(var idx in data.message.x){ pairs.push([d1[idx], d2[idx]]); }
      socket.emit('plot_data', pairs);
    });
    
    socket.on('mock_EEG_stream', function(data) {     
      MockSignal(socket);                
    });
    
    socket.on('econ_init', function(data, callback) {
     
        var d = require('./economics/Driver').Driver();
        d.init();
        console.log('success with econ init: ',d);
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
        case 'image':
          updateDisplayHistory(data);
          break;
        case 'experiment':
          updateExperimentHistory(data);
          break;
        case 'mocked':
          updateMockHistory(data);
          break;
      }
    });
    
    
    // 6W Mapping files
    // 
    // when: data.timestamp
    // where: data.source
    // what: data.value{list of attributes}
    
    function updateKeyHistory(data)
    {
      if(data.enumeration === 'keyUp') 
      {
        keyEventHistory.up.push({time: data.timestamp, key: data.value.index});
        WriteLine(location+"keyFile.txt",
          data.timestamp+","+data.source+","+data.enumeration+","+data.value.index+"\n");
      } else 
      {
        keyEventHistory.down.push({time: data.timestamp, key: data.value.index});
        WriteLine(location+"keyFile.txt",
          data.timestamp+","+data.source+","+data.enumeration+","+data.value.index+"\n");
      }
    };
    
    function updateMouseHistory(data)
    {
      if(data.enumeration === 'upClick') 
      {
        mouseEventHistory.click.up.push({time: data.timestamp});
        WriteLine(location+"mouseFile.txt", 
          data.timestamp+","+data.source+","+data.enumeration+","+data.value.x+","+data.value.y+"\n");
      } else if(data.enumeration === 'downClick') 
      {
        mouseEventHistory.click.down.push({time: data.timestamp});
        WriteLine(location+"mouseFile.txt", 
          data.timestamp+","+data.source+","+data.enumeration+","+data.value.x+","+data.value.y+"\n");
      } else 
      {
        mouseEventHistory.move.push({time: data.timestamp, pos: data.value});
        WriteLine(location+"mouseFile.txt", 
          data.timestamp+","+data.source+","+data.enumeration+","+data.value.x+","+data.value.y+"\n");
      }
    };    
    function updateDisplayHistory(data)
    {
      WriteLine(location+"imageFile.txt", 
          data.timestamp+","+data.source+","+data.enumeration+","+data.value+"\n");
    };
    function updateExperimentHistory(data)
    {
      WriteLine(location+"experimentFile.txt", 
          data.timestamp+","+data.source+","+data.enumeration+","+data.value+"\n");
    };
    function emotivConnect()
    {      
    };    
  });
  
  function WriteLine(file, data)
  {    
    fs.appendFile(file, data, function (err) {
      if(err){
        fs.writeFile(file, data, function (err) {
          if (err) throw err;
          console.log('It\'s saved! in same location.');
        });
      }
    });    
    return true;
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
  
/*    (2)  EEG server    */

  var net = require('net');
  var HOST = '127.0.0.1';
  var PORT = 30009;
  var idx = 0;
  var lastSample = Date.now();


  var EmotivServer = net.createServer(function(sock) 
  {
      var threshTime = 20000;
      sock.on('data', function(data) {      
        // we get data from the EEG in a comma delimited format
        // this calls a 'new data event'
        var splitData = newDataEvent(data);      
        // addData adds the array split with commas to the 'eeg_struct'.
        // this struct returns the proper representation
        EEGStruct.addData(splitData); 
        // use the server to write to socket.io the properly formatted object       
        //sock.write('"'+EEGStruct.getData()+'"');          
        sock.write('"'+splitData+'"');
        var chop = splitData.toString().replace(/,_/, '\r\n');    
        /*
COUNTER,AF3,F7,F3, FC5, T7, P7, O1, O2,P8, T8, FC6, F4,F8, AF4,GYROX, GYROY, TIMESTAMP
        */

    // Write all data 
        
        var daDate = Date.now();
        
        WriteLine(location+"eegFile.txt",
          daDate+","+'eeg'+","+chop);    
          
          
          // write 'front of head'
        WriteLine(location+"front_head_eegFile.txt",
          daDate+","+EEGStruct.getDataRegion("front")["Left"].toString()+"\n"+daDate+","+EEGStruct.getDataRegion("front")["Right"].toString()+"\n");
        
          // write 'back of head'
        WriteLine(location+"back_head_eegFile.txt",
          daDate+","+EEGStruct.getDataRegion("back")["Left"].toString()+"\n"+daDate+","+EEGStruct.getDataRegion("back")["Right"].toString()+"\n");  
          
          // write 'left side of head'
        WriteLine(location+"left_head_eegFile.txt",
          daDate+","+EEGStruct.getDataRegion("left")["Front"].toString()+"\n"+daDate+","+EEGStruct.getDataRegion("left")["Back"].toString()+"\n");
          
          // write 'right side of head'
        WriteLine(location+"right_head_eegFile.txt",
          daDate+","+EEGStruct.getDataRegion("right")["Front"].toString()+"\n"+daDate+","+EEGStruct.getDataRegion("right")["Back"].toString()+"\n");
          
          // write 'gyro of head'
        WriteLine(location+"gyro_eegFile.txt",
          daDate+","+EEGStruct.getDataRegion("gyro")["Gyro"]+"\n");
          
          // causes the history to accumulate and write & clear 
        EEGStruct.gateObjectSize(threshTime);
      });
      
      sock.on('error', function() {
        if(verbose){
          console.log("Error is properly handled");
        }
        else{
        
          
          
        }
      });
      
      sock.on('close', function(data) {
        if(verbose)
          console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
      });
      
  }).listen(PORT, HOST);

  console.log('Emotiv server now listening on ' + HOST +':'+ PORT);
