const { pathThatSvg } = require("path-that-svg");
const fs = require("fs");
const { parse } = require("svgson");
const { camelCase, upperFirst, groupBy } = require("lodash");
const path = require("path");
const glob = require("glob");
const prettier = require("prettier");

const baseTargetPath = "packages/elements/src/icons/generated/";

const sourceFileBase = `import { IconDefinition } from "@fortawesome/fontawesome-svg-core";`;

generateIcons();

async function generateIcons() {
  const files = glob.sync(`${__dirname}/icons/**/*.svg`);
  console.log(`Found ${files.length} SVG files.\n`);

  const allIconDefinitions = await Promise.all(
    files.map(async (file) => {
      const iconCategoryFileName = getIconCategoryFileName(file);
      const basenameFile = path.basename(file, "svg");
      const svg = await readSvgFile(file);
      const iconDefinition = await createIconDefinition(svg, basenameFile);
      return {
        iconCategoryFileName,
        iconDefinition,
      };
    })
  );

  const byGroup = groupBy(
    allIconDefinitions,
    (item) => item.iconCategoryFileName
  );

  const allGroupFileNames = Object.keys(byGroup);

  emptyDir(baseTargetPath);

  allGroupFileNames.forEach((categoryFileName) => {
    createIconCategoryFileIfNotExists(categoryFileName);
    const iconDefinitions = byGroup[categoryFileName].map(
      (p) => p.iconDefinition
    );
    writeIconDefinitionsForCategoryToDisk(iconDefinitions, categoryFileName);
  });
}

async function readSvgFile(fullSvgFilePath) {
  const svgString = fs.readFileSync(fullSvgFilePath, "utf8");
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

  const dimensions = getSvgDimensions(svg);

  const iconDefinition = {
    icon: [dimensions.width, dimensions.height, [], "", pathData],
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

function writeIconDefinitionsForCategoryToDisk(
  iconDefinitions,
  categoryFileName
) {
  const fileContent = iconDefinitions.join("\n\n");

  fs.appendFileSync(
    baseTargetPath + categoryFileName,
    prettier.format(fileContent, { parser: "typescript" })
  );
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

function getSvgDimensions(svg) {
  const viewBox = svg.attributes.viewBox; // "0 0 24 24"
  const parts = viewBox.split(" ");
  const width = parseInt(parts[2], 10);
  const height = parseInt(parts[3], 10);
  return {
    width,
    height,
  };
}
