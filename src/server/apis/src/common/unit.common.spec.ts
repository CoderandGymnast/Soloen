import { Unit } from "./unit.common"
import Sun = Unit.Sun

describe("unit.common", () => {
    it("sun", () => {

        const amt: Sun = Unit.fromStr("10")
        const bonus: Sun = Unit.fromStr("2")

        expect(Unit.toStr(amt.plus(bonus))).toEqual(Unit.toStr(Unit.fromStr("12")))
        expect(Unit.toStr(amt.minus(bonus))).toEqual(Unit.toStr(Unit.fromStr("8")))
    })
})