const rawProductData = require('../data/products');
const { getProductsByCharacteristicIndex }  = require('../data/index/characteristicIndex.js')
const { sumPointsOfCharacteristics } = require('../data/characteristicPoints')
const _ = require("lodash")

const productUtil = {
    getAllProductsData: () => {
        return _.cloneDeep(rawProductData); // rather than expose reference to original data, product.js could have a getter that returns a copy so I don't effect the original. cloning as I was getting calls later on for products which still included characteristic scores. Probably more efficient ways of doing this...
    },
    getProductDataByParams: (paramsObject) => {
        let outputProductData = []
/*
        *Assumes 1 characteristic input for now*
        
        Questions
        - what is the desired behavior for if there are mutliple characteristics provided? matchAny? matchBoth? Perhaps another param is provided
        efficiency strategies
        - characteristics as Set so 0(1) lookup on product - ✅ implemented with upfront index creation
        other 
        - what if there are other query params/properties besides characteristics?
 */

        // console.log("filter object: ", filterObject)

        // handle characteristics filtering
        if (!paramsObject.characteristics) {
            outputProductData = _.cloneDeep(rawProductData)
        } else {
            if ( typeof paramsObject.characteristics !== 'string') {
                throw new TypeError("characteristics can only be a single element, data types such as array are not yet implemented")
            }
            //old way 0(n)(m)
            // filteredProducts = productData.filter((product, index) => {
            //     console.log(index, product)
            //     return product.characteristics.includes(filterObject.characteristics)
            // })
    
            // new way 0(1)
            outputProductData = getProductsByCharacteristicIndex(paramsObject.characteristics)
        }

        if (paramsObject.includeCharacteristicsScores === 'true') {
            outputProductData = productUtil.getProductsWithCharacteristicScore(outputProductData)
        }

        // console.log("outputProductData: ", outputProductData)
        return outputProductData
    },
    getProductsWithCharacteristicScore: (products) => {
        return products.map((product) => {
            let pointsSum = sumPointsOfCharacteristics(product.characteristics);
            product["characteristicsScore"] = pointsSum;
            return product;
        });
    },
}

module.exports = productUtil;