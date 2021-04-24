// getting all inputs
const filters = document.querySelectorAll('.filters input');

// put new data of inputs to img
function getChanges() {
    const suffix = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
    filters.forEach(f => f.nextElementSibling.value = f.value);
};

filters.forEach(f => f.addEventListener('change', getChanges));
filters.forEach(f => f.addEventListener('mousemove', getChanges));

// getting all outputs


// show new input data in outputs


