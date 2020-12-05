import { Action } from "./action.state";
import State from "./state.state";
import { BigNumber } from "bignumber.js"


const addrReducer = (state: State = {}, action: Action.Action) => {
    state = { ...state }
    switch (action.type) {
        case Action.Type.CREATE_ADDRESS:
            state[action.payload.addr] = '0'
            return state
        case Action.Type.INCREASE_BALANCE:
            state[action.payload.addr] = parseInt(state[action.payload.addr]) + parseInt(action.)
    }
}
