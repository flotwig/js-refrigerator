# refrigerator

[![Gitlab pipeline status (self-hosted)][ci-badge]][ci]
[![npm bundle size][size-badge]][npm]
[![npm][npm-badge]][npm]

[`refrigerator`][npm] is a tool that can be used to make all property changes on an object throw an error.

It's like [`Object.freeze`][freeze], except it also blocks modifying all child objects, and will throw an error even when not in strict mode.

This can be useful when you want to validate that your JS code does not ever modify the arguments passed in to it.

## Installation

```shell
npm i --save refrigerator
```

## Usage

```js
const { refrigerate } = require('refrigerator')

const obj = {
  lisa: 'marge',
  homer: {
    bart: 'maggie'
  }
}

const frozen = refrigerate(obj)

frozen.lisa = 'apu' // throws an Error!
frozen.homer.bart = 'skinner' // throws an Error!
```

## Why make yet another object-freezing module?

Most existing packages will recursively walk your input object and [`Object.freeze`][freeze] it. [`Object.freeze`][freeze] only throws an error if [`use strict`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is set; otherwise, it will silently discard the new property value. This makes it hard to add to an existing [sloppy mode](https://developer.mozilla.org/en-US/docs/Glossary/Sloppy_mode) (non-strict) codebase.

Also, this package does NOT recursively walk your object; instead, it wraps the base layer with a `Proxy`, and wraps any object you access off of that layer with the same `Proxy`, and so on. This means that the performance of `refrigerator` is better than is possible with a recursive [`Object.freeze`][freeze].

[freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

[ci-badge]: https://img.shields.io/gitlab/pipeline/flotwig/js-refrigerator?gitlab_url=https%3A%2F%2Fci.chary.us
[ci]: https://ci.chary.us/flotwig/js-refrigerator/pipelines
[size-badge]: https://img.shields.io/bundlephobia/min/refrigerator
[npm-badge]: https://img.shields.io/npm/v/refrigerator
[npm]: https://www.npmjs.com/package/refrigerator
