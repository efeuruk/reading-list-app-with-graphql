<h2>Reading List App With Graphql</h2>
This project's purpose was to create a graphql centric app.

It was inspired by this tutorial:

https://www.youtube.com/watch?v=ed8SzALpx1Q&ab_channel=freeCodeCamp.org

Overall it is a single page web app, it firstly loads the cards of books, if you click one of the cards it shows that book's details on the green part. If you want to add a new book you can easily use the form below. In addition to that, it has features of deleting and updating books. It is fully responsive, can look nice on mobile as well.

To run the app, firstly you need to run:

<code>yarn or npm i</code>

on both under client and server folders

After that you need to build client with:

<code>yarn build or npm run build</code>

Finally, running following commands on node server would be enough because it is serving frontend using ssr:

<code>npm run dev or yarn run dev</code>

Alternatively you can run them seperately as well (node server will run on port 4000 and react will run on 3000)

**Note:** If you want to see the graphql api in a documented way, you can go to http://localhost:4000/graphql

Backend:

-   Node.JS/Express
-   Graphql
-   MongoDB

Frontend:

-   React.JS
-   Apollo Client
