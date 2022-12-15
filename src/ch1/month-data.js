const db = require('../db.js')

async function listMonthData() {
    const stmt = `
        select date, shares, trades, dollars 
        from factbook 
        where date >= $1::date 
        and date < $1::date + interval '1 month'
        order by date;
    `
    const result = await db.query(stmt, [new Date('2010-04-01')])
    console.log(result)
}

// listMonthData()

async function daysOfMonthData(startDay) {
    const stmt = `
    select cast(calendar.entry as date) as date,
	coalesce(shares, 0) as shares,
	coalesce(trades, 0) as trades,
	to_char(coalesce(dollars, 0), 'L99G999G999') as dollars 
from generate_series(cast($1 as date), 
		cast($1 as date) + interval '1 month' - interval '1 day',
		interval '1 day') as calendar(entry)
	left join factbook 
	on factbook.date = calendar.entry;
`
    const result = await db.query(stmt, startDay)
    console.log(result)
}

daysOfMonthData('2010-03-01')