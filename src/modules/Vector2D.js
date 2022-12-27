export class Vector2D {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() {
        const length = this.length()
        if (!length) {
            console.log("Length is 0!")
            return
        } 
        return new Vector2D(this.x / length, this.y / length)
    }

    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y
    }

    dot(v) {
        return Vector2D.dot(this, v)
    }

    mult(n) {
        return new Vector2D(this.x * n, this.y * n)
    }

    div(n) {
        return new Vector2D(this.x / n, this.y / n)
    }

    static sum(...vectors) {
        let x = 0, y = 0
        vectors.forEach((v) => {
            x += v.x
            y += v.y
        })
        return new Vector2D(x, y)
    }

    sum(v) {
        return Vector2D.sum(this, v)
    }

    static sub(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y)
    }

    sub(v) {
        return Vector2D.sub(this, v)
    }
}