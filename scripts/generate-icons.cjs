const { pathThatSvg } = require("path-that-svg");
const fs = require("fs");
const { parse } = require("svgson");
const {
  camelCase,
  upperFirst,
  groupBy,
  startCase,
  orderBy,
} = require("lodash");
const svgpath = require("svgpath");
const path = require("path");
const glob = require("glob");
const prettier = require("prettier");

const baseTargetPath = "packages/elements/src/icons/generated/";

generateIcons();

async function generateIcons() {
  const files = glob.sync(`${__dirname}/icons/**/*.svg`);
  console.log(`Found ${files.length} SVG files.\n`);

  const allIconDefinitions = orderBy(
    await Promise.all(
      files.map(async (file) => {
        const iconCategoryFileName = getIconCategoryFileName(file);
        const basenameFile = path.basename(file, ".svg");
        const svg = await readSvgFile(file);
        const iconDefinition = await createIconDefinition(svg, basenameFile);
        return {
          basenameFile,
          iconCategoryFileName,
          iconDefinition,
        };
      }),
    ),
    (def) => def.iconDefinition,
  );

  const byGroup = groupBy(
    allIconDefinitions,
    (item) => item.iconCategoryFileName,
  );

  const allGroupFileNames = Object.keys(byGroup);

  fs.rmSync(baseTargetPath, { recursive: true });
  fs.mkdirSync(baseTargetPath);

  allGroupFileNames.forEach((categoryFileName) => {
    const iconFileNamesForGroup = byGroup[categoryFileName].map(
      (p) => p.basenameFile,
    );
    createIconCategoryFileIfNotExists(categoryFileName, iconFileNamesForGroup);
    const iconDefinitions = byGroup[categoryFileName].map(
      (p) => p.iconDefinition,
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
  const iconSize = basenameFile.endsWith("xl") ? "xl" : "medium";

  const iconDefinition = {
    icon: [dimensions.width, dimensions.height, [], "", pathData],
    iconName: "random",
    prefix: "fal",
    size: iconSize,
  };

  const definitionType = startCase(iconSize) + "Icon";

  return (
    "export const " +
    camelCase("stena " + basenameFile) +
    ": " +
    definitionType +
    " = " +
    JSON.stringify(iconDefinition) +
    ";"
  );
}

async function writeIconDefinitionsForCategoryToDisk(
  iconDefinitions,
  categoryFileName,
) {
  const fileContent = iconDefinitions.join("\n\n");

  fs.appendFileSync(
    baseTargetPath + categoryFileName,
    await prettier.format(fileContent, { parser: "typescript" }),
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

function createIconCategoryFileIfNotExists(
  categoryFileName,
  iconFileNamesForGroup,
) {
  const targetFileFullPath = baseTargetPath + categoryFileName;
  if (!fs.existsSync(targetFileFullPath)) {
    fs.appendFileSync(
      targetFileFullPath,
      createImportStatement(iconFileNamesForGroup) + "\n\n",
    );
  }
}

function createImportStatement(iconFileNamesForGroup) {
  let types = [];

  const numXlIcons = iconFileNamesForGroup.filter((n) =>
    n.endsWith("xl"),
  ).length;
  const numMediumIcons = iconFileNamesForGroup.length - numXlIcons;

  if (numXlIcons > 0) {
    types.push("XlIcon");
  }
  if (numMediumIcons > 0) {
    types.push("MediumIcon");
  }

  return `import { ${types.join(", ")} } from "../IconSizes";`;
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
