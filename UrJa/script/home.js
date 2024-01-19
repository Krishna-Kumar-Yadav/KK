"use strict";

import contactData from "./contact-list-api/contacts-lists.json" assert { type: "json" };

const contactBox = document.querySelector(".homeSection--list");
contactsList();
searchFilter();

function contactsList() {
  for (let contact = 0; contact < contactData.contacts.length; contact++) {
    if (
      contactData.contacts[contact].phone === null ||
      contactData.contacts[contact].phone === undefined ||
      contactData.contacts[contact].phone === ""
    ) {
      continue;
    } else {
      const contactDivNewElement = document.createElement("div");
      contactDivNewElement.classList.add(`homeSection--contacts`);
      contactDivNewElement.id = `contact${contact + 1}`;
      contactBox.appendChild(contactDivNewElement);

      const contactLogoNewElement = document.createElement("div");
      contactLogoNewElement.classList.add("homeSection--contactsLogo");
      contactDivNewElement.appendChild(contactLogoNewElement);

      const contactInfoNewElement = document.createElement("div");
      contactInfoNewElement.classList.add("homeSection--contactsInfo");
      contactDivNewElement.appendChild(contactInfoNewElement);

      const contactNameNewElement = document.createElement("div");
      contactNameNewElement.classList.add("homeSection--contactsName");
      contactNameNewElement.id = `contactsName${contact + 1}`;
      contactInfoNewElement.appendChild(contactNameNewElement);

      if (
        contactData.contacts[contact].name !== null &&
        contactData.contacts[contact].name !== undefined &&
        contactData.contacts[contact].name !== ""
      ) {
        contactNameNewElement.textContent = contactData.contacts[contact].name;
        let [firstletter] = contactData.contacts[contact].name;
        let firstletterUpperCase = firstletter.toUpperCase();
        contactLogoNewElement.textContent = firstletterUpperCase;
      } else {
        contactNameNewElement.textContent = contactData.contacts[contact].phone;
        contactLogoNewElement.style.backgroundImage =
          'url("stylesheet/logo.jpg")';
      }

      const contactEmailNewElement = document.createElement("div");
      contactEmailNewElement.classList.add("homeSection--contactsEmail");
      contactInfoNewElement.appendChild(contactEmailNewElement);
      contactEmailNewElement.textContent = contactData.contacts[contact].email;
    }
  }
}

/* search feature */

function searchFilter() {
  const searchContactsInput = document.querySelector(".homeSection--searchBox");
  const searchContactsIcon = document.querySelector(".homeSection--searchIcon");
  searchContactsIcon.addEventListener("click", searchContacts);
  searchContactsInput.addEventListener(
    "keydown",
    function enterSearchButton(e) {
      if (e.key === "Enter") {
        searchContacts();
      }
      setInterval(searchContacts, 500);
    }
  );
}

function searchContacts() {
  const searchContactsInput = document.querySelector(".homeSection--searchBox");
  const searchTermLower = searchContactsInput.value.toLowerCase();
  const searchTermUpper = searchContactsInput.value.toUpperCase();
  contactData.contacts.forEach((item) => {
    const contactDivItem = document.querySelector(`#contact${item.id}`);
    const contactTermLower = item.name.toLowerCase();
    const contactTermUpper = item.name.toUpperCase();
    if (
      !contactTermLower.includes(searchTermLower) ||
      !contactTermUpper.includes(searchTermUpper)
    ) {
      contactDivItem.classList.add("disappearContacts");
    } else if (searchContactsInput.value === "") {
      contactDivItem.classList.remove("disappearContacts");
    } else {
      contactDivItem.classList.remove("disappearContacts");
    }
  });
}

//chatOpenFeature

const chatNavBoxDp = document.querySelector(".chatNavBox--dp");
const chatNavBoxName = document.querySelector(".chatNavBox--name");

for (let contact = 0; contact < contactData.contacts.length; contact++) {
  const homeContactName = document.getElementById(`contact${contact + 1}`);
  homeContactName.addEventListener("click", chatOpen);

  function chatOpen() {
    const currentContact = contactData.contacts[contact];

    if (
      currentContact.name === "" ||
      currentContact.name === null ||
      currentContact.name === undefined
    ) {
      chatNavBoxName.textContent = currentContact.phone;
      chatNavBoxDp.style.backgroundImage = 'url("stylesheet/logo.jpg")';
      chatNavBoxDp.classList.add("disappearText");
    } 
    else if (currentContact) {
      chatNavBoxDp.style.backgroundImage = "none";
      chatNavBoxDp.classList.remove("disappearText");
      chatNavBoxName.textContent = currentContact.name;
      let [firstLetter] = currentContact.name || "";
      chatNavBoxDp.textContent = firstLetter.toUpperCase();
      
    }
  }
}
