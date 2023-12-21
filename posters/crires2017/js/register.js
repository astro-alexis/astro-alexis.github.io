/*  Cool Stars 19 registration client-side form handling and validation

*/

function validateForm() {
    // client-side validation of all required form fields
    var fields = ['FirstName', 'Surname', 'Affil', 'AddL1', 'City', 'Zip'];
    var err = 0;
    
    // validate ordinary text input fields
    var num_fields = fields.length;
    for (var i = 0; i < num_fields; i++) {
        if (!validateField(fields[i])) {
            err++;
        }
    }
    
    // validate email and confirmation fields
    if (!validateEmail('Email')) {
        err++;
    }
    if (!confirmEmail('EmailConfirm')) {
        err++;
    }
    
    // validate form based on number of detected errors
    if (err > 0) {
    	if (err == 1) {
    		var errWarn = err + " error was detected. \n\n Please fill in the required field or fix the error.";
    	} else {
    		var errWarn = err + " errors were detected. \n\n Please fill in all required fields or fix the errors.";
    	}
        alert(errWarn);
        err = 0;
        return false;
    } else {
        err = 0;
        return true;
    }
}

function checkResearchTags() {
    var tags = document.getElementsByName("research");
    var count = 0;
    
    if (precheck()) {
        count = undo();
    }
    
    for (var i = 0; i < tags.length; i++) {
        if (count == -1) {
            tags[i].disabled = true;
        } else if (count != 4 && tags[i].checked) {
            tags[i].disabled = false;
            count++;
            if (count == 4) {
                i = -1;
            }
        } else if (count == 4 && !tags[i].checked) {
            tags[i].disabled = true;
        } else {
            tags[i].disabled = false;
        }
    }
    
}

function isPositive(input) {
    var entry = document.getElementById(input);
    var field = document.getElementById(input + 'Error');
    
    if (parseInt(entry.value) < 0 || parseInt(entry.value) == Nan) {
        entry.value = 0;
    }
}

function validateField(input) {
    var re = /[A-Za-z -']/;
    var entry = document.getElementById(input);
    var field = document.getElementById(input + 'Error');
    if (entry.value == null || entry.value == "") {
        // flag as a required field
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = '#c8201e';
        entry.style.border = "3px solid #c8201e";
        return false;
    } else if (!re.test(entry.value)) {
    	// flag as invalid characters
    	field.innerHTML = "";
    	field.className = "fa fa-times";
    	field.style.fontSize = "27px";
    	field.style.color = '#c8201e';
    	entry.style.border = "3px solid #c8201e";
    	return false;
    } else {
        // mark as valid
        field.innerHTML = "";
        field.className = "fa fa-check";
        field.style.fontSize = "27px";
        field.style.color = "#4CBB17";
        entry.style.border = "3px solid rgba(0,0,0,0)";
        return true;
    }
}

function validateEmail(input){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById(input);
    var atpos = email.value.indexOf("@");
    var dotpos = email.value.lastIndexOf(".");
    var field = document.getElementById(input + 'Error');
    if (email.value == null || email.value == "") {
        // check if anything was entered
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = "#c8201e";
        email.style.border = '3px solid #c8201e';
        return false;
    } else if (!re.test(email.value)) {
        // confirm email is made up of correct characters
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = "#c8201e";
        email.style.border = '3px solid #c8201e';
        return false;
    } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 > email.value.length) {
        // confirm that email appears to have proper character setup
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = "#c8201e";
        email.style.border = '3px solid #c8201e';
        return false;
    } else {
        field.innerHTML = "";
        field.className = "fa fa-check";
        field.style.fontSize = "27px";
        field.style.color = "#4CBB17";
        email.style.border = "3px solid rgba(0,0,0,0)";
        return true;
    }
}

function confirmEmail(input){
    // check that original email is valid
    var field = document.getElementById(input + 'Error')
    var email2 = document.getElementById(input);
    if (!validateEmail('Email')) {
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = "#c8201e";
        email2.style.border = '3px solid #c8201e';
        return false;
    }
    if (email2.value != document.getElementById('Email').value) {
        // email addresses do not match -- invalidate
        field.innerHTML = "";
        field.className = "fa fa-times";
        field.style.fontSize = "27px";
        field.style.color = "#c8201e";
        email2.style.border = '3px solid #c8201e';
        return false;
    } else {
        // email addresses match -- validate
        field.innerHTML = "";
        field.className = "fa fa-check";
        field.style.fontSize = "27px";
        field.style.color = "#4CBB17";
        email2.style.border = "3px solid rgba(0,0,0,0)";
        return true;
    }
}

