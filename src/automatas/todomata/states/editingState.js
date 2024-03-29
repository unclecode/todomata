import Appomata from 'Appomata'

let editing = {
	name : "editing",
	actions: {
		confirm: async (delta) => {
			let {
				input,
				context,
				buffer
			} = delta;
			let task = context.all[buffer.keys[input.task.id]];
			let {title} = task;
			Object.assign(task, {title})
			task.status = "idle";
			return Appomata.createOmega(
				"idle",
				{task, tasks: context.all}
			)
		}	
	}
}

export default Appomata.createState(editing); 