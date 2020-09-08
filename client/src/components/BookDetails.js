import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries";
import Loading from './Loading';

const renderBookList = (loading, error, data) => {
	if (loading) {
		return <Loading />;
	} else if (error) {
		return <p>Error.....</p>;
	} else if (data?.book) {
		const { name, genre, author } = data.book;
		return (
			<>
				<h2>{name}</h2>
				<p>Genre: {genre}</p>
				<p>Author: {author.name}</p>
				<p>Other books by this author: </p>
				<ul className="other-books">
					{author.books.map((item) => {
						return <li key={item.id}>{item.name}</li>;
					})}
				</ul>
			</>
		);
	} else {
		return <div>No book selected</div>;
	}
};

function BookDetails({ bookId }) {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: {
			id: bookId,
		},
	});
	return (
		<div className="book-details">
			{renderBookList(loading, error, data)}
		</div>
	);
}

export default BookDetails;
