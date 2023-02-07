import { Vector2D } from "../Vector2D"
import { MovingBody } from "./MovingBody"

export class Spaceship extends MovingBody {

    constructor(params) {
        super(params)
        this.masThrust = params.maxThrust
        this.thrust = false
        this.trajectory = []
    }

    applyForces = (entityList) => {
        super.applyForces(entityList)
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