// -----------------------
// отримуємо висоту першого div якого відмалювали
//
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

// // ------------------------------
// //Прокручивает документ на указанные величины.
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
// ----------------------------------
