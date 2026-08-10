import { animate, utils } from 'animejs';
import './index.scss';

const DEFAULT_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'];

export default class ImgPreview {
  constructor(options) {
    this.options = Object.assign(this.defaultOptions, options);
  }

  get defaultOptions() {
    return {
      containerID: 'img_preview-container',
      distanceFromCursor: { top: 10, left: 10 },
      extensions: DEFAULT_EXTENSIONS.slice()
    };
  }

  get containerID() {
    return this.options.containerID;
  }

  get containerClass() {
    return 'img_preview-container';
  }

  get containerLoadingClass() {
    return 'img_preview-container__loading';
  }

  init() {
    let node = document.createElement('div');
    node.setAttribute('id', this.containerID);
    node.classList.add(this.containerClass);
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
    let extensions = this.resolveExtensions();
    let arrayElems = [].map.call(elems, (elem) => { return elem; });
    let collection = arrayElems.filter((elem) => {
      let url = undefined;
      try {
        url = new URL(this.extractUrl(elem), window.location);
      } catch(e) {}
      return !! (url && this.isAllowedUrl(url, extensions));
    });

    return collection;
  }

  resolveExtensions() {
    if (this.options.extensions === null) {
      return null;
    }

    if (!Array.isArray(this.options.extensions)) {
      return DEFAULT_EXTENSIONS.slice();
    }

    return this.options.extensions
      .filter((extension) => typeof extension === 'string')
      .map((extension) => extension.trim().replace(/^\./, '').toLowerCase())
      .filter((extension) => extension.length > 0);
  }

  isAllowedUrl(url, extensions) {
    if (extensions === null) {
      return true;
    }

    let extension = this.extractExtension(url.pathname);
    return !! (extension && extensions.includes(extension));
  }

  extractExtension(pathname) {
    let matched = pathname.match(/\.([^./]+)$/);
    return matched ? matched[1].toLowerCase() : null;
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
    utils.remove(target);
    animate(target, {
      opacity: 0.4,
      duration: 400,
      ease: 'linear'
    });
    utils.remove(container.querySelector('img'));
    container.querySelector('img').style.opacity = 0;
  }

  onLoad(img) {
    utils.remove(img);
    animate(img, {
      opacity: 1,
      duration: 300,
      ease: 'linear'
    });
  }

  onHide(target) {
    utils.remove(target);
    animate(target, {
      opacity: 1,
      duration: 300,
      ease: 'linear'
    });
  }
}
