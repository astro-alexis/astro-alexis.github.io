/* Handles formatting issues related to abstract submission */


function abstractPreview() {
    // format abstract input with MathJax and display in preview frame
    input = document.getElementById("abstract");
    frame = document.getElementById("preview");
    abtext = document.getElementById("abstractPreview");
    author = document.getElementById("authorPreview");
    coauth = document.getElementById("coauthorPreview");
    title = document.getElementById("titlePreview");
        
    // format abstract section
    frame.style.color = "black";
    frame.style.backgroundColor = "#eeeeee";
    frame.style.padding = "5px 10px 10px 10px";
    frame.style.borderRadius = "5px";
    frame.style.lineHeight = "120%";
      
    // format title
    title.style.fontWeight = "normal";
    title.innerHTML = document.getElementById("title").value;
      
    // create author list preview
    author.style.fontWeight = "bold";
    author.innerHTML = document.getElementById("firstauthor").value;
    
    // create co-author list
    coauth.innerHTML = document.getElementById("coauthors").value;
    
    // create abstract preview
    abtext.innerHTML = input.value;
    abtext.style.textAlign = "justify";
    
    // typeset mathematics with MathJax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"abstractPreview"]);
    
    // check fields to enable submission
    var err = 0;
    var fields = [abtext, author, title];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].innerHTML == "") {
            err++;
        }
    }
    if (err == 0) {
        document.getElementById("warning").style.visibility = "hidden";
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").style.backgroundColor = "#555555";
    } else {
        document.getElementById("warning").style.visibility = "visible";
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").style.backgroundColor = "#eeeeee";
    }
}

function abstractToggle() {
}

function abstractReset() {
    // reset abstract input 
    input = document.getElementById("abstract");
    output = document.getElementById("abstractPreview");
    
    // create preview section
    input.value = "";
    output.innerHTML = "";
    output.style.backgroundColor = "#eeeeee";
    output.style.padding = "0px";
    
    // typeset mathematics with MathJax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"abstractPreview"]);
    
}