# CodingChallenge

## Description 

RESTful API endpoints which will help an online grocery shop in managing its products and serve orders.

1. A user can have full CRUD function on the products.
2. A user can create packaging options. A deleted product will cascade delete the packaging and options
3. A user can oder multiple products and it will return the least amount of packaging required to transport, and a breakdown of the packing.

## Installation-Usage

To use this app, you will need a MySQL Workbench account, and to have the app installed on your machine. Documentation with installation instructions are available [here.](https://dev.mysql.com/doc/workbench/en/wb-installing.html) 

STEP 1

    1.1 Clone this repo to your machine.

STEP 2

From Visual Studio Code or the code editor of your choice:

    2.1 Open the repo.  
    2.2 Locate and open the .env.EXAMPLE file, located in the root directory.
    2.3 Add your own MySQL Workbench Username and Password to the env.EXAMPLE file.
    2.4 Re-name the file to .env (i.e. remove .EXAMPLE).
    2.5 Save your changes.
    2.6 Locate and open db\schema.sql.
    2.7 Copy and paste the database schema into a new MySQL Workbench query tab and run it. Refresh and view your updated schemas to ensure that     
        coding_challenge_Tom_H_db now appears.

STEP 3

From your terminal, run:

    3.1 npm i
    3.2 npm run seed
    3.3 npm run start

STEP 4

From the api platform of your choice, the following routes are active:

    4.1 http://localhost:3001/api/products POST : requires a request object with {name, code, price} keys
    4.2 http://localhost:3001/api/products GET : for all products
    4.3 http://localhost:3001/api/products/:id PUT : where id is the id of the product to be edited requires a request object with {name, code, price} keys
    4.4 http://localhost:3001/api/products/:id DELETE : where id is the id of the product to be deleted
    4.5 http://localhost:3001/api/packaging GET : for all packages
    4.6 http://localhost:3001/api/packaging/:id POST : where the id is the packaging to have an option added to requires a request object with {quantity, price} keys
    4.7 http://localhost:3001/api/order GET : requires a request object with keys:product.code value:orderAmount, e.g. {"CE":10, "HM":8}

