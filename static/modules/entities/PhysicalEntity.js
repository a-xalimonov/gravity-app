import { Entity } from "./Entity"

export class PhysicalEntity extends Entity {

    constructor(params) {
        super(params)
        this.mass = params.mass
        this.gravity = false
    }
}