import { G } from "./constants"
import { Vector2D } from "./Vector2D"

export class Entity {

    constructor(name, position, size, imgSrc) {
        this.name = name
        this.position = position
        this.size = size

        this.image = new Image()
        this.image.src = require("../images/" + imgSrc)

    }

    addForces() {
    }

    move() {
    }

    draw(context) {
        const half = this.size / 2
        context.drawImage(this.image, this.position.x - half, this.position.y - half, this.size, this.size)
    }

}
export class PhysicalEntity extends Entity {

    constructor(name, position, size, imgSrc, mass) {
        super(name, position, size, imgSrc)
        this.mass = mass
    }
}

export class Star extends PhysicalEntity {

}

export class MovingBody extends PhysicalEntity {

    constructor(name, position, size, imgSrc, mass, speed) {
        super(name, position, size, imgSrc, mass)
        this.speed = speed
    }

    addForces(entityList) {
        this.forces = new Vector2D(0, 0)
        entityList.forEach(entity => {
            if((entity instanceof Planet || entity instanceof Star) && entity != this) {

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
}

export class Planet extends MovingBody {

}