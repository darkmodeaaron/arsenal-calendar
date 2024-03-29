const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://theathletic.com/football/team/arsenal/schedule/'

const main = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const results = await page.evaluate(() => {

        // Use querySelectorAll instead of querySelector if you want to select multiple elements
        const tableBody = document.querySelector('.table-body')

        const tableRows = tableBody.querySelectorAll('tr')

        // Convert NodeList to Array and map each element's inner text
        return Array.from(tableRows).map((e) => {

            const columns = e.querySelectorAll('td')
  
            const arr = []

            const date = e.querySelector('.table-body-cell .kNywRz div')

            const opponent = e.querySelector('.bmFemA .cyaoFy')
            const where = e.querySelector('.fYFHut')
            const result = e.querySelector('.EowVS div')
            const comp = columns[3].querySelector('a')

            const score = columns[2].querySelector('a div')

            const homescore = score.querySelector('.fYFHut')
            const awayscore = score.querySelector('.fgIdgl')

            arr.push(date.innerText)
            arr.push(opponent.innerText)
            arr.push(where.innerText)


            if (result && result.innerText) {
                arr.push(result.innerText)
            }
            
            if (comp && comp.innerText) {
                arr.push(comp.innerText)
            }

            if (homescore && homescore.innerText) {
                arr.push(homescore.innerText)
            }

            if (awayscore && awayscore.innerText) {
                arr.push(awayscore.innerText)
            }

            return arr

        })

    })

    console.log(results)

    fs.writeFile('table.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('file saved')
    })

}


const second = async () => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const fixtures = await page.evaluate(() => {

        const tableBodys = document.querySelectorAll('tbody')

        const fixturesBody = tableBodys[5].querySelectorAll('tr')

        return Array.from(fixturesBody).map((e) => {

            const arr2 = []

            const tds = e.querySelectorAll('td')

            const date = tds[0].querySelector('td div div span')
            const opponent = tds[1].querySelector('div a .bmFemA div')
            const where = tds[1].querySelector('div .fYFHut')
            
            arr2.push(date.innerText)
            arr2.push(opponent.innerText)
            arr2.push(where.innerText)

            return arr2

        })

    })

    console.log(fixtures)

    fs.writeFile('fixtures.json', JSON.stringify(fixtures), (err) => {
        if (err) throw err;
        console.log('file saved')
    })
    
}

main()
second()
