# This is a Git Repository

This git repository is made by [Ketan Ram Chandani](https://github.com/Ketan1152/).

## DATABASE VIEWER

You can use this repository and create a databse viewer.\
Clone this repository manually\
Change [mysql.js file](https://github.com/Ketan1152/Express/blob/main/mysql.js) as shown below:-

```js
var con = mysql.createConnection({
    host: "localhost", // Your host_name
    user: "root", // Your user_name
    port: 3306, // The port on which your SQL server is running
    password: "<Your_password_here>", // Password for the given user
    database: "<Your_default_database_here>"
});
```


## Learning Git and Express

I used below **function** to show the records from table to console.

```js

function showrcd() {
    con.query('SELECT * FROM ketantable;', (err, result) => {
        console.log("Result:- \n" + JSON.stringify(result));
    });
}

```

And created [mysql.js file](https://github.com/Ketan1152/Express/blob/main/mysql.js) to create all databases related functions including the above one.