import { Star } from './entities/Star'
import { Planet } from './entities/Planet'
import { Spaceship } from './entities/Spaceship'
import { MovingBody } from './entities/MovingBody'

import { Vector2D } from './Vector2D'

export const map = [
    new Star({ // Солнце
        name: 'Sun',
        position: new Vector2D(0, 0),
        imageSrc: 'star',
        size: new Vector2D(200, 200),
        mass: 1.64e17,
    }),
    new Planet({ // Меркурий
        name: 'Mercury',
        position: new Vector2D(-387.7, 0),
        imageSrc: 'mercury',
        size: new Vector2D(20, 20),
        mass: 5e13,
        velocity: new Vector2D(0, 166.86),
        angVelocity: 0.3,
    }),
    new Planet({ // Венера
        name: 'Venus',
        position: new Vector2D(-721.93, 0),
        imageSrc: 'venus',
        size: new Vector2D(40, 40),
        mass: 5e14,
        velocity: new Vector2D(0, 123.39),
        angVelocity: 0.3,
    }),
    new Planet({ // Земля
        name: 'Earth',
        position: new Vector2D(-1000, 0),
        imageSrc: 'earth',
        size: new Vector2D(40, 40),
        mass: 5e14,
        velocity: new Vector2D(0, 104.72),
        angVelocity: 0,
    }),
    new Planet({ // Марс
        name: 'Mars',
        position: new Vector2D(-1524.06, 0),
        imageSrc: 'mars',
        size: new Vector2D(20, 20),
        mass: 1e14,
        velocity: new Vector2D(0, 85.02),
        angVelocity: 0.3,
    }),
    new Planet({ // Юпитер
        name: 'Jupiter',
        position: new Vector2D(-5203.81, 0),
        imageSrc: 'jupiter',
        size: new Vector2D(80, 80),
        mass: 5e15,
        velocity: new Vector2D(0, 45.96),
        angVelocity: 0.3,
    }),
    new Planet({ // Сатурн
        name: 'Saturn',
        position: new Vector2D(-9582.55, 0),
        imageSrc: 'saturn',
        size: new Vector2D(80, 80),
        mass: 5e15,
        velocity: new Vector2D(0, 34.04),
        angVelocity: 0.3,
    }),
    new Planet({ // Уран
        name: 'Uranus',
        position: new Vector2D(-19229.39, 0),
        imageSrc: 'uranus',
        size: new Vector2D(40, 40),
        mass: 5e15,
        velocity: new Vector2D(0, 23.91),
        angVelocity: 0.3,
    }),
    new Planet({ // Нептун
        name: 'Neptune',
        position: new Vector2D(-30103.63, 0),
        imageSrc: 'neptune',
        size: new Vector2D(40, 40),
        mass: 5e15,
        velocity: new Vector2D(0, 19.09),
        angVelocity: 0.3,
    }),
    new Spaceship({ // Корабль
        name: 'Player',
        position: new Vector2D(-1035, 0),
        imageSrc: 'spacecraft',
        size: new Vector2D(8, 8),
        mass: 4,
        maxThrust: 300,
        velocity: new Vector2D(0, 135),
    }),
    new MovingBody({ // Спутник земли
        name: 'Satellite',
        position: new Vector2D(-965, 0),
        imageSrc: 'satellite',
        size: new Vector2D(5, 5),
        mass: 1,
        velocity: new Vector2D(0, 75),
        angVelocity: 0.2
    }),
]