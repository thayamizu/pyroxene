/// reference path="../node_modules/@types/jest/index.d.ts"
import { None, Option, Some } from "../src/Option";

test("create some", () => {
    const option = Some(10);
    expect(option).toEqual(Some(10));
});

test("create none", () => {
    const option = None();
    expect(option).toEqual(None());
});

test("some isDefined", () => {
    const option = Some(1);
    const recieved = option.isDefined;
    const expected = true;

    expect(recieved).toBe(expected);
});

test("some isEmpty", () => {
    const option = Some(1);
    const recieved = option.isEmpty;
    const expected = false;

    expect(recieved).toBe(expected);
});

test("some getOrElse", () => {
    const value = 10;
    const option = Some(value);
    const recieved = option.getOrElse(0);
    expect(recieved).toEqual(value);
});

test("some fold", () => {
    const value = 10;
    const option = Some(value);
    option.fold<void>(
        () => {
            expect(true).toBe(false); //
        },
        (v: number) => {
            expect(v).toBe(value);
        }
    );
});

test("some map", () => {
    const value = 10;
    const option = Some(value);
    const received = option.map<string>((v: number) => {
        return v.toString();
    });
    expect(received).toEqual(Some("10"));
    expect(received.getOrElse("not else")).toBe("10");
});

test("some flatMap", () => {
    const value = 10;
    const option = Some(value);
    const received = option.flatMap<string>(v => {
        return Some(v.toString());
    });

    expect(received).toEqual(Some("10"));
    expect(received.getOrElse("not else")).toBe("10");
});

test("none getOrElse", () => {
    const option = None();
    const recieved = option.getOrElse(0);
    expect(recieved).toEqual(0);
});

test("none fold", () => {
    const option = None();
    option.fold<void>(
        () => {
            expect(true).toBe(true); //
        },
        v => {
            expect(true).toBe(false); //
        }
    );
});

test("none map", () => {
    const option = None();
    const received = option.map<string>(v => {
        return v.toString();
    });
    expect(received).toEqual(None());
    expect(received.getOrElse("else")).toBe("else");
});

test("none flatMap", () => {
    const value = 10;
    const option = None();
    const received = option.flatMap<string>(v => {
        return Some(v.toString());
    });

    expect(received).toEqual(None());
    expect(received.getOrElse("else")).toBe("else");
});

test("none isDefined", () => {
    const option = None();
    const recieved = option.isDefined;
    const expected = false;

    expect(recieved).toBe(expected);
});

test("none isEmpty", () => {
    const option = None();
    const recieved = option.isEmpty;
    const expected = true;

    expect(recieved).toBe(expected);
});

const f = (value: number): Option<number> => {
    if (value >= 5) {
        return Some(value);
    } else {
        return None();
    }
};

test("usecase test1 none", () => {
    const option = f(1);
    expect(option).toEqual(None());
});

test("usecase test some", () => {
    const option = f(5);
    expect(option).toEqual(Some(5));
});
