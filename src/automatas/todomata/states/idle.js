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
				input.task
			})
		},
		remove : async (delta) => {},
		create : async (delta) => {},
		edit : async (delta) => {}
	}
}
