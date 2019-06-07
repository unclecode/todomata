import Appomata from 'Appomata' 
let idle = {
	name : "idle",
	actions: {
		check : async (delta) => {
			// 1 - get delta info
			let {
				input,
				buffer, 
				context
			} = delta;
			let task = context.all[buffer.keys[input.task.id]]
			task.status = "checking"
			return Appomata.createOmega("checking", {
				task: input.task,
				tasks: context.all
			})
		},
		remove : async (delta) => {
			// 1 - get delta info
			let {
				input,
				buffer, 
				context
			} = delta;
			let task = context.all[buffer.keys[input.task.id]]
			task.status = "removing"
			return Appomata.createOmega("removing", {
				task: input.task,
				tasks: context.all
			})
		},
		create : async (delta) => {
			// 1 - get delta info
			let {
				input,
				buffer, 
				context
			} = delta;
			let task = input.task
			task.status = "creating"
			return Appomata.createOmega("creating", {
				task: input.task,
				tasks: context.all
			})			
		},
		edit : async (delta) => {
			// 1 - get delta info
			let {
				input,
				buffer, 
				context
			} = delta;
			let task = input.task
			task.status = "editing"
			return Appomata.createOmega("editing", {
				task: input.task,
				tasks: context.all
			})						
		}
	}
}

export default Appomata.createState(idle);