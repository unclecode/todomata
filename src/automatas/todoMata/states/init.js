import Appomata from 'Appomata'

let init = {
    name: "init",
    actions: {
        init: async (delta) => {
            // 1 - get delta info
            let {
                context,
                buffer
            } = delta

            // 2 - do the action
            const response = await fetch(buffer.url.all);
            const tasks = await response.json()
            tasks.forEach((t, order) => {
                t.status = "idle"
                buffer.keys[t.id] = order;
            });

            // 3 - write in memory
            context.all = tasks;

            // 4 - make the omega transition data
            return Appomata.createOmega("idle", {
                tasks
            })
        }
    }
}

export default Appomata.createState(init)