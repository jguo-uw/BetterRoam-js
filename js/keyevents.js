/* global hotkeys,toggleDailyNotes, typeaheadDisplayTextArea,typeaheadDisplayOtherAreas, 
testingScript, TurndownService , turndownPage, setEmptyNodeValue , parseTextForDates, toastr */

//based on the libary https://wangchujiang.com/hotkeys/

var testingScript = 'https://roammonkey.glitch.me/dailynotespopup.js'


const displayHelp = (delayTime) => { 
    toastr.info(`
    <table>
    <tr><td>ALT+SHIFT+ H</td><td>&nbsp</td><td>Help             </td></tr>
    <tr><td>ALT+SHIFT+ D</td><td>&nbsp</td><td>Convert to Date  </td></tr>
    <tr><td>ALT+SHIFT+ /</td><td>&nbsp</td><td>Open side bar    </td></tr>
    <tr><td>ALT+SHIFT+ ,</td><td>&nbsp</td><td>Daily note popup </td></tr>
    <tr><td>ALT+SHIFT+ .</td><td>&nbsp</td><td>Lookup           </td></tr>
    <tr><td>ALT+SHIFT+ A</td><td>&nbsp</td><td>TODO #na         </td></tr>
    <tr><td>ALT+SHIFT+ W</td><td>&nbsp</td><td>TODO #weekend    </td></tr>
    <tr><td>ALT+SHIFT+ T</td><td>&nbsp</td><td>Strikeout text   </td></tr>
    <tr><td>ALT+ m      </td><td>&nbsp</td><td>Markdown (simple)</td></tr>
    <tr><td>&nbsp       </td><td>&nbsp</td><td>&nbsp            </td></tr>
    </table>
    `.trim(), 'RoamMonkey Help', { timeOut: delayTime} )

}


//CONFIGURE SHORTCUT KEYS for use in the application
const loadKeyEvents = () => {

// HELP notification
hotkeys('alt+shift+h', function(event, handler) {
    event.preventDefault()
    displayHelp(20000)
});

hotkeys('alt+shift+/', function(event, handler) {
    event.preventDefault()
    try {
        document.getElementsByClassName("bp3-icon-more")[0].click()
        document.getElementsByClassName("bp3-text-overflow-ellipsis bp3-fill")[0].click()      
    } catch(e) {console.log(e)}
});


// In a textarea  process text with natural language recognition. Using library from:
// https://github.com/wanasit/chrono
hotkeys('alt+shift+d', function(event, handler) {
    event.preventDefault()
    if (event.srcElement.localName == "textarea") {
    var processText = parseTextForDates( event.target.value )
    setEmptyNodeValue(document.getElementById(event.srcElement.id), processText )
    }
});


    //alt+.  - in a textarea will pull up the search box
hotkeys('alt+shift+,', function(event, handler) {
    event.preventDefault()
    toggleDailyNotes()      
    
});


//In a textarea will strike out text
hotkeys('alt+shift+t', function(event, handler) {
    event.preventDefault()
    if (event.srcElement.localName == 'textarea') {
    if (document.queryCommandSupported("insertText")) {
        if (window.getSelection().toString() == "") {
        setEmptyNodeValue(document.getElementById(event.srcElement.id), "~~" + event.srcElement.innerHTML + "~~")
        } else {
        document.execCommand(
            "insertText",
            false,
            "~~" + window.getSelection().toString() + "~~"
        )
        }
    }
    }
})


//RELOAD SCRIPT defined here
hotkeys('alt+q', function(event, handler) {
    event.preventDefault()
    $.getScript(testingScript)
    .done(function(script, textStatus) {
        console.log(textStatus)
    })
    .fail(function(jqxhr, settings, exception) {
        $('div.log').text('Triggered ajaxError handler.')
    })
})

//allow support for textarea editing
hotkeys.filter = function(event) {
    var tagName = (event.target || event.srcElement).tagName;
    hotkeys.setScope(
    /^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other'
    )
    return true;
}
}