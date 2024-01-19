/* chatbox Send part */

send();

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

  const sendMsgArrayText = [];
  const sendMsgArrayTime = [];

  function checkInputEmptyText() {
    inputTextBox.value !== "" ? sendText() : null;
  }

  function sendText() {
    let inputBoxMsg = inputTextBox.value;
    sendMsgArrayText.push(inputBoxMsg);
    sendMsgArrayTime.push(new Date().toLocaleTimeString({ hour: "2-digit" }));
    inputTextBox.value = "";
    

    const msgSendBox = document.createElement("div");
    msgSendBox.classList.add("msg--sendBox");
    container.appendChild(msgSendBox);

    const msgSend = document.createElement("div");
    msgSend.classList.add("msg--send");
    msgSendBox.appendChild(msgSend);

    msgSendText = document.createElement("div");
    msgSendText.classList.add("msg--send-text");
    msgSendText.textContent = inputBoxMsg;
    msgSend.appendChild(msgSendText);

    msgSendTime = document.createElement("div");
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

const recieveMsgArray = [
  {
    text: "krishna yadav",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
  {
    text: "vikas yadav",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
  {
    text: "akshay yadav",
    timeStamp: `${new Date().toLocaleTimeString({ hour: "2-digit" })}`,
  },
  
];


function checkRecieveEmptyText() {
  for (let r = 0; r < recieveMsgArray.length; r++) {
    if(recieveMsgArray[r].text === "" ||  recieveMsgArray[r].text === undefined) {
     continue;
    }
    
    function recieveText() {
      container = document.querySelector(".chatMsgBox");
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
      msgRecieveText.textContent = recieveMsgArray[r].text;
      msgRecieve.appendChild(msgRecieveText);

      const msgRecieveTime = document.createElement("div");
      msgRecieveTime.classList.add("msg--recieve-time");
      msgRecieveTime.id = `msgRecieveTime${r + 1}`;
      msgRecieveTime.textContent = recieveMsgArray[r].timeStamp;
      msgRecieve.appendChild(msgRecieveTime);

      container.scrollTop = container.scrollHeight;
    }
    recieveText();
  }
}

checkRecieveEmptyText();


//chat Handle with contact



