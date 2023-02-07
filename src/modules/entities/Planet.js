import { MovingBody } from "./MovingBody"

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