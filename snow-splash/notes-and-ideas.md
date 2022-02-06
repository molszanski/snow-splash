### lookup table

For runtime optimizations of the search in async nodes we can provide tokens as a second argument in an `addPromise `

```ts
let n = makeRoot()
  .addNode({ a: 1, b: 2 })
  .addPromise(
    async (c) => {
      return { c: 3, d: 4 }
    },
    ["c", "d"], // <-- this might be a purely runtime optimization to index the lookup and make code even more lazy
  )
  .addPromiseStrict(
    // Or even better add a new method
    async (c) => {
      return { c: 3, d: 4 }
    },
    ["c", "d"], // that forces you to list all deps keys and TS can actually check it!!!
  )
```

### Nano emitter

try nano emitter from evil martians but check if they support multiple subscribes gracefully via `node lol.js`

### Disable promise for `addNode`

add node should TS throw if pass async. TYpescirpt should lookup return type and dissallow promise return type

### Add options for `addNode`

- first option is a lookup table of tokens
- second idea would be a force override parameter when you want to force flush changes