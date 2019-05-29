import {
    h
} from 'virtual-dom'
import Appomata from 'Appomata'
var virtualHTML = require("virtual-html");

let Task = ({
    data,
    props,
    transit
}) => {
    let task = data;
    let c = {}
    let edited_title = task.title

    c.title = virtualHTML(`<span>${task.title}</span>`) //h('span', {}, [task.title])
    c.titleInput = h('input.task-title', {
        value: task.title,
        onchange: (e) => {
            edited_title = e.target.value
        }
    })
    "check,remove,edit,confirm-remove,confirm-check,update".split(',').forEach((v, ix) => {
        c[v] = h('a', {
            key: v,
            href: '#',
            onclick: (e) => {
                transit({
                    input: {
                        id: task.id,
                        title: edited_title
                    },
                    action: v
                })
            }
        }, [v.split('-')[0]])
    })

    let uiStates = {
        idle: [c.title, c.edit, c.check, c.remove],
        editing: [c.titleInput, c.update],
        checking: [c.title, c["confirm-check"]],
        removing: [c.title, c["confirm-remove"]]
    }

    let element = h(`div.task.${task.completed}.${task.status}#task_${task.id}`, {
        key: task.id
    }, uiStates[task.status])
    return element
}

let initView = {
    name: "InitView",
    render: ({
        automata,
        delta,
        omega,
        transit,
        cachedNodes
    }) => {
        let {
            output
        } = omega

        let actions = "check,remove,edit,confirm-remove,confirm-check,update".split(',')

        if (false && cachedNodes &&
            actions.includes(delta.action)) {

            let index;
            cachedNodes.children.some((v, ix) => {
                if (v.children[0].key == delta.input.id)
                    return (index = ix);
            })
            if (index >= 0) {
                let newNode = Task({
                    data: omega.output.context.all[index],
                    props: {},
                    transit

                })
                cachedNodes.children[index] = h(`li`, {}, [newNode])
                return h('ul.tasks', {}, cachedNodes.children)
            }
        }

        return h('ul.tasks', {},
            output.context.all.slice(0, 10).map(t => h(`li`, {}, [Task({
                data: t,
                props: {},
                transit
            })])))

    }
}

export default Appomata.createView(initView);