import "./App.css"
import Canvas from "./components/Canvas/Canvas.js"
import Controls from "./components/Controls/Controls"
import { useState } from "react"

function App() {
    const [showControls, setControlsVisibility] = useState(false)
    function changeControlsVisibility() {
        setControlsVisibility(!showControls)
    }
    return (
        <div className="App">
            <Canvas />
            <button
                className="controls-button"
                onClick={changeControlsVisibility}
            >
              УПРАВЛЕНИЕ
            </button>
            {showControls && <Controls />}
        </div>
    )
}

export default App
