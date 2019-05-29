function () {

    let initState = Fistaz.createState({
        name: "init",
        local: {
            // local data which is available through .local
        }
    })

    initState.defineAction({
        name: "load",
        action: (fistaInput) => {
            let {
                context,
                input
            } = fistaInput;
            //context.shared, context.local
            // do the state process
            let loadedData = []
            let result = Fistaz.createResult("idle", loadedData);
            //result.next
            //result.output
            //not sure result.time to jump to next automated
            //not sure ε-moves
        }
    })

    let idleState = Fistaz.createState({
        name: "idle",
        local: {},
        actions: {
            edit: (fistaInput) => {

            },
            remove: (fistaInput) => {

            },
            check: (fistaInput) => {

            }
        }
    })

    let fistodo = Fistaz.createFista({
        name: "fistodo",
        states: [initState, idleState],
        context: {
            all: []
        },
        local: {
            keys: {}
        }
    })
    fistado.addState(idleState)

    let app = new App("todo")
    // this will set app state engine, and then inside app we r listening to 
    // changes and get related components and trigger their draw
    // also when it connects it restart the state machine as well
    // two parameters which the first one is the app, and the second
    // one is the list of fistaz that their changes matters to app
    Fistaz.connect({
        app: app,
        fistaz: ['fistodo', 'firebase']
    })


    // We can override the change by returning false or make some changes
    app.onStateChanged = ({
        fista,
        from,
        to,
        action
    }) => {
        return true
    }

    let Home = ((name) => {
        this.name = name
    })
    // import Home from 'components/Home'
    // app will create an instance of components
    // and assign the given key
    app.addLayout({
        cls: Home,
        states: ['fistodo.idle'] // fistodo.all or 'all' means all changes
    })

    app.addComponents({
        cls: TodoList,
        states: 'fistodo.all,firebase.tasks' // fistodo.all or 'all' means all changes
    })


    app.onMounting = () => {}
    app.onMounted = () => {}

    // fistodo.restart()
    // Fistaz.restart("todo")
    // Fistaz.addSubscriber()

    // fistodo.attach({
    //     all: []
    // })


}