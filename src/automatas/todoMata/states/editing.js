import Appomata from 'Appomata'

let editing = {
    name: "editing",
    actions: {
        update: async (delta) => {
            let {
                input,
                buffer,
                context
            } = delta;
            let task = context.all[buffer.keys[input.id]]
            task.title = input.title
            task.status = "idle"
            return Appomata.createOmega("idle")
        },
        "confirm-check": async (delta) => {
            let {
                input,
                buffer,
                context
            } = delta;
            let task = context.all[buffer.keys[input.id]]
            task.completed = true
            task.status = "idle"
            return Appomata.createOmega("idle")
        },
        "confirm-remove": async (delta) => {
            let {
                input,
                buffer,
                context
            } = delta;
            context.all.splice(buffer.keys[input.id], 1)
            context.all.forEach((t, order) => {
                buffer.keys[t.id] = order;
            });
            return Appomata.createOmega("idle")
        }
    }
}

export default Appomata.createState(editing)