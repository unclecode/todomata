import 'normalize.css';
import './styles/style.scss';

import Appomata, {
    Automata,
    App,
    State
} from './modules/Appomata.js'

import {automatas} from './automatas'

automatas.forEach(a=>{
    Appomata.connect({
        app: kApp,
        automatas: [todoMata.name]
    })

})


window.a = {
    Appomata,
    Automata,
    App,
    State
}

import {
    Observable
} from 'object-observer/dist/object-observer'

import {
    h,
    diff,
    patch,
    create
} from 'virtual-dom'

import vhtml from 'virtual-html'


window.k = {
    h,
    diff,
    patch,
    create,
    vh: vhtml,
    ob: Observable
}

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
class StateMachine {
    constructor(initial_state) {
        this.subs = new Set()
        this.data = {
            all: []
        }
        this._data = {
            keys: {}
        }
        Object.assign(this.data, initial_state)
        this.data = Observable.from(this.data)
        this.data.observe(changes => {
            this.onStateChanged(this)
        })
        this.loadStates()
        this.transit("load")

    }

    get all() {
        return this.data.all.map(t => Object.assign({}, t))
    }


    onStateChanged() {}
    onTransition() {}

    async transit(ACTION, input) {
        let {
            next,
            output
        } = await this.now.transit(this, ACTION, input);
        this.current = new this.states[next]();
        console.log('transimeter to', this.current.name)
        this.onTransition(this.current)
        return output
    }
    loadStates() {
        const self = this;
        this.states = {
            init: (class Init {
                constructor() {
                    this.name = "init"
                }
                async transit(state, ACTION, input) {
                    // return next state
                    // for example go to idle state
                    return this[ACTION] && await this[ACTION](state, input)
                }
                async load(state, input) {
                    // make the change and return the output
                    // for example load data 
                    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
                    const tasks = await response.json()
                    tasks.forEach((t, order) => {
                        t.status = "idle"
                        state._data.keys[t.id] = order;
                    });

                    state.data.all = tasks;

                    return {
                        next: "idle",
                        output: state.data.all
                    };
                }
            }),
            idle: (class Idle {
                constructor() {
                    this.name = "idle"
                }
                async transit(state, ACTION, input) {
                    return this[ACTION] && await this[ACTION](state, input)
                }
                async edit(state, input) {
                    let {
                        id
                    } = input
                    let task = state.data.all[state._data.keys[id]]
                    task.status = "editing"
                    return {
                        next: "edit",
                        output: task
                    }
                }
                async check(state, input) {
                    let {
                        id
                    } = input
                    let task = state.data.all[state._data.keys[id]]
                    task.status = "checking"
                    return {
                        next: "edit",
                        output: task
                    }
                }
                async remove(state, input) {
                    let {
                        id
                    } = input
                    let task = state.data.all[state._data.keys[id]]
                    task.status = "removing"
                    return {
                        next: "remove",
                        output: task
                    }

                }


            }),
            edit: (class Edit {
                constructor() {
                    this.name = "edit"
                }
                async transit(state, ACTION, input) {
                    return this[ACTION] && await this[ACTION](state, input)
                }
                confirm(state, input) {
                    const {
                        id
                    } = input
                    const task = state.data.all[state._data.keys[id]]
                    task.completed = true
                    task.status = "idle"
                    return {
                        next: "idle",
                        output: task
                    }

                }
                save(state, input) {
                    const {
                        id,
                        title
                    } = input
                    const task = state.data.all[state._data.keys[id]]
                    task.title = title
                    task.status = "idle"
                    return {
                        next: "idle",
                        output: task
                    }

                }
            }),
            remove: (class Remove {
                constructor() {
                    this.name = "remove"
                }
                async transit(state, ACTION, input) {
                    return this[ACTION] && await this[ACTION](state, input)
                }
                confirm(state, input) {
                    const {
                        id
                    } = input
                    state.data.all.splice(state._data.keys[id], 1)
                    state._data.keys = {}
                    state.data.all.forEach((t, order) => {
                        state._data.keys[t.id] = order;
                    });
                    return {
                        next: "idle",
                        output: id
                    }

                }

            })
        }
        this.current = new this.states.init()
        return this.current
    }

    get now() {
        return this.current
    }

}

class TodoList {
    constructor(state) {
        this.name = "TodoList"
        this.state = state;
    }
    async loadState() {
        //let todos = await this.state.transit("load")
        //        return this.render()
    }

    async test(x) {
        return 4 * x
    }

    async check(task, state) {
        let t = await state.transit("check", {
            id: task.id
        })
        console.log('doning', t)
    }
    async edit(task, state) {
        let t = await state.transit("edit", {
            id: task.id
        })
        console.log('doning', t)
    }
    async remove(task, state) {
        let t = await state.transit("remove", {
            id: task.id
        })
        console.log('removing', t)
    }
    async saveEdit(task, state) {
        let t = await state.transit("save", {
            id: task.id,
            title: task.title
        })
        console.log('editing done ', t)
    }
    async confirm(task, state) {
        let t = await state.transit("confirm", {
            id: task.id
        })
        console.log('editing done ', t)
    }

