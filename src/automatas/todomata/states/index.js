import init from './init'
import idle from './idle'
import checking from './checking'
import removing from './removing'
import creating from './creating'
import editing from './editing'

let states = [init, idle, checking, removing, editing, creating]

export default states;
