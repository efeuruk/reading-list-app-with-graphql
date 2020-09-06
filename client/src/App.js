import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// Apollo client setup
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="main">
				<h1 className="main__title">Efe's Reading List</h1>
				<p>Click a book card to see its detail.</p>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
