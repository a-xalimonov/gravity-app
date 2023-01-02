import { G } from "./constants"
import { Vector2D } from "./Vector2D"

export class Entity {

    constructor(params) {

        this.name = params.name
        this.position = params.position
        this.size = params.size
        this.image = new Image()
        this.image.src = require(`../images/${params.imageSrc}.png`)
    }

    draw(renderer) {
        renderer.drawSprite(this.position, this.size, this.image)
    }

    addForces() {
    }

    move() {
    }

}
export class PhysicalEntity extends Entity {

    constructor(params) {
        super(params)
        this.mass = params.mass
    }
}

export class MovingBody extends PhysicalEntity {

    constructor(params) {
        super(params)
        this.velocity = params.velocity ? params.velocity : Vector2D.zero
        this.angle = params.angle ? params.angle : 0
        this.angVelocity = params.angVelocity ? params.angVelocity : 0
    }

    addForces(entityList) {
        this.forces = new Vector2D(0, 0)
        entityList.forEach(entity => {
            if (entity !== this && (entity instanceof Planet || entity instanceof Star)) {

                const r = entity.position.sub(this.position)
                const F = G * this.mass * entity.mass / r.length() ** 2
                this.forces = this.forces.sum(r.normalize().mult(F))
            }
        })
    }

    move(dt) {
        const a = this.forces.div(this.mass)
        this.velocity = this.velocity.sum(a.mult(dt))
        this.position = Vector2D.sum(this.position, this.velocity.mult(dt))
        this.angle = (this.angle + this.angVelocity * (dt)) % (2 * Math.PI)
    }

    draw(renderer) {
        renderer.drawSprite(this.position, this.size, this.image, this.angle)
        if (renderer.showVectors) {
            renderer.drawVector(this.position, this.velocity, '#5050ff')
            renderer.drawVector(this.position, this.forces.div(this.mass * 0.3), '#ff5050')
        }
    }
}

export class Spaceship extends MovingBody {

    constructor(params) {
        super(params)
        this.masThrust = params.maxThrust
        this.thrust = false
        this.trajectory = []
    }

    addForces = (entityList) => {
        super.addForces(entityList)
        if (this.thrust) {
            const orientation = new Vector2D(Math.cos(this.angle), -Math.sin(this.angle))
            this.forces = this.forces.sum(orientation.mult(this.masThrust))
        }
    }

    draw = (renderer) => {
        if (this.thrust) {
            const orientation = new Vector2D(-Math.cos(this.angle), Math.sin(this.angle)).mult(10)
            renderer.drawVector(this.position, orientation, '#ede374')
        }
        super.draw(renderer)
    }
}

export class Star extends PhysicalEntity {

}
export class Planet extends MovingBody {

    constructor(params) {
        super(params)
        this.trajectory = []
    }

    draw = (renderer) => {
        if (this.trajectory.length > 500) {
            this.trajectory.shift()
        }
        this.trajectory.push(this.position)
        renderer.drawTrajectory(this.trajectory)
        super.draw(renderer)
    } 
}