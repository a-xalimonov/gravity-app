import { G } from "./constants"
import { Vector2D } from "./Vector2D"

export class Entity {

    constructor(name, position, size, imgSrc = false) {
        this.name = name
        this.position = position
        this.size = size

        if (imgSrc) {
            this.image = new Image()
            this.image.src = require(`../images/${imgSrc}.png`)
        }
    }

    addForces() {
    }

    move() {
    }

    draw(renderer) {
        renderer.drawSprite(this.position, this.size, this.image)
    }

}
export class PhysicalEntity extends Entity {

    constructor(name, position, size, imgSrc, mass) {
        super(name, position, size, imgSrc)
        this.mass = mass
    }
}

export class MovingBody extends PhysicalEntity {

    constructor(name, position, size, imgSrc, mass, speed) {
        super(name, position, size, imgSrc, mass)
        this.speed = speed
    }

    addForces(entityList) {
        this.forces = new Vector2D(0, 0)
        entityList.forEach(entity => {
            if ((entity instanceof Planet || entity instanceof Star) && entity !== this) {

                const r = entity.position.sub(this.position)
                const F = G * this.mass * entity.mass / r.length() ** 2
                this.forces = this.forces.sum(r.normalize().mult(F))
            }
        })
    }

    move(dt) {
        const a = this.forces.div(this.mass)
        this.speed = this.speed.sum(a.mult(dt / 1000))
        this.position = Vector2D.sum(this.position, this.speed.mult(dt / 1000))
    }

    draw(renderer) {
        renderer.drawSprite(this.position, this.size, this.image)
        renderer.drawVector(this.position, this.speed, '#5050ff')
        renderer.drawVector(this.position, this.forces.div(this.mass * 0.3), '#ff5050')
    }
}

export class Spaceship extends MovingBody {

    constructor(name, position, size, imgSrc, mass, speed, thrust) {
        super(name, position, size, imgSrc, mass, speed)
        this.thrust = thrust
        this.thrust_left = 0
        this.thrust_right = 0
        this.thrust_up = 0
        this.thrust_down = 0
    }

    addForces = (entityList) => {
        this.forces = new Vector2D(0, 0)
        this.forces = Vector2D.sum(this.forces, Vector2D.up.mult(this.thrust_up), Vector2D.down.mult(this.thrust_down), Vector2D.left.mult(this.thrust_left), Vector2D.right.mult(this.thrust_right))
        entityList.forEach(entity => {
            if ((entity instanceof Planet || entity instanceof Star) && entity !== this) {

                const r = entity.position.sub(this.position)
                const F = G * this.mass * entity.mass / r.length() ** 2
                this.forces = this.forces.sum(r.normalize().mult(F))
            }
        })
    }
}

export class Star extends PhysicalEntity {

}
export class Planet extends MovingBody {

}