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
@use '@masatomiyoshi/img-preview'
```

Build html as follows.
In case of \<a\> tags, image urls is set to data-image attributes.
In case of \<img\> tags, image urls is set to src attributes.
By default, image file extension must be gif, jpg, jpeg, png, bmp, or webp.

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
imgPreview.init();
let anchors = document.querySelectorAll('ul li a');
imgPreview.run(anchors);
let imgs = document.querySelectorAll('ul li img');
imgPreview.run(imgs);
```

## Options

- `containerID` (string)
  - default: `'img_preview-container'`
- `distanceFromCursor` ({ top: number, left: number })
  - default: `{ top: 10, left: 10 }`
- `extensions` (string[] | null)
  - default: `['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp']`
  - `string[]`: allowed extensions list (case-insensitive, with or without leading dot)
  - `null`: disable extension filtering

Use custom extensions:

```javascript
let imgPreview = new ImgPreview({
  extensions: ['svg', '.avif']
});
```

Disable extension filtering:

```javascript
let imgPreview = new ImgPreview({
  extensions: null
});
```

## License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
