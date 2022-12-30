import {Planet, Star, Spaceship} from './Entities'
import { Vector2D } from './Vector2D'

export const map = [
    new Star({ // Солнце
        name: "Sun",
        position: new Vector2D(0, 0),
        imageSrc: 'star',
        size: 150,
        mass: 1.64e17,
    }),
    new Planet({ // Земля
        name: "Earth",
        position: new Vector2D(-1000, 0),
        imageSrc: 'earth',
        size: 30,
        mass: 4.93e14,
        velocity: new Vector2D(0, 104.72),
        angVelocity: 0.3,
    }),
    new Planet({ // Меркурий
        name: "Mercury",
        position: new Vector2D(-387.7, 0),
        imageSrc: 'mercury',
        size: 15,
        mass: 1e14,
        velocity: new Vector2D(0, 166.86),
        angVelocity: 0.3,
    }),
    new Planet({ // Венера
        name: "Venus",
        position: new Vector2D(-721.93, 0),
        imageSrc: 'venus',
        size: 20,
        mass: 1e14,
        velocity: new Vector2D(0, 123.39),
        angVelocity: 0.3,
    }),
    new Planet({ // Марс
        name: "Mars",
        position: new Vector2D(-1524.06, 0),
        imageSrc: 'mars',
        size: 20,
        mass: 1e14,
        velocity: new Vector2D(0, 85.02),
        angVelocity: 0.3,
    }),
    new Spaceship({ // Корабль
        name: "Player",
        position: new Vector2D(-1030, 0),
        imageSrc: 'spacecraft',
        size: 10,
        mass: 1,
        maxThrust: 140,
        velocity: new Vector2D(0, 135),
    }),
]