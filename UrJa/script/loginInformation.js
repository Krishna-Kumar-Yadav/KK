function registration() {
  const registerIds = JSON.parse(localStorage.getItem("contactDetail")) || {
    contactsInformation: [],
  };

  function clearInput() {
    document.querySelector(".firstNameInput").value = "";
    document.querySelector(".lastNameInput").value = "";
    document.querySelector(".mobileNumberInput").value = "";
    document.querySelector(".emailInput").value = "";
    document.querySelector(".passwordInput").value = "";
  }

  const submitButtonRegister = document.querySelector(".submitButtonRegister");
  submitButtonRegister.addEventListener("click", function () {
    contactsRegistration();
    saveContactsDetailToLocalStorage(registerIds);
    clearInput();
    validCharacters();
  });

  document.addEventListener("keydown", function submitbuttonClick(e) {
    if (e.key === "Enter") {
      contactsRegistration();
      saveContactsDetailToLocalStorage(registerIds);
      clearInput();
      validCharacters();
    }
  });

  const resetButtonRegister = document.querySelector(".resetButtonRegister");
  resetButtonRegister.addEventListener("click", clearInput);

  function contactsRegistration() {
    const firstNameInput = document.querySelector(".firstNameInput").value;
    const lastNameInput = document.querySelector(".lastNameInput").value;
    const mobileNumberInput = document.querySelector(".mobileNumberInput").value;
    const emailInput = document.querySelector(".emailInput").value;
    const passwordInput = document.querySelector(".passwordInput").value;

    const contactInfo = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      phone: mobileNumberInput,
      email: emailInput,
      password: passwordInput,
      timestamp: new Date().toString(),
    };

    if (firstNameInput !== "" && lastNameInput !== "" && mobileNumberInput !== "" && emailInput !== "" && passwordInput !== ""){

    registerIds.contactsInformation.push(contactInfo);
    console.log(registerIds);
    }
  }

  function saveContactsDetailToLocalStorage(data) {
    let stringData = JSON.stringify(data);
    localStorage.setItem("contactDetail", stringData);
  }

  function validCharacters() {
    const firstNameInput = document.querySelector(".firstNameInput").value;
    const lastNameInput = document.querySelector(".lastNameInput").value;

    const alphabetsRegex = /[a-z]/g;  
    const alphabets =firstNameInput.match(alphabetsRegex);
    console.log(alphabets);
    
}
}
// Call the registration function to set up event listeners
registration();
