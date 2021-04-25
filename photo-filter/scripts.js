// getting all inputs
const filters = document.querySelectorAll('.filters input');


// show new input data in outputs
function setOutput() {
    filters.forEach(f => f.nextElementSibling.value = f.value);
};

// get background img element and button next 
const image = document.querySelector('img');

// declare filters
// let blur;
// let invert;
// let sepia;
// let saturate;
// let hue;
// put new data of inputs to img
function getChanges() {
    const suffix = this.dataset.sizing;
    // document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
    image.style.setProperty(`--${this.name}`, this.value + suffix);
    setOutput();
    //    blur = this.name === 'blur' ? this.value : document.getElementsByName('blur')[0].nextElementSibling.value;       
    //    invert = this.name === 'invert' ? this.value : document.getElementsByName('invert')[0].nextElementSibling.value;;
    //    sepia = this.name === 'sepia' ? this.value : document.getElementsByName('sepia')[0].nextElementSibling.value;;
    //    saturate = this.name === 'saturate' ? this.value : document.getElementsByName('saturate')[0].nextElementSibling.value;
    //    hue = this.name === 'hue' ? this.value : document.getElementsByName('saturate')[0].nextElementSibling.value;  

};



filters.forEach(f => f.addEventListener('change', getChanges));
filters.forEach(f => f.addEventListener('mousemove', getChanges));

// reset filters value to initial
function resetFilters() {
    filters.forEach(f => {
        f.value = f.defaultValue;
        setOutput();
        // document.documentElement.style.removeProperty(`--${f.name}`);
        image.style.removeProperty(`--${f.name}`);
    });

}

// getting Reset button
const resetBtn = document.querySelector('.btn-reset');
resetBtn.onmousedown = resetFilters;


// getting all buttons and adding active class on click
const buttons = document.querySelectorAll('.btn');

// TODO to remove active class for button on initial state
// buttons.forEach(b => b.classList.remove('btn-active'));    

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        const current = document.getElementsByClassName(' btn-active');
        current[0].className = current[0].className.replace(' btn-active', "");
        this.className += ' btn-active';
    });
}

// get button next 
// const image = document.querySelector('img');
const nextBtn = document.querySelector('.btn-next');


// gate base and images
const hour = new Date().getHours();
const minutes = new Date().getMinutes();
let daypart;
if (hour >= 6 && (hour <= 11 && minutes <= 59)) {
    daypart = 'morning';
}
if (hour >= 12 && (hour <= 17 && minutes <= 59)) {
    daypart = 'day';
}
if (hour >= 18 && (hour <= 23 && minutes <= 59)) {
    daypart = 'evening';
}
if (hour >= 00 && (hour <= 5 && minutes <= 59)) {
    daypart = 'night';
}

const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daypart}/`;
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

// put image in canvas as per manual
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// const blur = getComputedStyle(document.documentElement).getPropertyValue('--blur');
// const invert = getComputedStyle(document.documentElement).getPropertyValue('--invert');
// const sepia = getComputedStyle(document.documentElement).getPropertyValue('--sepia');
// const saturate = getComputedStyle(document.documentElement).getPropertyValue('--saturate');
// const hue = getComputedStyle(document.documentElement).getPropertyValue('--hue');


function drawImage(src) {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    // img.crossOrigin = '*'; //to prevent CORB error for <image>. Should be BEFORE src apply

    img.src = src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        //   ctx.filter = `blur(${blur}) invert(${invert}) sepia(${sepia}) saturate(${saturate}) hue-rotate(${hue})`;      
        ctx.drawImage(img, 0, 0);
        image.src = src;
    };
};


function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];

    drawImage(imageSrc);
    i++;
    nextBtn.disabled = true;
    setTimeout(function () {
        nextBtn.disabled = false
    }, 1000);
};

nextBtn.addEventListener('click', getImage);

// upload file from PC
const fileInput = document.querySelector('input[type="file"]');


fileInput.addEventListener('change', (e) => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        image.src = reader.result;
    }
    reader.readAsDataURL(file);
});

// save image to PC
const saveButton = document.querySelector('.btn-save');

// function drawImage(src) {
//     const img = new Image();
//     img.setAttribute('crossOrigin', 'anonymous');
//     // img.crossOrigin = '*'; //to prevent CORB error for <image>. Should be BEFORE src apply

//     img.src = src;
//     img.onload = function () {
//         canvas.width = img.width;
//         canvas.height = img.height;

//         //   ctx.filter = `blur(${blur}) invert(${invert}) sepia(${sepia}) saturate(${saturate}) hue-rotate(${hue})`;      
//         ctx.drawImage(img, 0, 0);
//         image.src = src;
//     };
// };

function saveImg() {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = image.src;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        const blurCorr = img.naturalHeight / img.height;
        // const blur = getComputedStyle(image).getPropertyValue('--blur');
        const blur = document.getElementsByName('blur')[0].nextElementSibling.value;
        const invert = getComputedStyle(image).getPropertyValue('--invert');
        const sepia = getComputedStyle(image).getPropertyValue('--sepia');
        const saturate = getComputedStyle(image).getPropertyValue('--saturate');
        const hue = getComputedStyle(image).getPropertyValue('--hue');
        console.log('blur', blur);

        const ctx = canvas.getContext('2d');
        ctx.filter = `blur(${blur * blurCorr}px) invert(${invert}) sepia(${sepia}) saturate(${saturate}) hue-rotate(${hue})`;
        // ctx.filter = image.style;
        console.log('ctx on save', ctx.filter);


        ctx.drawImage(img, 0, 0);


        const link = document.createElement('a');
        link.setAttribute('download', 'newImg.png');
        link.href = image.src;
        link.href = canvas.toDataURL('image/jpeg');
        // Firefox requires the link to be in the body
        document.body.appendChild(link);

        // simulate click
        link.click();

        // we remove the link when done
        document.body.removeChild(link);
        link.delete;
    };
};

console.log(image.src);
saveButton.addEventListener('mousedown', (e) => {
    saveImg();
});



/* full screen */

const screenButton = document.querySelector('.fullscreen');

function toggleFullscreen() {
    let elem = document.querySelector('body');

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
        });
    } else {
        document.exitFullscreen();
    }
}

screenButton.addEventListener('click', () => toggleFullscreen());
screenButton.addEventListener('keyup', (e) => {
    if (e.keycode === 122) {
        e.preventDefault;
        toggleFullscreen();
    }
});