
var MathOps = function()
{
	
	
	return {

		// we expect data <- [#, #]
		vector2: function(data){
			return {x: data[0], y: data[1]};
		},
		// we expect data <- [[#, #], [#, #]]
		mat2: function(data){
			return { x: vector2(data[0]), y: vector2(data[1])};
		},
		// we expect data <- [#, #, #]
		vector3: function(data){
			return {x: data[0], y: data[1], z: data[2]};
		},
		// we expect data <- [[#, #, #], [#, #, #], [#, #]]
		mat3: function(data){
			return { x: vector3(data[0]), y: vector3(data[1]), z: vector3(data[2])};
		},
		vectorN: function(data){
			var vec = [];
			var str = "";
			for(var i = 0; i < data.length; i++){
				vec.push(data[i]);
			}
			return vec;
		},
		printVectorN: function(data){
			var str = "< ";
			for(var i = 0; i < data.length; i++){
				str += data[i] + " ";
			}
			str += " >";
			console.log("VECTOR: "+str);
			return str;
		},
		matN: function(data, m, n){
			var mat = [];
			var tmp = [];

			for(var i = 0; i < m; i++){
				for(var j = 0; j < n; j++){
					tmp.push(data[j]);
				}
				mat.push(tmp);
				tmp = [];
			}
			return mat;
		},
		mat4: function(data, m, n, o){
			//var mat = [];
			var tmp = [];
			var tmpRow = [];
			var tmpSlice = [];
			for(var i = 0; i < m; i++){
				for(var j = 0; j < n; j++){
					for(var k = 0; k < o; k++){
						tmp.push(vectorN(data[i][j][k]));
					}
					tmpRow.push(vectorN(tmp));
					tmp = [];
				}
				tmpSlice.push(vectorN((tmpRow)));
				tmpRow = [];
			}
			return tmpSlice;
		},
		printMatrix: function(data){
			var row = "";
			for(var i = 0; i < data.length; i++){
				this.printVectorN(data[i]);				
				row += '\n';
			}
			return row;
		},
		eye: function(data){
			var mat = [];
			var tmp = [];
			console.log("EYE("+data+")");
			for(var i=0; i<parseInt(data); i++){
				for(var j=0; j<parseInt(data); j++){
					if(i === j){
						tmp.push(1);	
					} else {
						tmp.push(0);
					}					
				}	
				mat.push(tmp);
				tmp = [];			
			}
			return mat;
		}, 

		averageVec: function(data){
			var res = 0.0;
			for(var i = 0; i<data.length; i++){
				res += data[i];
			}
			return parseFloat(res / data.length);
		},

		averageMat: function(data){
			var cols = 0;
			for(var i = 0; i<data.length; i++){
				cols = data[i].length;
				res += averageVect(data[i]);
			}
			return parseFloat(res / (cols * data.length));
		}
	};
};
