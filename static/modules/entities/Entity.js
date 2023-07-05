import { Vector2D } from "../Vector2D"

export class Entity {

    constructor(params) {
        this.name = params.name
        this.position = params.position
        this.size = params.size
        this.imageSrc = params.imageSrc
        ;(this.image = new Image()).src = `/static/images/${this.imageSrc}.png`
        this.velocity = Vector2D.zero
    }

    draw(renderer) {
        renderer.drawSprite(this.position, this.size, this.image)
    }

    applyForces() {
    }

    collisionResponse() {
    }

    accelerate() {
    }

    move() {
    }

    pack() {
        return {
            timestamp: Date.now(),
            position: this.position,
            velocity: this.velocity,
        }
    }
}