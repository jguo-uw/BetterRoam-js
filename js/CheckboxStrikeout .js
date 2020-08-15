function setCheckboxClass(checkbox) { 
    let span = checkbox.closest('.roam-block > span');
    if(checkbox.checked) { 
        span.classList.add("custom-strikethrough"); 
    } else { 
        span.classList.remove("custom-strikethrough"); 
    } 
}

function scanCheckboxes() { 
    document.querySelectorAll(".check-container input") 
    .forEach(setCheckboxClass);

};

console.log("Checkbox Strikeout"); 
setInterval(scanCheckboxes, 1000);