const { pathThatSvg } = require("path-that-svg");
const fs = require("fs");
const { parse } = require("svgson");
const { camelCase, upperFirst } = require("lodash");
const path = require("path");
const glob = require("glob");

const baseTargetPath = "packages/elements/src/icons/generated/";

const sourceFileBase = `import { IconDefinition } from "@fortawesome/fontawesome-svg-core";`;

generateIcons();

function generateIcons() {
  const files = glob.sync(`${__dirname}/icons/**/*.svg`);
  console.log(`Found ${files.length} SVG files.\n`);

  return;
  emptyDir(baseTargetPath);

  files.forEach(async (file) => {
    const basenameFile = path.basename(file, "svg");
    const svg = await readSvgFile(file);
    const iconDefinition = await createIconDefinition(svg, basenameFile);
    const iconCategoryFileName = getIconCategoryFileName(file);
    createIconCategoryFileIfNotExists(iconCategoryFileName);
    writeIconDefinitionToDisk(iconDefinition, iconCategoryFileName);
  });
}

async function readSvgFile(fullSvgFilePath) {
  const svgString = fs.readFileSync(fullSvgFilePath, "utf8");
  const basenameFile = path.basename(fullSvgFilePath, "svg");
  return await pathThatSvg(svgString);
}

function getIconCategoryFileName(fullFilePath) {
  const p = fullFilePath.split("scripts/icons/");
  const p2 = p[1].split("/");
  return upperFirst(camelCase(p2[0])) + ".ts";
}

async function createIconDefinition(svgString, basenameFile) {
  const hasFillNone = svgString.includes("fill:none");

  const svg = await parse(svgString, {
    transformNode: (node) => {
      if (hasFillNone && node.attributes["class"] === "st0") {
        node.attributes.d = "";
      }
      return node;
    },
  });

  const pathData = joinChildPaths(svg.children)
    .replace(/[\n\r\t]/g, "")
    .trim();

  const iconDefinition = {
    icon: [24, 24, [], "", pathData],
    iconName: "random",
    prefix: "fal",
  };

  return (
    "export const " +
    camelCase("stena " + basenameFile) +
    ": IconDefinition = " +
    JSON.stringify(iconDefinition) +
    ";"
  );
}

function writeIconDefinitionToDisk(iconDefinition, categoryFileName) {
  fs.appendFileSync(baseTargetPath + categoryFileName, iconDefinition + "\n");
}

function joinChildPaths(children) {
  return children.reduce((acc, child) => {
    if (child.name === "path" && child.attributes.d) {
      acc += " " + child.attributes.d;
    }
    if (child.children.length > 0) {
      acc += " " + joinChildPaths(child.children);
    }
    return acc;
  }, "");
}

function emptyDir(dirPath) {
  const dirContents = fs.readdirSync(dirPath);

  for (const fileOrDirPath of dirContents) {
    try {
      const fullPath = path.join(dirPath, fileOrDirPath);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (fs.readdirSync(fullPath).length) {
          emptyDir(fullPath);
        }
        fs.rmdirSync(fullPath);
      } else {
        fs.unlinkSync(fullPath);
      }
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  }
}

function createIconCategoryFileIfNotExists(categoryFileName) {
  if (!fs.existsSync(baseTargetPath + categoryFileName)) {
    fs.appendFileSync(
      baseTargetPath + categoryFileName,
      sourceFileBase + "\n\n"
    );
  }
}
