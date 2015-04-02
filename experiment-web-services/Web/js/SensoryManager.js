var SensoryManager = function(sock, plug) 
{     
  var keyboard;
  var mouse;
  var lastEvent;    
  var emitter = sock;
  var plugins = plug;
  
  function initKeyboardHandler(handle)
  {   
    var eventEnum = {
      'keyDown'     : 1,  //eventEnum['keyDown'] = 1, etc. (for later protocol integration)
      'keyUp'       : 2,
      'keyPressed'  : 3
    };
   
    // key down 
    $( handle ).keydown(function( event ) {
      if(event.which == 13){}
      else{
        var evtObj = new initEventObject('keyboard', 'keyDown', {index: event.which}, Date.now());
      //make sure the last event was not keyDown (implies a keyhold which we will suppress)
        if(lastEvent.source       === 'keyboard' && 
           lastEvent.enumeration  === 'keyDown'){ /* suppress */ }
        else
        { 
          emitter.send('sensor', evtObj);
        }
        lastEvent = evtObj; 
      }           
    });
   
    // key up
    $( handle ).keyup(function(event) {       
      switch(event.which)
      {
        case 13 :
          emitter.send('new_input', lastEvent);          
          emitter.send('passwordEntered', {});
          plugins.makePasswordEntry();
          $("#passInput").focus();
          break;
        case 187 :
          emitter.send('user_history', {});
          break;    
        default :
          var evtObj = new initEventObject('keyboard', 'keyUp', {index: event.which}, Date.now());
          lastEvent = evtObj;
          emitter.send('sensor', evtObj);
          break;
        
        // other key cases here     
      }
      
    });
   
    // press key -> pretty annoying, uncomment below if you really want to see the logs
    /*
    $( handle ).keypress(function(event) {
        var evtObj = new initEventObject(//eventEnum['keyPressed'],'keyPressed',{index: event.which},(new Date()) );           
        lastEvent = evtObj;
        emitter.send('sensor', evtObj);
    });  
    */
  };

  function initDisplayHandler(handle)
  {
  
  }

  function initMouseHandler(handle)
  {      
    var eventEnum = 
    {
      'move'       : 1,
      'downClick'  : 2,
      'upClick'    : 3
    };
   
    // move mouse
    $( handle ).mousemove(function( event ) {
        var evtObj = new initEventObject('mouse','move',{x: event.pageX, y: event.pageY}, Date.now());
        console.log(evtObj);
        emitter.send('sensor', evtObj);
        lastEvent = evtObj;
    });
   
    // release mouse
    $( handle ).mouseup(function(event) {
        var evtObj = new initEventObject('mouse', 'upClick', {x: event.pageX, y: event.pageY}, Date.now());
        console.log(evtObj);
        emitter.send('sensor', evtObj);
        lastEvent = evtObj;
    });
   
    // click mouse
    $( handle ).mousedown(function(event) {
        var evtObj = new initEventObject('mouse', 'downClick', {x: event.pageX, y: event.pageY}, Date.now());
        console.log(evtObj);
        emitter.send('sensor', evtObj);
        lastEvent = evtObj;
    });               
  };
 
  var initEventObject = function(src, enumE, val, time)
  {
    return {
        source: src,
        enumeration: enumE,
        value: val,
        timestamp: time
    };
  };
  
  // Staying on one key, what is time from push to lift
  function intraKey(data)
  {
    var airTimes = [];
    if(!(data.up.length == data.down.length)){} //see if our key up array is same size as key down array (should always be)
    else 
    {
      for(var idx in data.up)
      {
        airTimes.push(data.up[idx].time - data.down[idx].time); 
      }
    }
    // now we can plot the result each time!
    emitter.send(
      'plot', 
      {
        message: 
        {
          x: plugins.createNumberLine(1,airTimes.length),
          y: airTimes            
        }
      }
    );
  };
  
  // Travelling between two keys, what is time from lift to next push
  function interKey(data)
  {
    var touchTimes = [];
    if(!(data.up.length == data.down.length)){} //see if our key up array is same size as key down array (should always be)
    else 
    {
      for(var i = 1; i < data.up.length; i++)
      {
        touchTimes.push(data.down[i].time - data.up[i-1].time); 
      }
    }
    // now we can plot the result each time!
    emitter.send(
      'plot', 
      {
        message: 
        {           
          x: plugins.createNumberLine(1,touchTimes.length),
          y: touchTimes
        }
      }
    );
    emitter.send('input_update', {message: {x: plugins.createNumberLine(1,touchTimes.length),y: touchTimes}});
  };
  
  function mouseAccel(data)
  {
    var accels = [];
    
  };
  
  function mouseClick(data)
  {
    console.log("CLICKED ON IMAGE");
  }

  function init(win)
  {         
    emitter.attachHandler('inter_key_times', interKey);
    emitter.attachHandler('intra_key_times', intraKey);
    emitter.attachHandler('mouse_acceleration', mouseAccel);
    emitter.attachHandler('mouse_click', mouseClick);
    
    return {
      mouse    : initMouseHandler(win),
      keyboard : initKeyboardHandler(win),
      display  : initDisplayHandler(win)
    };
  };

  return { init : init };
};
