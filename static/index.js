import { Simulation } from "./modules/Simulation.js"

const canvas = document.getElementsByClassName('canvas')[0]
canvas.width = window.innerWidth
canvas.height = window.innerHeight
new Simulation(true)
