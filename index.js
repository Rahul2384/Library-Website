// This is a Book Constructor Object
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// This is a constructor object to display
function Display() {

}

// for adding books
Display.prototype.add = function(){

      // displaying from localStorage
      let table = localStorage.getItem("table");
      if(table == null){
          tableObj = []
      }
      else{
          tableObj = JSON.parse(table);
      }
    
    let uiString = '';
    tableObj.forEach(function(element){
         uiString += `<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                    </tr>`;
    })

    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = uiString;
}

//for clearing the previous entered values
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Validating the form
Display.prototype.validate = function(book){
    if (book.name.length<3 || book.author.length<3)
    {
        return false;
    }
    return true;
}

// for showing alert
Display.prototype.show = function(type, msg){
    let alert;
    if(type === 'success') alert='Success';
    else alert='Error!';
   let message = document.getElementById('message');
   message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${alert}</strong> ${msg}.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`
                
    setTimeout(() => {
        message.innerHTML='';
    }, 2000);
}

// On Reloading It should first show the content in localStorage
Display.prototype.add();

// adding EventListener to libraryform id
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    // console.log(book);
    // console.log(type);

    let display = new Display();

    //Checking whether the book is valid or not
    if(display.validate(book)){

        // adding to the localstorage
        let table = localStorage.getItem("table");
        if(table == null){
            tableObj = []
        }
        else{
            tableObj = JSON.parse(table);
        }
        let obj = {
            name:book.name,
            author:book.author,
            type:book.type
        }
        tableObj.push(obj);
        localStorage.setItem("table",JSON.stringify(tableObj));

        //adding
        display.add(book);
        display.clear();

        display.show('success', 'Your Book is successfully added');
    }
    else{
        display.show('danger','Sorry You cannot add this book');
    }
    e.preventDefault();
}
