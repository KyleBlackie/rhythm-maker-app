const cont = document.querySelector('#grid');
let contHeight = cont.clientHeight;
let contWidth = cont.clientWidth;
let div;

// generate grid to be used for making rythms
function createRythmDivs(numBeats) {
    let totalBoxes = (numBeats+1) * 4; // 4 rows of n boxes
    let boxWidth = (contWidth / (numBeats+1) ) + 'px';
    let boxHeight = (contHeight / 4 ) + 'px';
    cont.setAttribute('style', `display: grid; grid-template-columns: repeat(${numBeats+1}, ${boxWidth}); grid-template-rows: repeat(${4}, ${boxHeight})`);
    
    
    for (let i = 0; i < totalBoxes; i++) {
        // create a div with id of i
        div = document.createElement('div');
        div.setAttribute('id', i);

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
            div.classList.add('box'); 
            div.addEventListener('click', function(e) {
                e.target.textContent = 'X';
            });
            // add event listener
        }
        cont.appendChild(div);
    }
}
