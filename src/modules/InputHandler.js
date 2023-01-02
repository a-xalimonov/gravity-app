export class InputHandler {
    constructor(canvas, renderer, player) {

        this.renderer = renderer
        this.player = player
        
        canvas.addEventListener("wheel", (e) => {
            this.renderer.scale = Math.max(this.renderer.scale * 1.5 ** (-e.deltaY / 200), 0.005
            )
        });
        window.addEventListener("keydown", (e) => {
            if (e.code === 'KeyV') {
                this.renderer.showVectors = !this.renderer.showVectors
            }
            if (e.code === 'KeyW') {
                this.player.thrust = true
            }
            if (e.code === 'KeyQ') {
                this.player.angVelocity = 2.3
            }
            if (e.code === 'KeyE') {
                this.player.angVelocity = -2.3
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.code === 'KeyW') {
                this.player.thrust = false
            }
            if (e.code === 'KeyQ' || e.code === 'KeyE') {
                this.player.angVelocity = 0
            }
        });
    }
}