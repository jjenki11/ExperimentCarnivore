// Mapping.js

var fs = require('fs');

exports.Mapping = function(socket)
{
    var dataChunk="";

    
    
    var splitRows = function(data)
    {
      console.log('splitrows in mapping: ',data);
      return data.split('\n');    
    };
    
    var readFile = function(filename)
    {
      console.log('file to be read in mapping: ',filename);
      var str = "";
      
      function readLines(input, func) {
        var remaining = '';

      //  input.on('data', function(data) {
          remaining += input;
          var index = remaining.indexOf('\n');
          var last  = 0;
          while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
          }

          remaining = remaining.substring(last);
     //   });
     return str;
        //socket.emit('test_driver', str);
        
        /*
        input.on('end', function() {
          if (remaining.length > 0) {
            func(remaining);
          } else {
            
            //return str;
          }
        });*/
      }
      function func(data) {
        //console.log('Line: ' + data);
        str+=data+'\n';
      }

      var input = fs.readFileSync(filename);
      //socket.emit('test_driver', str);
      return readLines(input, func);
      
      
      
    };	
    
   
   /* 
    
    function sendMsg(type, msg, cb)
    {
      if(socket!=null)
        socket.send(type,msg,cb);
    };
    */
	return {	
		dateMap: 				function(fPath)
										{
										  //sendMsg('mapping_init', {fName: fPath+'dateMap.txt'}, function(error, message){								
										  
 										  //  console.log('mapping error: ',error);
										  //  console.log('mapping msg: ', message);
										  		   
											  var dmap = require('../tools/HashMap').HashMap();
											  var values = [];
											  var fileName = fPath+"dateMap.txt";
											
                         //console.log(fileName);
													  var data = readFile(fileName);
													  var array = splitRows(data);
													  console.log('datemap array: ',array);
														
													  for(var i in array) 
													  {
													  console.log(array[i]);
														  values = array[i].split('	');
														  dmap.put(values[1], values[0]);
													  }
													  console.log('dmap: ',dmap.entries());
											  console.log("Date mapping success");
											  return dmap;
											//});
										},
		quartermap: 		function(fPath)
										{
										  //sendMsg('mapping_init', {fName: fPath+'quarters.txt'}, function(error, message){
										    
										  //  console.log('mapping error: ',error);
										  //  console.log('mapping msg: ', message);
										    
											  var qmap = require('../tools/HashMap').HashMap();
											  var values = [];
											  var fileName = fPath+"quarters.txt";
                          //console.log(fileName);
													  var data = readFile(fileName);
													  var array = splitRows(data);
														console.log('quartermap array: ',array);
													  for(var i in array) 
													  {
														  values = array[i].split(',');
														  qmap.put(values[0], values[1]);
													  }
													  console.log('qmap: ',qmap.entries());
											  console.log("Quarter mapping success");
											  return qmap;
											//});
										},
										
   // sendMsg:        sendMsg,

	};
	
	
};

/*	
	public BTree<String, Integer> cusipMap(String filename){
		BTree<String,Integer> cusipMap =new BTree<String,Integer>();

		String[] values=new String[2];
		//String filename = "C:\\Users\\Jeff\\Desktop\\Laptop-Migration\\econ_shiznot\\econ_project\\june_2013\\ECON PAPER\\cusip_map.txt";
		//String filename1 = "C:\\Users\\Jeff\\Desktop\\Laptop-Migration\\econ_shiznot\\econ_project\\june_2013\\ECON PAPER\\acquirer_data_reduced.txt";
		//String filename2 = "C:\\Users\\Jeff\\Desktop\\Laptop-Migration\\econ_shiznot\\econ_project\\june_2013\\ECON PAPER\\bankrupcyreduced.txt";
		//String filename3 = "C:\\Users\\Jeff\\Desktop\\Laptop-Migration\\econ_shiznot\\econ_project\\june_2013\\ECON PAPER\\target_data_reduced.txt";
		//String gcFile = "C:\\Users\\Jeff\\Desktop\\Laptop-Migration\\econ_shiznot\\econ_project\\june_2013\\ECON PAPER\\Going_Concern_reduced.txt";
		Integer i = 0;
		try {
		    BufferedReader in = new BufferedReader(new FileReader(filename));
		    String str;
		    str = in.readLine();   
		    
		    while ((str = in.readLine()) != null) 
		    {
		        values = str.split(",");   
		        cusipMap.put(((String)values[0]), Integer.parseInt(values[1]));
		    	i++;
		    }
		    in.close();		    
		}
		catch (NullPointerException e){
			System.out.println("null");
		}
		catch (IOException e) 
		{
		    System.out.println("File Read Error");
		}
		System.out.println("Cusip mapping success");
		return cusipMap;
	}
*/
