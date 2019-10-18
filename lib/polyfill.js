// from https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Polyfill

if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth) {
    const flattend = [];
    const flat = (array, depth) => {
      array.forEach((el) => {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1);
        } else {
          flattend.push(el);
        }
      });
    };

    flat(this, Math.floor(depth) || 1);
    return flattend;
  };
}
