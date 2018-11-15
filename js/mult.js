/*
 Name:Emmanuel Rosario
 Email: Emmanuel_Rosario@student.uml.edu
 Affiliation: Student at UMass Lowell in course 91.61 GUI Programming I
 Date: November 15, 2018
 Assignment No.6
 Description:
 On September 11,2018
 For this assignment we were task to create an interactive dynamically table based on parameters entered
 in an HTML form. It contains a form for user input, and a JavaScript program to calculate what
 the user inputs. This assignment was done using bootstrapa, css and javascript.
 We were also task to use the HTML5 and CSS validations service.
 */

function multfunction(){

    var sh1 = document.getElementById("sh").value; // Starting Horizontal
    var eh2 = document.getElementById("eh").value; // Ending Horizontal
    var sv3 = document.getElementById("sv").value; // Starting Vertical
    var ev4 = document.getElementById("ev").value; // Ending Vertical
    var ntable = document.getElementById("printtables");
    var result = '<tr>';
    var tablen = '<tr> <th> </th>';
    
    //Here I call the function checks to validate all the inputs
    if (!checks(sh1, eh2, sv3, ev4)){
        }else {
            /*
                the fallow if statements check and swap if starting number is greater than
                the ending number for both the horizontal and vertical.
             */
            if(sh1 > eh2){
                var temp = sh1;
                sh1 = eh2;
                eh2 = temp;
            } if(sv3 > ev4){
                var temp_n = sv3;
                sv3 = ev4;
                ev4 = temp_n;
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
    ntable.innerHTML=finaln;
       }
}
/*
    This function checks for if the inputs are numbers and the input field are not empty.
    I also, send back an alart and return boolean.
 */
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
    } else if(num1==null || num1=="",num2==null || num2=="",num3==null || num3=="",num4==null || num4==""){
            alert('Please Fill All Required Field');
              return false;
    }else {
        return true;
    }
}
