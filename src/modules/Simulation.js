import { MovingBody, Planet, Star } from "./Entities"
import { Vector2D } from "./Vector2D"

export class Simulation {

    constructor(canvas) {
        this.canvas = canvas

        this.entityList = [
            new Star("Star", new Vector2D(900, 400), 150, "star.png", 2e18),
            new Planet("Planet1", new Vector2D(500, 400), 40, "earth.png", 1e17, new Vector2D(0, 600)),
            new MovingBody("o1", new Vector2D(470, 400), 20, "mercury.png", 1, new Vector2D(0, 1100)),
            new Planet("Planet2", new Vector2D(1100, 400), 40, "mercury.png", 1e16, new Vector2D(0, -800)),
        ]

        this.t0 = performance.now()
        window.requestAnimationFrame(this.loop)
    }

    loop = (t) => {
        this.recalculate(t)
        this.redraw()
        window.requestAnimationFrame(this.loop)
    }

    recalculate = (t) => {
        const dt = t - this.t0
        this.t0 = t

        this.entityList.forEach(entity => {
            entity.addForces(this.entityList)
        })
        this.entityList.forEach(entity => {
            entity.move(dt)
        })
    }

    redraw = () => {
        const ctx = this.canvas.getContext("2d")

        ctx.fillStyle = "#000510"
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.entityList.forEach(entity => {
            entity.draw(ctx)
        })
    }
}