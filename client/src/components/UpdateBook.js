import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, updateBookMutation, getBooksQuery, getBookQuery } from "../queries";
import Loading from './Loading';

const renderAuthors = (loading, error, data) => {
    if (loading) {
        return <option disabled><Loading /></option>;
    } else if (error) {
        return <option disabled>Error......</option>;
    } else {
        return data.authors.map((author) => {
            const { id, name } = author;
            return (
                <option key={id} value={id}>
                    {name}
                </option>
            );
        });
    }
};

function UpdateBook({ bookId, modalState }) {
    const { loading: loadingAuthors, error: errorAuthors, data: dataAuthors } = useQuery(getAuthorsQuery);
    const { loading: loadingBook, error: errorBook, data: dataBook } = useQuery(getBookQuery, {
        variables: {
            id: bookId,
        }
    });

    const [updateBook] = useMutation(updateBookMutation);

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    const updateOnBookData = useCallback(() => {
        if (dataBook) {
            const { name, genre, author } = dataBook.book;
            setName(name);
            setGenre(genre);
            setAuthorId(author.id);
        }
    }, [dataBook])

    useEffect(() => {
        updateOnBookData();
    }, [updateOnBookData])

    const submitForm = (e) => {
        e.preventDefault();
        updateBook({
            variables: { id: bookId, name, genre, authorId },
            refetchQueries: [{ query: getBooksQuery }],
        });
        modalState(false);
    };

    if (loadingBook) {
        return <Loading />;
    }

    else if (errorBook) {
        return <p>Error....</p>
    }

    else {
        return <form className="add-book" onSubmit={(e) => submitForm(e)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option value="">Select Author</option>
                    {renderAuthors(loadingAuthors, errorAuthors, dataAuthors)}
                </select>
            </div>
            <button>Update the book</button>
        </form>;
    }
}

export default UpdateBook;