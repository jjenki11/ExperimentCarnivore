// Driver.js

exports.Driver = function()
{

	//var path = "C:\\Users\\blackhole\\Desktop\\econRepo\\java\\economics\\src\\";
	
	var firms = []; //new ArrayList<Firm>();
	var econo;
	var utils;	
	var timeBlock = 3; // what is this?
	var dataPoints = 120; //what is this?
	var firmTimeSeries; //ArrayList<ArrayList<ArrayList<Firm>>>
	
	return {
	
		init:																	function(socket)
																					{
																						socket.on('test_driver', function(data){
																					      console.log('yay, ');
																					    });
																					  
																					  try{
																					    var path = "/home/jeff/Desktop/development/keystrokes/ExperimentCarnivore/Server/economics/data_set/";
																					    utils = require('../economics/tools/EconUtils').EconUtils(path);
																					    
																					    //utils = new EconUtils(path);
																					    //utils.init(sockz);
																					    utils.init(socket);
                                              
																					    //setup elements
																					    var f = require('../economics/tools/ReadFile').ReadFile(path, utils);
																					    f.init(socket); //ReadFile
																					    econo = f.getEconomy();
																					    econo.createFirmTransitionObj(econo.cusipList);
																					    console.log("HERE WE GO"); 
																					    console.log(econo.cusipList);
																					    var vals = doRoutine(econo); //Object[]
																					  	var beforeTQDist = econo.getFilePath()+"results/beforeTQDist.txt"; 			//1
																						  var beforeProfDist = econo.getFilePath()+"results/beforeProfDist.txt"; 		//2
																						  var beforeSICTQDist = econo.getFilePath()+"results/beforeTQSICDist.txt"; 	//3
																						  var beforeSICProfDist = econo.getFilePath()+"results/beforeProfSICDist.txt"; //4		
																						  var duringTQDist = econo.getFilePath()+"results/duringTQDist.txt"; 			//5
																						  var duringProfDist = econo.getFilePath()+"results/duringProfDist.txt"; 		//6
																						  var duringSICTQDist = econo.getFilePath()+"results/duringTQSICDist.txt"; 	//7
																						  var duringSICProfDist = econo.getFilePath()+"results/duringProfSICDist.txt"; //8		
																						  var afterTQDist = econo.getFilePath()+"results/afterTQDist.txt";   			//9		
																						  var afterProfDist = econo.getFilePath()+"results/afterProfDist.txt";   		//10
																						  var afterSICTQDist = econo.getFilePath()+"results/afterTQSICDist.txt";   	//11		
																						  var afterSICProfDist = econo.getFilePath()+"results/afterProfSICDist.txt";   //12
																						  //perform econ exploration
																						  writeQuarterlyIntervalDiff(vals, 
																																			  beforeTQDist,  			//1
																																			  beforeProfDist,  		//2
																																			  beforeSICTQDist,   	//3
																																			  beforeSICProfDist,	//4 
																																			  duringTQDist,				//5 
																																			  duringProfDist, 		//6
																																			  duringSICTQDist,		//7
																																			  duringSICProfDist, 	//8
																																			  afterTQDist,				//9
																																			  afterProfDist,			//10
																																			  afterSICTQDist, 		//11
																																			  afterSICProfDist); 	//12
																						
																					  } catch(e) {
																					    console.log("Problem mon: ",e);
																					  }
																					  //socket.send('econ_init',{});
																					  //define file paths

																					

																					},	
		getFirmsInQuarterRangeWithSIC:				function(start, end, sic)
																					{
																						var firmsInQuarterRange = [];//new ArrayList<ArrayList<Firm>>();
																						firmsInQuarterRange = utils.createGCRangeList(econo, start, end);
																						var firmsWithSIC = [];//new ArrayList<Firm>();
																						for(var i = 0; i < firmsInQuarterRange.size(); i ++)
																						{
																							if((firmsInQuarterRange.get(i) != null))
																							{
																								for(var j = 0; j < firmsInQuarterRange.get(i).length; j ++)
																								{
																									//check if the firm evaluated has desired sic
																									if(firmsInQuarterRange.get(i).get(j).sic == sic)
																									{
																										if(
																											Float.isNaN(Float.parseFloat(firmsInQuarterRange.get(i).get(j).Profitability)) ||
																											Float.isNaN(Float.parseFloat(firmsInQuarterRange.get(i).get(j).Tobins_Q)))
																										{
																										}	else {
																											firmsWithSIC.add(firmsInQuarterRange.get(i).get(j));
																										}
																									}
																								}
																							}
																						}
																						return firmsWithSIC;
																					},
	// Take average on both sides of 3 element interval to return an arraylist
	// of floats, the 'before midpoint average' and 'after midpoint average'	
		makeinterval:													function(list) //ArrayList<Firm>
																					{
																						var last = utils.qM2.get(utils.dM2.get((list.get(list.size()-1).datadate)));
																						var first = utils.qM2.get(utils.dM2.get((list.get(0).datadate)));
																						var mid = (first+last)/2;
																						var x = [];
																						x.push(first);
																						x.push(mid);
																						x.push(last);
																						return x;
																					},
	// Given an array list of floats, form a concatenated string and return it
		getStringFromList:										function(list) //ArrayList<Float>
																					{
																						var t = "";
																						for(var i = 0; i < list.length; i++)
																						{
																							if(Float.isNaN(list.get(i)))
																							{
																								//t += "";
																							}
																							else
																							{
																								t+=parseFloat(list.get(i))+",";
																							}
																						}
																						return t;
																					},
	// Perform query
		evaluateFirmSicQuery:									function(vals, file1, file2, file3, file4, period) //(ArrayList<boundedValue>, str,str,str,str,str)
																					{
																						var skip = false; var x = 0; var y = 0; var a = 0; var b = 0;
																						var tqFirm = [];//new ArrayList<Float>(); 
																						var profFirm = [];//new ArrayList<Float>();
																						var tqSIC = [];//new ArrayList<Float>();
																						var profSIC = [];//new ArrayList<Float>();
																						var arffLine = [];//new ArrayList<String>();
																						var all = "";
																						var txt = "";
																						for(var i = 0; i < vals.length;i++)
																						{
																							skip = false;
																							txt = "";
																							x = vals.get(i).quarterlyIntervalTQDifference;
																							y = vals.get(i).quarterlyIntervalProfDifference;
																							if(
																								(Float.isNaN(x) || Float.isNaN(y)) || 
																								((x==0.0) || (y==0.0)) )
																							{
																								skip = true;
																							}	else{}
																							//sic
																							a = (vals.get(i).afterAverageTQSIC - vals.get(i).beforeAverageTQSIC) / vals.get(i).quarterSpan;
																							b = (vals.get(i).afterAverageProfSIC - vals.get(i).beforeAverageProfSIC) / vals.get(i).quarterSpan;
																							if(
																								(Float.isNaN(a) || Float.isNaN(b)) || 
																								((a==0.0) || (b==0.0))  ||
																								(vals.get(i).quarterSpan == 0.0) )
																							{
																								skip = true;
																							}	else {
																								if(!skip)
																								{
																									txt = (vals.get(i).cusip + "," + x + "," + y + "," + a + "," + b + "," + period + "\r\n");
																									all += txt;
																								}
																							}
																						}		
																						return all;		
																					},
	// Find the average value for both sides of an interval
		findAverage:													function(list) //ArrayList<Firm>
																					{		
																						var beforeTQAvg = [];//new ArrayList<Float>();
																						var afterTQAvg = [];//new ArrayList<Float>();
																						var beforeProfAvg = [];//new ArrayList<Float>();
																						var afterProfAvg = [];//new ArrayList<Float>();
																						var interval = makeinterval(list);		 //int[]
																						var value = new boundedValue(); //boundedValue
																						value.start = interval[0];
																						value.mid = interval[1];
																						value.end = interval[2];
																						value.quarterSpan = (value.end - value.start);
																						for(var i = 0; i < list.length;i++)
																						{
																							if( (utils.qM2.get(utils.dM2.get((list.get(i).datadate))) >= value.start) &&
																									(utils.qM2.get(utils.dM2.get((list.get(i).datadate))) < value.mid))
																							{				
																								beforeTQAvg.push(Float.parseFloat(list.get(i).Tobins_Q));
																								beforeProfAvg.push(Float.parseFloat(list.get(i).Profitability));
																							}
																							else if( (utils.qM2.get(utils.dM2.get((list.get(i).datadate))) >= value.mid) &&
																											 (utils.qM2.get(utils.dM2.get(list.get(i).datadate)) <= value.end))
																							{				
																								afterTQAvg.push(Float.parseFloat(list.get(i).Tobins_Q));
																								afterProfAvg.push(Float.parseFloat(list.get(i).Profitability));
																							}
																						}
																						var resultTQ = [];//new float[3];
																						resultTQ.push(utils.averageN(beforeTQAvg));
																						resultTQ.push(utils.averageN(afterTQAvg));
																						// beforeAverage - afterAverage (interval)
																						resultTQ.push((resultTQ[1] - resultTQ[0]) / value.quarterSpan);
																						value.beforeAverageTQFirm = resultTQ[0];		
																						value.afterAverageTQFirm = resultTQ[1];		
																						value.quarterlyIntervalTQDifference = resultTQ[2];
																						var resultProf = [];//new float[3];
																						resultProf.push(utils.averageN(beforeProfAvg));
																						resultProf.push(utils.averageN(afterProfAvg));
																						// beforeAverage - afterAverage (interval)
																						resultProf.push((resultProf[1] - resultProf[0]) / value.quarterSpan);	
																						value.beforeAverageProfFirm = resultProf[0];		
																						value.afterAverageProfFirm = resultProf[1];		
																						value.quarterlyIntervalProfDifference = resultProf[2];
																						value.cusip = list.get(0).cusip;
																						value.sic = list.get(0).sic;
																						var beforeSIC = getFirmsInQuarterRangeWithSIC(value.start, value.mid, list.get(0).sic); //ArrayList<Firm>
																						var afterSIC = getFirmsInQuarterRangeWithSIC(value.mid, value.end, list.get(0).sic); //ArrayList<Firm>
																						value.beforeAverageTQSIC = utils.averageTQList(beforeSIC);
																						value.afterAverageTQSIC = utils.averageTQList(afterSIC);		
																						value.beforeAverageProfSIC = utils.averageProfList(beforeSIC);
																						value.afterAverageProfSIC = utils.averageProfList(afterSIC);			
																						return value;
																					},
	// Performs a routine over all cusips
		doRoutine:														function(eco)
																					{
																						var boundedFirmsObject = [];//new Object[6];
																						var bkTmp; //ArrayList<Firm>
																						var valueTQ; //boundedValue
																						var list1 = [];//new ArrayList<boundedValue>();
																						var list2 = [];//new ArrayList<boundedValue>();
																						var list3 = [];//new ArrayList<boundedValue>();
																						var cusips = econo.cusipList; //ArrayList<String>
																						for(var i = 0;i<cusips.length;i++)
																						{
																							list1.push(checkNaNForBV(list1, eco.BeforeTree.get(cusips.get(i)), cusips.get(i)));
																							list2.push(checkNaNForBV(list2,  eco.DuringTree.get(cusips.get(i)), cusips.get(i)));
																							list3.push(checkNaNForBV(list3,  eco.AfterTree.get(cusips.get(i)), cusips.get(i)));			
																						}
																						boundedFirmsObject.push(list1); // list 1 is vals[0] -> before
																						boundedFirmsObject.push(list2); // list 2 is vals[1] -> during
																						boundedFirmsObject.push(list3); // list 3 is vals[2] -> after
																						return boundedFirmsObject;
																					},	
	// Check not a number for a bounded value entry
		checkNaNForBV:												function(bList, tmp, cu) //(ArrayList<boundedValue>, ArrayList<Firm>, str)
																					{
																						var value = new boundedValue(); //boundedValue
																						if(tmp != null)
																						{			
																							value = new boundedValue();
																							value = findAverage(tmp);		
																							value.state = "before";
																							if(
																								!(
																									(Float.isNaN((value.afterAverageProfFirm))) &&
																									(Float.isNaN((value.beforeAverageProfFirm))) &&
																									(Float.isNaN((value.afterAverageTQFirm))) &&
																									(Float.isNaN((value.beforeAverageTQFirm)))
																								 )
																								)
																							{
																								return value;
																							}
																						}
																						return new boundedValue();
																					},
	// Sort of the main function
		writeQuarterlyIntervalDiff:						function(valList, outFile1, outFile2, outFile3, outFile4, outFile5, outFile6, outFile7, outFile8, outFile9, outFile10, outFile11, outFile12)
																					{
																						var vals = valList; //Object[] 
																						var boundedBeforeBKVals = vals[0];//((ArrayList<boundedValue>) vals[0]);
																						var boundedDuringBKVals = vals[1];//((ArrayList<boundedValue>) vals[1]);
																						var boundedAfterBKVals = vals[2];//((ArrayList<boundedValue>) vals[2]);		
																						var filePath = "OverallDataSet";
																						var categories = ["cusip", "firmTqIntervalDiff", "firmProfIntervalDiff", "sicTqIntervalDiff", "sicProfIntervalDiff", "TimeBlock"];		
																						var dataTypes  = ["STRING", "NUMERIC", "NUMERIC", "NUMERIC", "NUMERIC", "STRING"];
																						var types = [];
																						types.push(categories);
																						types.push(dataTypes);
																						utils.constructARFFFile(filePath, types);
																						utils.writeToARFFFile(evaluateFirmSicQuery(/*(ArrayList<boundedValue>)*/ vals[0], outFile1, outFile2, outFile3, outFile4, "BEFORE"), filePath);
																						utils.writeToARFFFile(evaluateFirmSicQuery(/*(ArrayList<boundedValue>)*/ vals[1], outFile5, outFile6, outFile7, outFile8, "DURING"), filePath);
																						utils.writeToARFFFile(evaluateFirmSicQuery(/*(ArrayList<boundedValue>)*/ vals[2], outFile9, outFile10, outFile11, outFile12, "AFTER"), filePath);
																					}
	};
};
