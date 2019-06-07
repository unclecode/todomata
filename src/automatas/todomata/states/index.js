import init from './initState'
import idle from './idleState'
import checking from './checkingState'
import removing from './removingState'
import creating from './creatingState'
import editing from './editingState'

let states = [init, idle, checking, removing, editing, creating]

export default states;
