/* global danceMonkey, loadKeyEvents, toastr, loadTypeAhead, displayHelp */
function addModuleToPage(tagId, script) {
addElementToPage(Object.assign(document.createElement('script'),{src:script}) , tagId, 'module')
}

function addCSSToPage(tagId, cssToAdd) {
addElementToPage(Object.assign(document.createElement('link'),{href:cssToAdd, rel: 'stylesheet'} ) , tagId, 'text/css')
}

const UserScriptServer =  'https://roam_plus.imfast.io/'

//load all custom files 
    addCSSToPage( 'mySplitCSS',             UserScriptServer + 'css/split_screen.css'     )
    addCSSToPage( 'myBetterCSS',            UserScriptServer + 'css/better_roam.css'      )
addModuleToPage( 'SortedAttrTable',       UserScriptServer + 'js/sortAttrTable.js'      )
addModuleToPage( 'PomoBell',              UserScriptServer + 'js/PomoBell.js'           )
