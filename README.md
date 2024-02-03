BUDGET API

This app helps manage bills. Shows you which bills are paid and which ones have not been paid.

You would need
-Visual Code
-Github account
-MongoDB account

Steps (*)
1.Terminal Setup
2.Building Models & Controllers & Routes for users
3.Building Models & Controllers & Routes for bills 
4.Postman: user
5.Postman: Bills
6.Testing

1.TERMINAL SETUP
*Go into your terminal
*Make a new directory
*cd into the new directory
*touch server.js
*npm init -y
*npm i express mongoose dotenv morgan bcrypt jsonwebtoken
*touch app.js
*touch .env .gitignore
*git init
*code . (to open up vs code)
*make three seperate folder of controllers, models, and routes
*in .gitignore file add node_modules/ and on the next line add .env
*add your mongo link to the .env tab (MONGO_URI=yourLink)
*goto https://emn178.github.io/online-tools/sha256.html and write a key in the first big box
*copy the hash in the secound bigbox
*write SECRET= pasteHash
*goto package.json add a comma after "start": "node server.js" and make a new line and write "dev": "nodemon"
*go to server.js
*![follow image](49A2C90F-2B77-4593-AE43-206AB0DE52FB.png)
*go to app.js
*![follow image](948F1015-0A48-44C4-832A-92ACB8FB1272.png)

2.BUILDING MODELS & CONTROLLERS & ROUTES FOR USERS
-touch models/user.js
-touch controllers/user.js
-go into the user.js file in the models folder
-![follow the steps in image](95B6C1FA-DC57-4E50-83CD-BE03045E78D6.png)
-![follow next in this image](AAE355BB-7203-4110-BA34-332432C3EA0E.png)
-goto the user.js file in the controllers folder
-![follow these steps in image](B2CC3F65-84E2-4F9E-BD17-EBE30AFA2461.png)
-![follow image](262A242A-87B6-4636-AD63-6FDF0B5700E3.png)
-add a new route folder
-touch routes/userRoutes.js
-go in to the userRoutes.js file
-![follow the image](8998FE49-DE79-4584-A408-01296D12767B.png)

3.BUILDING MODELS & CONTROLLERS & ROUTES FOR BILLS
*touch models/bill.js
*go into the bill.js file in the models folder
*![follow steps in image](images/224C1EA8-387B-4A93-AB1B-0EF643577F2A.png)
*touch controllers/bills.js
*goto the bills.js file in the controllers folder
*![follow image](66FB5B0E-D450-4209-9753-375B033A2CD7.png)
*![follow image](3C0E8B9E-EDBB-470F-A52B-BE3FBF8E1534.png) add a } on line 62
*touch routes/bills.js
*go in to the bills.js file in the routes folder
*![follow image](58656DC9-17E7-44E5-AA1E-92AB045926ED.png)

4.POSTMAN: USER
-follow the steps from the image to test user login with postman
-![follow image](69C8C6CF-962E-4602-BC5F-CDE8EBE0C3EE.png)
-Click on send
-testing login you would want to add /login to the url you already have
-Click on send
-tesing for update first copy the numbers between the quote by the id(example shown in the image below)
![follow image](182B3C34-0B16-4311-8C09-37BE71250B05_4_5005_c.jpeg)
-replace login with the numbers that were copyed in the url
-change the name, email and password to something different
-change post to put
-copy the token
-go to Authorization and change the type into Bearer Token 
-post the token
-Click on send
-tesing for delete by switching from put to delete
-Click the send button

5.POSTMAN: BILLS
-follow the steps from the image to test user login with postman
-![follow image](69C8C6CF-962E-4602-BC5F-CDE8EBE0C3EE.png)
-change users to bills in the url 
-copy the token
-go to Authorization and change the type into Bearer Token 
-post the token
-go back to body and delete the name, email and password
-add {
    "title": "rent",
    "cost": "1400",
    "paid": "true"
}
-Click on send
-to test the list of unpaid bills, change post to get
-Click on send
-to test the list of paid bills add /paid to the url
-Click on send
-to test the delete, update and show the id would need to be copied and paste in place of paid
-for delete change the get to delete, for update change to put, and for show change to get
-Click on send

6.TESTING
-in terminal put npm i -D jest supertest mongodb-memory-server artillery@1.7.9
-go into package.json and add 
"jest": {
  "testEnvironment": "node"
}
-add a new folder called tests
-add a user.test.js file in the tests folder
-go into the user.test.js file
-![follow image](2DF413F2-DF9C-4D0B-80DA-866609FB11C2.png)
-![follow image](tests/2E620599-15DF-4577-BA1E-E097A0CB39B2.png)
-![follow image](tests/10E0C7A5-5C4F-4785-9AC6-825BCA504CB9.png)
-add a bill.test.js file in the tests folder
-go into the bills.test.js file
-![follow image](2F7AC5D7-D74B-4879-97A8-DDFE1CC33669.png)
-![follow image](FEFBBDD1-63B6-4A56-8994-801821215A6F.png)
-![follow image](89B1F17A-A274-4E97-BACE-B13DE68A9DEB.png)

Clone repository to your computer
-Click on code(green button)
-copy ssh link
-go to terminal
-cd in software_classwork
-cd in unit_2 
-git clone link
-ls
-cd budgeting-api
-code .