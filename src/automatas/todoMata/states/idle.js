import Appomata from 'Appomata'
let omega = Appomata.createOmega


let idle = {
    name: "idle",
    actions: {
        edit: async (delta) => {
            let {
                input,
                buffer,
                context
            } = delta;
            let task = context.all[buffer.keys[input.id]]
            task.status = "editing"
            return omega("editing", {
                task
            })
        },
        check: async (delta) => {
            // 1 - get delta info
            let {
                input,
                buffer,
                context
            } = delta;
            let task = context.all[buffer.keys[input.id]]
            task.status = "checking"
            return omega("editing", {
                task
            })
        },
        remove: async (delta) => {
            let {
                input,
                buffer,
                context
            } = delta;
            let task = context.all[buffer.keys[input.id]]
            task.status = "removing"
            return omega("editing", {
                task
            })
        }
    }
}


export default Appomata.createState(idle)