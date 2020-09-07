import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getBooksQuery, deleteBookMutation } from '../queries';
import BookDetails from "./BookDetails";

const renderBookList = (loading, error, data, setSelected, deleteBook) => {
	if (loading) {
		return <p>Loading.....</p>;
	} else if (error) {
		return <p>Error......</p>;
	} else {
		return (
			<ul className="book-list">
				{data.books.map((book) => {
					const { id, name } = book;
					return <li className="book-list__elem" key={id} onClick={() => { setSelected(id) }}>{name}
						<i className="fas fa-trash" onClick={() =>
							deleteBook({
								variables: { id },
								refetchQueries: [{ query: getBooksQuery }]
							})}></i>
					</li>;
				})}
			</ul>
		);
	}
};

function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [deleteBook] = useMutation(deleteBookMutation);
	const [selected, setSelected] = useState(null);
	return <>
		{renderBookList(loading, error, data, setSelected, deleteBook)}
		<BookDetails bookId={selected} />
	</>;
}

export default BookList;
