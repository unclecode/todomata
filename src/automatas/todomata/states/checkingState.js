import Appomata from 'Appomata'

let checking = {
	name : "checking",
	actions: {
		confirm: async (delta) => {
			let {
				input,
				context,
				buffer
			} = delta;
			let task = context.all[buffer.keys[input.task.id]];
			task.completed = true;
			task.status = "idle";
			return Appomata.createOmega(
				"idle",
				{task, tasks: context.all}
			)
		}
		
	}
}

export default Appomata.createState(checking);