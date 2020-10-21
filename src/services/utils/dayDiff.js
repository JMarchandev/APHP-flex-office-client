export function dayDiff (date1, date2) {
    let d1 = date1.getTime() / 86400000;
    let d2 = date2.getTime() / 86400000;
    return Number((d2 - d1)+1).toFixed(0);
}