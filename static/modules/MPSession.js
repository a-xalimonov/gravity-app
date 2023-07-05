import { Spaceship } from "./entities/Spaceship"
import { Vector2D } from "./Vector2D"

export class MPSession {
    constructor(entityList, player) {
        this.entityList = entityList
        this.player = player.entity
        this.id = null
        this.host = false
    }

    connect() {
        const url = `${window.location.origin}/connect`
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.id = json.id
            this.host = json.host
            this.entityList[this.id] = this.player
            delete this.entityList['player']
            this.player.MPSpawn()
            this.sync()
        })
    }
    
    sync() {
        const socket = new WebSocket(`ws://${window.location.hostname}:5001`)
        socket.onopen = (event) => {
            socket.send(this.wrapMessage())
        }
        socket.onmessage = (event) => {
            this.unwrapMessage(event.data)
            setTimeout(() => {
                socket.send(this.wrapMessage())
            }, 20)
        }
    }

    wrapMessage() {
        const res = {
            id: this.id,
            data: {}
        }
        if (this.host) {
            for (let key in this.entityList) {
                res.data[key] = this.entityList[key].pack()
            }
        }
        else {
            res.data[this.id] = this.player.pack()
        }
        return JSON.stringify(res)
    }

    unwrapMessage(data) {
        const newEntities = JSON.parse(data)
        for (let key in newEntities) {
            const newEntity = newEntities[key]
            if (key in this.entityList) {
                const entity = this.entityList[key]
                const dt = (Date.now() - newEntity.timestamp) / 1000
                console.log(dt)
                entity.position.x = newEntity.position.x
                entity.position.y = newEntity.position.y
                entity.velocity.x = newEntity.velocity.x
                entity.velocity.y = newEntity.velocity.y
                entity.position = Vector2D.sum(entity.position, entity.velocity.mult(dt))
                entity.angle = newEntity.angle
                entity.angVelocity = newEntity.angVelocity
            }
            else {
                this.entityList[key] = new Spaceship({
                    name: 'Player',
                    position: new Vector2D(newEntity.position.x, newEntity.position.y),
                    imageSrc: 'spacecraft',
                    size: new Vector2D(8, 8),
                    mass: 4,
                    maxThrust: 300,
                    velocity: new Vector2D(newEntity.velocity.x, newEntity.velocity.y),
                    angVelocity: newEntity.angVelocity,
                    angle: newEntity.angVelocity,
                    thrust: newEntity.thrust,
                })
            }
        }
    }
}