import React, { useEffect } from "react";
import UpdateBook from "./UpdateBook";

export default function Modal({ isOpen, state, bookId }) {
	const closeModalOnBlur = () => {
		window.addEventListener("click", (e) => {
			return e.target.classList.contains("modal") ? state(false) : null;
		});
	};
	useEffect(() => {
		closeModalOnBlur();
	});

	return (
		<div className={`modal${isOpen ? " open" : ""}`}>
			<div className="modal__content">
				<i className="fas fa-times" onClick={() => state(false)}></i>
				<UpdateBook bookId={bookId} />
			</div>
		</div>
	);
}
