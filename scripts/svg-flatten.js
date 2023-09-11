const { pathThatSvg } = require("path-that-svg");
const fs = require("fs");
const { parse } = require("svgson");
const { camelCase } = require("lodash");
const path = require("path");
const glob = require("glob");

const files = glob.sync(`${__dirname}/assets/**/*.svg`);
process.stderr.write(`found ${files.length} files\n`);

console.log(
  `import { IconDefinition } from "@fortawesome/fontawesome-svg-core";`
);

files.forEach(async (file) => {
  const svgString = fs.readFileSync(file, "utf8");
  const basenameFile = path.basename(file, "svg");
  const modifiedSvgString = await pathThatSvg(svgString);

  const hasFillNone = modifiedSvgString.includes("fill:none");

  const svg = await parse(modifiedSvgString, {
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

  console.log(
    "export const " +
      camelCase("stena " + basenameFile) +
      ": IconDefinition = ",
    JSON.stringify(iconDefinition) + ";"
  );
});

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
