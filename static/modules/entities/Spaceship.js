import { Vector2D } from "../Vector2D"
import { MovingBody } from "./MovingBody"

export class Spaceship extends MovingBody {

    constructor(params) {
        super(params)
        this.masThrust = params.maxThrust
        this.thrust = false
    }

    applyForces(entityList) {
        super.applyForces(entityList)
        if (this.thrust) {
            const orientation = new Vector2D(Math.cos(this.angle), -Math.sin(this.angle))
            this.forces = this.forces.sum(orientation.mult(this.masThrust))
        }
    }

    draw(renderer) {
        if (this.thrust) {
            const orientation = new Vector2D(-Math.cos(this.angle), Math.sin(this.angle)).mult(10)
            renderer.drawVector(this.position, orientation, '#ede374')
        }
        super.draw(renderer)
    }

    MPSpawn() {
        const [x, y] = [Math.floor(-1000 + 20 * Math.random()), Math.floor(-1000 + 20 * Math.random())]
        this.position = new Vector2D(x, y)
        this.velocity = Vector2D.zero
    }

    pack() {
        const res = super.pack()
        res.thrust = this.thrust
        return res
    }
}