import {h} from 'virtual-dom'

let Task = ({data, props, transit}) => {
	let sl = 'div.task.' + 
	data.completed + '.' + 
	data.status + 
	'#task_' + data.id;
	
	return h(sl, {
		key : data.id
	}, [
			h('span', {}, [data.title]),
			h('a', {href: '#'}, ['check']),
			h('a', {href: '#'}, ['remove']),
			h('a', {href: '#'}, ['edit'])
		])
}



export {
	Task
};