const helpers = require('../');

describe('Search items', () => {

    it("it should return empty array whwn empty search query provided", () => {

        const items = []
        const searchQuery = ''

        expect(helpers.filterByName(items, searchQuery)).toEqual(items)

    })

    it('should return item that match search query', () => {
         const items = [
            {
                id: 1001,
                name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
                dietaries: ['v', 've', 'df', 'gf', 'n!'],
              },
              {
                id: 1002,
                name: 'Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots',
                dietaries: ['gf', 'df', 'rsf'],
              },
              {
                id: 1003,
                name: 'Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots',
                dietaries: ['gf', 'df', 'v', 've', 'n!'],
              },
         ]


         const output = [
            {
                id: 1001,
                name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
                dietaries: ['v', 've', 'df', 'gf', 'n!'],
              },
         ]

         const searchQuery = 'Caesar'

        expect(helpers.filterByName(items,searchQuery)).toEqual(output)
     
    })

})

