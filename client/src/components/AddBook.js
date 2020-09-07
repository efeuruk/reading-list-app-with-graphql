import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";
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

function AddBook() {
	const { loading, error, data } = useQuery(getAuthorsQuery);
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
			<div className="field">
				<label>Book name:</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={(e) => setGenre(e.target.value)} />
			</div>
			<div className="field">
				<label>Author:</label>
				<select onChange={(e) => setAuthorId(e.target.value)}>
					<option value="">Select Author</option>
					{renderAuthors(loading, error, data)}
				</select>
			</div>
			<button>Add a new book</button>
		</form>
	);
}

export default AddBook;
