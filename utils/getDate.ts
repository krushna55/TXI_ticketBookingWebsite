export function getDate(index:number){
    const date = new Date()
    date.setDate(date.getDate()+index)
    const dateObj = {
        'Date':date.getDate(),
        'Weekday':date.toLocaleDateString('en-US', { weekday: 'long' }),
        'Monthname':date.toLocaleDateString('en-US', { month: 'long' }),
        'day':date.getDay(),
        'month':date.getMonth() + 1,
        'year':date.getFullYear(),
    }
    return dateObj;

}