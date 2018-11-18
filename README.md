# pyroxene

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/thayamizu/pyroxene.svg?branch=master)](https://travis-ci.org/thayamizu/pyroxene)
[![Coverage Status](https://coveralls.io/repos/github/thayamizu/pyroxene/badge.svg?branch=master)](https://coveralls.io/github/thayamizu/pyroxene?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/add40fd823be6bea8f19/maintainability)](https://codeclimate.com/github/thayamizu/pyroxene/maintainability)

# Description

A Monad like type library for TypeScript.

# Usage

## Option

Represents a option value. A Option instance can create Some or None function.

```ts
import { Some, None } from "../src/Either";

//create some
const some = Some(10);

//isDefined
console.log(option.isDefined);

//isEmpty
console.log(option.isEmpty);

//getOrElse
console.log(option.getOrElse(0));

//fold
some.fold<void>(
  () => {
    //if option is empty then callback this func.
  },
  (v: number) => {
    //if option is defined then call this func.
  }
);

//map
some.map<string>((v: number) => {
  return v.toString();
});

//flatMap
some.flatMap<string>(v => {
  return Some(v.toString());
});
```

## Either

The Either type represents values with two possibilities. A value of type Either<T, U> is either Left or Right.
