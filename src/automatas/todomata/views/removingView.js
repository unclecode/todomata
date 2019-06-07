import Appomata from 'Appomata'
import {h} from 'virtual-dom'
import {Task} from './common.js'

let RemovingTask = ({data, props, transit}) => {
	let sl = 'div.task.' + 
	data.completed + '.' + 
	data.status + 
	'#task_' + data.id;
	
	return h(sl, {
		key : data.id
	}, [
			h('span', {}, [data.title]),
			h('a', {
				href: '#',
				onclick: (e) => {
					transit(Appomata.createDelta("confirm", {task:data}))
					return false
				}
			}, ['confirm'])
		])
}


let removingView = {
	name : "RemovingView",
	render: (state) => {
		let {omega, transit} = state;
		let tasks = omega.output.tasks;
		let funcSelector = {
			'idle':Task, 'removing': RemovingTask
		}
		return h('ul.tasks', {}, 
		tasks.map(t=> h('li', {}, [funcSelector[t.status]({
			data: t, props: {}, transit
		})]))) 
	}
}

export default Appomata.createView(removingView);

  