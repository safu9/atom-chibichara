'use babel';

const fs = require('fs');
const path = require('path');

export default class AtomChibicharaView {

  constructor(file) {
    this.file = file;
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-chibichara');

    this.isHidden = false;
    this.setImage();
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  setImage() {
    if (!this.isHidden) {
      const image = this.fetchImage(this.file);
      if (image) {
        this.element.style.backgroundImage = `url("${image}")`;
        this.element.style.display = 'block';
      }
    } else {
      this.element.style.display = 'none';
    }
  }

  getContentType(ext) {
    ext = ext.slice(1).toLowerCase();

    if (ext === 'jpeg' || ext === 'jpg') {
      return 'image/jpeg';
    } else if (ext === 'png') {
      return 'image/png';
    } else if (ext === 'gif') {
      return 'image/gif';
    }
    return false;
  }

  fetchImage(filepath) {
    const contentType = this.getContentType(path.extname(filepath));
    if (!contentType) {
      return false;
    }

    const data = fs.readFileSync(filepath, 'base64');
    return `data:${contentType};base64,${data}`;
  }

  getElement() {
    return this.element;
  }

  setIsHidden(isHidden) {
    this.isHidden = isHidden;
    this.setImage();
  }
}
