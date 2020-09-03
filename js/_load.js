/* global danceMonkey, loadKeyEvents, toastr, loadTypeAhead, displayHelp */

const UserScriptServer =  'https://roam_plus.imfast.io/'

//load all custom files 
    addCSSToPage( 'myRMCSS',                UserScriptServer + 'css/styleRM.css'          )
    addCSSToPage( 'mySplitCSS',             UserScriptServer + 'css/split_screen.css'     )
    addCSSToPage( 'myBetterCSS',            UserScriptServer + 'css/better_roam.css'      )
addScriptToPage( 'mySortedAttrTable',       UserScriptServer + 'js/sortAttrTable.js'      )
addScriptToPage( 'myPomoBell',              UserScriptServer + 'js/PomoBell.js'           )
