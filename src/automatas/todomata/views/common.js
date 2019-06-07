import Appomata from 'Appomata'
import {h} from 'virtual-dom'
let Task = ({data, props, transit}) => {
	let task = data
	let sl = 'div.task.' + 
		task.completed + '.' + 
		task.status + 
		'#task_' + task.id;
	let vNodes = h(sl, {
		key : task.id
	}, [
		h('span', {}, [task.title]),
		h('a', {
			href: '#',
			onclick: (e) => { 
				transit(Appomata.createDelta("check", {task}))
				return false;
			}
		}, ['check']),
		h('a', {
			href: '#',
			onclick: (e) => { 
				transit(Appomata.createDelta("remove", {task}))
				return false;
			}
		}, ['remove']),
		h('a', {
			href: '#',
			onclick: (e) => { 
				transit(Appomata.createDelta("edit", {task}))
				return false;
		}
		}, ['edit']),
	])
	vNodes.children.splice(1, task.completed ? 1 : 0)
	return vNodes;
}
export {
Task
};
