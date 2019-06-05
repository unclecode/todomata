import Appomata from 'Appomata'
import {h} from 'virtual-dom'
import {Task} from './common.js'

let initView = {
	name : "InitView",
	render: (state) => {
		let {omega, transit} = state;
		let tasks = omega.output.tasks;
		return h('ul.tasks', {}, 
		tasks.map(t=> h('li', {}, [Task({
			data: t, props: {}, transit
		})]))) 
	}
}

export default Appomata.createView(initView);

