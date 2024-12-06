### 307_Inventory_Project
This software is used to manage store inventories. It is easy to use and organized. It is called
SupplyHub and has the ability to add, delete, and edit items within your inventory. Everything
is linked to your account and you can view your items in a catalog after successful login.

UI Prototype link:
https://click.figma.com/ls/click?upn=u001.Y4GnNWhdnCDA1MWI-2FhIyfOSqzSOOn-2BuE-2BZrF9-2BcnUGiivhcOhY3M9uAFq63kbTUtR394Qn5A4XzkUEvl-2ByqtsVIiHjoU8-2BxCWSNjdzpwKTbsSafeKfOgyptP6R5O5AqUgqVfHQ40Ef1PismoMkPcgxK3a-2BY7EYbCi2xlnN-2F819Y-3DimSt_cFyvuIE4NQlEd6HiByBsFnao8rcHda2pJYo-2Fn-2Bq-2BJaIQ3srnyiFplMj-2BqnLt3re7A87amL4C9xS-2FYTVBK7N8PThmkPtRPC5gFOFYyGAWb2HFpbaq2xqxeNFehaof-2FJmBpnbgigxq0JFr9McZQDsKQOUOrqB5pqVV1jcfK3DGHM5vkLnvMOIRcU1PZPI88-2FzUE6dV-2FREuOM1YugU-2Fo1pFWqgyVWZRorEXmCZQ-2FJ3GQ0EYEMWCcOTdQ8yULpS9F7A-2BP1glng0XlhgxYPQ513Dt0Vsggut7z1alI9x10UGusxV7QzH2eavK6QIMlSLc31tYq2l-2F3wiyJ7GEW5SW-2FBhYECLDVvGtNqD4PnQEW0Qv0AQ08F2BPQ0GrG8RWmBQt9DQ

https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/

## Contributing


* React/Javascript
* Tools:
  - Prettier
  - ESLint



## Development environment setup

To set up the project locally, create a `.env` file in the `backend` directory with the following format:
Don't forget to npm install dotenv in your backend folder. Place .env in your backend folder
Change localhost:8000 on the frontend to the web link

To run, first run "npm run dev" in the packages/backend folder to start the backend, then also run "npm run dev"
at the root or packages/frontend where you can test the frontend by opening "http://localhost:5173" in a web browser
- Note: both frontend and and backend are still connecting to the online webservice and database respectivly as opposed to local ones.


### env file contents
```plaintext
MONGODB_URI=mongodb+srv://username:password@cluster0.ofzol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
VALID_ORIGINS = http://localhost:5173
```


