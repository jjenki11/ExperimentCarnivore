var userHistory = function(selector)
{
  var lastTols = [];
  var sock;
  var math;
  
  var history = [];
  var diffs = [];
  
  var testParams = {
    images: 0,
    personalImage: "images/scream.jpg",
    interStimulus: 1000, //ms
    intraStimulus: 1000, //ms
    name: "billy",
    age: 28,
    gender: "male",
    devices: ["keyboard", "mouse", "emotiv"],
  };
  
  function testColumns(data)
  {  
    //console.log('COLUMNS: ',math.getColumns(data));
    var cols = math.getColumns(data);            
    var avgs = [];
    var stds = [];
    var tols = [];    
    var withinTol = [];    
    var tmpMean = 0;
    var tmpStd = 0;
    for(var i = 0;i<cols.length;i++)
    {      
      tmpMean = math.average(cols[i]);
      tmpStd = math.standardDeviation(cols[i]);
      avgs.push(tmpMean);      
      stds.push(tmpStd);
      var value = cols[i].toString().split(",");
      value = value[value.length-1];
      withinTol.push(math.withinRange( 
          {
            lower: (parseFloat(tmpMean) - parseFloat(tmpStd * 1.7)),  
            upper: (parseFloat(tmpMean) + parseFloat(tmpStd * 1.7))
          }, 
          value
        ));
    }
    console.log(withinTol);
      withinTol=[];
  };
  
  function addToHistory(data)
  {
    if(history.length > 1)
    {
      if(data.length < history[history.length-1]){}
      else{
      console.log(math.subtractVector(data, history[history.length-1]));
      diffs.push(math.subtractVector(data, history[history.length-1]));
      }
    }    
    if(history.length >=2){
      testColumns(history);
    }
    history.push(data); 
  }
  
  function getHistory(data)
  {
    var box = $('textarea#out');
		console.log(history);
		if(diffs.length > 0)
		{
		  box.val(box.val() + "\n"+(diffs[diffs.length-1]).toString());
		}
  };
  
  
  function buildDialog(selector){
    //$("#dialog").append("<div>SUP YO</div>");
    /*
    var x = $('<div></div>');
    x.append("sup");
    $(selector).append(x);
    */
    //return $(selector);
    var x = $('<div></div>');
    x.append("sup");
    $(selector).append(x);
    
  };
  
  function init(socket, mathPack)
	{
	  sock = socket;
	  math = mathPack;
	  sock.attachHandler('new_input', addToHistory);
	  sock.attachHandler('user_history', getHistory);
	  
	  
	  buildDialog();	  
	  
	};
	
	return { 
	  init          : init,
	  addToHistory  : addToHistory,
	  getHistory    : getHistory,
	  buildDialog   : buildDialog,
	  //setTestParams : setTestParams,
	};

};
