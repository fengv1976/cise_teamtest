import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import BookCard from './BookCard';



class search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      sbooks: [],
      sort: 'title',
      searchQuery: ''
    };
  }
    componentDidMount() {
        axios
          .get('http://localhost:8082/api/books')
          .then(res =>
             { this.setState({
              books: res.data
            })
          })
          .catch(err =>{
            console.log('Error');
          })
    };

    sort(list){

    }

    handleInputChanged(event){
        this.setState({
          searchQuery: event.target.value
        });
    }
    handleSelect(event){
      this.setState({
        sort: event.target.value
      });
      
  }

    render() {
      const books = this.state.books;

      // sorting
      if(this.state.sort === 'title'){
        books.sort((a,b) => (a.title > b.title)? 1 : (a.title === b.title) -1)
      }
      if(this.state.sort === 'year'){
        books.sort((a,b) => (a.year > b.year)? 1 : -1)
      }

      // title search here
      if(this.state.searchQuery!==''){
        books.filter(book => book.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1)
      }
      console.log("PrintBook: " + books);
      let bookList;
      
  
      if(!books) {
        bookList = "there is no book record!";
      } else {
        bookList = books.map((book, k) =>
          <BookCard book={book} key={k} />
        );
        
      }

        return (

            <div className="home">
                <div className="navbar">
                    <ul className="navlist">
                        <li className="navbtn"><a href="/">Home</a></li>
                        <li className="navbtn"><a href="/search">Browse Articles</a></li>
                        <li className="navbtn"><a href="/advancedSearch">Advance Search</a></li>
                    </ul>
                </div>
                <div className="container">
                    <h2 className="title">Articles</h2>
                    <h2 className="header">Basic Title Search</h2>                         
                    <input className="textbox" onChange={this.handleInputChanged.bind(this)} value={this.state.searchQuery}/>
                    <p>{this.state.searchQuery}</p>
                    <label>Sort by:</label>
                    <select onChange={this.handleSelect.bind(this)} value={this.state.sort} >
                      <option value="title">Title</option>
                      <option value="year">Year</option>
                    </select>
                </div>
                <table>
                <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Journal</th>
                <th>Year</th>
                <th>Eprint</th>
                <th>Eprint Type</th>
                <th>Eprint Class</th>
                <th>Pages</th>
                <th>Month</th>
                <th>Annote</th>
                </tr>
                {bookList}
                </table>
                

                <div className="footer">
                    <p className="footertext">Developed by</p>
                    <p className="footertext">Victor Feng | Aaron Gilbert | Gerard Gomez</p>
                </div>
            </div>
    );
  }
}
export default search;
