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
  prompt.innerText = `Please enter a valid ${input}:`;
  let inputDiv = document.createElement("input");
  inputDiv.id = input;
  inputDiv.name = input;
  inputDiv.required = true;
  if (input === "country") {
    inputDiv = document.createElement("select");
    inputDiv.id = input;
    inputDiv.name = input;
    inputDiv.required = true;
    countryList.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.innerText = country;
      inputDiv.appendChild(option);
    });
  } else if (input === "zip-code") {
    inputDiv.type = "number";
    inputDiv.min = 10000;
    inputDiv.max = 99999;
  } else if (input === "password" || input === "password-confirmation") {
    inputDiv.type = "password";
    inputDiv.minLength = 8;
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

const countryError = document.querySelector("#country + span.error");

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
    showError(email);
  }
});

form.addEventListener("submit", (event) => {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError(form);
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
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
