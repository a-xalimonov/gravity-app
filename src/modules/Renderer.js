import { Vector2D } from "./Vector2D";
import { Entity } from "./Entities";

export class Renderer {

    constructor(ctx, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scale = 1
        this.focus = Vector2D.zero

        this.showVectors = false
        this.backgorund = new Image()
        this.backgorund.src = require("../images/background.png")
    }

    drawTrajectory = (trajectory) => {
        this.ctx.beginPath()
        trajectory.forEach((point, index) => {
            this.ctx.lineTo(point.x, point.y)
        });
        this.ctx.strokeStyle = '#505050'
        this.ctx.stroke()
    }

    updateCamera = () => {
        let focusVector
        if (this.focus instanceof Entity) {
            focusVector = this.focus.position
        }
        else {
            focusVector = this.focus
        }
        const v0 = focusVector
            .sub(new Vector2D(this.width / 2 / this.scale, this.height / 2 / this.scale))
            .mult(this.scale)
        this.ctx.setTransform(this.scale, 0, 0, this.scale, -v0.x, -v0.y)
    }

    fillBackground = () => {
        this.ctx.save()
        this.ctx.resetTransform()
        this.ctx.drawImage(this.backgorund, 0, 0)
        this.ctx.restore()
    }

    drawSprite = (vector, size, image, rotation) => {

        this.ctx.save()
        this.ctx.translate(vector.x, vector.y) // Перенос центра холста для вращения
        this.ctx.rotate(-rotation)
        this.ctx.drawImage(image, -size.x / 2, -size.y / 2, size.x, size.y)
        this.ctx.restore()
    }

    drawVector = (position, vector, color = '#aaaaaa') => {
        const end = position.sum(vector)
        this.ctx.strokeStyle = color

        this.ctx.beginPath()
        this.ctx.moveTo(position.x, position.y)
        this.ctx.lineTo(end.x, end.y)
        this.ctx.stroke()
    }
}