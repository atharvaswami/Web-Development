console.log("This is index.js");
// To do list
//1. Store all the data to the localStorage
//2. Give another column as an option to delete the book
//3. Add a scroll bar to the view
//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

// add methods to display prototype
Display.prototype.add = function (book) {
    console.log('Adding to UI');
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implement the validate function
Display.prototype.validate = function(book) {
    if (book.name.length<2 || book.author.length<2)
    {
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(type,displaymessage){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displaymessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                         </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);
} 


// add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted the libraryForm');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let science = document.getElementById('science');
    let horror = document.getElementById('horror');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (science.checked) {
        type = science.value;
    }
    else if (horror.checked) {
        type = horror.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success','Your book has been successfully added. ')
    }
    else{
        //show error to the user
        display.show('danger','Sorry, you cannot add this book. ')
    }

    e.preventDefault();
}