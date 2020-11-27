import semaphore from "semaphore"

class State {
    balance: number
}

var state:State = {
    balance: 100
}

class BalanceService {

    constructor(
        private state: State
    ){}
 
    update(amount: number, callback) {
        return new Promise(resolve => {
            setTimeout(() => {
                state.balance -= amount
                callback()
                resolve(1) 
            }, 1000)
        })
    }

    getBalance() {
        return state.balance
    }
}

describe("semaphore", () => {
    it("", (done) => {

        const s = semaphore(1)
        const balanceService = new BalanceService(state)

        for(let i = 0; i < 3; i++) {
            s.take(() => {
                balanceService.update(10, s.leave)
            })
        }

        var timer = 0
        const check = () => {
            switch(timer++) {
                case 0:
                    /* @ts-ignore */
                    expect(s.current).toEqual(1)
                    /* @ts-ignore */
                    expect(s.queue.length).toEqual(2)
                    expect(balanceService.getBalance()).toEqual(100)
                    break;
                case 1:
                    /* @ts-ignore */
                    expect(s.current).toEqual(1)
                    /* @ts-ignore */
                    expect(s.queue.length).toEqual(1)
                    expect(balanceService.getBalance()).toEqual(90)
                    break;
                case 2:
                    /* @ts-ignore */
                    expect(s.current).toEqual(1)
                    /* @ts-ignore */
                    expect(s.queue.length).toEqual(0)
                    expect(balanceService.getBalance()).toEqual(80)
                    break;
                case 3:
                    /* @ts-ignore */
                    expect(s.current).toEqual(0)
                    /* @ts-ignore */
                    expect(s.queue.length).toEqual(0)
                    expect(balanceService.getBalance()).toEqual(70)
                    return done()
            }
            
            setTimeout(() => {
                check()
            }, 1000);
        }

        check()
    })
})