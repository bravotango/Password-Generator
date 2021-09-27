// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// GIVEN I need a new, secure password

// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria

// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters

// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected

// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

const generatePassword = () => {
  let passwordLength = getPasswordLength();
  let includeLowercase = isLowercaseCharacters();
  let includeUppercase = isUppercaseCharacters();
  let includeNumeric = isNumericCharacters();
  let includeSpecial = isSpecialCharacters();
  console.log(`valid password length = ${passwordLength}`);
  console.log(`include lowercase: ${includeLowercase}`);
  console.log(`include uppercase: ${includeUppercase}`);
  console.log(`include numeric ${includeNumeric}`);
  console.log(`include special characters ${includeSpecial}`);

  return "fakeP@$$worD";
};

const getPasswordLength = () => {
  passwordLength = prompt(
    "What password length (8-128 characters) do you require?"
  );
  // check for validity: is a number, is a number between 8 & 128, no decimals
  if (
    isNaN(passwordLength) === true ||
    parseInt(passwordLength) < 8 ||
    parseInt(passwordLength) > 128 ||
    passwordLength % parseInt(passwordLength) > 0
  ) {
    alert(
      `'${passwordLength}' is not a valid character length between 8 and 128`
    );
    getPasswordLength();
  }
  return passwordLength;
};

// TODO: possible refactor
const isLowercaseCharacters = () => {
  return confirm("Include lowercase characters?");
};

const isUppercaseCharacters = () => {
  return confirm("Include uppercase characters?");
};

const isNumericCharacters = () => {
  return confirm("Include numeric characters?");
};

const isSpecialCharacters = () => {
  return confirm("Include special characters?");
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
