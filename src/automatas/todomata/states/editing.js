import Appomata from 'Appomata'

let editing = {
	name : "editing",
	actions: {
		confirm: async (delta){
			let {
				input,
				context,
				buffer
			}
			let task = context.all[buffer.keys[input.task.id]];
			let {title} = task;
			Object.assign(task, {title})
			task.status = "idle";
			return Appomata.createOmega(
				"idle",
				task
			)
		}	
	}
}

export default Appomata.createState(editing); 