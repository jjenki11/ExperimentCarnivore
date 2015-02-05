// Economy.js

exports.Economy = function(utils)
{

	var filePath;
	
	var AllFirms; //List<Firm>
	var AllFirms2; //BTree<String,Firm>
  var utilities; //EconUtils

	var bankruptTree; //BTree<String,ArrayList<Firm>>
	var goingConcernTree; //BTree<String,ArrayList<Firm>>
	var bankTree; //BTree<String,ArrayList<Bankrupcy>>
	var firmTree; //BTree<String,ArrayList<Firm>>
	var BeforeTree; //BTree<String,ArrayList<Firm>>
	var DuringTree; //BTree<String,ArrayList<Firm>>
	var AfterTree; //BTree<String,ArrayList<Firm>>
	var sicTree; //BTree<String,ArrayList<Firm>>	
	var categoryTree; //BTree<String,ArrayList<Firm>>
	var quarterTree; //BTree<String,ArrayList<Firm>>
	
	var cusipList; //ArrayList<String>	
	var goingconcernCount = 0;
	var bankruptCount = 0;	
	var m; //Mapping
	var dM; //= function(){ return }; //BTree<String, Integer>
	var qM;// = function(){ return utils.getQuarterMap()}; //BTree<Integer, Integer>
	var utilities = utils;
	var socc;
	
	return {
	
		init:						function(path)
										{
											filePath = path;
											
											dM = utils.getDateMap();
											qM = utils.getQuarterMap();
											
											AllFirms = []; //ArrayList<Firm>()
											AllFirms2 = require('../tools/HashMap').HashMap(); //BTree<String,Firm>()
											firmTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											bankTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Bankrupcy>>()											
											bankruptTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											goingConcernTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											sicTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											categoryTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											quarterTree = require('../tools/HashMap').HashMap(); //BTree<Integer,ArrayList<Firm>>()
											BeforeTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											DuringTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											AfterTree = require('../tools/HashMap').HashMap(); //BTree<String,ArrayList<Firm>>()
											cusipList = [];
											return {
											
											  
											  dM:dM,
											  qM:qM,
											  filePath:filePath,
											  
											  AllFirms: AllFirms,
											  AllFirms2:AllFirms2,
											  firmTree:firmTree,
											  bankTree:bankTree,
											  bankruptTree:bankruptTree,
											  goingConcernTree:goingConcernTree,
											  sicTree:sicTree,
											  categoryTree:categoryTree,
											  quarterTree:quarterTree,
											  BeforeTree:BeforeTree,
											  DuringTree:DuringTree,
											  AfterTree:AfterTree,
											  
											  cusipList: cusipList,
											};
											
										},
    AllFirms:       [],
										
		doBankrupcy:		function(filename)
										{
											var tree = require('../tools/HashMap').HashMap(); //new BTree<String,ArrayList<Bankrupcy>>();
											var b; //Bankrupcy
											var text="";
											var v = []; //new String[26];		
											var values = [];
											var fileName = filename+"brd_data_set2b.txt";

										  var data = utilities.readFile(fileName);
										      try
											{
									          var array = data.toString().split('\n');
									          console.log(array, 'IN DOBANKRUPCY');
									          for(i in array) {
							                console.log(array[i]);
														  v = str.split(",");	 
														  b = require('../Bankrupcy').Bankrupcy().createNewBankrupcy(
	              								v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],/*Integer.parseInt*/(v[11]),
	              								/*Integer.parseInt*/(v[12]),v[13],v[14],v[15],v[16],v[17],v[18],/*Double.parseDouble*/(v[19]),
	              								v[20],/*Integer.parseInt*/(v[21]),v[22],/*Integer.parseInt*/(v[23]),/*Integer.parseInt*/(v[24]),v[25]
	              							);
	              							if(dM.get(b.date363sale) == null) {
	              								b._363Index = 0;
	              							} else {
	              								b._363Index = dM.get(b.date363sale);
	              							}
	              							if(dM.get(b.dateConfirmed) == null) {
	              								b.confirmedIndex = 0;
	              							} else {
	              								b.confirmedIndex = dM.get(b.dateConfirmed);
	              							}
	              							if(dM.get(b.dateConvDismiss) == null) {
	              								b.convDismissedIndex = 0;
	              							} else {
	              								b.convDismissedIndex = dM.get(b.dateConvDismiss);
	              							}
	              							if(dM.get(b.dateEffective) == null) {
	              								b.effectiveIndex = 0;
	              							} else {
		              							b.effectiveIndex = dM.get(b.dateEffective);
		              						}
		              						if(dM.get(b.dateEmerging) == null) {
		              							b.emergingIndex = 0;
		              						} else {
		              							b.emergingIndex = dM.get(b.dateEmerging);
		              						}
		              						if(dM.get(b.dateFiled) == null) {
		              							b.filedIndex = 0;
		              						} else {
		              							b.filedIndex = dM.get(b.dateFiled);
		              						}
		              						if(dM.get(b.dateDisposed) == null) {
		              							b.disposedIndex = 0;
		              						} else {
		              							b.disposedIndex = dM.get(b.dateDisposed);
		              						}
		              						
		              						if(tree.get(b.cusip) != null){ //the cusip has a prior entry
	              								tree.get(b.cusip).push(b); // so add the new entry to the bk tree	            	
	              								bankruptCount++;
	              							} else { //we havent seen this cusip yet
	              								var l = [];// new ArrayList<Bankrupcy>(); //make a new list to insert with the cusip
	              								l.push(b);	  	//add the bk to the new list
	              								tree.put(b.cusip, l);	//put <cusip, ArrayList<Bankrupcy>> key,value pair into tree
	              								bankruptCount++;
	              							}
													  }
								          console.log("Reading bankrupcy data: done!");
								          
								          console.log('current econ state: ',tree);
								          
								          } catch(er) {
								            console.log('didnt emit: ',er);
								          }
								      return tree;
	           				},
									
 /**
	 * 
	 * 	createFirmTransitionObj returns a nested list structure
	 * 	
	 * 			1) list of all cusips in argument
	 * 			2) list of before during and after
	 * 			3) list of firm entries
	 * 
	 * @param cusips
	 * @return
	 */										
		createFirmTransitionObj: 	function(cusips) //ArrayList<String>
															{
																var beforeList = []; //new ArrayList<Firm>();
																var duringList = []; //new ArrayList<Firm>();
																var afterList  = []; //new ArrayList<Firm>();
																var firmTimeSeries = [];//new ArrayList<ArrayList<ArrayList<Firm>>>();
																var cusipTimeSeries; //ArrayList<ArrayList<Firm>>
																console.log("Creating firm transition object: ",cusips);
																for(var i = 0; i<cusips.length;i++)
																{
																	cusipTimeSeries = []; //new ArrayList<ArrayList<Firm>>();
																	beforeList = BeforeTree.get(cusips[i]);
																	duringList = DuringTree.get(cusips[i]);
																	afterList  = AfterTree.get(cusips[i]);
																	
																	utilities.printList(beforeList);
																	utilities.printList(duringList);
																	utilities.printList(afterList);		
																	
																	cusipTimeSeries.push(beforeList);
																	cusipTimeSeries.push(duringList);
																	cusipTimeSeries.push(afterList);
																	
																	firmTimeSeries.push(cusipTimeSeries);
																}
																return firmTimeSeries;
															},
															
		shareResults:							function()
															{	
																var before = categoryTree.get("BEFORE");
																var during = categoryTree.get("DURING");
																var after = categoryTree.get("AFTER");
														
																console.log("BEFORE BEING COMPARED");
																for(var i = 0;i<before.length;i++){
																	var tmp = compareSICandFirm(before.get(i));
																	console.log("difference in K: "+ tmp[0] + " difference in TQ: "+ tmp[1]);
																}
																console.log("DURING BEING COMPARED");
																for(var i = 0;i<during.length;i++){
																	var tmp = compareSICandFirm(during.get(i));
																	console.log("difference in K: "+ tmp[0] + " difference in TQ: "+ tmp[1]);
																}
																console.log("AFTER BEING COMPARED");
																for(var i = 0;i<after.length;i++){
																	var tmp = compareSICandFirm(after.get(i));
																	console.log("difference in K: "+ tmp[0] + " difference in TQ: "+ tmp[1]);
																}		
															},
		setBKTree:								function(bt) //BTree<String,ArrayList<Bankrupcy>>
															{
																bankTree = bt;
															},
		compareSICandFirm:				function(f) //Firm
															{
																var inSic = getFirmsInSIC(f.sic); //ArrayList<Firm>
																var qtr = utilities.getQuarterIndex(qM, dM.get(f.datadate));		
																var inQuarter = getFirmsInQuarter(inSic, qtr); //ArrayList<Firm>
																var avgK = utilities.averageK(inQuarter);		
																var avgQ = utilities.averageTQ(inQuarter);
																var result = [
																	(parseFloat(f.ppegtq) - avgK),
																	(parseFloat(f.Tobins_Q) - avgQ)
																];
																return result;
															},
		getFirmsInQuarter:				function(tree,quarter) //(ArrayList<Firm>, Integer)
															{
																var fInQuarter = []; //ArrayList<Firm>
																for(var i=0; i<tree.count();i++)
																{
																	if(quarter == utilities.getQuarterIndex(qM, dM.get(tree.get(i).datadate)))
																	{
																		fInQuarter.push(tree.get(i));
																	}
																}
																return fInQuarter;
															},
		getFirmsInSIC:						function(sic)
															{
																var fInSIC = []; //ArrayList<Firm>
																for(var i = 0;i < sicTree.get(sic).length; i++)
																{
																	fInSIC.push(sicTree.get(sic).get(i));
																}
																return fInSIC;
															}
	
	};
}
