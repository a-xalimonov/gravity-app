import React from "react"
import { Simulation } from "../../modules/Simulation"
import "./Canvas.css"

export default class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.newCanvas = React.createRef()
    }

    componentDidMount = () => {
        this.newCanvas.current.width = window.innerWidth
        this.newCanvas.current.height = window.innerHeight
        const sim = new Simulation(this.newCanvas.current)
    }

    render() {
        const canvasElement =
        <canvas
            ref={this.newCanvas}
            className="canvas"
        />
        return (
            <>
                {canvasElement}
            </>
        )
    }
}