# Bonsai React Interview Test

Welcome to the creative interview test at Shop Bonsai.

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today). 

Scenario:
You joined as the new member of a small start-up team. Together we are building a new app to sell cool 3rd party products! So far, the sales team worked tirelessly and managed to acquire over 50 merchants who each have different brands and products offerings. The developers have also been working hard and have created a home page and shop page to welcome the users and display the products of the newly acquired merchants.

Goal:
Your task is to add a new complete working feature that you feel will best demonstrate your capabilities as a team-member and have the largest positive impact on our customer. This implies that JUST updating the es-lint rules to include trailing commas, switching all space-characters in the code-base to tab-characters, and/or updating the .gitignore will score low. However, non-customer facing features such as validating data, unit-testing, creating a automatic-backups of the database, can score very high if done well.

**NOTE:** If you are interveiwing for a frontend role, you simply need to make a frontend feature!

Here are some ideas for features that are missing from the app (you can use your own database or consider mockMerchantData.js as a database):
 - Clicking Buy does SOMETHING! This should add data to the database in a meaningful way and communicate to the user that such an action took place.
 - Ability to select a quantity to buy. The quantity should be stored in the database in a meaningful way, this data should be retrieved and displayed somewhere for the user.
 - Add a profile page to display user-related data. This data should be stored in the database and retrieved.
 - Allow users to login using social media. A record of the user being logged in should be stored in the database, retrieved and displayed (perhaps on a special admin-only page).
 - Select multiple items to buy together. Which items get selected/submitted should be stored meaningfully in the database.
 - Add a cart object to display selected items the user wants to buy. Store this information meaningfully in the database.
 - Organize the shop page for better browsing experience, adding filters for brands/merchants/products.
 - Ability to 'like' an item. Store which items got liked in the database, retrieve this information.
 - Searching for product by name/brand/merchant. Store searches meaningfully in the database.
 - Add loading-images so the screen isn't empty while data is loading. Add page visits and loading times to the database in a meaningful way.
 - Add a react testing-framework and create a test. Record the results in separate database for the QA team!

The following should be noted:
1. Assume that if a piece of code/function is not working, it is a bug in the app (oh no!)
2. Work with the data as if it were real. (Do not manipulate/transform the mockData files)
3. You can make additional assumptions, please note them if they are critical to understanding the way a feature is implemented
4. You can add multiple small features or one large feature
5. Please document your changes well and make as many atomic commits as you feel are necessary for someone to track your changes

Of your submission, the following will be evaluated:
- Ability to work in a pre-existing React environment (front-end)
- Ability to use existing data in the database (back-end)
- Ability add/store/retrieve new data in the database (back-end)
- Completeness of feature, works as a user would expect such a feature to work
- Adopting and using best practices
- Coding style
- Attention to detail
- Clarity in communicating the feature implemented (I highly recommend taking pictures and gifs)

High scorers will be contacted via email within a week of acknowledgement of PR submission.
Thank you and good luck for everyone who applied and submitted a PR.

## Install
1. Ensure `yarn` is installed


## Run
1. `yarn dev`
2. View at `http://localhost:8080/`

It should look like this initially:
![Shop Page Default Look and browse](https://raw.githubusercontent.com/ShopBonsai/react-interview-test/master/docs/shopPage.gif)






## Notes from Jonathon

Hi! I wish i had more time to spend on this to add additional functionality such as giving proper types, auth and some testing. Alas, this is all I have time for right now. The main focus for me on this exercise was scalability and showing some of the virtual features with GraphQL and Mongo DB. Summary of what I did.

- Upgraded to typescript (but did not have time to type)
- Setup mongoDB and generated large amount of test data  mongoDB URI => MONGO_URI=mongodb+srv://bonsai:bCL141vW2tFBMxWZ@cluster0.ndfky.mongodb.net/bonsai?retryWrites=true&w=majority
- Setup field resolvers to support nested queries (putting the graph in graphql) between Merchants, Brands and Products
- Modeled DB schema/models to be scalable such that many records can be crated, vs the nested nature of the test JSON
- Setup data models to be accesable via Apollo server context.
- Setup pagination for Products which can also be used at the field level
- Showcased virtual features of GraphQL, ex dateCreated guid