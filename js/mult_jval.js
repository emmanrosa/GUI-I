/*
 Name:Emmanuel Rosario
 Email: Emmanuel_Rosario@student.uml.edu
 Affiliation: Student at UMass Lowell in course 91.61 GUI Programming I
 Date: November 30, 2018
 Assignment No.8
 Description:
 For this assignment we were task to create an interactive dynamically table based on parameters entered
 in an HTML form. It contains a form for user input, and a JavaScript program to calculate what
 the user inputs. This assignment was done using bootstrapa, css and the jQuery Validation Plugin and javascript.
 sources: https://jqueryvalidation.org/validate/
 */

$(document).ready( function() {
    slider_bar();
    validate();
   auto_submit();
});

//Here I call the function checks to validate all the inputs
function auto_submit() {
    // If the form is valid
    if( $("form#my-form").valid() == true ) {
      // Then make it submit, which should update the tab in the process.
      $("form#my-form").submit();
    }
  }
function validate() {
    $('#my-form').validate({
	rules: {
            sh:{
		required: true,
		number: true,
        min:0,
        max:12
            },
            eh:{
		required: true,
		number: true,
		min:0,
        max:12
            },
            sv:{
		required: true,
		number: true,
		min:0,
        max:12
            },
            ev:{
		required: true,
		number: true,
		min:0,
        max:12
            }
	},
	messages:{
            sh:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Starting Horizontal",
        min: "Minimum value must be greater than 0",
        max:"Maximun value must be greater than 12"
            },
            eh:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Endiing Horizontal",
        min: "Minimum value must be greater than 0",
        max:"Maximun value must be greater than 12"
            },
            sv:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Starting Vertical",
        min: "Minimum value must be greater than 0",
        max:"Maximun value must be greater than 12"
            },
            ev:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Ending Vertical",
        min: "Minimum value must be greater than 0",
        max:"Maximun value must be greater than 12"
            }
	},
	
	submitHandler: function(e) {
           multfunction();
            //slider_bar();
            return false;
	},
	
	invalidHandler: function() {
	    $("#printtables").empty();
	}
	
    });
};
function slider_bar(){
    // Horizontal Start Slider
    //var j=jQuery.noConflict
    $("#slider_hs").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#sh").val(ui.value);
         // console.log("#hs");
        auto_submit();  
        }
      });
      $("#sh").change(function() {
        $("#slider_hs").slider("value", this.value);
       auto_submit();  
      });
    
      // Horizontal End Slider
      $("#slider_he").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#eh").val(ui.value);
         auto_submit();  
        }
      });
      $("#eh").change(function() {
        $("#slider_he").slider("value", this.value);
       auto_submit();  
      });
    
      // Vertical Start Slider
      $("#slider_vs").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#sv").val(ui.value);
         auto_submit();  
        }
      });
      $("#sv").change(function() {
        $("#slider_vs").slider("value", this.value);
         auto_submit();  
      });
    
      // Vertical End Slider
      $("#slider_ve").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#ev").val(ui.value);
          auto_submit();  
        }
      });
      $("#ev").change(function() {
        $("#slider_ve").slider("value", this.value);
         auto_submit();  
      });
}
var num_list = 1;
function add_table() {
    var tabCount = $("#tabs li").length + 1;
    console.log("Current tab count is: " + tabCount);
  
    if(tabCount > 12) {
      alert("Sorry, only 12 multiplication tables may be saved at the same time. Please delete one to save another table.");
      return false;
    }
  
    // This should initialize the jQuery UI tabs.
    $( "#tabs" ).tabs();
  
    var sh1 = $('#sh').val(); // Starting Horizontal
    sh1 = parseInt(sh1);
    var eh2 = $('#eh').val(); // Ending Horizontal
    eh2 = parseInt(eh2);
    var sv3 = $('#sv').val(); // Starting Vertical
    sv3 = parseInt(sv3);
    var ev4 = $('#ev').val(); // Ending Vertical 
    ev4 = parseInt(ev4);

    /*
      the fallow if statements check and swap if starting number is greater than
      the ending number for both the horizontal and vertical.
    */
    if(sh1 > eh2){
        var temp = sh1;
        sh1 = eh2;
        eh2 = temp;
    }
    if(sv3 > ev4){
        var temp_num = sv3;
                sv3 = ev4;
        ev4 = temp_num;
    }
  
    num_list++;   // Increment the number of the tab
  
    // Create the title bar
    var title = "<li class='tab'><a href='#tab-" + num_list + "'>" + sh1 +
                " to " + eh2 + " by " + sv3 + " to " + ev4 + "</a>" +
                "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
  
    // Add a new Title bar.
    $( "div#tabs ul" ).append( title );
  
    // Add the current multiplication table.
    $( "div#tabs" ).append('<div id=tab-' + num_list + '>'+'<table class="table table-bordered table-hover"' + $("#printtables").html() +'</table>'+ '</div>');
    console.log("Current tab count is: " + $("#printtables").html());
    $( "#tabs" ).tabs("refresh");
  
    $( "#tabs" ).tabs("option", "active", -1);
  
    /*
        Close icon: removing the tab on click
        https://jqueryui.com/tabs/#manipulation
    */
    $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
        var num_li = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + num_li).remove();
  
        // Refresh the tabs!
        try {
          $( "#tabs" ).tabs("refresh");
        }
        catch (e) {

        }
  
        /* Removes the tabs functionality completely. This will return the element back 
            to its pre-init state. This method does not accept any arguments.
            https://api.jqueryui.com/tabs/#method-destroy
         */
        if( $('div#tabs ul li.tab').length == 0) {
          try {
            $("#tabs").tabs("destroy");
          }
          catch (e) {
          }
  
          return false; 
        }
    });
  }
