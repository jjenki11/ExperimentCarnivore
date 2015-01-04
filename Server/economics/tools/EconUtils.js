// EconUtils.js

var fs = require('fs');

exports.EconUtils = function(path)
{
  

    var m2;
    var filePath = path;
    var dM2;
    var qM2;
    var qtrmap;
    var utilEcon;
   
    
    var dataChunk="";
    var s;

    
    var splitRows = function(data)
    {
      return data.split('\n');    
    };
    
   

   return {
   
    init: function(socket){
      m2 = require('../tools/Mapping').Mapping(socket);
      dM2 = m2.dateMap(path);
      qM2 = m2.quartermap(path);
      qtrmap = m2.quartermap(path);
      /*
      sock.attachHandler('econ_data', function(data, callback){
        var x = splitRows(data);
        callback(function(){return x;});
      });
      sock.attachHandler('file_data', function(data, callback){
        
        callback(function(){var x = splitRows(data);return x;});
      });
      sock.attachHandler('mapping_data', function(data, callback){
        
        callback(function(){var x = splitRows(data);return x;});
      });
      sock.attachHandler('bk_data', function(data, callback){
        
        callback(function(){var x = splitRows(data);return x;});
      });
      s = sock;
        */
    },

    
    m2:  function(){return m2;},
    dM2: function(path){return m2.dateMap(path);},
    qM2:  function(path){return m2.quartermap(path)},
    qtrmap: function(path){return m2.quartermap(path)},
    utilEcon: utilEcon,
    getFilePath: 				function()
										    {
											    return filePath;
										    },
    withinDateRange:		function(data,start,end)
										    {
											    return ((data>=start) && (data<=end));
										    },
    getQuarterIndex:		function(quarters, datadate)
										    {
											    return quarters.get(datadate);
										    },
    multiply: 					function(x, y)
										    {
											    return (x*y);
										    },	
    writeToARFFFile:		function(values,name)
										    {
											    var filename = filePath+"results\\"+name+".arff";
											    var txt = "";
											    txt += values;
											    //write data lines
											    writeList(filename,txt);
										    },											
    constructARFFFile:	function(name, types)
										    {
											    var txt = "@relation "+name;	var filename = filePath+"results\\"+name+".arff";
											    txt+="\r\n";
											    //write line one
											    writeList(filename, txt);
											    //construct attribute strings
											    txt = "";
											    for(var i = 0; i < types[0].length; i++)
											    {
												    txt += "@attribute " + types[0][i] + " " + types[1][i] + "\r\n";
											    }
											    txt += "\r\n";
											    //write attribute lines
											    writeList(filename, txt);
											    //write one line to prepare for the data dump!
											    txt = "@data\r\n";
											    writeList(filename, txt);
										    },	
    readList: 					function(filename,socc)
										    {									
										      console.log("Reading list....");
	                        console.log(filename);
	                        var data = fs.readFileSync(filename);
										        var array = splitRows(data);
											        for(i in array) {
											            console.log(array[i]);
											        }	
											        return array;
											        			
										    },	
    readFile:           function(filename)
    {
      console.log('file to be read in econ utils: ',filename);
      var str = "";
      
      function readLines(input, func) {
        var remaining = '';

          remaining += input;
          var index = remaining.indexOf('\n');
          var last  = 0;
          while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
            remaining = remaining.substring(last);
          }

          
        return str;
        socket.emit('test_driver', str);
        
      }
      function func(data) {
        //console.log('Line: ' + data);
        str+=data+'\n';
      }

      var input = fs.readFileSync(filename);
     return readLines(input, func);
      
      
      
    },	
    readCRSP:           function(E,filename)
    {
      
	    console.log("Reading CRSP....");
	    console.log(filename);
	    //var array = null;

	   // s.send('econ_init', {fName: filename}, function(data){
	      
	      
	      var x = this.readFile(filename)
	      //console.log("WHAT YOU GET BACK: ",x);
	     E = processData(E,x);

	    //});	    
	    
	    
	    
	    
	    
//	    setInterval( function(){
        
      function processData(E, dataIn ){
      
          var firm = null;
	        var fList;//ArrayList<Firm>
	        var values;//String[]
	        var sics = [];//new ArrayList<String>();
	        var qtrs = [];//new ArrayList<Integer>();
	    
			    var array = splitRows(dataIn);
			
			    for(i in array) 
			    {
				    values=new String[23];
				    values = str.split(',');
				    firm =new Firm();					
				    firm.gvkey=values[0];
				    firm.datadate=values[1];
				    firm.fyearq=values[2];
				    firm.fqtr=values[3];
				    firm.cusip=values[4];
				    firm.cshpry=values[5];
				    firm.txditcq=values[6];
				    firm.sic=values[7];
				    firm.deflator=values[8];
				    firm.atq=values[9];
				    firm.dlcq=values[10];
				    firm.dlttq=values[11];
				    firm.dpactq=values[12];
				    firm.dpq=values[13];
				    firm.oibdpq=values[14];
				    firm.ppegtq=values[15];
				    firm.prccq=values[16];
				    firm.pstkq=values[17];
				    firm.saleq=values[18];
				    firm.Profitability=values[19];
				    firm.Market_value_equity=values[20];
				    firm.Equity_book_value=values[21];
				    firm.Tobins_Q=values[22];	

	  				//build firm tree
    				if(E.firmTree.get(firm.cusip)==null)
    				{
    					fList = [];//new ArrayList<Firm>();
    					fList.push(firm);
    					E.firmTree.put(firm.cusip, fList);
    				} 
    				else
    				{
    					E.firmTree.get(firm.cusip).push(firm);
    					E.firmTree.put(firm.cusip, E.firmTree.get(firm.cusip));
    				}

						// build quarter tree
						if(E.quarterTree.get(qM2.get(dM2.get(firm.datadate))) == null)
						{
							fList = [];//new ArrayList<Firm>();
							fList.push(firm);
			    		E.quarterTree.put(qM2.get(dM2.get(firm.datadate)), fList);
			    		qtrs.push(qtrmap.get(dM2.get(firm.datadate)));
			    	} 
			    	else 
			    	{
							E.quarterTree.get(qM2.get(dM2.get(firm.datadate))).push(firm);
							E.quarterTree.put(qM2.get(dM2.get(firm.datadate)), E.quarterTree.get(qM2.get(dM2.get(firm.datadate))));
						}	        	
						// build sic tree
						if(E.sicTree.get(firm.sic)==null)
						{
			    		fList = [];//new ArrayList<Firm>();
			    		fList.push(firm);
			    		E.sicTree.put(firm.sic, fList);
			    		sics.push(firm.sic);
			    	} 
			    	else 
			    	{
			    		E.sicTree.get(firm.sic).push(firm);
			    		E.sicTree.put(firm.sic, E.sicTree.get(firm.sic));
			    	}

			    	E.AllFirms.push(firm);	        	
			    	if(E.AllFirms2.get(firm.cusip)!= null)
			    	{
			    		E.AllFirms2.get(firm.cusip).entries.push(firm);
			    	}
			    	else
				    {
			    		E.AllFirms2.put(firm.cusip, firm);
			    	}
			    }
			    
			    //print out all firms grouped by sic
					for(var j = 0; j < sics.length; j++)
					{    		
			    	console.log("Firm entry for SIC " + sics.get(j) + ": "+ E.sicTree.get(sics.get(j)).get(0).cusip);
			    }
			    
			    //print out all firms grouped by quarter
			    for(var j = 0; j < qtrs.length; j++)
			    {
			    	console.log("Firm entry for QUARTER " + qtrs.get(j) + ": "+ E.quarterTree.get(qtrs.get(j)).get(0).cusip);
					}
					return E;
					
				}
				
	  return E;
  },		
    writeList: 					function(filename, text)
					     					{
					     						fs.appendFile(filename, text+"\r\n", function (err) {});						 
										    },
    mapMonth:						function(month)
										    {
											    var result = "";
											    switch(month)
											    {
												    case "01": result = "jan";break;
												    case "02": result = "feb";break;
												    case "03": result = "mar";break;
												    case "04": result = "apr";break;
												    case "05": result = "may";break;
												    case "06": result = "jun";break;
												    case "07": result = "jul";break;
												    case "08": result = "aug";break;
												    case "09": result = "sep";break;
												    case "10": result = "oct";break;
												    case "11": result = "nov";break;
												    case "12": result = "dec";break;
												    default  : result = "YOURE SHIT OUTTA LUCK";break;
											    }
											    return result;
										    },	
    convertDateFormat:	function(dateIn)
										    {
											    var year = dateIn.substring(0,3);
											    var month = mapMonth(dateIn.substring(4,5));
											    var day = dateIn.substring(6,7);
											    return (day+month+year);
										    },	

    addToBeforeTree:	function(e, f)
									    {
										    var tmp = [];
										    if(e.BeforeTree.get(f.cusip) != null){
											    e.BeforeTree.get(f.cusip).push(f);
										    } else {
											    tmp = [];
											    tmp.push(f);
											    e.BeforeTree.put(f.cusip, tmp);		
										    }
										    return true;
									    },	
    addToAfterTree:		function(e, f)
									    {
										    var tmp = [];
										    if(e.AfterTree.get(f.cusip) != null){
											    e.AfterTree.get(f.cusip).push(f);
										    } else {
											    tmp = [];
											    tmp.push(f);
											    e.AfterTree.put(f.cusip, tmp);		
										    }
										    return true;
									    },	
    addToGCTree:			function(e, f)
									    {
										    var tmp = [];
										    if(e.goingConcernTree.get(f.cusip) != null){
											    e.goingConcernTree.get(f.cusip).push(f);
										    } else {
											    tmp = [];
											    tmp.push(f);
											    e.goingConcernTree.put(f.cusip, tmp);		
										    }
										    return true;
									    },	
    addToDuringTree:	function(e, f)
									    {
										    var tmp = [];
										    if(e.DuringTree.get(f.cusip) != null){
											    e.DuringTree.get(f.cusip).push(f);
										    } else {
											    tmp = [];
											    tmp.push(f);
											    e.DuringTree.put(f.cusip, tmp);		
										    }
										    return true;
									    },	
									
    createGCRangeList:	function(e, st, end)
    										{
    											var tmp = []; //ArrayList<ArrayList<Firm>>();
    											var lh = [];  //ArrayList<Firm>();		
    											for(var i = (st-1); i < (end-1); i++)
    											{
    												lh = [];
    												var holster = e.quarterTree.get(i);
    												if(holster == null){}
    												else {
    													for(var j = 0;j < holster.length;j++)
    													{
    														if(e.bankruptTree.get(holster.get(j).cusip) == null) //found in GC tree
    														{
    															lh.add(holster.get(j));
    														}
    													}
    													tmp.add(lh);
    												}  											
    											}
    											return tmp;
    										},  										
    dateFound:					function(date)
										    {
											    if(dM2.get(date) != null)
											    {			
												    return (dM2.get(date));
											    }
											    console.log("BAD VALUE: "+ date);
											    return -1;
										    },											
    setEconomy:					function(e)
										    {
											    utilEcon = e;
										    },											
    printList:					function(firms) //ArrayList<Firm> 
										    { 
											    var f; //Firm
											    var txt = "";
											    var tmp = "";
											    if(firms!=null)
											    {
												    for(var i = 0;i<firms.size();i++)
												    {
													    f = new Firm();
													    f = firms.get(i);
													    tmp =  "CUSIP: "+f.cusip+" Date: "+dM2.get(f.datadate)+" State: "+f.category+"\n";
													    txt += tmp;
													    console.log(tmp);
												    }
											    } 
											    else
											    {
												    console.log("NULL LIST ");
											    }
											    return txt;
										    },											
    calculateZScore:		function(values) //ArrayList<Float> 
										    {
											    var std = Math.sqrt(varianceN(values));
											    var scores = [];//new ArrayList<Float>();
											    for(var i = 0; i < values.length; i++)
											    {
												    scores.push(((values.get(i) - averageN(values)) / (std)));	//xbar - mu0 / std_dev*sqrt(N) gives test statistic
											    }
											    return scores;
										    },
    averageN:						function(list) //ArrayList<Float>
										    {
											    var sum = sumN(list);
											    return (sum / list.length);
										    },
    varianceN:					function(list) //ArrayList<Float>
										    {
											    var avg = averageN(list);
											    var diffs = [];//new ArrayList<Float>();
											    for(var i = 0; i < list.length; i++)
											    {
												    diffs.add(Math.pow((list.get(i) - avg), 2));
											    }
											    return sumN(diffs);
										    },
    sumN:								function(list) //ArrayList<Float> 
										    {
											    var x = 0;
											    for(var i = 0; i< list.length; i++)
											    {
												    x+=(list.get(i));
											    }
											    return x;
										    },
    averageK:						function(list) //ArrayList<Firm>
										    {
											    var x = 0;
											    for(var i = 0; i< list.length; i++)
											    {
												    x+=Float.parseFloat(list.get(i).ppegtq);
											    }
											    return (x / list.length);
										    },
    averageTQ: 					function(list) //ArrayList<Firm> 
										    {
											    var x = 0;
											    for(var i = 0; i< list.length; i++)
											    {
												    x+=Float.parseFloat(list.get(i).Tobins_Q);
											    }
											    return (x / list.length);
										    },
    averageTQList:			function(list) //ArrayList<Firm> 
										    {
											    var res = 0;
											    var badValues = 0;
											    for(var i = 0;i<list.size();i++)
											    {
												    if(Float.isNaN(Float.parseFloat(list.get(i).Tobins_Q)))
												    {
													    badValues++;
												    }
												    else
												    {
													    res += Float.parseFloat(list.get(i).Tobins_Q);
												    }
											    }
											    return (res / (list.length+1));
										    },
										
    averageProfList:		function(list) //ArrayList<Firm> 
										    {
											    var res = 0;
											    var badValues = 0;
											    for(var i = 0;i<list.size();i++)
											    {
												    if(Float.isNaN(Float.parseFloat(list.get(i).Profitability)))
												    {
													    badValues++;
												    }
												    else
												    {
													    res += Float.parseFloat(list.get(i).Profitability);
												    }
											    }
											    return (res / (list.length+1));
										    },
    writeUnconditionally: function(f, filename)
										    {
											    writeList(filename, dM2.get(f.datadate)+", "+f.ppegtq + ", " + f.Tobins_Q + ", " + f.sic+ ","+qM2.get(dM2.get(f.datadate)));
										    },
    writeIfFound:				function(Eco,list,f,foundFiles)
										    {
											    var txt = "";
											    var count = [0,0,0,0,0];				
											    var tmp; //ArrayList<Firm>
											    var y = [false,false,false,false];
											    if(Eco.bankTree.get(f.cusip) != null){
												    for(var j = 0;j<Eco.bankTree.get(f.cusip).length;j++){						
													    var x = Eco.bankTree.get(f.cusip).get(j).evaluateBK(dM2.get(f.datadate)); //boolean[]
													    var xx = [
														    (x[0] && f.setCategory("BEFORE")),
														    (x[1] && f.setCategory("DURING")),
														    (x[2] && f.setCategory("AFTER")),
														    (x[3] && f.setCategory("NEVER"))
													    ]; //boolean[]														
													    txt = dM2.get(f.datadate)+", "+f.cusip+","+f.Tobins_Q + ", " + 
															      f.Profitability + ", " + f.sic + ", "+ 
															      (qM2.get(dM2.get(f.datadate))+","+(j+1)+","+f.category);
															      
													    y[0] =	(x[0] && writeList(foundFiles[0], txt) && addToBeforeTree(Eco, f));
													    y[1] =	(x[1] &&  writeList(foundFiles[1], txt) && addToDuringTree(Eco, f));
													    y[2] =	(x[2] && writeList(foundFiles[2], txt) && addToAfterTree(Eco, f));
													    y[3] =	(x[3] && writeList(foundFiles[4], txt) && addToGCTree(Eco, f));
													
													    if(y[0]){						
														    if(Eco.categoryTree.get("BEFORE") != null){
															    Eco.categoryTree.get("BEFORE").push(f);
														    } else {
															    tmp = []//new ArrayList<Firm>();
															    tmp.push(f);
															    Eco.categoryTree.put("BEFORE", tmp);
														    }
													    } else if(y[1]) {						
														    if(Eco.categoryTree.get("DURING") != null){
															    Eco.categoryTree.get("DURING").push(f);
														    } else {
															    tmp = []//new ArrayList<Firm>();
															    tmp.push(f);
															    Eco.categoryTree.put("DURING", tmp);
														    }
													    } else if(y[2]) {						
														    if(Eco.categoryTree.get("AFTER") != null){
															    Eco.categoryTree.get("AFTER").push(f);
														    } else {
															    tmp = []//new ArrayList<Firm>();
															    tmp.push(f);
															    Eco.categoryTree.put("AFTER", tmp);
														    }						
													    } else if(y[3]) {				
														    //xxx[3] = true;
														    if(Eco.categoryTree.get("NEVER") != null){
															    Eco.categoryTree.get("NEVER").push(f);
														    } else {
															    tmp = []//new ArrayList<Firm>();
															    tmp.push(f);
															    Eco.categoryTree.put("NEVER", tmp);
														    }								
													    } else {
														    console.log("DONT KNOW");
													    }														
												    }							
											    }
											    for(var k = 0;k<y.length;k++){
												    if(y[k])
													    count[k] = 1;
											    }
											    return count;											
										    },
      };


    
      
    console.log("econ utils made");
      
    };
  

	
	/*
	 * A sample arff file format
	 * 
	 * @relation your_relation
	 * 
	 * @ATTRIBUTE Numeric1 NUMERIC
	 * @ATTRIBUTE Numeric2 NUMERIC
	 * @ATTRIBUTE class {Label1,Label2}
	 * 
	 * @DATA
	 * 0.154763579,-0.000941792,Label1
	 * -0.000941792,0.154763579,Label2
	 * ... 
	 * 
	 *  Note: String[][] types 
	 *  	String[0][i] is the name of the ith attribute
	 *  	String[1][i] is the data type of the ith attribute
	 * 
	 */		
	

