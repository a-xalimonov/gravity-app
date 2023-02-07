import { Vector2D } from "../Vector2D"

export class Entity {

    constructor(params) {

        this.name = params.name
        this.position = params.position
        this.size = params.size
        this.image = new Image()
        this.image.src = require(`../../images/${params.imageSrc}.png`)
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
}