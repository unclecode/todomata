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
			let ix = buffer.keys[input.task.id]
			context.all.splice(buffer.keys[input.task.id], 1);
			for(; ix < context.all.length - 1; ix++){
				buffer.keys[ix]--;
			}
// 			context.all.forEach((t, order) => {
// 				buffer.keys[t.id] = order;
// 			})
			return Appomata.createOmega(
				"idle",
				{tasks: context.all}
			)

		}
		
	}
}

export default Appomata.createState(removing); 