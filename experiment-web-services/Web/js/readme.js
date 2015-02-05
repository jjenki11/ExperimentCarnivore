//readme

To use octave terminal, use some of the following examples.. Clear the input window before each command set

  // A - vector addition
X = 5;
Y = 10;
Z = X + Y;
disp(Z)
    
  // B - vector mult
X = [1,2,3,4,5];    
Y = [50,20,30,20,50];
Z = X .* Y;
disp(Z)
    
  // C - outer product/inner product
  
X = [5,2,1,2,5];
Y = [1,2,5,2,1];
Za = X .* Y';
Zb = X' .* Y;
disp(Za)
disp(Zb)
    
  // D - plot (w/ flot) for a single vector
  
plot [100,50,200,150,300,250,400,350]

  // E - plot (w/ flot) for two vectors (x, y)
plot [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,10,5,4,3,2,1] [1000,200,30,40,50,60,70,80,90,100,110,1200,1300,1400,15000,1600,1700,1800,190,200,100,50,40,30,200,1000]
