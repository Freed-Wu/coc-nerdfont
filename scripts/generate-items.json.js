#!/usr/bin/env node
const fs = require("fs");

const icons = require("../nerdfix/src/icons.json").icons;
const substitutions =
  require("../nerdfix/src/substitutions.json").substitutions;

function substitute(name) {
  for (const substitution of substitutions) {
    let [type, io] = substitution.split(":");
    let [input, output] = io.split("/");
    if (type === "exact" && input === name) return output;
    else if (type === "prefix")
      return name.replace(RegExp("^" + input), output);
  }
  return name;
}

let items = icons.map((e) => ({
  word: String.fromCharCode(Number("0x" + e.codepoint)),
  menu: e.name + (e.obsolete ? " -> " + substitute(e.name) : ""),
  filterText: e.name,
}));

fs.writeFileSync("src/items.json", JSON.stringify(items));
