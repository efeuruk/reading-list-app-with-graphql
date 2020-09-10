import React from "react";

export default function InputField({ label, value, setValue }) {
	return (
		<div className="field">
			<label>{`${label}:`}</label>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}
