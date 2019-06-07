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

let stateViewMap = {
	"IdleView": "idle",
	"CheckingView": "checking",
	"EditingView": "editing",
	"RemovingView": "removing"
}

for (const state of states) {
    todomata.addState(state)
}

for (const view of views) {
    todomata.addView(view, stateViewMap[view.name])
}
// move to first state
todomata.init("init")

export default todomata;