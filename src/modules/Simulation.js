import { Renderer } from "./Renderer"
import { InputHandler } from "./InputHandler"
import { map } from "./map"

export class Simulation {

    constructor(canvas) {
        this.entityList = map

        this.renderer = new Renderer(canvas.getContext('2d'), canvas.width, canvas.height)
        this.input = new InputHandler(canvas, this.renderer, this.entityList[5])

        this.renderer.focus = this.entityList[5]
        this.t0 = 0
        window.requestAnimationFrame(this.loop)
    }

    loop = (t) => {
        this.recalculate(t)
        this.redraw()
        window.requestAnimationFrame(this.loop)
    }

    recalculate = (t) => {
        const dt = Math.min(t - this.t0, 17) / 1000
        this.t0 = t

        this.entityList.forEach(entity => {
            entity.applyForces(this.entityList)
            entity.accelerate(dt)
        })
        this.entityList.forEach(entity => {
            entity.collisionResponse(this.entityList)
            entity.accelerate(dt)
        })
        this.entityList.forEach(entity => {
            entity.move(dt)
        })
    }

    redraw = () => {
        this.renderer.updateCamera()
        this.renderer.fillBackground()
        this.entityList.forEach(entity => {
            entity.draw(this.renderer)
        })
    }
}