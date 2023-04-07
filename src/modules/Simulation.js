import { Renderer } from "./Renderer"
import { InputHandler } from "./InputHandler"
import { map } from "./map"
import { Player } from "./Player"

export class Simulation {

    constructor(canvas) {
        this.entityList = map
        this.player = new Player(this.getEntityByName('Player'))
        this.targetIndex = 0
        this.player.target = map[this.targetIndex]

        this.renderer = new Renderer(canvas.getContext('2d'), canvas.width, canvas.height)
        this.renderer.focus = this.player.entity
        this.input = new InputHandler(canvas, this)

        this.pause = false
        this.t0 = 0
        window.requestAnimationFrame(this.loop)
    }

    loop = (t) => {
        let dt = Math.min(t - this.t0, 17) / 1000
        this.t0 = t
        // Calculate
        if (!this.pause) {
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
        // Draw
        this.renderer.fillBackground()
        this.renderer.updateCamera()
        this.entityList.forEach(entity => {
            entity.draw(this.renderer)
        })
        this.renderer.drawEntityMark(this.player.entity)
        this.renderer.drawTarget(this.player)

        this.requestID = window.requestAnimationFrame(this.loop)
    }

    getEntityByName = (name) => {
        return this.entityList.find((entity) => entity.name === name)
    }
}