// Assignment Code
var generateBtn = document.querySelector("#generate");
let password = [];
let passwordLength;
// array to hold references to the chosen characterType function(s)
let characterTypes = [];
let includeLowercaseCharacters = false;
let includeSpecialCharacters = false;
let includeUppercaseCharacters = false;
let includeNumericCharacters = false;

// Write password to the #password input
function writePassword() {
  console.log("writePassword");
  var passwordText = document.getElementById("password");
  password = [];
  passwordText.value = password;
  password = generatePassword();

  passwordText.value = password;
}

const generatePassword = () => {
  if (password.length > 0) {
    return password;
  }
  console.log("generatePassword");
  passwordLength = getPasswordLength();
  console.log("checking passwordLength");
  if (!passwordLength) {
    alert("You must choose a password length.");
    generatePassword();
  }
  console.log("about to call setCharacterTypes");
  if (characterTypes.length === 0) {
    setCharacterTypes();
    console.log("after call setCharacterTypes");
    for (let i = 0; i < passwordLength; i++) {
      let randomCharacterTypeIndex = Math.floor(
        Math.random() * characterTypes.length
      );
      // randomly choose a characterType function to run from the characterTypes function array
      password[i] = characterTypes[randomCharacterTypeIndex]();
    }
    console.log("after for loop");
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

  // verify that at least 1 character type is chosen
  if (
    !includeLowercaseCharacters &&
    !includeUppercaseCharacters &&
    !includeNumericCharacters &&
    !includeSpecialCharacters
  ) {
    alert("You must accept at least 1 character type.  Please try again.");
    setCharacterTypes();
  }

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
