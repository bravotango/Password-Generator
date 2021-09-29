// Assignment Code
var generateBtn = document.querySelector("#generate");
var modal = document.getElementById("modal");
var overlay = document.getElementById("overlay");
var formPasswordLength = document.getElementById("formPasswordLength");
var formCharacterTypes = document.getElementById("formCharacterTypes");
var passwordText = document.getElementById("password");

let password = [];
let passwordLength;
let includeLowercaseCharacters = 0;
let includeUppercaseCharacters = 0;
let includeNumericCharacters = 0;
let includeSpecialCharacters = 0;
let characterTypes = [];

// Write password to the #password input
function writePassword() {
  modal.style.display = "block";
  overlay.style.display = "block";

  // reset
  password = [];
  characterTypes = [];
  passwordText.value = password;

  password = generatePassword();

  console.log("password =", password);
  passwordText.value = password;
}

const generatePassword = () => {
  passwordLength = getPasswordLength();

  // [
  //  includeLowercaseCharacters,
  //  includeUppercaseCharacters,
  //  includeNumericCharacters,
  //  includeSpecialCharacters
  // ] = setCharacterTypes();
  password = createPassword();
};

const createPassword = () => {
  console.log("entered create password");
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

  console.log("going to check types", includeLowercaseCharacters);
  if (includeLowercaseCharacters == 1) {
    console.log("adding lowercase");
    characterTypes.push(generateLowercaseCharacter);
  }
  if (includeUppercaseCharacters) {
    console.log("adding uppercase");
    characterTypes.push(generateUppercaseCharacter);
  }
  if (includeNumericCharacters) {
    console.log("adding numeric");
    characterTypes.push(generateNumericCharacter);
  }
  if (includeSpecialCharacters) {
    console.log("adding special");
    characterTypes.push(generateSpecialCharacter);
  }
  console.log("characterTypes", characterTypes);

  for (let i = 0; i < passwordLength; i++) {
    console.log("I am here");
    let randomCharacterTypeIndex = Math.floor(
      Math.random() * characterTypes.length
    );
    password[i] = characterTypes[randomCharacterTypeIndex]();
  }

  return password.join("");
};

// display the password length form in modal
const getPasswordLength = () => {
  overlay.style.display = "block";
  formPasswordLength.style.display = "block";
};

const submitPasswordLength = (event) => {
  // grab the value from the form
  const data = new FormData(event);
  passwordLength = data.get("passwordLength");

  // check if the input is valid
  let isValidPasswordLengthValid = validatePasswordLength();

  // if valid: hide the password length form & show the type form
  if (isValidPasswordLengthValid) {
    formPasswordLength.style.display = "none";
    formCharacterTypes.style.display = "block";
  }
  // else show password length error
  else {
    document.getElementById("passwordLengthError").style.display = "block";
  }
};

const validatePasswordLength = () => {
  // check for validity: is a number, is a number between 8 & 128, no decimals
  if (
    isNaN(passwordLength) === true ||
    parseInt(passwordLength) < 8 ||
    parseInt(passwordLength) > 128 ||
    passwordLength % parseInt(passwordLength) > 0
  ) {
    return false;
  }
  return true;
};

const submitCharacterTypes = (form) => {
  const data = new FormData(form);
  includeLowercaseCharacters = parseInt(data.get("lowercase"));
  includeUppercaseCharacters = parseInt(data.get("uppercase"));
  includeNumericCharacters = parseInt(data.get("numeric"));
  includeSpecialCharacters = parseInt(data.get("special"));

  const isValidCharacterTypes = validateCharacterTypes();

  if (isValidCharacterTypes) {
    modal.style.display = "none";
    overlay.style.display = "none";
  } else {
    document.getElementById("typeError").style.display = "block";
  }
};

const validateCharacterTypes = () => {
  console.log(
    includeLowercaseCharacters,
    includeUppercaseCharacters,
    includeNumericCharacters,
    includeSpecialCharacters
  );
  if (
    includeLowercaseCharacters == 0 &&
    includeUppercaseCharacters == 0 &&
    includeNumericCharacters == 0 &&
    includeSpecialCharacters == 0
  ) {
    console.log("all types are false");
    return false;
  }
  return true;
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

const closeModal = () => {
  modal.style.display = "none";
  overlay.style.display = "none";
};

var modalCloseBtn = document.getElementById("modalCloseBtn");
modalCloseBtn.addEventListener("click", closeModal);