    render(state) {
        let self = this;
        self.state = state;
        let tasks = state.all.slice(0, 10).map(t => {

            let children = []
            if (t.status === "editing") {
                let editedTitle = t.title
                children = [
                    h('input.task-title', {
                        value: t.title,
                        onchange: (e) => {
                            editedTitle = e.target.value
                        }
                    }),
                    h('a', {
                        href: '#',
                        onclick: () => {
                            self.saveEdit({
                                id: t.id,
                                title: editedTitle
                            }, state)
                        }
                    }, "save")
                ]
            } else if (t.status === "checking") {
                children = [
                    h('span.title', [t.title]),
                    h('a', {
                        href: '#',
                        onclick: self.confirm.bind(self, t, state)
                    }, "confirm")
                ]
            } else if (t.status === "removing") {
                children = [
                    h('span.title', [t.title]),
                    h('a', {
                        href: '#',
                        onclick: self.confirm.bind(self, t, state)
                    }, "confirm")
                ]
            } else {
                children = [
                    h('span.title', [t.title]),
                    h('a', {
                        href: '#',
                        onclick: self.edit.bind(self, t, state)
                    }, "edit"),
                    h('a', {
                        href: '#',
                        onclick: self.check.bind(self, t, state)
                    }, "check"),
                    h('a', {
                        href: '#',
                        onclick: self.remove.bind(self, t, state)
                    }, "remove")
                ]

            }

            let done = t.completed ? "done" : "active"
            return h(`li.task.${done}.${t.status}#${t.id}`, {
                    key: t.id
                },
                children)
        })
        return h('ul.tasks', tasks)


        /*
        let tempIdle = `<a href="#" onclick = "done({id: ${t.id}})">done</a><a href="#" onclick = "remove({id: ${t.id}})">remove</a>`
        let tempSave = `<a href="#" onclick = "saveEdit({id: ${t.id}})">save</a>`
        let template = `<li id="${t.id}" class="task ${done} ${t.status}"><span>${t.title}</span>${ ["editing", "removing"].includes(t.status) ? tempSave : tempIdle}</li>`
        let vEl = vhtml(template);
        let attachEvents = (vNode) => {
            let childrenWithEvent = vNode.children.filter(c => c.type == "VirtualNode" && Object.keys(c.properties).filter(k => k.startsWith('on')).length)
            for (const vn of childrenWithEvent) {
                let eventNames = Object.keys(vn.properties).filter(k => k.startsWith('on'))
                for (const event of eventNames) {
                    //let f = new Function("state", `console.log("${vn.properties[event]}"); this.${vn.properties[event].replace(')', ', state)')};`);
                    vn.properties[event] = new Function("state", `console.log("${vn.properties[event]}"); this.${vn.properties[event].replace(')', ', state)')};`).bind(self, state)
                }
                attachEvents(vn)
            }
        }
        vEl.key = t.id;
        attachEvents(vEl)
        return vEl;
        */


    }
}

class KApp {
    constructor(stateMachine) {
        // attache state machine

        this.stateMachine = stateMachine
        this.stateMachine.onStateChanged = (state) => {
            //console.log('changed')
            this.render(state)
        }

        // define top level components
        this.components = {
            todoList: new TodoList()
        }
        this.stateMachine.subs.add(this.components.todoList)
        this.componentsVTrees = {}
    }
    render(changedState) {
        if (changedState) {
            Object.keys(this.components).forEach(c => {
                // if (!changedState ||
                //     (changedState && c.hasSubscribed(changedState))
                if (changedState.subs.has(this.components[c]))
                    this.componentsVTrees[c] = this.components[c].render(changedState)
            })
        }
        let newRootTree = h('div.app', [Object.values(this.componentsVTrees)])
        const patches = diff(this.rootTree, newRootTree);
        this.rootTree = newRootTree
        this.rootNode = patch(this.rootNode, patches);
    }
    async loadComponentsState() {
        let res = await Promise.all(Object.keys(this.components).map(c => {
            return this.components[c].loadState()
        }))
    }
    async mount(rootElem) {
        if (!this.rootTree) {
            this.rootTree = h('div.app')
            this.rootNode = create(this.rootTree)
            rootElem.appendChild(this.rootNode)
        }
        await this.loadComponentsState()
        this.render()
        return this
    }
}


(async () => {
    window.kSession = new StateMachine(INITIAL_STATE);
    window.kapp = await (new KApp(window.kSession)).mount(document.getElementById('app'))
    console.log('hello world');
}); //()