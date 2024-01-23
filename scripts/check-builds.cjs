const path = require("path");
const fs = require("fs");
const { getPackageFolderList } = require("./util/package-json-fetcher.cjs");

getPackageFolderList().then(folderList => {
  const errors = [];
  folderList.forEach(folder => {
    const parts = folder.split("/");
    const packageName = parts[parts.length - 1];
    try {
      const filePath = path.join(folder, "dist", "index.d.ts");
      const isFile = fs.lstatSync(filePath).isFile();
      if (!isFile) {
        errors.push({
          packageName: `@stenajs-webui/${packageName}`,
          error: "invalid build, index.d.ts is not correctly built."
        });
      } else {
        console.log("OK! " + filePath);
      }
    } catch (e) {
      errors.push({
        packageName: `@stenajs-webui/${packageName}`,
        error: "invalid build, index.d.ts is not correctly built."
      });
    }
  });

  if (errors.length === 0) {
    console.log("OK! All builds are correct.");
  } else {
    errors.forEach(error => {
      console.log(`${error.packageName}: ${error.error}`);
    });
    process.exit(1);
  }
});
