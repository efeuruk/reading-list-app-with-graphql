import { gql } from "@apollo/client";

// Queries
const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

const getBookQuery = gql`
 	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
 	}
`;

// Mutations
const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const deleteBookMutation = gql`
	mutation($id: ID!) {
		deleteBook(id: $id) {
			id
			name
		}
	}
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery, deleteBookMutation };
