// TODO: Modal dışı tıklama kapanması
import React from "react";
import UpdateBook from "./UpdateBook";

export default function Modal({ isOpen, state, bookId }) {
	return (
		<div className={`modal${isOpen ? " open" : ""}`}>
			<div className="modal__content">
				<i className="fas fa-times" onClick={() => state(false)}></i>
				<UpdateBook bookId={bookId} />
			</div>
		</div>
	);
}
