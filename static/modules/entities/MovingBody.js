import { G } from "../constants"
import { Vector2D } from "../Vector2D"
import { PhysicalEntity } from "./PhysicalEntity"

export class MovingBody extends PhysicalEntity {

    constructor(params) {
        super(params)
        this.velocity = params.velocity ? params.velocity : Vector2D.zero
        this.angle = params.angle ? params.angle : 0
        this.angVelocity = params.angVelocity ? params.angVelocity : 0
    }

    applyForces(entityList) {
        this.forces = Vector2D.zero
        entityList.forEach(entity => {
            if (entity !== this && entity.gravity) {
                const r = entity.position.sub(this.position)
                const F = G * this.mass * entity.mass / r.length() ** 2
                this.forces = this.forces.sum(r.normalize().mult(F))
            }
        })
    }

    collisionResponse(entityList) {
        this.forces = Vector2D.zero
        entityList.forEach(entity => {
            if (entity !== this) {
                const r = entity.position.sub(this.position)
                if (r.length() < (this.size.x + entity.size.x) / 2) {
                    const collision = r.normalize().mult(
                        -1.5 * 60 * Math.max(0, this.velocity.sub(entity.velocity).dot(r.normalize())) / (1 / this.mass + 1 / entity.mass)
                    )
                    this.forces = this.forces.sum(collision)
                }
            }
        })
    }

    accelerate(dt) {
        const a = this.forces.div(this.mass)
        this.velocity = this.velocity.sum(a.mult(dt))
    }

    move(dt) {
        this.position = Vector2D.sum(this.position, this.velocity.mult(dt))
        this.angle = (this.angle + this.angVelocity * (dt)) % (2 * Math.PI)
    }

    draw(renderer) {
        if (renderer.showVectors) {
            renderer.drawVector(this.position, this.velocity, '#5050ff')
            renderer.drawVector(this.position, this.forces.div(this.mass * 0.3), '#ff5050')
        }
        renderer.drawSprite(this.position, this.size, this.image, this.angle)
    }
    
    pack() {
        const res = super.pack()
        res.angle = this.angle
        res.angVelocity = this.angVelocity
        return res
    }
}