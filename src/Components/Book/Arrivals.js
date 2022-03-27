import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Book from './Book';
import "./Book.css"

const Arrivals = () => {
    const [books, setBooks] = useState({});
    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    }, []);

    const URL = "http://localhost:5000/books/addarrival";

    const fetchHandler = async () => {
        return await axios.post(URL), {
            image: String(books.image),
            name: String(books.name),
            author: String(books.author),
            price: Number(books.price),
            available: Boolean(books.checked),
            ratings: Number(books.ratings)
        }.then((res) => console.log(res.data));
    };

    return (
        <div>

            {/* Books */}
            <ul>
                {
                    books &&
                    books.map((book, i) => (
                        <li key={i}>
                            <Book book={book} />
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default Arrivals