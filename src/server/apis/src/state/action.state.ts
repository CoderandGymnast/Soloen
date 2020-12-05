export namespace Action {
    export enum Type {
        CREATE_ADDRESS = "CREATE_ADDRESS",
        INCREASE_BALANCE = "INCREASE_BALANCE",
        DECREASE_BALANCE = "DECREASE_BALANCE"
    }
    
    class Payload {
        addr: string
        amount?: string
    }

    export class Action {
        type: string
        payload: Payload
    }
}
