const actions = require("./actions")
// @ponicode
describe("actions.setLoginInfo", () => {
    test("0", () => {
        let callFunction = () => {
            actions.setLoginInfo(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            actions.setLoginInfo(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            actions.setLoginInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("actions.initLoginInfo", () => {
    test("0", () => {
        let callFunction = () => {
            actions.initLoginInfo(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            actions.initLoginInfo(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            actions.initLoginInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
