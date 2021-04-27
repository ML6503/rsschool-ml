
// When the user scrolls the page, execute myFunction
window.onscroll = () => fixedHeader();

// Get the header
var header = document.getElementById("zooHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header so it always has top as its scroll position. 
//Remove "sticky" when you leave the scroll position
function fixedHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } 
//   else {
//     header.classList.remove("sticky");
//   }
};

// When the user scrolls the page, execute myFunction
window.onscroll = () => fixedHeader();
