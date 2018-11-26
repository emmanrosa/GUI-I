/*
 Name:Emmanuel Rosario
 Email: Emmanuel_Rosario@student.uml.edu
 Affiliation: Student at UMass Lowell in course 91.61 GUI Programming I
 Date: November 22, 2018
 Assignment No.7
 Description:
 For this assignment we were task to create an interactive dynamically table based on parameters entered
 in an HTML form. It contains a form for user input, and a JavaScript program to calculate what
 the user inputs. This assignment was done using bootstrapa, css and jquery and javascript.
 sources: https://jqueryvalidation.org/validate/
 */
$(function () {
    $("#my-form").validate({
	//errorElement: "span",
	rules:{
            sth:{
		Required: true,
		number: true,
		min:0
            },
            enh:{
		Required: true,
		number: true,
        min:0
            },
            stv:{
		Required: true,
		number: true,
        min:0
            },
            env:{
		Required: true,
		number: true,
        min:0
            }
	},
	messages:{
            sh:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Starting Horizontal",
        min: "Minimum value must be greater than 0"
            },
            eh:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Endiing Horizontal",
        min: "Minimum value must be greater than 0"
            },
            sv:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Starting Vertical",
        min: "Minimum value must be greater than 0"
            },
            ev:{
		required: "ERROR: no number was entered.",
		number:"Must input number for Ending Vertical",
        min: "Minimum value must be greater than 0"
            }
	},
	submitHandler: function() {
            multfunction();
            console.log("The tablet");
            // return false;
	}
	
    });
});

function multfunction(){
    
    var sh1 = document.getElementById("sh").value; // Starting Horizontal
    sh1 = parseInt(sh1);
    var eh2 = document.getElementById("eh").value; // Ending Horizontal
    eh2 = parseInt(eh2);
    var sv3 = document.getElementById("sv").value; // Starting Vertical
    sv3 = parseInt(sv3);
    var ev4 = document.getElementById("ev").value; // Ending Vertical
    ev4 = parseInt(ev4);
    var ntable = document.getElementById("printtables");
    var result = '<tr>';
    var tablen = '<tr> <th> </th>';
    
    //Here I call the function checks to validate all the inputs
   // if (!checks(sh1, eh2, sv3, ev4)){
   //     return;
   //     }else {
            /*
                the fallow if statements check and swap if starting number is greater than
                the ending number for both the horizontal and vertical.
             */
            if(sh1 > eh2){
                var temp = sh1;
                sh1 = eh2;
                eh2 = temp;
            }
            //Number.parseInt(
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
     return false;
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
