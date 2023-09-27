import React from "react"
import "./Controls.css"
import controlsImage from "../../images/controls.png"

export default function Controls() {
    return (
        <div className="controls-window">
            <img src={controlsImage} alt="controls" />
        </div>
    )
}
