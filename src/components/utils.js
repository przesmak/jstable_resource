export function colorPicker(percentage) {
    const [r1, g1, b1] = [254, 251, 233];
    const [r2, g2, b2] = [155, 138, 196];

    const middleRange = Number(percentage) / 100;

    const r_new = r1 + (r2 - r1) * middleRange;
    const g_new = g1 + (g2 - g1) * middleRange;
    const b_new = b1 + (b2 - b1) * middleRange;

    return `rgb(${r_new}, ${g_new}, ${b_new})`;
}

export function setMonths(dateFrom, dateTo) {
    const startDate = new Date(dateFrom)
    const endDate = new Date(dateTo)
    const monthsDifference = (endDate.getMonth() - startDate.getMonth()) + 12 * (endDate.getFullYear() - startDate.getFullYear())
    const dates_list = []
    dates_list.push(startDate.toLocaleDateString()); // start date is always present in the table
    for (let i = 0; i < monthsDifference; i++) {
        startDate.setMonth(startDate.getMonth() + 1)
        dates_list.push(startDate.toLocaleDateString());
    }
    return dates_list
}

const monthOfTheYear = [
    { id: "01", title: "Jan" },
    { id: "02", title: "Feb" },
    { id: "03", title: "Mar" },
    { id: "04", title: "Apr" },
    { id: "05", title: "May" },
    { id: "06", title: "Jun" },
    { id: "07", title: "Jul" },
    { id: "08", title: "Aug" },
    { id: "09", title: "Sep" },
    { id: "10", title: "Oct" },
    { id: "11", title: "Nov" },
    { id: "12", title: "Dec" },
]

export function humanReadableMonths(date) {
    try {
        const dateElements = date.split('/')
        const month = dateElements[0].length === 1 ? '0' + dateElements[0] : dateElements[0];
        const year = dateElements[2];
        const monthName = monthOfTheYear.find(v => v.id === month).title
        return monthName + '-' + year
    }
    catch (err) {
        console.log(`%c error in humanReadableMonths ${err}`, 'color:tomato');
        return date
    }
}

export function databaseFormatMonths(date) {
    try {
        const dateElements = date.split('-')
        const month = dateElements[0];
        const year = dateElements[1];
        const monthName = monthOfTheYear.find(v => v.title === month).id
        return monthName + '-' + year
    }
    catch (err) {
        console.log(`%c error in databaseFormatMonths ${err}`, 'color:tomato');
        return date
    }
}

export function setColumns(fromDate, toDate) {
    const newColumns = []
    setMonths(fromDate, toDate).map(v => newColumns.push({ type: 'numeric', title: humanReadableMonths(v), width: '80', decimal: '.', mask: '#,##', }))
    return newColumns
}

export function setDataTable(fromDate, toDate, resourcePlan) {
    const newData = []
    setMonths(fromDate, toDate).map((v) => {
        try {
            if (resourcePlan.find(v2 => v2.date === databaseFormatMonths(humanReadableMonths(v)))) {
                newData.push(resourcePlan.find(v2 => v2.date === databaseFormatMonths(humanReadableMonths(v))).value)
            }
            else {
                newData.push('0')
            }
        }
        catch (err) {
            console.log(`%c error in set Data to table: ${err}`, 'color:tomato');
        }
    })
    return newData
}

export const sortNamesResource = (a,b) => {
    var keyA = a.Employee.name 
    var keyB = b.Employee.name
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    else return 0;
}