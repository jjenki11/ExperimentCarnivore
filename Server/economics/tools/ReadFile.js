// ReadFile.js

var fs = require('fs');

exports.ReadFile = function(path, utils)
{
	var text = "";
	var ECONOMY = null;
	
	var ut = utils;
	
  var getEconomy = function(){
	  return ECONOMY;
	};
   var setEconomy = function(ec){
    ECONOMY = ec;
  };
	
	return {

		init: 			function()
								{									
									try{
									  var E = require('../structures/Economy').Economy(ut);
									  console.log('did  it break here? line 25 of readfile');
								  E = E.init(ut.getFilePath());	
									console.log("First definition of file paths: ", ut.getFilePath(), E);
									var bankrupcies = ut.getFilePath()+"brd_data_set2b.txt";
									var bkCusipFile = ut.getFilePath()+"brd_cusips.txt";
									var filename = ut.getFilePath()+'crsp_quarterly_and_yearly_large.txt';
									var bkOutputFile = ut.getFilePath()+"bk_k_tq_qtr.txt";		
									var bkBeforeFile = ut.getFilePath()+"results/bk_before.txt";	
									var bkDuringFile = ut.getFilePath()+"results/bk_during.txt";
									var bkAfterFile = ut.getFilePath()+"results/bk_after.txt";
									var bkEverFile = ut.getFilePath()+"results/bk_ever.txt";
									var gcOutputFile = ut.getFilePath()+"results/gc_firms.txt";
									var outputFileArray = [bkBeforeFile, bkDuringFile, bkAfterFile, bkEverFile,	gcOutputFile];
									E =  ut.readCRSP(E, filename);		
                    console.log('made it to line 39 in readfile');
									  var bkList = ut.readList(bkCusipFile); //ArrayList<String>
									  E.cusipList = bkList;
								  	console.log("Reading bankrupcy data: done!");
								  	E = E.doBankrupcy(bankrupcies);
									
									
									  console.log("GC COUNT: "+E.goingconcernCount);
									  console.log("Bankrupt COUNT: "+E.bankruptCount);
									
									  var l; //ArrayList<Firm>
									  var gcCount = 0;
									  var f; //Firm
									  console.log(E.AllFirms.length);
									  var idx=0;
									  var bkCount = 0;
									  var bkUniqueSize = 0;
									  var bkFoundSize = 0;
									  var tgCount = 0;
									  var aqCount = 0;
									  var found = false;
									  var counter = [0,0,0,0];
									  while(idx<E.AllFirms.length)
									  {
										  f = require('../structures/Firm').Firm();
										  f = E.AllFirms[idx];
										  var perDone = (idx/E.AllFirms.length)*100;
										  var xx = [];
										  try 
										  {
											  xx = ut.writeIfFound(E, bkList, f, outputFileArray);
        								counter[0] += xx[0];
        								counter[1] += xx[1];
        								counter[2] += xx[2];
        								counter[3] += xx[3];
        								console.log(perDone+" %  |  BK(before) : "+counter[0]+
        																		"    |  BK(during): " +counter[1]+
        																		"    |  BK(after) : " +counter[2]+
        																		"    |  GC(always) :" +counter[3]+ 
        																		"  |  ");
        								idx++;
										  } 
										  catch (err) 
										  {
          							console.log('There was an error writing to the file in Readfile.');
          							console.log('Error description: ', err.message);
          							return ;
      								}

      							}
      							console.log("Done writing files!");			
      							this.setEconomy(E);
      							//ECONOMY = E;
      							return {
      							  E:E,
      							  getEconomy:getEconomy,
      							  setEconomy:setEconomy,
      							};
    							} catch(e) {
									  console.log("COULDNT READ LIST DUDE: ", e);
									 
									  
									}
									
    											
								},
		
		getText: 		function()
								{
									return text;
								},	
	};
};
