import TronWeb from "tronweb"

describe("TronWeb.utils.accounts", () => {
    it("should generate account", () => {

        const accounts =  TronWeb.utils.accounts
        const acc = accounts.generateAccount()

        expect(acc.privateKey.length).toEqual(64)
        expect(acc.publicKey[0]).toEqual('0')
        expect(acc.address.base58[0]).toEqual('T')
    })
})

/** [NOTES]:
 * 1. Tronweb reference: https://github.com/tronprotocol/tronweb/.
 * 2. Tronweb npm: https://www.npmjs.com/package/tronweb.
 * 3. Tronweb index file: https://github.com/tronprotocol/tronweb/blob/master/src/utils/index.js.
 * 4. Tronweb accounts.test file: https://github.com/tronprotocol/tronweb/blob/master/test/utils/accounts.test.js.
 * 5. Jest with TS: https://jestjs.io/docs/en/getting-started#using-typescript.
 * 6. TS Jest: https://github.com/kulshekhar/ts-jest.
 */