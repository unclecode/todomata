import 'normalize.css';
import './styles/style.scss';

import {
    App
} from './modules/Appomata.js'

import todoMata from './automatas/todoMata'

let todoApp = new App("todoApp");
todoApp.run(todoMata, document.getElementById("todoApp"))