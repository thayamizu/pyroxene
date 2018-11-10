/**
 * abstract Either class
 *
 * @export
 * @abstract
 * @class Either
 * @template T
 * @template U
 */
export abstract class Either<T, U> {
    protected _isLeft: boolean  = false

    /**
     *
     *
     * @abstract
     * @returns {boolean}
     * @memberof Either
     */
    public abstract isLeft(): boolean

    /**
     *
     *
     * @abstract
     * @returns {boolean}
     * @memberof Either
     */
    public abstract isRight(): boolean

    /**
     *
     *
     * @abstract
     * @template X
     * @param {(t: T) => X} failure
     * @param {(u: U) => X} success
     * @returns {X}
     * @memberof Either
     */
    public abstract fold<X>(failure: (t: T) => X, success: (u: U) => X): X

    /**
     *
     *
     * @abstract
     * @template X
     * @param {(value: U ) => Either<T, X>} f
     * @returns {Either<T, X>}
     * @memberof Either
     */
    public abstract flatMap<X>(f: (value: U ) => Either<T, X> ): Either<T, X>

    /**
     *
     *
     * @abstract
     * @template X
     * @param {(value: U ) => X} f
     * @returns {Either<T, X>}
     * @memberof Either
     */
    public abstract map<X>(f: (value: U ) => X): Either<T, X>

    /**
     *
     *
     * @abstract
     * @param {U} defaultValue
     * @returns {U}
     * @memberof Either
     */
    public abstract getOrElse(defaultValue: U): U
}

/**
 *
 *
 * @export
 * @template T
 * @template U
 * @param {T} value
 * @returns {Either<T, U>}
 */
export function Left<T, U>(value: T): Either<T, U> {
    return new LeftProj<T, U>(value);
}

/**
 *
 *
 * @export
 * @template T
 * @template U
 * @param {U} value
 * @returns {Either<T, U>}
 */
export function Right<T, U>(value: U): Either<T, U> {
    return new RightProj<T, U>(value);
}

class EitherImpl<T, U> extends Either<T, U> {
    /**
     * Creates an instance of EitherImpl.
     * @param {T} _left
     * @param {U} _right
     * @memberof Either
     */
    constructor(private value: T | U) {
        super();
    }

    /**
     * isLeft
     *
     * @returns {boolean}
     * @memberof EitherImpl
     */
    public isLeft(): boolean {
        return this._isLeft;
    }

    /**
     * isRight
     *
     * @returns {boolean}
     * @memberof EitherImpl
     */
    public isRight(): boolean {
        return !this.isLeft();
    }

    /**
     *
     *
     * @template X
     * @param {(t:T)=>X} failure
     * @param {(u:U)=>X} success
     * @returns
     * @memberof Either
     */
    public fold<X>(failure: (t: T) => X, success: (u: U) => X): X {
        return (this.isLeft()) ?
                failure(this.value as T) :
                success(this.value as U)
    }

    /**
     *
     *
     * @param {(T|U)} value
     * @returns {IEither<T, U>}
     * @memberof IEither
     */
    public flatMap<X>(f: (value: U ) => Either<T, X> ): Either<T, X> {
        return this.fold(
            (left)  => this as any as Either<T, X>,
            (right) => f(right))
    }

    /**
     *
     *
     * @abstract
     * @param {Either<T, U>} contextualValue
     * @returns {(T | U)}
     * @memberof Either
     */
    public map<X>(f: (value: U) => X): Either<T, X>  {
        return this.fold(
            (left)  => this as any as Either<T, X>,
            (right) => Right<T, X>(f(right)))

    }

    /**
     *
     *
     * @param {U} defaultValue
     * @returns {U}
     * @memberof EitherImpl
     */
    public getOrElse(defaultValue: U): U {
        return this.fold(
            (left)  => defaultValue,
            (right) => right)
    }
}

/**
 *
 *
 * @export
 * @class RightProj
 * @extends {EitherImpl<T, U>}
 * @template T
 * @template U
 */
export class RightProj<T, U> extends EitherImpl<T, U> {
    protected _isLeft = false

    /**
     *
     */
    constructor(value: U) {
        super(value);
    }
}

/**
 *
 *
 * @export
 * @class LeftProj
 * @extends {EitherImpl<T, U>}
 * @template T
 * @template U
 */
export class LeftProj<T, U> extends EitherImpl<T, U> {
    protected _isLeft = true

    /**
     *
     */
    constructor(value: T) {
        super(value);
    }
}
