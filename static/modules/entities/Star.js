import { PhysicalEntity } from "./PhysicalEntity"
export class Star extends PhysicalEntity {

    constructor(params) {
        super(params)
        this.gravity = true
    }
}