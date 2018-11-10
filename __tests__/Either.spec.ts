/// reference path="../node_modules/@types/jest/index.d.ts"
import {Left, Right} from "../src/Either"

test ("Left isLeft ", () =>{
    const either = Left<string, number>("error")
    expect(either.isLeft()).toBe(true)
})

test ("Left isRight", () => {
    const either = Left<string, number>("error")
    expect(either.isRight()).toBe(false)
})

test ("Left fold ", () => {
    const either = Left<string, number>("error")
    either.fold(
        (message) => {
            expect(message).toBe("error")
        },
        (data) => {
            expect(true).toBe(false)
        })
})

test ("Left flatMap ", () => {
    const either = Left<string, number>("error")
    const received = either.flatMap(
        (data) => Right(data + 1),
        )
    const expected = Left<string, number>("error")
    expect(received.isLeft()).toBe(true)
})

test ("Left map", () => {
    const either = Left<string, number>("error")
    const received = either.map(
        (data) => data + 1,
        )
    const expected = Left<string, number>("error")
    expect(received.isLeft()).toBe(true)
})

test ("Left getOrElse ", () => {
    const either = Left<string, number>("error")
    const received = either.getOrElse(0)
    const expected   = 0
    expect(received).toBe(expected)
})

test ("Right isLeft ", () => {
    const either = Right<string, number>(0)
    expect(either.isLeft()).toBe(false)
})

test ("Right isRight", () => {
    const either = Right<string, number>(0)
    expect(either.isRight()).toBe(true)
})

test ("Right fold ", () => {
    const either = Right<string, number>(0)
    either.fold(
        (message) => {
            expect(true).toBe(false)
        },
        (data) => {
            expect(data).toBe(0)
        })
})

test ("Right flatMap ", () => {
    const either = Right<string, number>(10)
    const received = either.flatMap(
        (data) => Right(data + 1),
        )

    expect(received.isRight()).toBe(true)
    expect(received.getOrElse(0)).toBe(11)
})

test ("Right map", () => {
    const either = Right<string, number>(10)
    const received = either.map(
        (data) => data + 1,
        )

    expect(received.isRight()).toBe(true)
    expect(received.getOrElse(0)).toBe(11)
})

test ("Right getOrElse ", () => {
    const either = Right<string, number>(10)
    const received = either.getOrElse(0)
    const expected   = 10
    expect(received).toBe(expected)
})
