## Create Delta
`createDelta(action, input, from = "")`
`Appomata.createDelta("check", {task:data})`

## Create Omega
`createOmega(next, output, views = [], context = {})`
`Appomata.createOmega(
				"idle",
				{task, tasks: context.all}
			)`
			
## transit 
`transit(Appomata.createDelta("check", {task:data}))`