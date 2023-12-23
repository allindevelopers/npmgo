#!/usr/bin/env node

import process from "node:process";
import { log } from "node:console";
import open from "open";
import Fuse from "fuse.js";

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

type Destination = {
	title: string;
	go: (pkg: string) => string;
};

function getDestinations(): Destination[] {
	return [
		{
			title: "Bundlephobia",
			go: (pkg) => `https://bundlephobia.com/result?p=${pkg}`,
		},
		{
			title: "Changelog",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} c`,
		},
		{
			title: "Repository Root",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} g`,
		},
		{
			title: "Homepage",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} h`,
		},
		{
			title: "Issues",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} i`,
		},
		{
			title: "NPM",
			go: (pkg) => `https://npmjs.com/package/${pkg}`,
		},
		{
			title: "Pull/Merge Requests",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} p`,
		},
		{
			title: "Releases",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} r`,
		},
		{
			title: "Source",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} s`,
		},
		{
			title: "Tags",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} t`,
		},
		{
			title: "Unpkg",
			go: (pkg) => `https://unpkg.com/browse/${pkg}/`,
		},
		{
			title: "Versions",
			go: (pkg) => `https://npmjs.com/package/${pkg}?activeTab=versions`,
		},
		{
			title: "Yarn",
			go: (pkg) => `https://yarnpkg.com/package/${pkg}`,
		},
		{
			title: "Code",
			go: (pkg) => `https://njt.vercel.app/jump?to=${pkg} .`,
		},
		{
			title: "Trends",
			go: (pkg) => `https://npmtrends.com/${pkg}`,
		},
		{
			title: "Graph",
			go: (pkg) => `https://npmgraph.js.org/?q=${pkg}`,
		},
		{
			title: "Snyk",
			go: (pkg) => `https://snyk.io/advisor/npm-package/${pkg}`,
		},
		{
			title: "Socket",
			go: (pkg) => `https://socket.dev/npm/package/${pkg}`,
		},
		{
			title: "Packagephobia",
			go: (pkg) => `https://packagephobia.com/result?p=${pkg}`,
		},
		{
			title: "Package Size",
			go: (pkg) => `https://pkg-size.dev/${pkg}`,
		},
		{
			title: "TypeScript Docs",
			go: (pkg) => `https://tsdocs.dev/search/docs/${pkg}`,
		},
	];
}
