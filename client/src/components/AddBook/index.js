import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { addBookMutation, getBooksQuery } from "../../queries";
import InputField from '../InputField';
import Dropdown from "../Dropdown";

function AddBook() {
	const [addBook] = useMutation(addBookMutation);
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");
	const submitForm = (e) => {
		e.preventDefault();
		addBook({
			variables: { name, genre, authorId },
			refetchQueries: [{ query: getBooksQuery }],
		});
	};
	return (
		<form className="add-book" onSubmit={(e) => submitForm(e)}>
			<InputField label="Book Name" setValue={setName} />
			<InputField label="Genre" setValue={setGenre} />
			<Dropdown label="Author" setValue={setAuthorId} />
			<button>Add a new book</button>
		</form>
	);
}

export default AddBook;
