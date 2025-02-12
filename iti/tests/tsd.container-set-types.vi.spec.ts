import { describe, it, expect, vi, beforeEach } from "vitest"
import { getMainMockAppContainer } from "./mocks/_mock-app-container"
import { expectType, expectError, printType, expectNotType } from "tsd"
import type { A_Container } from "./mocks/container.a"
import type { B_Container } from "./mocks/container.b"
import type { C_Container } from "./mocks/container.c"

it("should check token types", () => {
  const cont = getMainMockAppContainer()
  expectType<{ aCont: "aCont"; bCont: "bCont"; cCont: "cCont" }>(
    cont.getTokens(),
  )
})

it("should check getContainerSet types", async () => {
  const cont = getMainMockAppContainer()
  let containerSet = await cont.getContainerSet(["aCont", "bCont"])
  expectNotType<any>(containerSet)
  expectNotType<any>(containerSet.aCont)
  expectType<A_Container>(containerSet.aCont)
})

it("should check getContainerSet function types", async () => {
  const cont = getMainMockAppContainer()
  let containerSet = await cont.getContainerSet((c) => [c.aCont, c.bCont])
  expectNotType<any>(containerSet)
  expectNotType<any>(containerSet.aCont)
  expectType<A_Container>(containerSet.aCont)
})

it("should check subscribe types", async () => {
  const cont = getMainMockAppContainer()
  cont.subscribeToContainerSet(
    (c) => {
      expectNotType<any>(c)
      expectType<"aCont">(c.aCont)
      return [c.aCont, c.cCont]
    },
    (err, containerSet) => {
      expectNotType<any>(containerSet)
      expectType<A_Container>(containerSet.aCont)
      expectType<C_Container>(containerSet.cCont)
    },
  )
})

it("should be able to delete token types", () => {
  const cont = getMainMockAppContainer().delete("aCont")
  expectNotType<any>(cont.items)
  expectType<{ bCont: "bCont"; cCont: "cCont" }>(cont.getTokens())
})
