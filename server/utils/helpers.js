const fs = require('fs');
const path = require('path');

const createFile = (filePath) => {
  const doesFileExist = () => {
    try {
      fs.accessSync(filePath, fs.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  };

  if (!doesFileExist()) {
    fs.writeFileSync(filePath, '[]', { flag: 'wx+' });
  }
};

const readFromFile = (filePath, cb) => {
  createFile(path.resolve(__dirname, filePath));
  fs.readFile(path.resolve(__dirname, filePath), 'utf8', cb);
};

const writeToFile = (filePath, data) => {
  fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
};

module.exports = {
  readFromFile,
  writeToFile,
};
