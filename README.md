# pyroxene

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/thayamizu/pyroxene.svg?branch=master)](https://travis-ci.org/thayamizu/pyroxene)
[![Coverage Status](https://coveralls.io/repos/github/thayamizu/pyroxene/badge.svg?branch=master)](https://coveralls.io/github/thayamizu/pyroxene?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/add40fd823be6bea8f19/maintainability)](https://codeclimate.com/github/thayamizu/pyroxene/maintainability)

# Description

A Monad like type library for TypeScript.

# Usage

## Option

Represents a option value. An instance of Option object is either a Some or None object.

```ts
import { Some, None } from "../src/Option";

//create some
const some = Some(10);

//isDefined
console.log(some.isDefined);

//isEmpty
console.log(some.isEmpty);

//getOrElse
console.log(some.getOrElse(0));

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

The Either type represents values with two possibilities. A value of type Either<T, U> is either Left T type or Right U type.

```ts
import { Left, Right } from "../src/Either";

//create right
const either = Right(10);

//isLeft
console.log(either.isLeft());

//isRight
console.log(either.isRight());

//getOrElse
console.log(either.getOrElse(0));

//fold
either.fold<void>(
  () => {
    //if option is empty then callback this func.
  },
  (v: number) => {
    //if option is defined then call this func.
  }
);

//map
either.map<string>((v: number) => {
  return v.toString();
});

//flatMap
either.flatMap<string>(v => {
  return Some(v.toString());
});
```
