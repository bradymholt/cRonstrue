module.exports = function (source) {
  const options = this.getOptions();
  return options.process(this.resourcePath, source);
}