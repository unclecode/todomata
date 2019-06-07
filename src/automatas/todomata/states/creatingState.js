import Appomata from 'Appomata'

let creating = {
	name : "creating",
	actions: {
		confirm: async (delta) => {
			let {
				input,
				context,
				buffer
			} = delta;
			let task = {
				id : -1,
				title: "untitled",
				completed: false,
				status: "editing"
			}
			task.id = context.all.length
			context.all.push(task)
			buffer.keys[task.id] = context.all.length - 1
			task.status = "editing";
			return Appomata.createOmega(
				"editing",
				{task, tasks: context.all}
			)
		}	
	}
}

export default Appomata.createState(creating);  