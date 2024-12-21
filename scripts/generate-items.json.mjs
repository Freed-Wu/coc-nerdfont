#!/usr/bin/env node
import fs from "fs";

import icons from "../nerdfix/src/icons.json" assert { type: "json" };
import substitutions from "../nerdfix/src/substitutions.json" assert { type: "json" };

let _icons = icons.icons;
let _substitutions = substitutions.substitutions;

function substitute(name) {
  for (const substitution of _substitutions) {
    let [type, io] = substitution.split(":");
    let [input, output] = io.split("/");
    if (type === "exact" && input === name) return output;
    else if (type === "prefix")
      return name.replace(RegExp("^" + input), output);
  }
  return name;
}

let items = _icons.map((e) => ({
  word: String.fromCharCode(Number("0x" + e.codepoint)),
  menu: e.name + (e.obsolete ? " -> " + substitute(e.name) : ""),
  filterText: e.name,
}));

fs.writeFileSync("src/items.json", JSON.stringify(items));
