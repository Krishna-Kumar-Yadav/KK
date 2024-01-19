"use strict";

import contactData from "./contact-list-api/contacts-lists.json" assert { type: "json" };

const contactsMsgs = {
  msg: [],
};

let chatSendButton = document.querySelector(".sentButtonBox");

let id;

for (let item = 0; item < contactData.contacts.length; item++) {
  const contact = document.getElementById(`contact${item + 1}`);
  const msgObject = {
    id_No: item + 1,
    recieveMsgArray: [],
    sendMsgArray: [],
  };
  contactsMsgs.msg[item] = msgObject;

  contact.addEventListener("click", function () {
    id = item + 1;
    console.log(id);
  });
}

console.log(id);

const textMsgBox = document.querySelector(".textMsgBox");
const textInput = textMsgBox.textContent;

for (let item = 0; item < contactData.contacts.length; item++) {
  function handleChatSend() {
    const messageSendObject = {
      text: textInput,
      timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
    };

    contactsMsgs.msg[id - 1].sendMsgArray.push(messageSendObject);
    
    console.log(id);
  }

  chatSendButton.addEventListener("click", handleChatSend);

  textMsgBox.addEventListener("keydown", function buttonEnter(e) {
    if (e.key === "Enter") {
      handleChatSend();
    }
  });
  break;
}

for (let item = 0; item < contactData.contacts.length; item++) {
  function handleChatRecieve() {
    const messageRecieveObject = {
      text: "krishna",
      timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
    };
    console.log(id);
    //contactsMsgs.msg[id - 1].recieveMsgArray.push(messageRecieveObject);
    
  }
  handleChatRecieve();
  break;
}
