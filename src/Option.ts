/**
 *
 *
 * @export
 * @abstract
 * @class Optional
 * @template T
 */
export abstract class Option<T> {
    protected _isEmpty: boolean = false;
    /**
     * isEmpty
     *
     * @readonly
     * @type {boolean}
     * @memberof Optional
     */
    public get isEmpty(): boolean {
        return this._isEmpty;
    }
    /**
     * isDefined
     *
     * @readonly
     * @type {boolean}
     * @memberof Optional
     */
    public get isDefined(): boolean {
        return !this.isEmpty;
    }

    /**
     * fold
     *
     * @abstract
     * @template X
     * @param {() => X} ifEmpty
     * @param {(value: T) => X} ifDefined
     * @returns {X}
     * @memberof Optional
     */
    public abstract fold<X>(ifEmpty: () => X, ifDefined: (value: T) => X): X;

    /**
     * getOrElse
     *
     * @abstract
     * @param {T} defaultValue
     * @returns {T}
     * @memberof Optional
     */
    public abstract getOrElse(defaultValue: T): T;

    /**
     * map
     *
     * @abstract
     * @template X
     * @param {(value: T) => Option<X>} f
     * @returns {Option<X>}
     * @memberof Optional
     */
    public abstract flatMap<X>(f: (value: T) => Option<X>): Option<X>;

    /**
     * flatMap
     *
     * @abstract
     * @template X
     * @param {(value: T) => X} f
     * @returns {Option<X>}
     * @memberof Optional
     */
    public abstract map<X>(f: (value: T) => X): Option<X>;
}

/**
 * Create a Some Object.
 *
 * @export
 * @template X
 * @param {X} value
 * @returns {Option<X>}
 */
export function Some<X>(value: X): Option<X> {
    return new SomeProj<X>(value);
}

/**
 * Create a None Object.
 *
 * @export
 * @template X
 * @returns {Option<X>}
 */
export function None<X>(): Option<X> {
    return new NoneProj<X>();
}

/**
 * Implements Optional
 *
 * @class OptionalImpl
 * @extends {Option<T>}
 * @template T
 */
class OptionalImpl<T> extends Option<T> {
    /**
     * Creates an instance of OptionalImpl.
     * @param {T} [value]
     * @memberof OptionalImpl
     */
    constructor(private value?: T) {
        super();
    }

    /**
     * fold
     *
     * @template X
     * @param {() => X} ifEmpty
     * @param {(value: T) => X} ifDefined
     * @returns {X}
     * @memberof OptionalImpl
     */
    public fold<X>(ifEmpty: () => X, ifDefined: (value: T) => X): X {
        return this.isEmpty ? ifEmpty() : ifDefined(this.value as T);
    }

    /**
     * getOrElse
     *
     * @param {T} defaultValue
     * @returns {T}
     * @memberof OptionalImpl
     */
    public getOrElse(defaultValue: T): T {
        return this.isEmpty ? defaultValue : (this.value as T);
    }

    /**
     * flatMap
     *
     * @template X
     * @param {(value: T) => Option<X>} f
     * @returns {Option<X>}
     * @memberof OptionalImpl
     */
    public flatMap<X>(f: (value: T) => Option<X>): Option<X> {
        return this.fold(
            () => {
                return (this as any) as Option<X>;
            },
            v => {
                return f(v);
            }
        );
    }

    /**
     * map
     *
     * @template X
     * @param {(value: T) => X} f
     * @returns {Option<X>}
     * @memberof OptionalImpl
     */
    public map<X>(f: (value: T) => X): Option<X> {
        return this.fold(
            () => {
                return (this as any) as Option<X>;
            },
            v => {
                return Some<X>(f(v));
            }
        );
    }
}

/**
 *
 * @class SomeProj
 * @extends {OptionalImpl<X>}
 * @template X
 */
class SomeProj<X> extends OptionalImpl<X> {
    protected _isEmpty = false;
    /**
     *
     */
    constructor(value: X) {
        super(value);
    }
}

/**
 *
 *
 * @class NoneProj
 * @extends {OptionalImpl<X>}
 * @template X
 */
class NoneProj<X> extends OptionalImpl<X> {
    protected _isEmpty = true;

    /**
     *
     */
    constructor() {
        super();
    }
}
