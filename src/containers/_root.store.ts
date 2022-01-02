import _ from "lodash"
import { RootContainer } from "../_library/library.root-container"

import { provideAContainer } from "./container.a"
import { provideAuthContainer } from "./container.auth"
import { provideBContainer } from "./container.b"
// import { provideKitchenManipulatorContainer } from "./container.kitchein-manipulator"
import { providePizzaPlaceContainer } from "./container.pizza-place"
import {
  provideKitchenContainer,
  provideUpgradedKitchenContainer,
} from "./container.kitchen"

function getProviders(ctx: any) {
  return {
    auth: async () => provideAuthContainer(),
    aCont: async () => provideAContainer(await ctx.auth()),
    bCont: async () => provideBContainer(await ctx.auth(), await ctx.aCont()),

    // pizza stuff
    pizzaContainer: async () => providePizzaPlaceContainer(),
    kitchen: async () => provideKitchenContainer(),

    _biggerKitchen: async () => {
      return provideUpgradedKitchenContainer(await ctx.kitchen())
    },

    // kitchenManipulator: async () => {
    //   // @ts-ignore
    //   provideKitchenManipulatorContainer(ctx)
    // },
  }
}

export function lol() {
  let x = new RootContainer(getProviders)
  return x
}

// function getProviders2(ctx: any) {
//   return {
//     auth: async () => provideAuthContainer(),
//     aCont: async () => provideAContainer(await ctx.auth()),
//   }
// }

// export function lol2() {
//   let x = new RootContainer(getProviders2)
//   let l = x.KKK
//   console.log(l)
//   return x
// }
