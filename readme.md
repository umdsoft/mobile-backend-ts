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
    /api/week/:id        |  PUT   | Protect
    /api/week/:id        | DELETE | Protect
    
```

For Course
```
    /api/course/create   | POST | Protect
    /api/course/all      | POST | Protect
    /api/course/type   | GET  | Private
    /api/course/:id   | GET  | Private
    /api/course/:id   | DELETE  | Protect
```

