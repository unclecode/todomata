import Appomata from 'Appomata'

let removing = {
	name : "removing",
	actions: {
		confirm: async (delta) => {
			let {
				input,
				context,
				buffer
			} = delta
			context.all.splice(buffer.keys[input.task.id], 1);
			for(let i = buffer.keys[input.task.id]; i < context.all.length - 1; i++){
				buffer.keys[i]--;
			}
// 			context.all.forEach((t, order) => {
// 				buffer.keys[t.id] = order;
// 			})
			return Appomata.createOmega(
				"idle",
				task
			)
		}
		
	}
}

export default Appomata.createState(removing); 