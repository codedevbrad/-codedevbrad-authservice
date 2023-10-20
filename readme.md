
## implementing the authservice.

```javascript
    import { AuthService } from '@codedevbrad/authservice';

    AuthService.initialiseAuthService({
        authProvider: 'jwt' , 
        app: app , 
        path: '/auth' , 
        extendModel: {
            isAdmin: { type: Boolean } , 
            email: { type: String }
        },
        register: {
            type: 'basic',
            emailSender: 'codedevbrad@gmail.com'
        }
    });

    AuthService.initialiseJWTProvider({
        secret: '12345'
    });
```

|  perams       |  options                | description  |
|---------------|-------------------------|--------------|
|  authProvider |  'jwt'| 'auth0' | 'passport' | choose the auth provider |
|  app          |   link to                      | the express() object   |
|  path         |  '/auth'                | the api path needed to access the auth service |
|  extendModel  |  @object                | add additional model fields         |
|  register     |  @object                |  extending how you interact with the register handler |

## using the different strategy providers.

### JWT

```javascript
    import { JWTMiddleware } from '@codedevbrad/authservice';
    const { authenticateToken , authenticateTokenMiddleware } = JWTMiddleware;
```

#### what authenticateToken and authenticateTokenMiddleware does.

#### implementing these.

## interacting with the Auth db User.

```javascript
    import { AuthUser , AuthUserQueries } from '@codedevbrad/authservice';
```
### purpose of AuthUser and AuthUserQueries.

## Giving the service access to the express Object.
```javascript
import express , { Application , Request , Response , NextFunction } from 'express';  
const app = express();

import { AuthService } from '@codedevbrad/authservice';

AuthService.initialiseAuthService({
        authProvider: 'jwt' , 
        app: app
});

```
---

## choosing your DB API path.

## extending the db model.

## extending the register handler.



## To do
- [ ]  add routes and their postman tests to the description to the readme
- [ ]  add service database and queries for example service.
- [ ]  add mock database collection and DB setup to use test database.
- [ ]  write jest tests for the example service.
- [ ]  do tests and write postman mock requests for routes.
- [ ]  write documentation of the folder and app structure.

## issues so far.
* can't make mongoose queries when the service is imported as an Npm package.
   - seems like https://www.npmjs.com/package/parent-require might fix the issue. 
   - the issue seems to be caused by having mongoose installed in both the parent project and the auth package. I think
     the issue seems to only crop up when doing npm link.



### implementng these.

