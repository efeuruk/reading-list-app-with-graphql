import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { updateBookMutation, getBooksQuery, getBookQuery } from "../../queries";
import Loading from '../Loading';
import InputField from '../InputField';
import Dropdown from "../Dropdown";

function UpdateBook({ bookId, modalState }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
            id: bookId,
        }
    });

    const [updateBook] = useMutation(updateBookMutation);

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    const updateOnBookData = useCallback(() => {
        if (data) {
            const { name, genre, author } = data.book;
            setName(name);
            setGenre(genre);
            setAuthorId(author.id);
        }
    }, [data])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            updateOnBookData();
        }
        return () => mounted = false;
    }, [updateOnBookData])

    const submitForm = (e) => {
        e.preventDefault();
        updateBook({
            variables: { id: bookId, name, genre, authorId },
            refetchQueries: [{ query: getBooksQuery }],
        }).then(() => {
            modalState(false);
        });
    };

    if (loading) {
        return <Loading />;
    }

    else if (error) {
        return <p>Error....</p>
    }

    else {
        return <form className="add-book" onSubmit={(e) => submitForm(e)}>
            <InputField label="Book Name" value={name} setValue={setName} />
            <InputField label="Genre" value={genre} setValue={setGenre} />
            <Dropdown label="Author" value={authorId} setValue={setAuthorId} />
            <button>Update the book</button>
        </form>;
    }
}

export default UpdateBook;