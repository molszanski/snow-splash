type Prettify<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

/**
 * Can we add same tokens? Should the last be resolved? Both?
 *
 */
type ExtendObjectt<
  OldContext extends {},
  newToken extends string,
  newTokenType,
> = OldContext & { [NT in newToken]: newTokenType }
declare function extend<Context extends {}, Token extends string, newType>(
  context: Context,
  token: Token,
  type: newType,
): ExtendObjectt<Context, Token, newType>

const first = {
  a: 1,
  b: "strs",
}

let e1 = extend(first, "c", "num")
type e1 = Prettify<typeof e1>

let e2 = extend(first, "d", 123)
type e2 = Prettify<typeof e2>

let e3 = extend(first, "d", () => 123)
type e3 = Prettify<typeof e3>

console.log(e1, e2, e3)

// Extend objects -------------------

// type ExtendObjectt2<OldContext extends {}, NewContext extends {}> = {
//   [Token in keyof (OldContext &
//     NewContext)]: Token extends keyof OldContext
//     ? OldContext[Token]
//     : Token extends keyof NewContext
//     ? NewContext[Token]
//     : never
// }

// _.assign      ({ a: 'a' }, { a: 'bb' }) // => { a: "bb" }
// _.defaults    ({ a: 'a' }, { a: 'bb' }) // => { a: "a"  }
// Extend
type ExtendObjecttDefaults<
  OldContext extends object,
  NewContext extends object,
> = {
  [Token in keyof (OldContext & {
    [NT in keyof NewContext]: never
  })]: Token extends keyof OldContext
    ? OldContext[Token]
    : Token extends keyof NewContext
    ? NewContext[Token]
    : never
}

type C1 = { a: 1; b: "2" }
type C2 = { b: 1; d: "2" }

type M = ExtendObjecttDefaults<C1, C2>
type full = Prettify<M>
let a333: full = 1 as any
console.log(a333)

///----

type Point = { x: number; y: number }
type Point2 = { x: number; b: number }
type P = keyof Point | keyof Point2
type full23 = Prettify<P>
/// T2
// _.assign      ({ a: 'a' }, { a: 'bb' }) // => { a: "bb" }
// _.defaults    ({ a: 'a' }, { a: 'bb' }) // => { a: "a"  }
// ASSIGN
type ExtendObjecttAssign<
  OldContext extends object,
  NewContext extends object,
> = {
  [Token in keyof OldContext | keyof NewContext]: Token extends keyof NewContext
    ? NewContext[Token]
    : Token extends keyof OldContext
    ? OldContext[Token]
    : never
}

type A1 = { a: 1; b: "2" }
type A2 = { b: 2; c: "3" }

type M2 = ExtendObjecttAssign<A1, A2>
type full2 = Prettify<M2>

let a444: full2 = 1 as any
console.log(a444)

// lib
// https://github.com/piotrwitek/utility-types#assignt-u
// type M3 = Assign<A1, A2>
// type full3 = Prettify<M3>?
// let a555: full3 = 1 as any
// console.log(a555)

//

// type T1 = "a" | "b"
// type T2 = "b" | "c" | "d"
// type T3 = T1 | T2
// type T4 = Prettify<T3>

///

export type AssignString<
  TParentContext,
  TProvided,
  CurrentToken extends string,
> = {
  [K in keyof (TParentContext & {
    [K in CurrentToken]: TProvided
  })]: K extends CurrentToken
    ? TProvided
    : K extends keyof TParentContext
    ? TParentContext[K]
    : never
}

export type Assign4<OldContext extends object, NewContext extends object> = {
  [Token in keyof ({
    [K in keyof OldContext]: OldContext[K]
  } & {
    [K in keyof NewContext]: NewContext[K]
  })]: Token extends keyof NewContext
    ? NewContext[Token]
    : Token extends keyof OldContext
    ? OldContext[Token]
    : never
}

type B1 = { a: 1; b: "2" }
type B2 = { b: 2; c: "3" }

type K1 = AssignString<B1, string, "lol">
let f: K1 = {
  a: 1,
  b: "2",
  lol: "123",
}

type K2 = Assign4<B1, { lol: 123 }>
let f2: K2 = {
  a: 1,
  b: "2",
  lol: 123,
}