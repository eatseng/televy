var write = module.exports = function (string, type, res) {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': type
  });
  res.write(string);
  res.end();
};