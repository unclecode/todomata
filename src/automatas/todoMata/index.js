import Appomata from 'Appomata'

import states from './states'
import views from './views'

let todomata = Appomata.createAutomata({
    name: "todo",
    context: {
        all: []
    },
    buffer: {
        keys: {},
        url: {
            all: `https://jsonplaceholder.typicode.com/todos`
        }
    }
})
//TODO 
// todomata.context.getTask = ((id) => this.context.all[this.buffer.keys[id]]).bind(todomata)

for (const state of states) {
    todomata.addState(state)
}
for (const view of views) {
    todomata.addView(view)
}

todomata.init("init")

export default todomata;