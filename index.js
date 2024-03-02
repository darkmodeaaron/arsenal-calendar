const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://www.footballwebpages.co.uk/arsenal/fixtures-results'

const main = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const allArticles = await page.evaluate(() => {

        // Use querySelectorAll instead of querySelector if you want to select multiple elements
        const articles = document.querySelector('tbody')

        const articlesTr = articles.querySelectorAll('tr')

        // Convert NodeList to Array and map each element's inner text
        return Array.from(articlesTr).map((e) => {
            const arr = []

            const date = e.querySelector('.date')
            const opp = e.querySelector('.opponent')
            const competition = e.querySelector('.competition')
            const venue = e.querySelector('.venue')
            const score = e.querySelector('.ko-score')

            if (date && date.innerText) {
                arr.push(date.innerText.trim());
            }
            if (opp && opp.innerText) {
                arr.push(opp.innerText.trim());
            }
            if (competition && competition.innerText) {
                arr.push(competition.innerText.trim());
            }
            if (venue && venue.innerText) {
                arr.push(venue.innerText);
            }
            if (score && score.innerText) {
                arr.push(score.innerText);
            }
            
            return arr
        })



    })

    fs.writeFile('courses.json', JSON.stringify(allArticles), (err) => {
        if (err) throw err;
        console.log('file saved')
    })

    console.log(allArticles)
}


main()

