export function getCalendarFormatedDate(date) {
    let dateFormated;
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return dateFormated = date.toISOString().split('T')[0];
}