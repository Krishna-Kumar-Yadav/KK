const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

const inpBox = document.querySelector("#input");
const searchBox = document.querySelector(".icon--search");

searchBox.addEventListener("click", apiCall)
inpBox.addEventListener("keydown",function(e){
  if(e.key === "Enter"){
    apiCall();
  }
})
const clear = document.querySelector(".icon--close");
clear.addEventListener("click",function(){
  location.reload()
})

function apiCall(){
  const word = inpBox.value;
  fetch(`${url}/${word}`)
    .then((response) => {
      if(!response.ok){
        print("Sorry ! there is network problem. I Krishna unable to fetch it")
      }
      else{
        return response.json();
      }
    })
    .then((data) =>{ 
        dictionary(data);
        console.log(data)})
    .catch((error) => console.error("Error fetching data:", error));
  
}

function dictionary(dictionaryData) {
  const latinWord = document.querySelector(".latin_word")
  const findWord = document.querySelector(".find_word");
  const meaningBox = document.querySelector(".meaning_box--paragraph");
  const exampleBox = document.querySelector(".example_box--paragraph");
  const synonymsBox = document.querySelector(".synonyms_box--paragraph");
  const audio = document.querySelector(".icon--speaker");
  findWord.textContent = dictionaryData[0].word;
  latinWord.textContent = dictionaryData[0].phonetic;
  if (dictionaryData[0].meanings[0].definitions[0].definition) {
    meaningBox.textContent = dictionaryData[0].meanings[0].definitions[0].definition;
  } else {
    meaningBox.textContent ="NULL";
  }
  if (dictionaryData[0].meanings[0].definitions[0].example) {
    exampleBox.textContent = dictionaryData[0].meanings[0].definitions[0].example;
  } else {
    exampleBox.textContent = "NULL";
  }
  if (dictionaryData[0].meanings[0].definitions[0].synonyms.length !== 0) {
    synonymsBox.textContent = dictionaryData[0].meanings[0].definitions[0].synonyms.join(",");
  } else {
    synonymsBox.textContent = "NULL";
  }


  audio.addEventListener("click",function(){
    dictionaryData[0].phonetics.forEach(element => {
      if(element.audio !== ""){
        new Audio(`${element.audio}`).play();
      }
    });
  })
}

