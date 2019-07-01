const {
  getPackageFolderList,
  packagesPath
} = require("./util/package-json-fetcher");
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const ts = require("typescript");

let success = true;

getPackageFolderList().then(packageFolders => {
  success = true;
  packageFolders.forEach(packageFolder => {
    const packagesPath = path.join(packageFolder, "package.json");
    const packageFolderNameParts = packageFolder.split(path.sep);
    const packageFolderName =
      packageFolderNameParts[packageFolderNameParts.length - 1];

    const packageJson = require(packagesPath);
    // options is optional
    glob(packageFolder + "/src/**/*.ts*", {}, function(er, files) {
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
      files.forEach(filePath => {
        checkSourceFilesImports(
          packageJson,
          packageFolder,
          packageFolderName,
          packageFolders,
          filePath
        );
      });
    });
  });
});

const checkSourceFilesImports = (
  packageJson,
  packageFolderPath,
  packageFolderName,
  allPackageFolders,
  filePath
) => {
  const source = fs.readFileSync(filePath).toString("utf8");
  const sc = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true
  );
  sc.statements.forEach(statement => {
    if (statement.importClause && statement.moduleSpecifier) {
      try {
        checkImport(
          filePath,
          packageJson,
          packageFolderPath,
          packageFolderName,
          allPackageFolders,
          statement.moduleSpecifier.text
        );
      } catch (e) {
        success = false;
        console.log(e.message);
      }
    }
  });
};

const checkImport = (
  filePath,
  packageJson,
  packageFolderPath,
  packageFolderName,
  allPackageFolder,
  imported
) => {
  const isStory = filePath.indexOf(".stories.") >= 0;
  const isTest = filePath.indexOf(".test.") >= 0;
  const isMdImport = imported.endsWith(".md");

  if (isStory) {
    if (imported.startsWith(".") && !isMdImport) {
      console.log(
        `ERROR: ${
          packageJson.name
        } import error: Story trying to import module relatively:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
  } else if (isTest) {
  } else {
    if (imported === packageJson.name) {
      console.log(
        `ERROR: ${
          packageJson.name
        } import error: Trying to import own module from node_modules:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
    if (imported.startsWith(".")) {
      checkIfImportGoesToPackagesFolder(filePath, packageJson, imported);
    }
  }
};

const checkIfImportGoesToPackagesFolder = (filePath, packageJson, imported) => {
  const fileFolderPath = path.dirname(filePath);
  const importedParts = imported.split(path.sep);

  let currentFolder = fileFolderPath;
  importedParts.forEach(part => {
    currentFolder = path.join(currentFolder, part);
    if (currentFolder === packagesPath) {
      console.log(
        `ERROR: ${
          packageJson.name
        } import error: Trying to import relatively from outside of own package:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
  });
};
