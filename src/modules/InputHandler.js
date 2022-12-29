export class InputHandler {
    constructor(renderer, player) {

        this.renderer = renderer
        this.player = player
        
        window.addEventListener("wheel", (e) => {
            this.renderer.scale = Math.max(this.renderer.scale - e.deltaY / 1000, 0.1)
            if (this.renderer.scale <= 0) {
                this.renderer.scale = 0.1
            }
        });
        window.addEventListener("keydown", (e) => {
            console.log("Down", e.code)
            console.log(this.renderer)
            if (e.code === 'KeyV') {
                this.renderer.showVectors = !this.renderer.showVectors
            }
            if (e.code === 'KeyW') {
                this.player.thrust_up = this.player.thrust
            }
            if (e.code === 'KeyS') {
                this.player.thrust_down = this.player.thrust
            }
            if (e.code === 'KeyA') {
                this.player.thrust_left = this.player.thrust
            }
            if (e.code === 'KeyD') {
                this.player.thrust_right = this.player.thrust
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.code === 'KeyW') {
                this.player.thrust_up = 0
            }
            if (e.code === 'KeyS') {
                this.player.thrust_down = 0
            }
            if (e.code === 'KeyA') {
                this.player.thrust_left = 0
            }
            if (e.code === 'KeyD') {
                this.player.thrust_right = 0
            }
        });
    }
}