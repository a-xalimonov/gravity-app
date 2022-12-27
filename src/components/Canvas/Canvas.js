import React from "react"
import { Simulation } from "../../modules/Simulation"
import "./Canvas.css"

export class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.newCanvas = React.createRef()
    }

    componentDidMount = () => {
        const sim = new Simulation(this.newCanvas.current)
        this.newCanvas.current.width = window.innerWidth - 20
        this.newCanvas.current.height = window.innerHeight - 20
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