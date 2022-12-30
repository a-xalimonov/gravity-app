import { Vector2D } from "./Vector2D";

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

    updateCamera = (position) => {
        this.focus = position
        const v0 = this.focus.sub(new Vector2D(this.width / 2 / this.scale, this.height / 2 / this.scale)).mult(this.scale)
        this.ctx.setTransform(this.scale, 0, 0, this.scale, -v0.x, -v0.y)
    }

    fillBackground = () => {
        this.ctx.save()
        this.ctx.resetTransform()
        this.ctx.drawImage(this.backgorund, 0, 0)
        this.ctx.restore()
    }

    drawSprite = (vector, size, image, rotation) => {

        const half = size / 2
        
        this.ctx.save()
        this.ctx.translate(vector.x, vector.y) // Перенос центра холста для вращения
        this.ctx.rotate(-rotation)
        this.ctx.drawImage(image, -half, -half, size, size)
        this.ctx.restore()
    }

    drawVector = (position, vector, color = '#ffffff') => {
        const end = position.sum(vector)
        this.ctx.strokeStyle = color

        this.ctx.beginPath()
        this.ctx.moveTo(position.x, position.y)
        this.ctx.lineTo(end.x, end.y)
        this.ctx.closePath()
        this.ctx.stroke()
    }
}