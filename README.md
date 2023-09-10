# @almanime/srt-to-ass

This is a converter for SRT files to ASS, written in nodeJS.

WARNING : this is an ES Module.

## Installation

Run `npm install -g @almanime/srt-to-ass` to install as a global module (and get the CLI version)

Run `yarn add @almanime/srt-to-ass` to install as a module for your project.

## Usage

### Module

As a module here's the method to use it :

#### convertToASS(srt: string)

Returns a correctly formatted ASS file as a string. You need to provide the contents of the SRT file as the first parameter.

### CLI

The CLI version is used as follows :

```sh
srt-to-ass myfile.srt
```

It produces an ASS file on stdout.

## Build

If you wish to build from source, use `yarn build` to get standard JS in the `dist` folder.

## Test

You can test code with the `srt` file included in the test directory :

```sh
node dist/index.js test/srt.srt
```

## License

MIT
