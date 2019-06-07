import 'normalize.css';
import './styles/style.scss';
import {
    App
} from 'Appomata'

import todoMata from "./automatas/todomata"

let todoApp = new App("todoApp");
todoApp.run(todoMata, document.getElementById("todoApp"), "load")

window.app = todoApp
window.automata = todoMata

console.log('hello world')