import 'normalize.css';
import './styles/style.scss';

import {
    h,
    diff,
    patch,
    create
} from 'virtual-dom'
import {
    throws
} from 'assert';


const observable = ({
    target,
    listener
}) => {
    let observable;

    const set = (target, name, value) => {
        target[name] = value;
        listener(observable);
        return true;
    };

    const get = (target, name) => {
        return Object.freeze(target[name]);
    };

    const handler = {
        set,
        get
    };

    observable = new Proxy(target, handler);

    return observable;
};

class Counter {
    constructor() {
        // internal state and any other ui stuffs which is 
        // not feeding from main state
        // also i guess here i have to defined children components
        this.components = {}
    }
    /**
     * An example of internal function that get state
     * make a change on state and return it, changes that I guess
     * they are self-transition 
     */
    add(state) {
        state.count++
    }
    getCounterText(state) {
        return `counter: ${state.count}`
    }
    render(state) {
        return h("button", {
            "onclick": () => this.add(state)
        }, [this.getCounterText(state)])
    }
}

const INITIAL_STATE = {
    count: 0
};
// A finite-state transducer is a sextuple 
// ∑ ,𝚪 ,𝑆, 𝑆₀, 𝛿 ,𝜔 )}, where:
// ∑: is the input alphabet which will possible inputs to our state-transition function
// 𝚪: is the input alphabet which will possible outputs of our state-transition function 
// 𝑆: is a finite, non-empty set of states [idle, ...]
// 𝑆₀: is the initial state, an element of 𝑆. In a nondeterministic finite automaton, it is a set of initial states.
// 𝛿: is the state-transition function 𝛿:𝑆 x ∑ → 𝑆 
// 𝜔: is the output function 𝜔:𝑆 x ∑ → 𝚪 
class States {
    constructor() {
        this.state = {
            all: [],
            done: [],
            active: []
        }

    }
    loadStates() {
        this.states = {
            "init": (new class Init {
                constructor() {
                    this.name = "init"
                }
                async transit(state, input) {
                    // return next state
                    // for example go to idle state
                    await = this.execute(state, input)
                    return "idle"
                }
                async execute(input) {
                    // make the change and return the output
                    // for example load data 
                    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
                    const json = await response.json();
                    state.all = json;
                    return state;
                }
            })(),
            "idle": (new class Idle {
                constructor() {
                    this.name = "idle"
                }
                async transit(state, input) {
                    // based on the input we go to different states
                    // removing, editing, ...

                }
                async execute(input) {
                    // make the change and return the outout
                    // for example extract the item id, set the status of
                    // the item to editing ot whatever
                }
            })()
        }
        this.current = "init"
        return this.states[current]
    }

    get now() {
        return this.states[current]
    }

}
class App {
    constructor(initial_state) {
        // define top level components
        this.components = {
            counter: new Counter()
        }
        // connection to state mananger
        this.state = JSON.parse(JSON.stringify(initial_state))
        this.state = observable({
            target: this.state,
            listener: () => {
                this.render()
            }
        })
    }
    render() {
        let vComponentsTrees = {}
        Object.keys(this.components).forEach(c => {
            vComponentsTrees[c] = this.components[c].render(this.state)
        })
        let newRootTree = h('div.app', [Object.values(vComponentsTrees)])
        const patches = diff(this.rootTree, newRootTree);
        this.rootTree = newRootTree
        this.rootNode = patch(this.rootNode, patches);
    }
    mount(rootElem) {
        if (!this.rootTree) {
            this.rootTree = h('div.app')
            this.rootNode = create(this.rootTree)
            rootElem.appendChild(this.rootNode)
        }
        this.render()
        return this
    }
}

window.kapp = (new App(INITIAL_STATE)).mount(document.getElementById('app'))

console.log('hello world');