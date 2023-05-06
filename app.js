const ageCalculator = document.querySelector("#age-calc");

const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelector("#year");

// Get all output elements
const yearOut = document.querySelector(".year");
const monthOut = document.querySelector(".month");
const dayOut = document.querySelector(".day");

// Get current date
const today = new Date();
let dayCurr = today.getDay();
let monthCurr = 1 + today.getMonth();
let yearCurr = today.getFullYear();
let monthVal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const arrowBtn = document.querySelector("#arrow");

// Add an event listener with form
ageCalculator.addEventListener("submit", function (e) {
  e.preventDefault();
});

const isRequired = (value) => (value === "" ? false : true);
// const isNumber = value => value
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// Develop functions that show error/success
const showError = (input, message) => {
  //Get the form field element
  const formField = input.parentElement;
  //Add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  //show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  //Get the form field element
  const formField = input.parentElement;

  //Remove the error class
  formField.classList.remove(".error");
  formField.classList.add("success");

  //Hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

//Validate day field
const checkDay = () => {
  let valid = false;
  const min = 1,
    max = 31;
  const day = dayEl.value.trim();

  if (!isRequired(day)) {
    showError(dayEl, `Please select a day`);
  } else if (isNaN(day)) {
    showError(dayEl, "Please enter a number.");
  } else if (!isBetween(day.length, min, max)) {
    showError(dayEl, `Day must be between ${min} and ${max} characters`);
  } else {
    showSuccess(dayEl);
    valid = true;
  }
  return valid;
  dayCalc(day);
};

// Valid month field
const checkMonth = () => {
  let valid = false;
  const min = 1,
    max = 12;
  const month = monthEl.value.trim();
  console.log(month);

  if (!isRequired(month)) {
    showError(monthEl, `Please enter a month`);
  } else if (isNaN(month)) {
    showError(monthEl, "Please enter a number.");
  } else if (!isBetween(month.length, min, max)) {
    showError(monthEl, `Month must be between ${min} and ${max}`);
  } else {
    showSuccess(monthEl);
    valid = true;
  }
  return valid;
};

//valod year field
const checkYear = () => {
  let valid = false;
  const min = 4,
    max = 4;
  const year = yearEl.value.trim();
  console.log(`🚀 ~ checkYear ~ year:`, year);

  if (!isRequired(year)) {
    showError(yearEl, `Please enter a year.`);
  } else if (isNaN(year)) {
    showError(yearEl, "Please enter a number.");
  } else if (!isBetween(year.length, min, max)) {
    showError(yearEl, `Year must be between ${min} and ${max}`);
  } else {
    showSuccess(yearEl);
    valid = true;
  }
  return valid;
};

// Calculation function
const dayCalc = () => {
  const day = dayEl.value.trim();
  let days;
  if (day > dayCurr) {
    dayCurr = dayCurr + monthVal[monthCurr - 1];
    monthCurr = monthCurr - 1;
  }
  days = dayCurr - day;
  dayOut.textContent = days;
};
const monthCalc = () => {
  const month = monthEl.value.trim();
  let months;
  if (month > monthCurr) {
    monthCurr = monthCurr + 12;
    yearCurr = yearCurr - 1;
  }
  months = monthCurr - month;
  monthOut.textContent = months;
};
const yearCalc = () => {
  const year = yearEl.value.trim();
  let years = yearCurr - year;
  yearOut.textContent = years;
};

// Debounce
const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

//Instant feedback
ageCalculator.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "day":
        checkDay();
        break;

      case "year":
        checkYear();
        break;
      case "month":
        checkMonth();
        break;
    }
  })
);

arrowBtn.addEventListener("click", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isDayValid = checkDay(),
    isMonthValid = checkMonth(),
    isYearValid = checkYear();

  let isFormValid = isDayValid && isMonthValid && isYearValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    dayCalc();
    monthCalc();
    yearCalc();
  }
});
