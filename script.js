// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var passwordText = document.getElementById("password");
  //passwordText.value = Array(128).fill("-").join("");
  //console.log(passwordText.value);
  var password = [];
  passwordText.value = password;
  password = generatePassword();

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
let password = [];
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

  const generateLowercaseCharacter = () => {
    return pickRandomCharacter("abcdefghijklmnopqrstuvwxyz");
  };
  const generateUppercaseCharacter = () => {
    return pickRandomCharacter("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  };
  const generateNumericCharacter = () => {
    return pickRandomCharacter("0123456789");
  };
  const generateSpecialCharacter = () => {
    return pickRandomCharacter("!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~");
  };

  const pickRandomCharacter = (characterArray) => {
    // pick a random character from the characterArray
    return characterArray[Math.floor(Math.random() * characterArray.length)];
  };

  let characterTypes = [];
  if (includeLowercaseCharacters) {
    characterTypes.push(generateLowercaseCharacter);
  }
  if (includeUppercaseCharacters) {
    characterTypes.push(generateUppercaseCharacter);
  }
  if (includeNumericCharacters) {
    characterTypes.push(generateNumericCharacter);
  }
  if (includeSpecialCharacters) {
    characterTypes.push(generateSpecialCharacter);
  }

  for (let i = 0; i < passwordLength; i++) {
    let randomCharacterTypeIndex = Math.floor(
      Math.random() * characterTypes.length
    );
    password[i] = characterTypes[randomCharacterTypeIndex]();
  }

  return password.join("");
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
  includeLowercaseCharacters = confirmation(1, "lowercase");
  includeUppercaseCharacters = confirmation(2, "uppercase");
  includeNumericCharacters = confirmation(3, "numeric");
  includeSpecialCharacters = confirmation(4, "special");

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

const confirmation = (number, type) => {
  var newLine = "\r\n";
  return confirm(
    `Character type question ${number} of 4:${newLine}${newLine}Include ${type} characters?`
  );
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
