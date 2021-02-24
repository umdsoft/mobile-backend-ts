For User
```
* Private - Headerda:  **Authorization Bearer token**    jo`natiladi
            API            Method     Type
    /api/user/register  |   POST   |  Public
    /api/user/login     |   POST   |  Public
    /api/user/logout    |   POST   |  Private
    /api/user/me        |   GET    |  Private  
    
```

For Week
```
    /api/week/create     |  POST  | Protect
    /api/week/all        |  GET   | Private
    /api/week/:id        |  PUT   | Protected
    /api/week/:id        | DELETE | Protected
    
```

