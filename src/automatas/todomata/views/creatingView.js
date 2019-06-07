 import Appomata from 'Appomata'
import {h} from 'virtual-dom'
import {Task} from './common.js'

let CreatingTask = ({data, props, transit}) => {
	let task = data;
	let sl = 'div.task.' + 
	task.completed + '.' + 
	task.status + 
	'#task_' + task.id;
	
	return h(sl, {
		key : task.id
	}, [
			h('input.task-title', {
				value: task.title,
				onchange: (e) => {
					task.title = e.target.value;	
				},
				onkeypress: (e) => {
					if (e.which === 13){
						task.title = e.target.value;
						transit(Appomata.createDelta("confirm", {task:task}))
					}
				}
			}, []),
			h('a', {
				href: '#',
				onclick: (e) => {
					transit(Appomata.createDelta("confirm", {task:task}))
					return false
				}
			}, ['confirm'])
		])
}


let creatingView = {
	name : "CreatingView",
	render: (state) => {
		let {omega, transit} = state;
		let tasks = omega.output.tasks;
		let funcSelector = {
			'idle':Task, 'editing': CreatingTask
		}
		return h('ul.tasks', {}, 
		tasks.map(t=> h('li', {}, [funcSelector[t.status]({
			data: t, props: {}, transit
		})]))) 
	}
}

export default Appomata.createView(creatingView);

  