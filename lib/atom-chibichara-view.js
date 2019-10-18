'use babel';

export default class AtomChibicharaView {

  constructor(file) {
    this.file = file;
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-chibichara-view');

    this.setImage();
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  setImage() {
    const image = pathToFileURL(this.file);
    this.element.style.backgroundImage = `url("${image}")`;
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

  getElement() {
    return this.element;
  }
}

// from https://github.com/sindresorhus/file-url
function pathToFileURL(filePath) {
	let pathName = filePath.replace(/\\/g, '/');

	// Windows drive letter must be prefixed with a slash
	if (pathName[0] !== '/') {
		pathName = `/${pathName}`;
	}

	// Escape required characters for path components
	return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
}
