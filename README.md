# Secret Santa
Secret Santa Gift Disclosure System

## Configuration

- create `data/keys.js` file and setup as follows:
    ```
    module.exports = {
        session_secret: "secret",
        access_code: "access",
        mysqlCredentials: {
            database: "santa",
            username: "santa",
            password: "santa",
            options: {
                host: 'localhost',
                dialect: 'mysql'
            }
        },
        adminCredentials: {
            username: "admin",
            password: "admin"
        }
    }
    ```
- Create a `.env` file and setup as follows:
    ```
    HOST=0.0.0.0
    PORT=3000
    ```
- Create a log file `logs/access.log`.
