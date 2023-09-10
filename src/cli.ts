#!/usr/bin/env node
import * as fs from 'fs/promises';
import { srtToAss } from './index.js';

const runCLI = async () => {
	if (!process.argv[2]) {
		throw `srt-to-ass - Convert SRT to ASS file
		Usage: srt-to-ass myfile.srt
		Output goes to stdout
		`;
	}
	const txtFile = process.argv[2];
	if (!await fs.stat(txtFile)) throw `File ${txtFile} does not exist`;
	const txt = await fs.readFile(txtFile, 'utf8');
	return srtToAss(txt);
}

try {
	console.log(await runCLI())
} catch (error) {
	console.log(error)
}