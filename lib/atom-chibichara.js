'use babel';

import AtomChibicharaView from './atom-chibichara-view';
import { CompositeDisposable } from 'atom';

export default {

  atomChibicharaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomChibicharaView = new AtomChibicharaView(state.atomChibicharaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomChibicharaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-chibichara:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomChibicharaView.destroy();
  },

  serialize() {
    return {
      atomChibicharaViewState: this.atomChibicharaView.serialize()
    };
  },

  toggle() {
    console.log('AtomChibichara was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
