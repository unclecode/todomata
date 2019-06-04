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
			return omega("checking", {
				task: input.task
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
			return omega("removing", {
				task: input.task
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
			return omega("creating", {
				task
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
			return omega("editing", {
				task
			})						
		}
	}
}

export default Appomata.createState(idle);