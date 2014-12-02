/*
var ImageMap = function()
{

  function randomizeLocations(data)
  {  
    var numImages = data.length;
    
    
     
  };

  function init()
  {
  
  }
  return {
    init : init
  };

};
*/

var ImageMap = function()
{
    ArrayList <PVector> circles = new ArrayList <PVector> ();
    float diameter = 100;
     
    function setup() {
      size(1280, 720);
      colorMode(HSB, 360, 100, 100);
      noStroke();
      smooth();
    }
     
    function draw() {
      background(0);
      addCircle();
      for (int i=0; i<circles.size(); i++) {
        PVector p = circles.get(i);
        fill(i % 360, 100, 100);
        ellipse(p.x, p.y, p.z, p.z);
      }
      if (diameter < 0.1) {
        println("Done!");
        noLoop();
      }
    }
     
    function mousePressed() {
      removeCircle();
    }
     
    function mouseDragged() {
      removeCircle();
    }
     
    function addCircle() {
      PVector c = randomVector();
      int tries = 10000;
      while (overlap(c) && tries > 0) {
        c = randomVector();
        tries--;
      }
      if (!overlap(c)) {
        circles.add(c);
      } else {
        diameter *= 0.9;
        addCircle();
      }
    }
     
    function removeCircle() {
      for (int i=circles.size()-1; i>=0; i--) {
        PVector p = circles.get(i);
        if (dist(mouseX, mouseY, p.x, p.y) < p.z*0.5) {
          circles.remove(i);
        }
      }
    }
     
    var randomVector = function() {
      return new PVector(random(width), random(height), diameter);
    }
     
    var overlap = function(PVector c) {
      for (PVector p : circles) {
        if (dist(c.x, c.y, p.x, p.y) < (c.z + p.z)*0.5) {
          return true;
        }
      }
      return false;
    }
}
