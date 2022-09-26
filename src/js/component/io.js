const callback = (entries, io) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //   fetchImages();
    }
  });
};

const options = {
  rootMargin: '100px',
  //   treshold: 0.5,
};

let observer = new IntersectionObserver(callback, options);

const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
