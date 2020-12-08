import { Unit } from "src/common/unit.common"
import Sun = Unit.Sun

export namespace Action {
    export enum Type {
        CREATE_ADDRESS = "CREATE_ADDRESS",
        INCREASE_BALANCE = "INCREASE_BALANCE",
        DECREASE_BALANCE = "DECREASE_BALANCE"
    }

    class Payload {
        addr: string
        amount?: Sun
    }

    export class Action {
        type: string
        payload: Payload
    }
}
