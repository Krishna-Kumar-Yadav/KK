const mainPageContainer = document.querySelector('.mainContainer');
const loginButton = document.querySelector('.loginButton');

loginButton.addEventListener("click",function(){

  fetch('loginPage.html')
  .then(response => response.text())
  .then(html =>{
    mainPageContainer.innerHTML = html;
  })
  .catch(error => console.error("Page not loading because error of ",error))
})

const registrationButton = document.querySelector('.registrationButton');

registrationButton.addEventListener("click",function(){

  fetch('registrationPage.html')
  .then(response => response.text())
  .then(html => {
    mainPageContainer.innerHTML = html;
  })
  .catch(error => console.error("Page not loading because error of ",error))
})