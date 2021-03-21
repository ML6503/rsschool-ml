// we find piano keys for notes and their parent container piano
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

// we find buttons notes and letters and their parent container
const buttons = document.querySelectorAll('.btn');
const buttonsContainer = document.querySelector('.btn-container');

// we declare active classes constants
const PIANO_ACTIVE_CLASS = 'piano-key-active';
const PIANO_ACTIVE_PSEUDO_CLASS = 'piano-key-active-pseudo';
const BTN_ACTIVE_CLASS = 'btn-active';

// we declare the button that can change notes to letters 
let btnChange;

//we declare audio state for mouse or key when pressed as false
let isPressed = false;

// add active class to a note key or a button once clicked
function addActiveClass(target, activeClass) {
    const array = activeClass === PIANO_ACTIVE_CLASS ? pianoKeys : activeClass === BTN_ACTIVE_CLASS ? buttons : [];

    if (activeClass === BTN_ACTIVE_CLASS) {
        pianoKeys.forEach(k => {
            if (k.dataset.letter !== undefined && btnChange) {
                k.classList.toggle('piano-key-letter');
            }
        });
    }

    array.forEach(key => {
        if (key.classList.contains(activeClass)) {
            if (isDown && activeClass === PIANO_ACTIVE_CLASS) {
                console.log('we are changing activity class from mouse event');
                key.classList.remove(PIANO_ACTIVE_PSEUDO_CLASS);
                key.classList.remove(PIANO_ACTIVE_CLASS);
            }
            key.classList.remove(BTN_ACTIVE_CLASS);
        }
    });

    target.classList.add(activeClass);
    if (activeClass === PIANO_ACTIVE_CLASS) {
        target.classList.add(PIANO_ACTIVE_PSEUDO_CLASS);        
    }  

};

// play note sound
function playAudio(target) {
    // console.log('we are in play Audio and TARGET is ', target);
    const audio = new Audio();
    if (target.classList.contains('piano-key')) {
        addActiveClass(target, PIANO_ACTIVE_CLASS);
        const note = target.dataset.note;
        audio.src = `./assets/audio/${note}.mp3`;
        audio.currentTime = 0;
        audio.play();
    }
};

// play note on mouse click
piano.addEventListener('mousedown', e => playAudio(e.target));

// we remove class 'piano-key-active' from inactive key on mouseout
function removeActiveKey(e) {
    
    console.log('removeActiveKey ', e.target.classList);

    // if (e.propertyName !== 'transform') return;
    
    e.target.classList.remove(PIANO_ACTIVE_CLASS);
    e.target.classList.remove(PIANO_ACTIVE_PSEUDO_CLASS);
    // console.log('mouseup or keyup and is pressed', e.target.classList);
    e.preventDefault();
};

// we remove active note key css class from keyboard
function removeActiveNoteClass(key) {
    const letter = key.code.slice(3);
    pianoKeys.forEach(k => {
        if (letter !== undefined && k.dataset.letter === letter) {            
            k.classList.remove(PIANO_ACTIVE_CLASS);
            k.classList.remove(PIANO_ACTIVE_PSEUDO_CLASS);
        }
    });

};

// play note on mousedown + mouseover
let isDown;

window.addEventListener('mousedown', e => isDown = true);
window.addEventListener('mouseover', e => {
    if (isDown && e.which === 1) {
        playAudio(e.target);
    }
    e.preventDefault();
});
// remove active css class on mouseout
// window.addEventListener('mouseout', e => {
//     if (isDown && e.which === 1) {
//         pianoKeys.forEach(key => key.addEventListener('transitionend', removeActiveKey));

//     }
// })
// set isDown to false mouseup 
window.addEventListener('mouseup', e => {
    if (isDown && e.which === 1) {
        pianoKeys.forEach(key => key.addEventListener('transitionend', removeActiveKey));

    }
    isDown = false;
    e.preventDefault();
});

function callSoundFromKeyboard(e) {
    const repeat = e.repeat;
    isPressed = true;
    const letter = e.code.slice(3);

    if (letter !== undefined && letter.length === 1) {
        const noteTarget = [...pianoKeys].filter(k => k.dataset.letter === letter)[0];

        if (!repeat) {
            playAudio(noteTarget);
        }
    }
}

// play notes from keyboard
window.addEventListener('keydown', e => {
    callSoundFromKeyboard(e);
    e.preventDefault();
});


window.addEventListener('keyup', e => {
    isPressed = false;
    removeActiveNoteClass(e)
    e.preventDefault();
});

/* changing notes to letters and active class of Notes / Letters buttons */

//on click buttons toggling active class and letters-notes
function toggleButton(e) {
    btnChange = e.target.classList.contains('btn-active') ? false : true;

    addActiveClass(e.target, BTN_ACTIVE_CLASS)
    e.preventDefault();
};

buttonsContainer.addEventListener('click', e => toggleButton(e));

/* full screen */

const screenButton = document.querySelector('.fullscreen');

function toggleFullscreen() {
    let elem = document.querySelector('body');

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
};

screenButton.addEventListener('click', () => toggleFullscreen());