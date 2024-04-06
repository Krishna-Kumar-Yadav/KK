
//Book Api

fetch('./books-api.json')
  .then(response => response.json())
  .then(bookApi => {
    addOptionsBooksApi(bookApi)

  })
  .catch(error => console.error('Error fetching book API:', error));


//Student Api 

fetch('./student-api.json')
  .then(response => response.json())
  .then(studentApi => {
    addOptionStudentApi(studentApi)

  })
  .catch(error => console.error('Error fetching student API:', error));


//creating option

function addOptionsBooksApi(optionsData) {
  const bookNameSelect = document.querySelector('.bookNameSelect');
  const bookAuthorNameSelect = document.querySelector('.bookAuthorNameSelect');


  optionsData.books.forEach(book => {
    const option = document.createElement('option');
    option.value = book.title;
    option.textContent = book.title;
    bookNameSelect.appendChild(option);
  });

  optionsData.books.forEach(book => {
    const option = document.createElement('option');
    option.value = book.author;
    option.textContent = book.author;
    bookAuthorNameSelect.appendChild(option);
  });
}

function addOptionStudentApi(api){
  const studentBranchSelect = document.querySelector('.studentBranchselect');

  api.students.forEach(element => {
    const option = document.createElement('option');
    option.value = element.branch;
    option.textContent = element.branch;
    studentBranchSelect.appendChild(option);
  });
}

