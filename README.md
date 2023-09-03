### Expense Tracker  - Expense Tracking Tool
This is an expense tracking tool that allows users to create their own personal expense records by registering an account. Users can record the date, category, and amount of each expense and view the total amount spent.

---
### Features
- User registration with email and password
- Home page displays expense records and total accumulated expenses.
- Users can select expense categories from the category menu.
- Users can create, edit, and delete expense records to manage their personal finances.

---
### Installation
1. Make sure you have Node.js and npm installed on your local machine.

2. Open your terminal and clone this project to your local machine.
```
git clone https://github.com/freeanser/expense-tracker.git
```

3. Navigate to the project directory and install the necessary development dependencies.
```
npm install
```

4. Install Nodemon globally.
```
npm install -g nodemon
```

5. Reference the .env.example file to set your environment variables.

6. Start the project by running the following commands in your terminal.
```
npm run seed
npm run dev
```

7. When you see the following message in your terminal, the server is successfully running.
```
Serve is running on http://localhost:3000
```

8. You can log in to the website using the default accounts below:
   
|Email            |Password|
|-----------------|--------|
|user1@example.com|123|
|user2@example.com|321|


---
### Development Tools
- node.js: 18.16.0
- bcryptjs: 2.4.3
- body-parser: 1.20.2
- connect-flash: 0.1.1
- dotenv: 8.2.0
- express: 4.16.4
- express-handlebars: 4.0.2
- express-session: 1.17.1
- handlebars-helpers: 0.10.0
- luxon: 3.4.2
- method-override: 3.0.0
- mongoose: 5.9.7
- passport: 0.4.1
- passport-local: 1.0.0