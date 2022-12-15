import sys 
import asyncio 
import asyncpg 
import datetime 
from calendar import Calendar 


CONNSTRING = 'postgresql://postgres:stanislav100@localhost/postgres?application_name=factbook'


async def fetch_month_data(year, month):
    "Fetch a month of data from db"
    date = datetime.date(year, month, 1)
    sql = """
    select date, shares, trades, dollars 
    from factbook 
    where date >= $1::date 
    and date < $1::date + interval '1 month'
    order by date;
    """
    pgconn = await asyncpg.connect(CONNSTRING)
    stmt = await pgconn.prepare(sql)
    res = {}
    for (date, shares, trades, dollars) in await stmt.fetch(date):
        res[date] = (shares, trades, dollars)
    await pgconn.close()
    return res 

data = asyncio.run(fetch_month_data(2010, 4))
print(data)