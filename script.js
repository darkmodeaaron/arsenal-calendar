const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://theathletic.com/football/team/arsenal/schedule/'

const main = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const table = await page.evaluate(() => {

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

        const fixtures = document.querySelectorAll('.crJNBa')

    })

    console.log(table)

    fs.writeFile('table.json', JSON.stringify(table), (err) => {
        if (err) throw err;
        console.log('file saved')
    })

}


main()