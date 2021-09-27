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
let passwordLength;
let includeLowercaseCharacters,
  includeUppercaseCharacters,
  includeNumericCharacters,
  includeSpecialCharacters;

includeLowercaseCharacters =
  includeUppercaseCharacters =
  includeNumericCharacters =
  includeSpecialCharacters =
    false;

const generatePassword = () => {
  passwordLength = getPasswordLength();

  let isCharacterTypesValid = setCharacterTypes();

  console.log(`valid password length = ${passwordLength}`);
  console.log(`include lowercase: ${includeLowercaseCharacters}`);
  console.log(`include uppercase: ${includeUppercaseCharacters}`);
  console.log(`include numeric ${includeNumericCharacters}`);
  console.log(`include special characters ${includeSpecialCharacters}`);
  console.log(`characters are valid: ${isCharacterTypesValid}`);
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

const setCharacterTypes = () => {
  includeLowercaseCharacters = confirmation("Include lowercase characters?");
  includeUppercaseCharacters = confirmation("Include uppercase characters?");
  includeNumericCharacters = confirmation("Include numeric characters?");
  includeSpecialCharacters = confirmation("Include special characters?");

  if (
    !includeLowercaseCharacters &&
    !includeUppercaseCharacters &&
    !includeNumericCharacters &&
    !includeSpecialCharacters
  ) {
    alert("You must accept at least 1 character type.  Please try again.");
    setCharacterTypes();
  }
  return true;
};

const confirmation = (message) => {
  return confirm(message);
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
