
## issues so far.
* can't make mongoose queries when the service is imported as an Npm package.
   - seems like https://www.npmjs.com/package/parent-require might fix the issue. 
   - the issue seems to be caused by having mongoose installed in both the parent project and the auth package. I think
     the issue seems to only crop up when doing npm link.

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
|  authProvider |  jwt | auth0 | passport | choose the auth provider |
|  register     |  @object                |  extending how you interact with the register handler |
|  path         |                         | the path needed for the auth service |
|  extendModel  |                         | add additional model fields         |
|  app          |                         | the express() object   |



## extending the register handler.


## using the different strategy providers.

### JWT

```javascript
    import { JWTMiddleware } from '@codedevbrad/authservice';
    const { authenticateToken , authenticateTokenMiddleware } = JWTMiddleware;
```

## interacting with the Auth db User.

```javascript
    import { AuthUser , AuthUserQueries } from '@codedevbrad/authservice';
```
