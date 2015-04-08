var signInDialog = function()
{
  var _dc;
  var step1;
  var step2;
  var step3;
  var step4;

  function buildStep1(){       
    var uname = $('<div>Username: <input id="user_name" type="input" value=""/></div>');
    var pword = $('<div>Password : <input id="user_pass" type="input" value=""/></div>');
    var cancel= $('<input id="cancel" type="submit" value="Cancel"/>').button();
    var ok    = $('<input id="authme" type="submit" value="Login.."/>').button();
    var txt1 = "First Time?";
    var no = $('<input id="nah" type="submit" value="Nope."/>').button();
    var yes= $('<input id="yessir" type="submit" value="You dont remember me..."/>').button(); 
    var _sc = $('<div></div>');
    _sc.append([
      $('<div></div>').append([
        uname,$("\n"),pword
      ]),
      $('<div></div>').append([
        cancel,ok,$("\n")
      ]),
      $('<div></div>').append([
        txt1,
        no,
        yes
      ])
    ]);
    return _sc;
  };
  

  function buildStep2(){
    var txt2 = "Tell us a bit about yourself!";
    var name = $('<div></div>');
    name.append('First: <input id="first_name" type="input" value=""/>');
    name.append('Last: <input id="last_name" type="input" value=""/>');
    var bday = $('<div></div>');
    bday.append('Year: <input id="bday_yr" type="input" value=""/>');
    bday.append('Month: <input id="bday_mo" type="input" value=""/>');
    bday.append('Day: <input id="bday_dy" type="input" value=""/>');
    var gend = $('<div></div>');
    gend.append('Gender: <input id="gender" type="input" value=""/>');
    var email = $('<div></div>');
    email.append('CUA Email: <input id="email" type="input" value=""/>');
    var choose = $('<div></div>');
    var canc = $('<input id="cancel2" type="submit" value="Cancel"/>').button();
    var next3= $('<input id="next_3" type="submit" value="Next ->"/>').button();  
    
    var _sc = $('<div></div>');
    _sc.append([
      txt2,
      name,
      bday,
      gend,
      email,
      choose.append([
        canc,
        next3
      ])
    ]);
    return _sc;
  };
 
    
  function buildStep3(){
    
    var txt3 = "Please upload your images";

    var categories = ["Vehicle: ", "Animal: ", "Scenery: ", "Grandmother: "];
//    var file1 = $('<input type="file" id="file_dom" name="files[]" multiple onchange="startRead()"/>');
    var file1 = $("#file_dom");
    var choose = $('<div></div>');
    var canc = $('<input id="cancel3" type="submit" value="Cancel"/>').button();
    var next3= $('<input id="next_4" type="submit" value="Next ->"/>').button();  
    
    var _sc = $('<div></div>');
    _sc.append([
      txt3,
      $('<div></div>').append(file1),
      choose.append([
        canc,
        next3
      ])
    ]);
    return _sc;
  };
  
  function buildStep4(){
    
    var txt4 = "Please verify your data.";

    var categories = ["Vehicle: ", "Animal: ", "Scenery: ", "Grandmother: "];
//    var file1 = $('<input type="file" id="file_dom" name="files[]" multiple onchange="startRead()"/>');
    var file1 = $("#file_dom");
    var choose = $('<div></div>');
    var canc = $('<input id="cancel4" type="submit" value="Cancel"/>').button();
    var next3= $('<input id="finish_sid" type="submit" value="Next ->"/>').button();  
    
    var _sc = $('<div></div>');
    _sc.append([
      txt4,
      $('<div></div>').append("YES VERIFY ME!"),
      choose.append([
        canc,
        next3
      ])
    ]);
    return _sc;
  };
  
  return {
    init: function(selector, content){
      step1 = buildStep1();      
      step2 = buildStep2();
      step3 = buildStep3();
      step4 = buildStep4();
      step1.show();
      step2.hide();
      step3.hide();
      step4.hide();
      $(selector).append([step1,step2,step3,step4]);
      
      
      $("#nah").click(function(){
          alert("YOURE A NEWB.");
      }); 
      $("#yessir").click(function(){
          alert("YOURE A RETURNING GUEST.");
      }); 
      $("#cancel").click(function(){
          alert("you have opted out...");
           $(content).dialog('close');
      });
      $("#authme").click(function(){
        alert("Verify your information...");
        step1.hide();
        step2.show();
        step3.hide();
        step4.hide();
        
      });
      $("#cancel2").click(function(){
        alert("you have opted out...");
        step1.show();
        step2.hide();
        step3.hide();
        step4.hide();
      });
      $("#next_3").click(function(){
        step1.hide();
        step2.hide();
        step3.show();
        step4.hide();
      }); 
      $("#cancel3").click(function(){
        alert("you have opted out...");
        step1.hide();
        step2.show();
        step3.hide();
        step4.hide();
      });
      $("#next_4").click(function(){
        step1.hide();
        step2.hide();
        step3.hide();
        step4.show();
      });
            $("#cancel4").click(function(){
        alert("you have opted out...");
        step1.hide();
        step2.hide();
        step3.show();
        step4.hide();
      });
      $("#finish_sid").click(function(){        
        alert("Thanks, you're all set.");
        step1.hide();
        step2.hide();
        step3.hide();
        step4.hide();
        $(content).dialog('close');
      });
      
      
    },
  };  
  
  

};
