let assert = window.assert || ((condition, message) => {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
})

let iterate = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        //console.log(`key: ${key}, value: ${obj[key]}`)
        cb(obj, key)

        if (typeof obj[key] === 'object') {
            iterate(obj[key], cb)
        }
    })
}
let deProxy = (newObj, obj) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            newObj[key] = {}
            deProxy(newObj[key], obj[key])
        } else
            newObj[key] = assign({}, obj[key])

    })
}

let EventBus = (() => {
    let handlers = {}
    return {
        on: (event, handler) => {
            handlers[event] = handlers[event] || new Set()
            handlers[event].add(handler)
        },
        off: (event, handler) => {
            if (!handler) {
                delete handlers[event]
                return
            }
            handlers[event] && handlers[event].delete(handler)
        },
        emit(event, data) {
            (handlers[event] || []).forEach(h => h(data))
        }
    }
})



export {
    assert,
    iterate,
    deProxy,
    EventBus
}