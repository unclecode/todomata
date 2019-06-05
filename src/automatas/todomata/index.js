import Appomata from 'Appomata'

import states from './states'
import views from './views'

let todomata = Appomata.createAutomata({
    name: "todoMata",
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

for (const state of states) {
    todomata.addState(state)
}
for (const view of views) {
    todomata.addView(view)
}
// move to first state
todomata.init("init")

export default todomata;