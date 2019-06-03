//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const packagesPath = path.join(__dirname, "..", "..", "packages");

const getPackageFolderList = async () => {
  return new Promise((resolve, reject) => {
    const list = [];
    fs.readdir(packagesPath, function(err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach
      files.forEach(function(file) {
        const filePath = path.join(packagesPath, file);
        const isDir = fs.lstatSync(filePath).isDirectory();
        // Do whatever you want to do with the file
        if (isDir) {
          list.push(filePath);
        }
      });
      resolve(list);
    });
  });
};

const getPackageJsonList = async () => {
  const packageFolders = await getPackageFolderList();
  return packageFolders.map(folder => path.join(folder, "package.json"));
};

const getPackageJsons = async () => {
  return getPackageJsonList().then(list => {
    return list.map(require);
  });
};

module.exports = {
  getPackageFolderList,
  getPackageJsons,
  packagesPath
};
