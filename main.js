const cont = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
var bpmSlider = document.getElementById('BPMRange');
var bpmDisplay = document.getElementById('BPMDisplay');
let beat = 0;
let interval;
let playInterval;
let contHeight = cont.clientHeight;
let contWidth = cont.clientWidth;
let div;

// get audio files
let hatsAudio = new Audio('/sounds/Hats.mp3');
let snareAudio = new Audio('/sounds/Snare.mp3');
let kickAudio = new Audio('/sounds/Kick.mp3');

let playBool = false;


// reset function
resetBtn.addEventListener('click', () => {
    // get all boxes so that we can reset them
    const boxes = document.querySelectorAll('.box');

    // loop through all boxes and reset their text content
    boxes.forEach((box) => {
        box.textContent = '';
    });
});

// play / pause event listener
playPauseBtn.addEventListener('click', () => {
    playBool = !playBool;
    // play beats function
    if(playBool) {
        // calculate the interval between beats using value on bpm slider input
        interval = (1/(bpmSlider.value/60))/4*1000;
        playInterval = setInterval(playBeats,interval); // 1/16th beats at 140bpm
    } else {
        clearInterval(playInterval);
    }
});

// check if the slider's value changes
bpmSlider.oninput = function() {
    // display BPM to user
    bpmDisplay.innerHTML = this.value;
    // calculate new interval time between each 1/16th beat
    interval = (1/(this.value/60))/4*1000;
    if (playBool) {
        //update current interval
        clearInterval(playInterval);
        playInterval = setInterval(playBeats,interval);
    }
}

// functions to play audio files
function playHats(volume) {
    var audio=hatsAudio.cloneNode();
    audio.volume=volume;
    audio.play();
}

function playSnare(volume) {
    var audio=snareAudio.cloneNode();
    audio.volume=volume;
    audio.play();
}

function playKick(volume) {
    var audio=kickAudio.cloneNode();
    audio.volume=volume;
    audio.play();
}


// generate grid to be used for making rythms
function createRythmDivs(numBeats) {
    let totalBoxes = (numBeats+1) * 4; // 4 rows of n boxes
    let boxWidth = (contWidth / (numBeats+1) ) + 'px';
    let boxHeight = (contHeight / 4 ) + 'px';
    cont.setAttribute('style', `display: grid; grid-template-columns: repeat(${numBeats+1}, ${boxWidth}); grid-template-rows: repeat(${4}, ${boxHeight})`);
    
    let boxId = 0;
    for (let i = 0; i < totalBoxes; i++) {
        // create a div with id of i
        div = document.createElement('div');
        //div.setAttribute('id', i);

        // check for first row of beat labels
        if(i < numBeats+1) {
            div.classList.add('label-top'); 

            // set text depending on label
            switch(i) {
                case 1:
                    div.textContent = '1';
                    break;
                case 2:
                case 6:
                case 10:
                case 14:
                    div.textContent = 'e';
                    break;
                case 3:
                case 7:
                case 11:
                case 15:            
                    div.textContent = '+';
                    break;
                case 4:
                case 8:
                case 12:
                case 16:                    
                    div.textContent = 'a';
                    break;
                case 5:
                    div.textContent = '2';
                    break;
                case 9:
                    div.textContent = '3';
                    break;
                case 13:
                    div.textContent = '4';
                    break;
                default:
                    break;
            }
        } else if(i % 17 == 0) {    // Check for left most column to label type of sounds
            div.classList.add('label-side'); 
            // set text depending on label
            switch(i) {
                case 17:
                    div.textContent = 'Hats';
                    break;
                case 34:
                    div.textContent = 'Snare';
                    break;
                case 51:
                    div.textContent = 'Kick';
                    break;
                default:
                    break;                
            }
        } else {
            // set div class and id
            div.classList.add('box'); 
            div.setAttribute('id', boxId);
            boxId++;
            //add event listener for when div is clicked to add/remove beats
            div.addEventListener('click', function(e) {
                
                // check if box should be selected or deselected
                if (e.target.textContent == 'X') {
                    e.target.textContent = '';
                } else {
                    e.target.textContent = 'X';
                }

                //playHats(1);
                //playSnare(1);
                //playKick(1);
                
            });
            // add event listener
        }
        cont.appendChild(div);
    }
}


function playBeats() {
    // get all boxes so we can know which beats to play
    const hats = document.getElementById(beat);
    const snare = document.getElementById(beat+16);
    const kick = document.getElementById(beat+32); 
    
    // play sound effect if hats is selected for given beat
    if(hats.textContent == 'X'){
        playHats(1);
    }
    
    // play sound effect if snare is selected for given beat
    if(snare.textContent == 'X'){
        playSnare(1);
    }
    
    // play sound effect if kick is selected for given beat
    if(kick.textContent == 'X'){
        playKick(1);
    }
    
    beat++;
    if(beat > 15) {
        beat = 0;
    }
}
