# Bonsai React Interview Test

Welcome to the creative interview test at Shop Bonsai.

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today). 

Scenario:
You joined as the new member of a small start-up team. Together we are building a new app to sell cool 3rd party products! So far, the sales team worked tirelessly and managed to acquire over 50 merchants who each have different brands and products offerings. The developers have also been working hard and have created a home page and shop page to welcome the users and display the products of the newly acquired merchants.

Goal:
Your task is to add a new complete working feature that you feel will best demonstrate your capabilities as a team-member and have the largest positive impact on our customer. This implies that JUST updating the es-lint rules to include trailing commas, switching all space-characters in the code-base to tab-characters, and/or updating the .gitignore will score low. However, non-customer facing features such as validating data, unit-testing, creating a automatic-backups of the database, can score very high if done well.

**NOTE:** If you are interveiwing for a frontend role, you simply need to make a frontend feature!

Here are some ideas for features that were added tot he frontend of the app using mockMerchantData.js as a database:
 - Clicking Buy does SOMETHING! This should add data to the database in a meaningful way and communicate to the user that such an action took place.
 - Ability to select a quantity to buy. The quantity should be stored in the database in a meaningful way, this data should be retrieved and displayed somewhere for the user.
 - Add a profile page to display user-related data. This data should be stored in the database and retrieved.
 - Select multiple items to buy together. Which items get selected/submitted should be stored meaningfully in the database.
 - Add a cart object to display selected items the user wants to buy. Store this information meaningfully in the database.

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

