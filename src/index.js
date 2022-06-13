import anime from "animejs/lib/anime.es.js";
import './index.scss';

export default class ImgPreview {
  constructor(options) {
    this.options = Object.assign(this.defaultOptions, options);
    this.build();
  }

  get defaultOptions() {
    return { distanceFromCursor: { top: 10, left: 10 } };
  }

  get containerID() {
    return 'img_preview-container';
  }

  get containerLoadingClass() {
    return 'img_preview-container__loading';
  }

  build() {
    let node = document.createElement('div');
    node.setAttribute('id', this.containerID)
    node.append(document.createElement('img'));
    node.style.display = 'none';
    node.style.position = 'absolute';
    document.querySelector('body').append(node);
    this.container = document.querySelector(`#${this.containerID}`);
    this.img = this.container.querySelector('img');
  }

  run(elems) {
    let selectors = this.filterElements(elems);

    let self = this;
    function loadImage(e) {
      self.container.classList.remove(self.containerLoadingClass);
      self.img.style.display = '';
      self.onLoad(self.img);
      e.currentTarget.removeEventListener('load', this);
    }

    Array.prototype.forEach.call(selectors, (selector) => {
      selector.addEventListener('mousemove', (e) => {
        this.container.style.top = e.pageY + this.options.distanceFromCursor.top + 'px';
        this.container.style.left = e.pageX + this.options.distanceFromCursor.left + 'px';
      });

      selector.addEventListener('mouseover', (e) => {
        this.container.classList.add(this.containerLoadingClass);
        this.container.style.display = '';
        this.img.addEventListener('load', { handleEvent: loadImage });

        this.img.setAttribute('src', this.extractUrl(e.currentTarget));
        this.onShow(this.container, e.currentTarget);
      });

      selector.addEventListener('mouseout', (e) => {
        this.container.style.display = 'none';
        this.img.setAttribute('src','');
        this.img.style.display = 'none';
        this.onHide(e.currentTarget);
      });
    });
  }

  filterElements(elems) {
    let regexp = new RegExp('.(gif|jpe?g|png|bmp|gif\?\d+|jpe?g\?\d+|png\?\d+|bmp\?\d+)$', 'i');
    let arrayElems = [].map.call(elems, (elem) => { return elem; });
    let collection = arrayElems.filter((elem, index) => {
      let url = this.extractUrl(elem);
      return !! (url && url.match(regexp));
    });

    return collection;
  }

  extractUrl(elem) {
    let url = undefined;

    if (elem.tagName == 'A') {
      url = elem.getAttribute('data-image');
    } else if (elem.tagName == 'IMG') {
      url = elem.getAttribute('src');
    }

    return url;
  }

  onShow(container, target) {
    anime.remove(target);
    anime({
      targets: target,
      opacity: 0.4,
      duration: 400,
      easing: 'linear'
    });
    anime.remove(container.querySelector('img'));
    container.querySelector('img').style.opacity = 0;
  }

  onLoad(img) {
    anime.remove(img);
    anime({
      targets: img,
      opacity: 1,
      duration: 300,
      easing: 'linear'
    });
  }

  onHide(target) {
    anime.remove(target);
    anime({
      targets: target,
      opacity: 1,
      duration: 300,
      easing: 'linear'
    });
  }
}
