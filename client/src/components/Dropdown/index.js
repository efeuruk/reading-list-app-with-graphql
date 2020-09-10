import React from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../../queries";
import Loading from "../Loading";

const renderAuthors = (loading, error, data) => {
	if (loading) {
		return (
			<option disabled>
				<Loading />
			</option>
		);
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

export default function Dropdown({ label, value, setValue }) {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	return (
		<div className="field">
			<label>{`${label}:`}</label>
			<select value={value} onChange={(e) => setValue(e.target.value)}>
				<option value="">Select Author</option>
				{renderAuthors(loading, error, data)}
			</select>
		</div>
	);
}
