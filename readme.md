
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
|  authProvider |  jwt | auth0 | passport |              |
|  register     |                         |              |
|  path         |                         |              |
|  extendModel  |                         |              |
|  app          |                         |              |


## using the different strategy providers.

### JWT

```javascript
    import { JWTMiddleware } from '@codedevbrad/authservice';
    const { authenticateToken , authenticateTokenMiddleware } = JWTMiddleware;

    import { AuthUser , AuthUserQueries } from '@codedevbrad/authservice';
```

## interacting with the Auth db User.

```javascript
    import { AuthUser , AuthUserQueries } from './services/service.user/index';
```
