import countryList from "./countryList.js";

const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const inputs = ["country", "zip-code", "password", "password-confirmation"];

inputs.forEach((input) => {
  const p = document.createElement("p");
  const label = document.createElement("label");
  label.htmlFor = input;
  const prompt = document.createElement("span");
  prompt.innerText = `Please enter a ${input}:`;
  let inputDiv = document.createElement("input");
  inputDiv.id = input;
  inputDiv.name = input;
  inputDiv.required = true;
  if (input === "country") {
    inputDiv = document.createElement("select");
    inputDiv.id = input;
    inputDiv.name = input;
    inputDiv.required = true;
    const firstOption = document.createElement("option");
    firstOption.innerText = "Select:";
    firstOption.value = "";
    inputDiv.appendChild(firstOption);
    countryList.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.innerText = country;
      inputDiv.appendChild(option);
    });
  } else if (input === "zip-code") {
    inputDiv.minLength = 4;
  } else if (input === "password" || input === "password-confirmation") {
    inputDiv.type = "password";
    inputDiv.pattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}";
  }
  const errorSpan = document.createElement("span");
  errorSpan.className = "error";
  errorSpan.ariaLive = "polite";
  label.appendChild(prompt);
  label.appendChild(inputDiv);
  label.appendChild(errorSpan);
  p.appendChild(label);
  form.appendChild(p);
});

const submit = document.createElement("button");
submit.innerText = "Submit";
form.appendChild(submit);

email.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}

const country = document.getElementById("country");
const zip = document.getElementById("zip-code");
const pw = document.getElementById("password");
const pwc = document.getElementById("password-confirmation");

const countryError = document.querySelector("#country + span.error");
const zipError = document.querySelector("#zip-code + span.error");
const pwError = document.querySelector("#password + span.error");
const pwcError = document.querySelector("#password-confirmation + span.error");

const fields = [country, zip, pw, pwc];
const errorFields = [countryError, zipError, pwError, pwcError];

for (let i = 0; i < fields.length; i++) {
  const field = fields[i];
  const errorField = errorFields[i];
  field.addEventListener("input", () => {
    if (field.validity.valid) {
      errorField.textContent = ""; // Reset the content of the message
      errorField.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showErrors(field, errorField);
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //console.log(event.target);
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
  }
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const errorField = errorFields[i];
    if (!field.validity.valid) {
      showErrors(field, errorField);
    }
  }

  if (!(pw.value === pwc.value)) {
    pwcError.textContent = "Passwords must match";
    pwcError.className = "error active";
  } else if (form.checkValidity() === true) {
    const body = document.querySelector("body");
    const img = document.createElement("img");
    img.src = "high-five-dog.gif";
    body.appendChild(img);
  }
});

function showErrors(field, errorField) {
  if (field.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    errorField.textContent = "Field can't be blank.";
  } else if (field.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    errorField.textContent = "Entered value needs to be an email address.";
  } else if (field.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    errorField.textContent = `Should be at least ${field.minLength} characters; you entered ${field.value.length}.`;
  } else if (field.validity.patternMismatch) {
    errorField.textContent =
      "Pattern mismatch, must contain 1 capital letter, 1 lowercase letter, 1 number, and be at least 8 characters long";
  } else {
    console.log(field.validity);
  }

  // Set the styling appropriately
  errorField.className = "error active";
}
