'use babel';

const fs = require('fs');
const path = require('path');

import { CompositeDisposable, TextEditor } from 'atom';
import AtomChibicharaView from './atom-chibichara-view';
import config from './config';
import './polyfill';

export default {

  config: config,
  subscriptions: null,
  views: {},
  rootElement: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-chibichara:toggle': () => this.toggle()
    }));

    const workspace = atom.workspace.getCenter();
    rootElement = workspace.paneContainer.element;
    rootElement.classList.add('atom-chibichara');

    const editors = workspace.getTextEditors();
    editors.forEach((editor) => this.addViewToTextEditor(editor));

    this.subscriptions.add(workspace.onDidAddTextEditor((event) => {
      this.addViewToTextEditor(event.textEditor);
    }));
    this.subscriptions.add(workspace.onWillDestroyPaneItem((event) => {
      if (event.item instanceof TextEditor) {
        this.removeViewFromTextEditor(event.item);
      }
    }));
  },

  deactivate() {
    this.subscriptions.dispose();

    Object.values(this.views).forEach((view) => {
      view.destroy();
    });
  },

  serialize() {
    return {};
  },

  toggle() {
    rootElement.classList.toggle('atom-chibichara_hidden');
  },

  getFiles() {
    const files = atom.config.get('atom-chibichara.imageFiles');

    return files.map((file) => {
      if (!fs.existsSync(file)) {
        return false;
      }

      if (fs.lstatSync(file).isFile()) {
        return file;
      } else {
        // withFileTypes option is not still supported.
        // return fs.readdirSync(file, {withFileTypes: true})
        //   .filter((dirent) => dirent.isFile())
        //   .map((dirent) => path.join(file, dirent.name));

        return fs.readdirSync(file)
          .map((name) => path.join(file, name))
          .filter((path) => fs.lstatSync(path).isFile());
      }
    }).filter((file) => file).flat();
  },

  addViewToTextEditor(editor) {
    if (this.views[editor.id]) {
      return;
    }

    const files = this.getFiles();
    if (!files.length) {
      return;
    }

    const fileNumber = Math.floor(Math.random() * files.length)

    const element = atom.views.getView(editor).children[0];
    const view = new AtomChibicharaView(files[fileNumber]);

    element.appendChild(view.getElement());
    this.views[editor.id] = view;
  },

  removeViewFromTextEditor(editor) {
    if (this.views[editor.id]) {
      this.views[editor.id].destroy();
      delete this.views[editor.id];
    }
  }
};
