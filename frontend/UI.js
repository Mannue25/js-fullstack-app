
import BookService from './services/BookService'
const bookService = new BookService();
import {format} from 'timeago.js';


class UI {
    async renderBooks(){
        const books = await bookService.getBooks();
        const booksCardsContainer = document.getElementById('books-cards');
        booksCardsContainer.innerHTML = '';
        books.forEach(book => {
           const div =  document.createElement('div')
           div.className = '';

           div.innerHTML= `
           <div class= "card m-2">
           <div class="row no-gutters">
           <div class="col-md-4">
           <img src="${book.imagePath}" class="img-fluid" alt""> 
           </div>
           <div class="col-md-8">
           <div class="card-bolck px-2">
           <h4 class="card-title">${book.title}</h4>
           <p class="card-text">${book.author}</p>
           <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
           </div>
           </div>
           </div>
           <div class="card-footer w-100 text-muted">
           <span>${format(book.created_at)}</span>
           </div>
           </div>
           
           `

           booksCardsContainer.appendChild(div);
        });
       
    }

   async addNewBook(book){
        await bookService.postBook(book)
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(msg, msgColor, secondsToReove) {
        const div = document.createElement("div");
        div.className =`alert alert-${msgColor} message`;
      
        div.appendChild(document.createTextNode(msg));
        

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

      container.insertBefore(div, bookForm)
        const messageClass = document.querySelector('.message');
        setTimeout(() => {
            messageClass.remove();
        }, secondsToReove)
    }

    async deleteBook(bookId){
       await bookService.deleteBook(bookId);
        this.renderBooks();
    }
}

export default UI;