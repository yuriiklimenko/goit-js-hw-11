export function smoothScrollToBottom() {
  // -----------------------
  // отримуємо висоту першого div якого відмалювали
  //і кладемо його в змінну cardHeight
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  console.log(cardHeight * 2);
  // // ------------------------------
  // //Прокручуває документ плавно вниз відносно його
  // поточного місця на дві висоту нашої картинки до верху
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// ----------------------------------
