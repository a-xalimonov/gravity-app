import { Vector2D } from "./Vector2D";

export class Renderer {

    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.showVectors = false
        this.focus = Vector2D.zero
        this.scale = 1
    }

    fillBackground = () => {
        const ctx = this.canvas.getContext("2d")
        const image = new Image()
        image.src = require("../images/background.png")
        ctx.drawImage(image, 0, 0)
    }

    drawSprite = (vector, size, image) => {

        const ctx = this.canvas.getContext("2d")
        const half = size / 2
        const newSize = size * this.scale
        const newVector = this.convert(vector.sub(new Vector2D(half, half)))
        ctx.drawImage(image, newVector.x, newVector.y, newSize, newSize)
    }

    drawVector = (position, vector, color = '#ffffff') => {
        if (this.showVectors) {
            const ctx = this.canvas.getContext("2d")
            const start = this.convert(position)
            const end = this.convert(position.sum(vector))
            ctx.strokeStyle = color

            ctx.beginPath()
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(end.x, end.y)
            ctx.closePath()
            ctx.stroke()
        }
    }

    convert = (vector) => {
        const topLeft = this.focus.sub(new Vector2D(this.width / 2 / this.scale, this.height / 2 / this.scale))
        const outVector = vector.sub(topLeft).mult(this.scale)
        return outVector
    }
}