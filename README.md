API REST, ONLINE STORE. User, Products & Orders

This project is a basic API REST. The database was created whit Mongo Atlas and the server whit EXPRESS. It is a simulation of a Online store of technological products. It has tree models; Users, Products and orders.

The collections have relations. The User model has the orders field, which receives the IDs of the created orders. The orders model has two fields that relate to the other collections, users and products, both fields receive IDs.

## Technologies

- Node.js
- javaScript
- mongoDB
- Insomnia

## Dependencies

- Nodemon
- express
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

## API URL

http://localhost:3000

To make requests you must add to the API's url, (http://localhost:3000), the following:

/api/v1/users to make request of users.


/api/v1/products to make request of products.



/api/v1/orders to make request of orders.


Then, depending on the information you need, add the enpoints described below

## ENDPOINTS

#### USER

get: '/' get all users

get: /:id get an user by ID

post: /register create an user

post: /login login an user

put: /:id Update a User

delete /:id Delete an User

Notes:

To update the field role in the model user, you must to have an "admin" rol.

Just the admin can delete an user, or the user to himself.

#### PRODUCTS

get: '/' get all products

get: /:id get a product by ID

post: / create a product

put: /:id Update a product

delete /:id Delete a product


Notes:
To create, update or delete a product, you must to have an "admin" role

#### ORDERS

get: '/' get all orders

get: /:id get an order by ID

post: / create a order

put: /:id Update a order

delete /:id Delete a order

Notes:

To create an order, you must be the user related to the order

To update an order, you must to have an "admin" role or be the user who create the order

To update the field quantity in an order the request must to provide the ID of the product that you want to update.

To delete an order, you must to have an "admin" role or be the user who create the order

##### important

There is not front end, you have to make the request by INSOMNIA or the technology of your choice.
