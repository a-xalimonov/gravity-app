import { Vector2D } from "./Vector2D";

export class Renderer {

    constructor(ctx, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scale = 1
        this.focus = Vector2D.zero
        this.planet = undefined

        this.showVectors = false
        this.showTarget = false
        this.backgorund = new Image()
        this.backgorund.src = require("../images/background.png")
    }

    updateCamera = () => {
        const focusVector = this.focus.position ? this.focus.position : this.focus
        this.ctx.resetTransform()
        this.ctx.translate(this.width / 2, this.height / 2)
        this.ctx.scale(this.scale, this.scale)
        this.ctx.rotate(this.angle)
        this.ctx.translate(-focusVector.x, -focusVector.y)
    }

    fillBackground = () => {
        this.ctx.save()
        this.ctx.resetTransform()
        this.ctx.drawImage(this.backgorund, 0, 0)
        this.ctx.restore()
    }

    drawSprite = (vector, size, image, rotation = 0) => {

        this.ctx.save()
        this.ctx.translate(vector.x, vector.y) // Перенос центра холста для вращения
        this.ctx.rotate(-rotation)
        this.ctx.drawImage(image, -size.x / 2, -size.y / 2, size.x, size.y)
        this.ctx.restore()
    }

    drawVector = (position, vector, color = '#aaaaaa') => {
        const end = position.sum(vector)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 1

        this.ctx.beginPath()
        this.ctx.moveTo(position.x, position.y)
        this.ctx.lineTo(end.x, end.y)
        this.ctx.stroke()
    }

    drawEntityMark = (entity) => {
        if (this.scale > 0.6) {
            return
        }
        const pos = new Vector2D(entity.position.x, entity.position.y)
        const height = 8 / this.scale
        const offset = -4 / this.scale

        this.ctx.save()
        this.ctx.translate(pos.x, pos.y) // Перенос центра холста для вращения
        this.ctx.rotate(0)

        this.ctx.strokeStyle = '#51a857'
        this.ctx.lineWidth = 2 / this.scale
        this.ctx.beginPath()
        this.ctx.moveTo(0, offset)
        this.ctx.lineTo(- height, offset - height)
        this.ctx.lineTo(height, offset - height)
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.restore()
    }

    drawTarget = (player) => {
        if (!player.target || !this.showTarget) {
            return
        }
        let targetVector = player.target.position.sub(player.entity.position)
        const dist = targetVector.length()
        const vectorLength = Math.max(0, Math.min(20, Math.sqrt(dist - 100)))
        targetVector = targetVector.normalize()
        this.drawVector(player.entity.position.sum(targetVector.mult(10)), targetVector.mult(vectorLength), '#51a857')
        this.drawTargetMark(player.target)
        this.drawTargetInfo(player)
    }

    drawTargetMark = (entity) => {
        const radius = Math.max(entity.size.length() / 2, 20 / this.scale)
        const center = entity.position
        const labelPos = new Vector2D(center.x, center.y - radius - 10 / this.scale)
        const color = '#51a857'

        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 1.5 / this.scale
        this.ctx.beginPath()
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
        this.ctx.stroke()

        this.ctx.fillStyle = color
        this.ctx.font = `${15 / this.scale}px arial`
        this.ctx.textAlign = 'center'
        this.ctx.fillText(entity.name.toUpperCase(), labelPos.x, labelPos.y)
    }

    drawTargetInfo = (player) => {
        const entity = player.target
        const imagePos = new Vector2D(70, this.height - 70)
        const labelPos = new Vector2D(140, this.height - 130)
        const imgSize = new Vector2D(100, 100)
        const text = [
            `NAME: ${entity.name}`,
            `MASS: ${entity.mass}kg`,
            `SPEED: ${entity.velocity.length()}km/s`,
            `HEIGHT: ${entity.size.x}km`,
            `WIDTH: ${entity.size.y}km`,
            `DIST: ${player.entity.position.sub(entity.position).length()}km`]

        this.ctx.save()
        this.ctx.resetTransform()
        this.drawSprite(imagePos, imgSize, entity.image)
        this.ctx.fillStyle = '#51a857'
        this.ctx.font = `${20}px arial`
        this.ctx.textAlign = 'left'
        for (let i = 0; i < text.length; i++) {
            this.ctx.fillText(text[i], labelPos.x, labelPos.y + i * 22)
        }
        this.ctx.restore()
    }

    drawTrajectory = (trajectory) => {
        this.ctx.lineWidth = 1 / this.scale
        this.ctx.beginPath()
        trajectory.forEach((point) => {
            this.ctx.lineTo(point.x, point.y)
        });
        this.ctx.strokeStyle = '#505050'
        this.ctx.stroke()
    }
}