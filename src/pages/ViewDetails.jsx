import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Back from './Back';


const ViewDetails = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editedBook, setEditedBook] = useState({ authors: {} });

  useEffect(() => {
    axios.get('https://backend-qmjl.onrender.com/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleDelete = (bookId) => {
    axios.delete(`https://backend-qmjl.onrender.com/books/${bookId}`)
      .then(response => {
        setBooks(books.filter(book => book._id !== bookId));
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditedBook({ ...book });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');
    if (subField) {
      setEditedBook(prevState => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subField]: value
        }
      }));
    } else {
      setEditedBook(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    axios.put(`https://backend-qmjl.onrender.com/books/${editingBook._id}`, editedBook)
      .then(response => {
        setBooks(books.map(book => (book._id === editedBook._id ? response.data : book)));
        setEditingBook(null);
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  // Helper function to calculate row spans
  const calculateRowSpans = (books) => {
    const rowSpans = [];
    let currentPublisher = null;
    let count = 0;
    books.forEach((book, index) => {
      if (book.publishername !== currentPublisher) {
        if (count > 0) {
          rowSpans.push(count);
        }
        currentPublisher = book.publishername;
        count = 1;
      } else {
        count++;
      }
    });
    rowSpans.push(count);
    return rowSpans;
  };

  const rowSpans = calculateRowSpans(books);
  let rowIndex = 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
      <Back />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Publisher Name</th>
                <th className="border px-4 py-2">Book Name</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Publisher Date</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Total Copies</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                const isEditing = editingBook?._id === book._id;
                const showPublisher = index === 0 || book.publishername !== books[index - 1].publishername;
                const rowSpan = rowSpans[rowIndex];
                if (showPublisher) rowIndex++;

                return (
                  <tr key={book._id} className="text-center">
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="authors.imageurl"
                          value={editedBook.authors?.imageurl}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        <img src={book.authors?.imageurl} alt={book.authors?.bookname} className="w-16 h-16 object-cover mx-auto" />
                      )}
                    </td>
                    {showPublisher && (
                      <td className="border px-4 py-2" rowSpan={rowSpan}>
                        {isEditing ? (
                          <input
                            type="text"
                            name="publishername"
                            value={editedBook.publishername}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          book.publishername
                        )}
                      </td>
                    )}
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="authors.bookname"
                          value={editedBook.authors?.bookname}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        book.authors?.bookname
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="authors.author"
                          value={editedBook.authors?.author}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        book.authors?.author
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="date"
                          name="authors.publisherdate"
                          value={editedBook.authors?.publisherdate.split('T')[0]} // to handle date format
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        new Date(book.authors?.publisherdate).toLocaleDateString()
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="number"
                          name="authors.price"
                          value={editedBook.authors?.price}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        book.authors?.price
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <input
                          type="number"
                          name="authors.totalcopies"
                          value={editedBook.authors?.totalcopies}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        book.authors?.totalcopies
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing ? (
                        <>
                          <FaSave
                            className="cursor-pointer text-green-500 hover:text-green-700 mr-2"
                            onClick={handleSave}
                          />
                          <FaTimes
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => setEditingBook(null)}
                          />
                        </>
                      ) : (
                        <>
                          <FaEdit
                            className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                            onClick={() => handleEdit(book)}
                          />
                          <FaTrash
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(book._id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
