const { pathThatSvg } = require("path-that-svg");
const fs = require("fs");
const { parse } = require("svgson");
const { camelCase, upperFirst, groupBy } = require("lodash");
const svgpath = require("svgpath");
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

  fs.rmSync(baseTargetPath, { recursive: true });
  fs.mkdirSync(baseTargetPath);

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
  const parentDir = path.basename(path.dirname(fullFilePath));
  return upperFirst(camelCase(parentDir)) + ".ts";
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
      let path = svgpath(child.attributes.d);
      if (child.attributes.transform) {
        path = path.transform(child.attributes.transform);
      }
      acc += " " + path.round(2).toString();
    }
    if (child.children.length > 0) {
      acc += " " + joinChildPaths(child.children);
    }
    return acc;
  }, "");
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
