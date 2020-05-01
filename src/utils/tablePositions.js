export function getCoordsByPlace(place) {
    switch (place) {
        case 1: {
            return {
                top: 300,
                left: 500,
                chips: {top: -40, left: 25},
                fold: {top: -20, left: 95},
                button: {top: -10, left: 5}
            }
        }
        case 2: {
            return {
                top: 120,
                left: 700,
                chips: {top: 50, left: -125},
                fold: {top: 20, left: -45},
                button: {top: 70, left: -40}
            }
        }
        case 3: {
            return {
                top: -80,
                left: 500,
                chips: {top: 130, left: 55},
                fold: {top: 110, left: 25},
                button: {top: 110, left: -10}
            }
        }
        case 4: {
            return {
                top: -80,
                left: 100,
                chips: {top: 130, left: 95},
                fold: {top: 110, left: 55},
                button: {top: 110, left: 150}
            }
        }
        case 5: {
            return {
                top: 120,
                left: -150,
                chips: {top: 50, left: 255},
                fold: {top: 10, left: 195},
                button: {top: 60, left: 210}
            }
        }
        case 6: {
            return {
                top: 300,
                left: 100,
                chips: {top: -40, left: 155},
                fold: {top: -20, left: 125},
                button: {top: -10, left: 45}
            }
        }
        default:
            return null
    }
}