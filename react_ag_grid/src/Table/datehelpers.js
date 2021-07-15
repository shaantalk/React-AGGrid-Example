// DATE COMPARATOR FOR SORTING
const dateComparator = (date1, date2) => {
    var date1Number = _monthToNum(date1);
    var date2Number = _monthToNum(date2);

    if (date1Number === null && date2Number === null) {
        return 0;
    }
    if (date1Number === null) {
        return -1;
    }
    if (date2Number === null) {
        return 1;
    }

    return date1Number - date2Number;
}

// HELPER FOR DATE COMPARISON
const _monthToNum = (date) => {
    if (date === undefined || date === null || date.length !== 10) {
        return null;
    }

    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(0, 2);
    var dayNumber = date.substring(3, 5);

    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
}

// Filter params for Date filters
const filterParams = {
    suppressAndOrCondition: true,
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        var dateAsString = cellValue;
        if (dateAsString == null) return -1;
        var dateParts = dateAsString.split('/');
        var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[0]) - 1,
        Number(dateParts[1])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
        return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
        return 1;
        }
    },
    browserDatePicker: true,
}

module.exports = {
    dateComparator,
    filterParams
}