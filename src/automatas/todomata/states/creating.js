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
			input.task.id = context.all.length
			context.all.push(input.task)
			buffer.keys[input.task.id] = context.all.length - 1
			task.status = "idle";
			return Appomata.createOmega(
				"idle",
				task
			)
		}	
	}
}

export default Appomata.createState(creating);  