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
            key.classList.remove(activeClass);
        }
    });
    target.classList.add(activeClass);
    if (activeClass === PIANO_ACTIVE_CLASS) {
        target.classList.add(PIANO_ACTIVE_PSEUDO_CLASS);
    }

};

// play note sound
function playAudio(target) {
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

// we remove class 'piano-key-active' from inactive key on 'transitionend' event
function removeActiveKey(e) {

    if (e.propertyName !== 'transform') return;
    e.target.classList.remove(PIANO_ACTIVE_CLASS);
    e.target.classList.remove(PIANO_ACTIVE_PSEUDO_CLASS);
    isUp = false;
};

let isUp = false;
window.addEventListener('keydown', () => isUp = true );
if(isUp) {
    pianoKeys.forEach(key => key.addEventListener('transitionend', removeActiveKey));
}


// play note on mousedown + mousemove
let isPressed = false;
window.addEventListener('mousedown', () => isPressed = true);
piano.addEventListener('mousemove', e => {
    if (isPressed && e.which === 1) {
        playAudio(e.target);
    }
});

// stop play on mouseup
window.addEventListener('mouseup', e => {
    if (e.which === 1 && isPressed) {
        isPressed = false;
    }
});

// play notes from keyboard
window.addEventListener('keydown', e => {
    const repeat = e.repeat;

    const letter = e.code.slice(3);

    if (letter !== undefined && letter.length === 1) {
        const noteTarget = [...pianoKeys].filter(k => k.dataset.letter === letter)[0];

        if (!repeat) {
            playAudio(noteTarget);
        }
    }
});

/* changing notes to letters and active class of Notes / Letters buttons */

//on click buttons toggling active class and letters-notes
function toggleButton(e) {
    btnChange = e.target.classList.contains('btn-active') ? false : true;

    addActiveClass(e.target, BTN_ACTIVE_CLASS)
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

screenButton.addEventListener('click', () => toggleFullscreen())