# ImgPreview

A javascript library used to enlarge images.

## Dependencies

- animejs

## Installation

Install from npm:

    $ npm install @masatomiyoshi/img-preview --save

## Usage

Import class:

```javascript
import ImgPreview from '@masatomiyoshi/img-preview'
```

Import css:
```css
@import '@masatomiyoshi/img-preview'
```

Build html as follows.
In case of \<a\> tags, image urls is set to data-image attributes.
In case of \<img\> tags, image urls is set to src attributes.
Image file extension must be gif, jpg, jpeg, png, bmp.

```html
<div>
  <ul>
    <li>
      <a href="/examples/images/sample.jpg" data-image="/examples/images/sample.jpg">
        <img src="/examples/images/sample.jpg" alt="JPEG image">
      </a>
    </li>
    <li>
      <img src="/examples/images/sample.jpg" alt="JPEG image">
    </li>
  </ul>
</div>
```

Build events to enlarge images:

```javascript
let imgPreview = new ImgPreview();
let anchors = document.querySelectorAll('ul li a');
imgPreview.run(anchors);
let imgs = document.querySelectorAll('ul li img');
imgPreview.run(imgs);
```

## License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
