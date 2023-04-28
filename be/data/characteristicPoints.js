const characteristicPoints = {
    'Plastic-Free': 2,
    'Humane': 1,
    'Locally Produced': 1,
    'Healthy': 1,
    'Vegan': 0, // vegan looks be missing points, so set it at 0 but guessing that's just a typo
    'Wasteful': -1, 
    'Unhealthy': -1,
}

const sumPointsOfCharacteristics = (charac) => {
    if (typeof charac === 'string') {
        return characteristicPoints[charac]

    } else if (Array.isArray(charac)) {
        const sum = charac.reduce((accumulator, element) => {
            if (typeof characteristicPoints[element] === 'number') {
                accumulator += characteristicPoints[element]
            }
            return accumulator
        }, 0)
        return sum
        
    } else {
        return null
    }
}

module.exports = {
    characteristicPoints,
    sumPointsOfCharacteristics
}


// // this could be a fun place to try out some unit testing
// const sampleArrayOfCharacs = ['Humane', 'Locally Produced']
// // const sampleArrayOfCharacs = 'Humane'
// const pointsSum = sumPointsOfCharacteristics(sampleArrayOfCharacs)
// console.log('pointsSum')
// console.log(pointsSum)

// // generate a function that adds two numbers together
// const addTwoNumbers = (a, b) => {
//     return a + b
// }   
