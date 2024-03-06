const tableSelector = document.querySelector('.table-container')
const daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const datesArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']
const numsArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

let numCounter = 0
let dateCounter = 0

function Table(month, days, dayStart) {
    this.month = month
    this.createMonth = function() {

        const tableColumn = document.createElement('div')
        tableColumn.classList.add('table-column')
        tableSelector.appendChild(tableColumn)

        const head = document.createElement('h1')
        head.classList.add('column-header')
        tableColumn.appendChild(head)
        head.innerText = month

        for (i = 0; i < days; i++) {

            const tableRow = document.createElement('div')
            tableRow.classList.add('table-row')
            tableColumn.appendChild(tableRow)

            const topInfo = document.createElement('div')
            topInfo.classList.add('row-flex')
            tableRow.appendChild(topInfo)

            const rowDayDate = document.createElement('div')
            rowDayDate.classList.add('row-dayDate')
            topInfo.appendChild(rowDayDate)

            const rowDay = document.createElement('h3')
            rowDay.classList.add('row-day')
            rowDayDate.appendChild(rowDay)
            rowDay.innerText = daysArr[dayStart]

            const tog = month + ' ' + numsArr[numCounter]
            
            const rowDate = document.createElement('h3')
            rowDate.classList.add('row-date')
            rowDayDate.appendChild(rowDate)
            rowDate.innerText = datesArr[dateCounter]

            dayStart += 1
            dateCounter += 1
            numCounter += 1

            const data = rowDay.innerText + ' ' + rowDate.innerText

            if (dayStart == 7) {
                dayStart = 0
            }

            if (dateCounter == days) {
                dateCounter = 0
            }

            if (numCounter == days) {
                numCounter = 0
            }

            fetch('table.json').then(function (response) {
                return response.json();
            }).then(function (obj) {
                for (i of obj) {

                    const check = i[0].slice(0, 6)

                    if (check == tog) {

                        const fix = document.createElement('h3')
                        fix.classList.add('row-fixResult')
                        tableRow.appendChild(fix)
                        fix.innerText = i[1] + ' ' + i[2] + ' ' + i[5] + ' - ' + i[6]

                        if (i[1] == 'Chelsea') {
                            fix.innerText = i[1] + ' ' + i[2]
                        }

                        const comp = document.createElement('h3')
                        comp.classList.add('row-comp')
                        topInfo.appendChild(comp)
                        comp.innerText = i[4]


                        switch (i[3]) {
                            case 'W':
                                fix.style.color = '#13C304'
                                break;
                            case 'L':
                                fix.style.color = 'red'
                                break;
                            case 'D':
                                fix.style.color = '#C37704'
                                break;
                            default: 
                                fix.style.color = 'white'
                        }

                    }

                    

                }
            }).catch(function (err) {
                console.error('wrong')
            })

            fetch('fixtures.json').then(function (response) {
                return response.json();
            }).then(function (obj) {
                for (i of obj) {

                    const check =i[0].slice(0, 6)

                    if (check == tog) {
                        
                        const fix = document.createElement('h3')
                        fix.classList.add('row-fixResult')
                        tableRow.appendChild(fix)
                        fix.innerText = i[1] + ' ' + i[2]
                        

                    }

                }
            })
            
        }
        
    }
}

const august = new Table('Aug', 31, 1)
august.createMonth()

const september = new Table('Sep', 30, 4)
september.createMonth()

const october = new Table('Oct', 31, 6)
october.createMonth()

const november = new Table('Nov', 30, 2)
november.createMonth()

const december = new Table('Dec', 31, 4)
december.createMonth()

const january = new Table('Jan', 30, 0)
january.createMonth()

const febuary = new Table('Feb', 31, 2)
febuary.createMonth()

const march = new Table('Mar', 31 , 4)
march.createMonth()

const april = new Table('Apr', 30 , 0)
april.createMonth()

const may = new Table('May', 30 , 0)
may.createMonth()

