import { Vector2D } from "./Vector2D";

export class InputHandler {
    constructor(simulation) {

        this.sim = simulation
        
        const canvas = document.getElementsByClassName('canvas')[0]
        canvas.addEventListener("wheel", (e) => {
            this.sim.renderer.scale = Math.max(this.sim.renderer.scale * 1.5 ** (-e.deltaY / 200), 0.005
            )
        });
        window.addEventListener("keydown", (e) => {
            const playerEntity = this.sim.player.entity
            if (e.code === 'Escape') {
                this.sim.pause = !this.sim.pause
            }
            if (e.code === 'KeyV') {
                this.sim.renderer.showVectors = !this.sim.renderer.showVectors
            }
            if (e.code === 'KeyT') {
                this.sim.renderer.showTarget = !this.sim.renderer.showTarget
            }
            if (e.code === 'KeyW') {
                playerEntity.thrust = true
            }
            if (e.code === 'KeyQ') {
                playerEntity.angVelocity = 2.3
            }
            if (e.code === 'KeyE') {
                playerEntity.angVelocity = -2.3
            }
            if (e.code === 'Period') {
                this.sim.nextTarget()
            }
            if (e.code === 'Comma') {
                this.sim.previousTarget()
            }
            if (e.code.startsWith('Arrow')) {
                let focusPos
                if (this.sim.renderer.focus.position) {
                    focusPos = this.sim.renderer.focus.position
                }
                else {
                    focusPos = this.sim.renderer.focus
                }
                const speed = 15 / this.sim.renderer.scale
                if (e.code.includes('Left')) {
                    this.sim.renderer.focus = focusPos.sum(Vector2D.left.mult(speed))
                }
                if (e.code.includes('Up')) {
                    this.sim.renderer.focus = focusPos.sum(Vector2D.up.mult(speed))
                }
                if (e.code.includes('Right')) {
                    this.sim.renderer.focus = focusPos.sum(Vector2D.right.mult(speed))
                }
                if (e.code.includes('Down')) {
                    this.sim.renderer.focus = focusPos.sum(Vector2D.down.mult(speed))
                }
            }
            if (e.code === 'Tab') {
                this.sim.renderer.focus = this.sim.player.entity
            }
        });
        window.addEventListener("keyup", (e) => {
            const playerEntity = this.sim.player.entity
            if (e.code === 'KeyW') {
                playerEntity.thrust = false
            }
            if (e.code === 'KeyQ' || e.code === 'KeyE') {
                playerEntity.angVelocity = 0
            }
        });
    }
}