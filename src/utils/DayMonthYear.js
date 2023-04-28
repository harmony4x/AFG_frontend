const arrDay = []
const arrMonth = []
const arrYear = []

for (let i = 1; i <= 31; i++) {
    arrDay.push(i);
}

for (let i = 1; i <= 12; i++) {
    arrMonth.push(i);
}

for (let i = 1970; i <= 2023; i++) {
    arrYear.push(i);
}

export { arrDay, arrMonth, arrYear }