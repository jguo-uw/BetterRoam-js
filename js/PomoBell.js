
function pomoAddTag(pomodoro){
    let min = pomodoro.getAttribute('data-pom-minutes');
    if (min <= 24){
        pomodoro.setAttribute("status","run");
    } else if (min >=30){
        pomodoro.setAttribute("status","done");
        pomodoro.innerHTML ="🍅";
    } else {
        pomodoro.setAttribute("status","break");
    }
}

function SoundTrigger(pomodoro){
    const restURL = 'https://raw.githubusercontent.com/jguo-uw/BetterRoam-js/dev/audio/TimeToRest.mp3';
    const completeURL = 'https://raw.githubusercontent.com/jguo-uw/BetterRoam-js/dev/audio/YouDidIt.mp3';
    let sec = pomodoro.getAttribute('data-pom-seconds');
    let min = pomodoro.getAttribute('data-pom-minutes');
    if (sec==0 && min == 25) {
        new Audio(restURL).play();
        console.log('Time to rest');
        pomodoro.setAttribute("status","break");
    }
    if (sec == 0 && min ==30) {
        new Audio(completeURL).play();
        console.log('Mission completed!');
        pomodoro.setAttribute("status","done");
    }
}
document.body.children[0].querySelectorAll(".rm-pomodoro").forEach(pomoAddTag);
function scanPOMO() {      
    document.querySelectorAll(".rm-pomodoro[status='run'], .rm-pomodoro[status='break']")
        .forEach(SoundTrigger);
    document.body.children[0].querySelectorAll(".rm-pomodoro").forEach(pomoAddTag);
};
setInterval(scanPOMO, 1000);