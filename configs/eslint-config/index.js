module.exports = {
  extends: ['./base.js', './web.js'].map(require.resolve),
};
