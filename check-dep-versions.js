//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join(__dirname, "packages");

const getPackageJsonList = async () => {
  return new Promise((resolve, reject) => {
    const list = [];
    fs.readdir(directoryPath, function(err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach
      files.forEach(function(file) {
        const filePath = path.join(directoryPath, file);
        const isDir = fs.lstatSync(filePath).isDirectory();
        // Do whatever you want to do with the file
        if (isDir) {
          list.push(path.join(filePath, "package.json"));
        }
      });
      resolve(list);
    });
  });
};

const getPackageJsons = async () => {
  return getPackageJsonList().then(list => {
    return list.map(require);
  });
};

const getInvalidDepVersion = (packages, depsType) => {
  const errors = [];
  for (let i = 0; i < packages.length; i++) {
    for (let j = i + 1; j < packages.length; j++) {
      try {
        ensureDepsMatch(packages[i][depsType], packages[j][depsType]);
      } catch (e) {
        errors.push({
          depsType: depsType,
          dep: e.message,
          packageA: {
            name: packages[i].name,
            depVersion: packages[i][depsType][e.message]
          },
          packageB: {
            name: packages[j].name,
            depVersion: packages[j][depsType][e.message]
          }
        });
      }
    }
  }
  return errors;
};

const ensureDepsMatch = (deps1, deps2) => {
  if (!deps1 || !deps2) {
    return;
  }
  return (
    ensureKeysAreSameOrUndefined(deps1, deps2) &&
    ensureKeysAreSameOrUndefined(deps2, deps1)
  );
};

const ensureKeysAreSameOrUndefined = (obj, containsSame) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (containsSame[key] && containsSame[key] !== obj[key]) {
      throw new Error(key);
    }
  }
};

const getInvalidDevDeps = packages => {
  let success = true;
  packages.forEach(packageJson => {
    try {
      ensureDevDepsIncludesAllPeerDeps(packageJson);
    } catch (e) {
      console.error(packageJson.name + ": " + e.message);
      success = false;
    }
  });
  return success;
};

const ensureDevDepsIncludesAllPeerDeps = packageJson => {
  const peerDepKeys = Object.keys(packageJson.peerDependencies);
  for (let i = 0; i < peerDepKeys.length; i++) {
    const peerDepKey = peerDepKeys[i];
    const isWebUiDep = peerDepKey.startsWith("@stenajs-webui");
    if (!packageJson.devDependencies[peerDepKey]) {
      throw new Error("Missing devDependency: " + peerDepKey);
    }

    if (isWebUiDep) {
      if (packageJson.devDependencies[peerDepKey].startsWith("^")) {
        throw new Error("stenajs-webui devDependency must not start with ^");
      }
      if (packageJson.devDependencies[peerDepKey].startsWith(">")) {
        throw new Error("stenajs-webui devDependency must not start with >");
      }
    } else {
      if (!packageJson.devDependencies[peerDepKey].startsWith("^")) {
        throw new Error("devDependency does not start with ^");
      }
      if (!packageJson.peerDependencies[peerDepKey].startsWith(">=")) {
        throw new Error("peerDependency does not start with >=");
      }
    }

    const devVersion = reduceToVersion(packageJson.devDependencies[peerDepKey]);
    const peerVersion = reduceToVersion(
      packageJson.peerDependencies[peerDepKey]
    );

    if (devVersion !== peerVersion) {
      throw new Error(
        "devDependency mismatch: " +
          peerDepKey +
          " " +
          devVersion +
          " vs " +
          peerVersion
      );
    }
  }
};

const reduceToVersion = dep => {
  const chars = [];
  for (let i = 0; i < dep.length; i++) {
    const ch = dep[i];
    const parsed = parseInt(ch);
    if (ch === "." || (typeof parsed === "number" && !isNaN(parsed))) {
      chars.push(ch);
    }
  }
  return chars.join("");
};

getPackageJsons().then(packages => {
  let success = true;
  const errors = [
    ...getInvalidDepVersion(packages, "peerDependencies"),
    ...getInvalidDepVersion(packages, "dependencies"),
    ...getInvalidDepVersion(packages, "devDependencies")
  ];
  if (errors.length) {
    if (errors.length === 1) {
      console.log(`There is 1 dependency mismatch.`);
    } else {
      console.log(`There are ${errors.length} dependency mismatches.`);
    }

    errors.forEach(error => {
      console.log(
        `${error.depsType} ${error.dep} ${error.packageA.name} is @${
          error.packageA.depVersion
        } ${error.packageB.name} is @${error.packageB.depVersion}`
      );
    });
    success = false;
  }

  const invalidDevDeps = getInvalidDevDeps(packages);

  if (!invalidDevDeps) {
    success = false;
  }

  if (success) {
    console.log("Everything OK!");
  } else {
    process.exit(1);
  }
});
