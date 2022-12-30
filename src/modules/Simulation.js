import { Renderer } from "./Renderer"
import { Planet, Spaceship, Star } from "./Entities"
import { Vector2D } from "./Vector2D"
import { InputHandler } from "./InputHandler"

export class Simulation {

    constructor(canvas) {
        this.entityList = [
            new Star("Sun", new Vector2D(0, 0), 150, 'star', 1.64e17),
            new Planet("Earth", new Vector2D(-1000, 0), 30, 'earth', 4.93e14, new Vector2D(0, 104.72)),
            new Planet("Mercury", new Vector2D(-387.7, 0), 15, 'mercury', 1e14, new Vector2D(0, 166.86)),
            new Planet("Venus", new Vector2D(-721.93, 0), 20, 'venus', 1e14, new Vector2D(0, 123.39)),
            new Planet("Mars", new Vector2D(-1524.06, 0), 20, 'mars', 1e14, new Vector2D(0, 85.02)),
            new Spaceship("Player", new Vector2D(-1030, 0), 10, 'shuttle', 1, new Vector2D(0, 135), 200),
        ]

        this.renderer = new Renderer(canvas)
        this.input = new InputHandler(this.renderer, this.entityList[5])

        this.t0 = 0
        window.requestAnimationFrame(this.loop)
    }

    loop = (t) => {
        this.recalculate(t)
        this.redraw()
        window.requestAnimationFrame(this.loop)
    }

    recalculate = (t) => {
        const dt = Math.min(t - this.t0, 17)
        this.t0 = t

        this.entityList.forEach(entity => {
            entity.addForces(this.entityList)
        })
        this.entityList.forEach(entity => {
            entity.move(dt)
        })
    }

    redraw = () => {
        this.renderer.focus = this.entityList[5].position

        this.renderer.fillBackground()
        this.entityList.forEach(entity => {
            entity.draw(this.renderer)
        })
    }
}