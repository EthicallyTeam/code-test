const productData = require('../products');
const _ = require("lodash")

const getCharateristicIndex = () => {
    let index = {}
     productData.forEach((product) => {
        product.characteristics.forEach((charac) => {
            if (!index[charac]) {
                index[charac] = []
            }
            index[charac].push(product)
        })
    })
    console.log("characteristicIndex: ", index)
    return index
}

const characteristicIndex = getCharateristicIndex();

const getProductsByCharacteristicIndex = (charac) => {
     if (characteristicIndex[charac]) {
        return _.cloneDeep(characteristicIndex[charac])
     } else {
        return []
     }
}

module.exports = { 
    getCharateristicIndex,
    getProductsByCharacteristicIndex
}