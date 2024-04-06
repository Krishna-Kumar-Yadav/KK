import contactData from "./contact-list-api/contacts-lists.json" assert { type: "json" };

/* chatbox Send part */

send();
const sendMsgArrayText = [];
const sendMsgArrayTime = [];

function send() {
  let container = document.querySelector(".chatMsgBox");
  let inputTextBox = document.querySelector(".textMsgBox");
  let chatSendButton = document
    .querySelector(".sentButtonBox")
    .addEventListener("click", checkInputEmptyText);
  inputTextBox.addEventListener("keydown", function buttonEnter(e) {
    if (e.key === "Enter") {
      checkInputEmptyText();
    }
  });

  function checkInputEmptyText() {
    inputTextBox.value !== "" ? sendText() : null;
  }

  function sendText() {
    let inputBoxMsg = inputTextBox.value;
    sendMsgArrayText.push(inputBoxMsg);
    sendMsgArrayTime.push(new Date().toLocaleTimeString({ hour: "2-digit" }));
    setTimeout(function () {
      inputTextBox.value = "";
    }, 100);

    const msgSendBox = document.createElement("div");
    msgSendBox.classList.add("msg--sendBox");
    container.appendChild(msgSendBox);

    const msgSend = document.createElement("div");
    msgSend.classList.add("msg--send");
    msgSendBox.appendChild(msgSend);

    const msgSendText = document.createElement("div");
    msgSendText.classList.add("msg--send-text");
    msgSendText.textContent = inputBoxMsg;
    msgSend.appendChild(msgSendText);

    const msgSendTime = document.createElement("div");
    msgSendTime.classList.add("msg--send-time");
    msgSendTime.textContent = new Date().toLocaleTimeString({
      hour: "2-digit",
    });
    msgSend.appendChild(msgSendTime);

    for (let s = 0; s < sendMsgArrayTime.length; s++) {
      msgSendBox.id = `msgSendBox${s + 1}`;
      msgSend.id = `msgSend${s + 1}`;
      msgSendText.id = `msgSendText${s + 1}`;
      msgSendTime.id = `msgSendTime${s + 1}`;
    }
    container.scrollTop = container.scrollHeight;
  }
}

/* chatbox Recieve Part */

const recieveMsgArr = [
  {
    text: "",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
  {
    text: "",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
  {
    text: "",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
];

function checkRecieveEmptyText() {
  for (let r = 0; r < recieveMsgArr.length; r++) {
    if (recieveMsgArr[r].text === "" || recieveMsgArr[r].text === undefined) {
      continue;
    }

    function recieveText() {
      let container = document.querySelector(".chatMsgBox");
      //document.addEventListener("DOMContentLoaded", recieveText);

      const msgRecieveBox = document.createElement("div");
      msgRecieveBox.classList.add("msg--recieveBox");
      msgRecieveBox.id = `msgRecieveBox${r + 1}`;
      container.appendChild(msgRecieveBox);

      const msgRecieve = document.createElement("div");
      msgRecieve.classList.add("msg--recieve");
      msgRecieve.id = `msgRecieve${r + 1}`;
      msgRecieveBox.appendChild(msgRecieve);

      const msgRecieveText = document.createElement("div");
      msgRecieveText.classList.add("msg--recieve-text");
      msgRecieveText.id = `msgRecieveText${r + 1}`;
      msgRecieveText.textContent = recieveMsgArr[r].text;
      msgRecieve.appendChild(msgRecieveText);

      const msgRecieveTime = document.createElement("div");
      msgRecieveTime.classList.add("msg--recieve-time");
      msgRecieveTime.id = `msgRecieveTime${r + 1}`;
      msgRecieveTime.textContent = recieveMsgArr[r].timeStamp;
      msgRecieve.appendChild(msgRecieveTime);

      container.scrollTop = container.scrollHeight;
    }
    recieveText();
  }
}

checkRecieveEmptyText();

//chat Handle with contact

function chatHandleClick() {
  const msg = JSON.parse(localStorage.getItem("msgs")) || { msg: [] };
  
  let chatSendButton = document.querySelector(".sentButtonBox");
  let chatMsgBox = document.querySelector(".chatMsgBox");
  let id;

  for (let item = 0; item < contactData.contacts.length; item++) {
    const contactN = document.getElementById(`contact${item + 1}`);
    
    if(!msg.msg[item]){
      msg.msg[item] = {
      id_No: item + 1,
      recieveMsgArray: [],
      sendMsgArray: [],
    };
  }
  let sendMsgId = document.querySelector(".textMsgBox");

    contactN.addEventListener("click", function () {
      sendMsgId.value = "";
      id = item + 1;
      handleChatSend(id);
      handleChatRecieve(id);
      chatMsgBox.innerHTML = "";
    });
  }
  let sendMsgText;
  function handleChatSend(contactId) {
    let sendMsgId = document.querySelector(".textMsgBox");
    sendMsgText = sendMsgId.value;

    const messageSendObject = {
      text: sendMsgText,
      timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
    };

    if (
      messageSendObject.text !== null &&
      messageSendObject.text !== "" &&
      messageSendObject.text !== undefined
    ) {
      msg.msg[contactId - 1].sendMsgArray.push(messageSendObject);
    }
    saveContactsMsgsToLocalStorage(msg);
  }

  function handleChatRecieve(contactId) {
    const messageRecieveObject = {
      text: "hi , Krishna",
      timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
    };
    if (
      messageRecieveObject.text !== null &&
      messageRecieveObject.text !== "" &&
      messageRecieveObject.text !== undefined
    ) {
      msg.msg[contactId - 1].recieveMsgArray.push(messageRecieveObject);
    }
    saveContactsMsgsToLocalStorage(msg);
  }
  const textMsgBox = document.querySelector(".textMsgBox");

  chatSendButton.addEventListener("click", function () {
    handleChatSend(id);
    //saveMessagesToServer(msg);
  });

  textMsgBox.addEventListener("keydown", function buttonEnter(e) {
    if (e.key === "Enter") {
      handleChatSend(id);
      //saveMessagesToServer(msg);
    }
  });
}
let stringData;
async function saveContactsMsgsToLocalStorage(data) {
  stringData = JSON.stringify(data);
  localStorage.setItem("msgs", stringData);

}

chatHandleClick();

//message to file

function saveDataToFile(data, filename) {
  const blob = new Blob([data], { type: 'json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

const addDataFile = document.querySelector('.addIconBox');
  addDataFile.addEventListener("click",function (){
    saveDataToFile(stringData, 'chatMessages.json');
  })

//message to server

/* function saveMessagesToServer(data) {
  fetch('http://127.0.0.1:3000/saveMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));
}
 */

