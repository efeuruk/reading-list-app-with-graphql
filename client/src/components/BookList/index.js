import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getBooksQuery, deleteBookMutation } from "../../queries";
import BookDetails from "../BookDetails";
import Loading from "../Loading";
import Modal from "../Modal";

const renderBookList = (
	loading,
	error,
	data,
	setSelected,
	deleteBook,
	setIsModalOpen
) => {
	if (loading) {
		return <Loading />;
	} else if (error) {
		return <p>Error......</p>;
	} else {
		return (
			<ul className="book-list">
				{data.books.map((book) => {
					const { id, name } = book;
					return (
						<li
							className="book-list__elem"
							key={id}
							onClick={() => {
								setSelected(id);
							}}
						>
							{name}
							<i
								className="fas fa-pen"
								onClick={() => setIsModalOpen(true)}
							></i>
							<i
								className="fas fa-trash"
								onClick={() =>
									deleteBook({
										variables: { id },
										refetchQueries: [
											{ query: getBooksQuery },
										],
									})
								}
							></i>
						</li>
					);
				})}
			</ul>
		);
	}
};

function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [deleteBook] = useMutation(deleteBookMutation);
	const [selected, setSelected] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			{renderBookList(
				loading,
				error,
				data,
				setSelected,
				deleteBook,
				setIsModalOpen
			)}
			<BookDetails bookId={selected} />
			{isModalOpen ? (
				<Modal
					isOpen={isModalOpen}
					state={setIsModalOpen}
					bookId={selected}
				/>
			) : null}
		</>
	);
}

export default BookList;
