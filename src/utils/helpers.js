export const getValidityType = (type) => {
    let validity_type = ''
    switch (type) {
        case '2':
            validity_type = 'Month'
            break;
        case '1':
            validity_type = 'Week'
            break;
        case '3':
            validity_type = 'Year'
            break;
        default:
            validity_type = 'Day'
            break;
    }
    return validity_type;

}

export function addYears() {
    const date = new Date()
    return new Date(date.setFullYear(date.getFullYear() + 1));
}
export function addMonths(a = new Date()) {
    a.setMonth(a.getMonth() + 1);
    return a;
}

export function addDays(n) {
    const a = new Date()
    const date = new Date(Number(a))
    date.setDate(a.getDate() + n)
    return date
}

export const getExpiryDate = (type) => {
    let expiry_date = ''
    switch (type) {
        case 'Month':
            expiry_date = addMonths()
            break;
        case 'Week':
            expiry_date = addDays(7)
            break;
        case 'Year':
            expiry_date = addYears()
            break;
        default:
            expiry_date = addDays(1)

    }
    return expiry_date;
}