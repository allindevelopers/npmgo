#!/usr/bin/env node

import process from "node:process";
import { log } from "node:console";
import open from "open";
import Fuse from "fuse.js";
import { getDestinations } from "./index.js";

let [, , pkg, go] = process.argv;

if (!pkg) {
	console.error("No package name provided");
	process.exit(1);
}

if (!go) {
	console.error("No destination provided");
	process.exit(1);
}

let destinations = getDestinations();
let fuse = new Fuse(destinations, { keys: ["title"] });
let first = fuse.search(go).at(0);

if (first) {
	let url = first.item.go(pkg);
	log(`Opening ${first.item.title} for ${pkg}`);
	log(url);
	open(url);
}
