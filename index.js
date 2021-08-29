const dateInput = document.getElementById("date-input");
const button = document.getElementById("button-input");
const display = document.querySelector('.display-heading')

let counterP = 0;
let counterN = 0;

button.addEventListener("click", () => {
    display.innerHTML = ``
  counterP = 1;
  counterN = 1;
  let conti = true;
if(dateInput.value){
    const newDate = createDate(dateInput.value);
  let dateArray = checkAllDates(newDate);
  let booleanArray = checkPalindrome(dateArray);
  for(let i =0;i<booleanArray.length;i++){
      if(booleanArray[i]){
          conti = false
          display.innerHTML = `Congratulations your birthdate is Palindrome! 🥳🥳`
          break
      }
  }
  if (conti) {
    compareDates(newDate);
  }
}

  
});

function compareDates(date) {
  let p = calcDatePrevious(date);
  let n = calcDateNext(date);
  if (p[0] > n[0]) {
    display.innerHTML = `You missed the Palindrome birthdate on ${n[1].day}/${n[1].month}/${n[1].year} by ${n[0]} days 😃 `
  } else {
    display.innerHTML = `You missed the Palindrome birthdate on ${p[1].day}/${p[1].month}/${p[1].year} by ${p[0]} days 😃 `
  }
}

function calcDatePrevious(date) {
  let oldDate = previousDate(date);

  while (1) {
    let a = checkAllDates(convertToString(oldDate));
    let b = checkPalindrome(a);
    counterP++;
    for (let i = 0; i < b.length; i++) {
      if (b[i]) {
        return [counterP, convertToString(oldDate)];
      }
    }

    oldDate = previousDate(oldDate);
  }
}
function calcDateNext(date) {
  let nDate = nextDate(date);

  while (1) {
    let a = checkAllDates(convertToString(nDate));
    let b = checkPalindrome(a);
    counterN++;
    for (let i = 0; i < b.length; i++) {
      if (b[i]) {
        return [counterN, convertToString(nDate)];
      }
    }
    nDate = nextDate(nDate);
  }
}

function nextDate(date) {
  let day = parseInt(date.day) + 1;

  let month = parseInt(date.month);

  let year = parseInt(date.year);

  const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
  }
  if (day > dayInMonth[month - 1]) {
    day = 1;
    month++;
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function previousDate(date) {
  let day = parseInt(date.day) - 1;

  let month = parseInt(date.month);

  let year = parseInt(date.year);

  const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day === 0) {
    month--;
    day = dayInMonth[month - 1];
    if (month === 0) {
      year--;
      month = 12;
      day = 31;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
//convert to string the output from previous date
function convertToString(obj) {
  let day;
  let month;
  let year;
  day = obj.day.toString();
  month = obj.month.toString();
  year = obj.year.toString();

  if (obj.day < 10) {
    day = `0${obj.day}`;
  }
  if (obj.month < 10) {
    month = `0${obj.month}`;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function checkAllDates(date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function createDate(str) {
  let date = {};
  let charList = str.split("-");
  date.day = charList[2];
  date.month = charList[1];
  date.year = charList[0];
  return date;
}

function isPalindrome(str) {
  let rs = str.split("");
  let reversedList = rs.reverse();
  let reversedDate = reversedList.join("");

  if (str === reversedDate) {
    return true;
  } else {
    return false;
  }
}

function checkPalindrome(arr) {
  let a = [];
  arr.forEach((item, i) => {
    a.push(isPalindrome(item));
  });
  return a;
}

function isLeapYear(int) {
  if (int % 400 === 0) {
    return true;
  } else if (int % 4 === 0 && !int % 100 === 0) {
    return true;
  } else return false;
}