function multfunction(){
    var sh1 = $('#sh').val(); // Starting Horizontal
    sh1 = parseInt(sh1);
    var eh2 = $('#eh').val(); // Ending Horizontal
    eh2 = parseInt(eh2);
    var sv3 = $('#sv').val(); // Starting Vertical
    sv3 = parseInt(sv3);
    var ev4 = $('#ev').val(); // Ending Vertical
    ev4 = parseInt(ev4);
    
    var result = '<tr>';
    var tablen = '<tr> <th> </th>';
    
    /*
      the fallow if statements check and swap if starting number is greater than
      the ending number for both the horizontal and vertical.
             */
    if(sh1 > eh2){
        var temp = sh1;
        sh1 = eh2;
        eh2 = temp;
    }
    if(sv3 > ev4){
        var temp_num = sv3;
                sv3 = ev4;
        ev4 = temp_num;
    }
    for(var k=sh1; k<=eh2; k++){
        tablen += '<th> '+ k +'</th>';
    }
    tablen +='</tr>';
    for(var i=sv3; i<=ev4; i++){
        result += '<tr> <th>'+ i +'</th>'
        for(var j=sh1; j<=eh2; j++){
            result +='<td>' + (i*j) + '</td>';
        }
        result += '</tr>';
    }
    //console.log(result);
    var finaln = tablen + result;
    //ntable.innerHTML=finaln;
    $("#printtables").html(finaln);
    //    }
}
/*
  This function checks for if the inputs are numbers and the input field are not empty.
  I also, send back an alart and return boolean.
*/
/*
  function checks(num1, num2, num3, num4){
  
  if(isNaN(num1)){
  alert('Must input number for Starting Horizontal');
  return false;
    } else if(isNaN(num2)){
         alert('Must input number for Ending Horizontal');
        return false;
    } else if(isNaN(num3)){
         alert('Must input number for Starting Vertical');
        return false;
    } else if(isNaN(num4)){
         alert('Must input number for Ending Vertical');
        return false;
    } else if(num1===0 || num2===0 || num3===0 || num4===0){
        return true;
    } else if(num1==null || num1=="",num2==null || num2=="",num3==null || num3=="",num4==null || num4==""){
            alert('Please Fill All Required Field');
              return false;
    }else {
        return true;
    }
}
*/
