------------------
To install all the dependencies:

cd server

npm install && npm run client-install

-----------------

to build the project: 

cd server/client

npm run build

------------------
to run the project locally:

cd server

npm run dev
-----------------

In order to add yourself as an admin, you have to login first. use this temporary email to get access 

email: test@gmail.com	
password: 111111

register youself as an admin , then go to the database and delete the temporary admin.
(for now I have connected the database to a temporary online mysql database)

-----------------

In order to change the admin's email (when an order has been submitted then it sent to this email):

cd server/api/orders.js

you will find a temporary email used to recieve all emails from clients (temporary_email112@yahoo.com). change that to the actual email.

Note: Since I used a yahoo email address, the host in (let transport) is 'smtp.yahoo.com'. 
If you are planning to use a yahoo email , then leave it
the way it is BUT in case you want to use google or hotmail then you must change it accordingly.
The same applies to (service) in (let transport).
find more info about it in https://nodemailer.com/about

Note: you have to change the email address in (let transport) & ( let mailOptions)

-----------------

I have added a contact form where a client can fill the form and send a message. I have used the temporary email there also.
 
cd server/api/messages.js

You will have to do similar changes as in orders.js regarding the email address

------------------
