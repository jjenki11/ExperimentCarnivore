// Bankrupcy.js

exports.Bankrupcy = function()
{	

		var bankrupcyList = [];
		var XNameCorp = "";
		var CikBefore = "";
		var cusip = "";
		var date363sale = "";
		var dateConfirmed = "";
		var dateDisposed = "";
		var dateEffective = "";
		var dateEmerging = "";
		var dateFiled = "";
		daysTo363 = 0;
		var daysToRefile = 0;
		var emerge = "";
		var gvKeyBefore = "";
		var gvKeyEmerging = "";
		var nameEmerging = "";
		var refile = "";
		var sale363 = "";
		var salesCurrDollar = 0;
		var SIC = "";
		var chapter = 0;
		var confirmed = "";
		var daysIn = 0;
		var NumEmployedBefore = 0;
		var prepackaged = "";		
		var filedIndex = 0;
		var disposedIndex = 0;
		var _363Index = 0;
		var confirmedIndex = 0;
		var convDismissedIndex = 0;
		var effectiveIndex = 0;
		var emergingIndex = 0;
		var state = [false, false, false, false, false, false];

	return {		
	
		withinBankrupcyNow: 	function(datadate)
													{
														if( ( (datadate >= filedIndex) && (datadate <= disposedIndex)) || 
																 ((datadate >= filedIndex) && (disposedIndex == 0))     	 || 
																 ((datadate <= disposedIndex) && (filedIndex == 0 ))) 
														{
															return true;
														}
														return false;
													},
													
		BankrupcyBefore:			function(datadate, years) 
													{
														if (((filedIndex - datadate) <= (years*365)) && 
																((filedIndex - datadate) >= 0 )) 
														{
															return true;
														}
														return false;
													},
													
		BankrupcyAfter:				function(datadate, years) 
													{
														if (((datadate - disposedIndex) >= 0) && 
																((datadate - disposedIndex) < (years*365))) 
														{
															return true;
														}
														return false;
													},
													
		withinBankrupcyEver:	function(datadate)
													{
														if ((filedIndex == 0)	|| 
																(disposedIndex == 0)) 
														{
															return true;
														}
														return false;
													},
													
		evaluateBK:						function(data)
													{
															/**
	 															* 
																* enumeration for returned boolean array
	 															* 
		 														* index		description
		 														*   0			  before bankruptcy filed
	 															*   1			  during bankruptcy
		 														*   2			  after bankruptcy disposed
	 															*  // 3			  ever in bankruptcy
	 															*   3			  never in bankruptcy
	 															* 
	 															* @param data
	 															* @return
	 														**/
														state[0] = BankrupcyBefore(data, 5); 							// if firm is in BK now
														state[1] = withinBankrupcyNow(data); 							// if firm is preceding BK
														state[2] = BankrupcyAfter(data,5); 								// if firm emerges out of BK
														//state[3] = (state[0] || state[1] || state[2]); 	// if firm is ever in BK		
														state[3] = !(state[0] || state[1] || state[2]);		// if firm was never in BK, GC
														return state;
													},
													
		addBKAFTERTolist:			function(bank) 
													{
														bankrupcyList.push(bank);
													},
													
		addBKBEFORETolist:		function(bank)
													{
														bankrupcyList.push(bank);
													},
		createNewBankrupcy:   function(name,cb,ce,cu,
																	 d3,dc,dcd,dd,
																	 de,dm,df,dt3,
																	 dtr,em,gb,ge,
																	 ne,re,s363,scd,
																	 sic,ch,cn,di,
																	 emp,pre)
													{
														XNameCorp=name;CikBefore=cb;CikEmerging=ce;cusip=cu;
														date363sale=d3;dateConfirmed=dc;dateConvDismiss=dcd;dateDisposed=dd;
														dateEffective=de;dateEmerging=dm;dateFiled=df;daysTo363=dt3;
														daysToRefile=dtr;emerge=em;gvKeyBefore=gb;gvKeyEmerging=ge;
														nameEmerging=ne;refile=re;sale363=s363;salesCurrDollar=scd;
														SIC=sic;chapter=ch;confirmed=cn;daysIn=di;
														NumEmployedBefore=emp;prepackaged=pre;		
														filedIndex=0;disposedIndex=0;_363Index=0;
														confirmedIndex=0;effectiveIndex=0;emergingIndex=0;
													}																	 		
	};	
}
	

