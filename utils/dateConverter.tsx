
export default function DateConverter(date: string): string {
    const dateObj = new Date(date);
    // const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // const formatedDate = dateObj.toLocaleDateString('en-GB', options);
    // dateObj.setDate(String(dateObj.getDate() + 1).padStart(2, '0'));
    // const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // const formattedDate = dateObj.toLocaleDateString('en-GB', options);



    const day = String(dateObj.getDate()).padStart(2,0);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    console.log(formattedDate);

    return formattedDate;

}