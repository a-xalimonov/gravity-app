import { Renderer } from "./Renderer"
import { InputHandler } from "./InputHandler"
import { map } from "./map"
import { Player } from "./Player"
import { MPSession } from "./MPSession"

export class Simulation {

    constructor(mp = false) {

        this.entityList = map
        this.player = new Player(this.entityList['player'])

        if (mp) {
            const mpSession = new MPSession(this.entityList, this.player)
            mpSession.connect()
        }

        this.target = 'star'
        this.renderer = new Renderer()
        this.renderer.focus = this.player.entity
        this.input = new InputHandler(this)
        this.pause = false
        this.t0 = 0

        window.requestAnimationFrame(this.loop)
    }

    nextTarget() {
        const keys = Object.keys(this.entityList)
        const index = keys.indexOf(this.target)
        this.target = keys.at((index + 1) % keys.length)
    }

    previousTarget() {
        const keys = Object.keys(this.entityList)
        const index = keys.indexOf(this.target)
        this.target = keys.at(index - 1)
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
        this.renderer.drawTarget(this.player, this.entityList[this.target])

        this.requestID = window.requestAnimationFrame(this.loop)
    }
}