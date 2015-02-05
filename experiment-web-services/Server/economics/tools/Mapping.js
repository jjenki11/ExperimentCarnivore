// Mapping.js

var fs = require('fs');

exports.Mapping = function()
{
    var dataChunk="";
    
    var splitRows = function(data)
    {
      console.log('splitrows in mapping: ',data, 'splitted...');
      return data.toString().split('\n');    
    };
    
    var readFile = function(filename)
    {
      console.log('file to be read in mapping: ',filename);
      var str = "";
      
      function readLines(input, func) {
        var lines = input.toString().split('\n');
        for(var index in lines) {
          func(lines[index]);
        }
        return str; 
      }
      function func(data) {
        str+=data+'\n';
      }
      var input = fs.readFileSync(filename);
      if(input){
        return readLines(input, func);      
      }
    };	
    
	return {	
		dateMap: 				function(fPath)
										{										  		   
											  var dmap = require('../tools/HashMap').HashMap();
											  var values = [];
											  var fileName = fPath+"dateMap.txt";
													  var data = readFile(fileName);
													  var array = splitRows(data);
													  for(var i in array) 
													  {
														  values = array[i].split('	');
														  dmap.put(values[1], values[0]);
													  }
											  console.log("Date mapping success");
											  return dmap;
										},
		quartermap: 		function(fPath)
										{
											  var qmap = require('../tools/HashMap').HashMap();
											  var values = [];
											  var fileName = fPath+"quarters.txt";
													  var data = readFile(fileName);
													  var array = splitRows(data);
													  for(var i in array) 
													  {
														  values = array[i].split(',');
														  qmap.put(values[0], values[1]);
													  }
											  console.log("Quarter mapping success");
											  return qmap;
										},
	};
	
};
