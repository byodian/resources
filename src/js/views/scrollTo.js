export const scrollHandler = function(offset) {
  return function(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(`${href}`).offsetTop;
    scroll({
      top: offsetTop - offset,
      behavior: 'smooth'
    })
  }
}