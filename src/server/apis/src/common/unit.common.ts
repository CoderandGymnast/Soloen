import BigNumber from "bignumber.js";

export namespace Unit {
    export type Sun = BigNumber
    export const fromStr = (amt: string) => new BigNumber(amt)
    export const toStr = (amt: BigNumber) => amt.toFixed()
}

