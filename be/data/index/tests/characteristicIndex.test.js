// playing around with testing in Jest
const { getCharateristicIndex, getProductsByCharacteristicIndex } = require('../characteristicIndex')

describe('characteristicIndex', () => {
    // test that index is created correctly and has expected properties
    it('should create an index of products by characteristic', () => {
        const index = getCharateristicIndex()
        expect(index).toHaveProperty('Humane')
        expect(index).not.toHaveProperty('Fictional-Property')
    })
    // test that index is created returns the correct products for a given characteristic
    it('should return the correct products for a given characteristic', () => {
        const fictionalProducts = getProductsByCharacteristicIndex('Fictional-Characteristic')
        expect(fictionalProducts).toHaveLength(0)
    })
    // test that index is created returns the correct products for a given present characteristic
    // test that humaneProducts contains products whose characteristics include 'Humane'
    it('should return the correct products for a given characteristic', () => {
        const humaneProducts = getProductsByCharacteristicIndex('Humane')
        humaneProducts.forEach((product) => {
            expect(product.characteristics).toContain('Humane')
        })
    })
})