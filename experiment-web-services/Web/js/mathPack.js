
var mathPack = function (){
	
	function variance(arr)
  {
    var len = 0;
    var sum=0;
    for(var i=0;i<arr.length;i++)
    {
      if (arr[i] == ""){}
      else if (isNaN(arr[i]))
      {
          alert(arr[i] + " is not number, Variance Calculation failed!");
          return 0;
      }
      else
      {
         len = len + 1;
         sum = sum + parseFloat(arr[i]); 
      }
    }
    var v = 0;
    if (len > 1)
    {
      var mean = sum / len;
      for(var i=0;i<arr.length;i++)
      {
        if (arr[i] == ""){}
        else
        {
          v = v + (arr[i] - mean) * (arr[i] - mean);              
        }        
      }      
      return v / len;
    }
    else
    {
      return 0;
    }    
  };
  
  function standardDeviation(V)
  {
    return Math.sqrt(variance(V));
  };
	
	function getRows(V)
	{
    function getRow(matrix, row){
      var row = [];
      for(var i=0; i<matrix[0].length;i++){
        row.push(matrix[row][i]);
      }
      return row;
    } 
	  return ret;
	};  
	
	function getColumns(V)
	{	
	  function getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column;
    };   
    
	  var rows = V.length;
	  var cols = V[0].length;
	  console.log('row length: ',rows,'column length: ',cols);	  
	  
	  var ret = [];	  
	  for(var i = 0; i < cols; i++)
	  {
	    ret.push(getCol(V, i));
	  }	      
	  return ret;
	}; 
	
	function withinRange(range, val)
	{	  
	  
	  console.log('upper range: ',range.upper, 'lower range: ',range.lower, 'value: ',val.toString());
	  if ((range.upper >= val) && (range.lower <= val))
	  {
	    console.log('within Range');
	  }
	  if ((range.upper < val))
	  {
	    console.log('above thresh');
	  }
	  if ((range.lower > val))
	  {
	    console.log('below thresh');
	  }
	  
	 return ((range.upper >= val) && (range.lower <= val));	  
	}
	
	function squareV(V)
	{
		var sq = [];
		for(var i = 0;i<V.length;i++)
		{
			sq.push(Math.pow(V[i], 2));
		}
		return sq;
	};
	function sum(V)
	{
		var sum = 0;
		for(var i = 0;i<V.length;i++)
		{
			sum += V[i];
		}
		return sum;	
	};
	function average(V)
	{		
		return ( sum(V) / V.length );
	};	
	function subtractVector(U, V)
	{
	  var diffs = [];
	  if(U.length != V.length)
	  {
	    console.log('Cannot perform subtraction on 2 vectors of different lengths');
	  }
	  else
	  {
	    for(var i = 0;i<V.length;i++)
		  {
		    //console.log('diff ',i,U[i],V[i]);
			  diffs.push(U[i] - V[i]);
		  }
		}
		return diffs;
	};
	
	return {
		squareV  : squareV,
		sum     : sum,
		average : average,
		variance: variance,
		standardDeviation: standardDeviation,
		getColumns : getColumns,
		getRows : getRows,
		withinRange: withinRange,
		subtractVector : subtractVector,
	};

};