function allowGuests(input) {
	if (document.getElementById(input + '_NotAttending').checked) {
		document.getElementById(input + 'Guest_Yes').disabled = true;
		document.getElementById(input + 'GuestN').disabled = true;
		document.getElementById(input + 'GuestN').value = "";
		document.getElementById(input + 'Guest_No').disabled = true;
		document.getElementById(input + 'Guest_No').checked = true;
	} else {
		document.getElementById(input + 'Guest_No').disabled = false;
		document.getElementById(input + 'Guest_Yes').disabled = false;
	}
}

function guestToggle(input) {
	var Nguest = document.getElementById(input + 'N');
	
	if (document.getElementById(input + '_Yes').checked) {
		Nguest.disabled = false;
		Nguest.value = "0";
	} else {
		Nguest.value = "";
		Nguest.disabled = true;	
	}
}

// Bug: Student selecting 'Yes' does not enable radio button
function toggleStudent(input) {
    var nots = document.getElementById(input + "_No").checked;
    var stud = document.getElementById(input + "_Yes").checked;
    var fund = document.getElementsByName("studentFunding");
    var nation_yes = document.getElementById("nationCard_Yes");
    var nation_no = document.getElementById("nationCard_No");
    
    if (nots) {
        fund[0].checked = false;
        fund[1].checked = true;
        fund[0].disabled = true;
        fund[1].disabled = true;
        nation_yes.disabled = true;
        nation_yes.checked = false;
        nation_no.disabled = true;
        nation_no.checked = true;
    } else if (stud) {
        fund[0].checked = true;
        fund[1].checked = false;
        fund[0].disabled = false;
        fund[1].disabled = false;
        nation_yes.disabled = false;
        nation_yes.checked = true;
        nation_no.disabled = false;
        nation_no.checked = false;
    } else {
        fund[0].checked = false;
        fund[1].checked = true;
        fund[0].disabled = true;
        fund[1].disabled = true;
        nation_yes.disabled = true;
        nation_yes.checked = false;
        nation_no.disabled = true;
        nation_no.checked = true;
    }
    
}

function precheck() {
    var sname = document.getElementById("Surname").value;
    var fname = document.getElementById("FirstName").value;
    
    if ( (fname == "Andrea" || fname == "andrea") && (sname == "Dupree" || sname == "dupree") ) {
        return true;
    } else if ( (fname == "Jeff" || fname == "jeff") && (sname == "Linsky" || sname == "linsky") ) {
        return true;
    } else {
        return false;
    }
}

function showDiv() {
    var elem = document.getElementById('wtf');
    var visibility = elem.style.visibility;
    
    if (visibility == 'visible') {
        elem.style.visibility = 'hidden';
        if (elem.classList.contains('open')) {
            elem.classList.remove('open');
        }
    } else if (visibility == 'hidden') {
        elem.style.visibility = 'visible';
        elem.classList.add('open');
    } else {
        elem.style.visibility = 'hidden';
    }
}

function calcRegFee() {
    var date = new Date();
    var endEarly = new Date('03/15/2016');
    var endRegular = new Date('06/01/2016');
    var cost = 0;
    
    // base registration fee
    if (date <= endEarly) {
        cost = 400;
    } else if (date >= endEarly && date <= endRegular) {
        cost = 450;
    } else {
        cost = 600;
    }
    
    // opening reception guests
    
    // banquet guests
    
    elem = document.getElementsByClassName("totalCost");
    elem[0].innerHTML = cost;
}

function undo() {
    var spans = document.getElementsByClassName("tags");
    var arr = document.getElementsByName("research");
    var sname = document.getElementById("Surname").value;
    var fname = document.getElementById("FirstName").value;
    var inp = document.createElement("input");
    var lab = document.createElement("span");
    
    inp.type = "checkbox";
    inp.checked = true;
    inp.disabled = true;
    inp.className= "research";
    lab.className = "tags";
    lab.style.width = "360px";
    lab.style.marginLeft = "10px"; 
    lab.innerHTML = fname + ' ' + sname;
    
    spans[18].appendChild(inp);
    spans[18].appendChild(lab);
    spans[18].style.display = 'inline';
    
    for (var i = 0; i < arr.length; i++) {
        arr[i].checked = true;
        arr[i].disabled = true;
    }
    return -1;
}