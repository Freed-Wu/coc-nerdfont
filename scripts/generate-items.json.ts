#!/usr/bin/env ts-node
import fs from "fs";

import { icons } from "../nerdfix/src/icons.json";
import { substitutions } from "../nerdfix/src/substitutions.json";

function substitute(name: string): string {
  for (const substitution of substitutions) {
    let [type, inout] = substitution.split(":");
    let [input, output] = inout.split("/");
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
