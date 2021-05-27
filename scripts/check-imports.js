const {
  getPackageFolderList,
  packagesPath,
} = require("./util/package-json-fetcher");
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const ts = require("typescript");

let success = true;

getPackageFolderList().then((packageFolders) => {
  success = true;
  Promise.all(
    packageFolders.map((packageFolder) => {
      const packagesPath = path.join(packageFolder, "package.json");
      const packageFolderNameParts = packageFolder.split(path.sep);
      const packageFolderName =
        packageFolderNameParts[packageFolderNameParts.length - 1];

      const packageJson = require(packagesPath);
      // options is optional

      return new Promise((resolve) => {
        glob(packageFolder + "/src/**/*.ts*", {}, function (er, files) {
          // files is an array of filenames.
          // If the `nonull` option is set, and nothing
          // was found, then files is ["**/*.js"]
          // er is an error object or null.
          files.forEach((filePath) => {
            checkSourceFilesImports(
              packageJson,
              packageFolder,
              packageFolderName,
              packageFolders,
              filePath
            );
          });
          resolve();
        });
      });
    })
  ).then(() => {
    if (!success) {
      process.exit(1);
    }
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
  sc.statements.forEach((statement) => {
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
  const isStory =
    filePath.indexOf(".stories.") >= 0 || filePath.indexOf("/stories/") >= 0;
  const isTest = filePath.indexOf(".test.") >= 0;
  const isMdImport = imported.endsWith(".md");

  if (isStory) {
    if (imported.startsWith(packageJson.name)) {
      console.log(
        `ERROR: ${packageJson.name} import error: Story trying to import module from own package:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
    if (imported.startsWith(".")) {
      checkIfImportGoesToPackagesFolder(filePath, packageJson, imported);
    }
  } else if (isTest) {
  } else {
    if (imported === packageJson.name) {
      console.log(
        `ERROR: ${packageJson.name} import error: Trying to import own module from node_modules:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
    if (imported.startsWith(".")) {
      checkIfImportGoesToPackagesFolder(filePath, packageJson, imported);
    } else {
      checkIfImportIsPackageJsonDependency(filePath, packageJson, imported);
      checkIfImportIsModuleThatRequiresExplicitFileImport(
        filePath,
        packageJson,
        imported
      );
    }
  }
};

const checkIfImportGoesToPackagesFolder = (filePath, packageJson, imported) => {
  const fileFolderPath = path.dirname(filePath);
  const importedParts = imported.split(path.sep);

  let currentFolder = fileFolderPath;
  importedParts.forEach((part) => {
    currentFolder = path.join(currentFolder, part);
    if (currentFolder === packagesPath) {
      console.log(
        `ERROR: ${packageJson.name} import error: Trying to import relatively from outside of own package:`
      );
      console.log(filePath);
      console.log(`import from '${imported}'`);
      success = false;
    }
  });
};

const checkIfImportIsPackageJsonDependency = (
  filePath,
  packageJson,
  imported
) => {
  const parts = imported.split("/");
  const size = parts.length;
  for (let i = 0; i < size; i++) {
    const moduleNameToCheck = parts.join("/");
    if (
      (packageJson.dependencies &&
        packageJson.dependencies[moduleNameToCheck]) ||
      (packageJson.peerDependencies &&
        packageJson.peerDependencies[moduleNameToCheck])
    ) {
      return;
    }
    parts.pop();
  }

  if (packageJson.name === imported) {
    console.log(
      `ERROR: '${packageJson.name}' is importing from itself by package name.`
    );
  } else {
    console.log(
      `ERROR: '${packageJson.name}' must specify '${imported}' as dependency or peerDependency.`
    );
  }
  console.log(filePath);
  success = false;
};

const librariesThatRequireExplicitFileImport = []; // Ex "date-fns"

const checkIfImportIsModuleThatRequiresExplicitFileImport = (
  filePath,
  packageJson,
  imported
) => {
  librariesThatRequireExplicitFileImport.forEach((libName) => {
    if (imported.startsWith(libName)) {
      if (imported.indexOf("/") < 0) {
        console.log(
          `ERROR: Not allowed to import full '${libName}'. Must specify module file.`
        );
        console.log(filePath);
        success = false;
      }
    }
  });
};
