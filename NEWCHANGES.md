# Spinner
I added a spinner to the Products/Home, Users, and user page. Initially, the page would display "No products available" or "No users available" before the data was loaded. Now it will show a Bootstrap spinner until the data is loaded. If no data is returned, it will show the original text.

# Pages
Initially, the React code was structured to load the Products component as a lone component. I changed it to have a pages folder. I added 4 pages, the Home page, the Users page, the User page, and a 404 page.

## Home Page
I moved the products component into the home page. The idea behind that, is to add a cart component on the right of the page that is fixed when you scroll.

## Users List Page
Initially I was going to build a user profile page, But as I went in a bit, I thought building a list page that leads to an individual users page would better show off my coding skills.

The users list page takes most of its structure from the products component, removing some unneeded bits, and adding the code right in the page component instead of in a separate component being imported in. The users list page probably won't have any extra components imported in at this time, so having a users list component didn't seem necessary.

The users list page required a new graphql endpoint, type, and mock data. The mock data was created from the user ids of the merchants mock data, given the role of publisher, and assigned random names.

When a user on the users list page is clicked, it takes you to the user profile page.

## User Profile Page
The user profile page is where you would see more details about the user if there were more to show. When the page is rendered, it takes the user id from the url, and sends it as a parameter to the server to find the user object with that id.

I am not sure if the way I handled getting the user data from the server is correct. I have not used graphql before this, and the approach I took feels to close to REST. I wondered if I was supposed to use the users list endpoint, but I do now know how that endpoint would look in the resolvers file.

I wanted to show merchant and product info on the users page as well, but my limited experience of graphql prevented me from implementing that within time I had to do the project.

## 404 page
This is just a basic page that displays when a route doesn't exist.

# Nav Bar
The nav bar component uses the bootstrap navigation bar, within a custom component stored in the components folder. The nav component is pulled into the app.js file, and is rendered just about the routes component, to make it persistent on each page.


# Added Routing
Initially, the application only had 1 page. But since I was adding at least 1 more, I needed to add react routing. I created a routes component to take the logic out of the app.js file, and keep all of the routing logic in 1 component. The routes component is then imported into app.js.

The Routes component is only meant for routing pages. Components in the pages folder should be the only components that are in the routes components.

Additionally the webpack config needed to be modified to allow changing the url manually and still get a page returned.

# Add to Cart
I sent some questions when I started working on the project, 1 of which was around where my focus should be. I didn't get a response until the evening which specified that a backend focus would be preferred. I spent a few more hours in the evening working on this, but didn't have too much time, so I wasn't able to implement a database, or return cart data to the front end.

On the home page, when you click the buy button of a product, it create a graphql mutation that sends to the server. The server picks it up and calls the addToCart function in the ProductController. Since there is no db, the data is just logged to the console. There is some basic error checking as well, that throws an error if the ids are not correct.
