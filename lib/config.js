'use babel';

export default {
  imageFiles: {
    description: 'Path to directory and files. Separated by comma.',
    type: 'array',
    default: [],
    items: {
      type: 'string'
    }
  }
};
