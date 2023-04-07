import { MovingBody } from "./MovingBody"

export class Planet extends MovingBody {

    constructor(params) {
        super(params)
        this.gravity = true
        this.trajectory = []
    }

    move = (dt) => {
        super.move(dt)
        this.trajectory.push(this.position)
    }

    draw = (renderer) => {
        if (this.trajectory.length > 500) {
            this.trajectory.shift()
        }
        renderer.drawTrajectory(this.trajectory)
        super.draw(renderer)
    }
}