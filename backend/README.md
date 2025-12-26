Auth (Passport JWT) examples

Endpoints:
- POST /api/auth/request-code { phone }
- POST /api/auth/verify { phone, code } -> { accessToken, refreshToken }
- POST /api/auth/refresh { refreshToken } -> { accessToken, refreshToken }
- POST /api/auth/logout { refreshToken }
- GET /api/users/me (protected)

Quick curl examples:

Request code (mock send):
```bash
curl -X POST http://localhost:3000/api/auth/request-code -H "Content-Type: application/json" -d '{"phone":"+7701XXXXXXX"}'
```

Verify and obtain tokens (scaffold returns tokens for code):
```bash
curl -X POST http://localhost:3000/api/auth/verify -H "Content-Type: application/json" -d '{"phone":"+7701XXXXXXX","code":"1234"}'
```

Use access token to call protected endpoint:
```bash
curl http://localhost:3000/api/users/me -H "Authorization: Bearer <ACCESS_TOKEN>"
```

Refresh tokens:
```bash
curl -X POST http://localhost:3000/api/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"<REFRESH_TOKEN>"}'
```

Logout (scaffold):
```bash
curl -X POST http://localhost:3000/api/auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"<REFRESH_TOKEN>"}'
```

Notes:
- This scaffold does not persist refresh token blacklist — implement persistent invalidation in production.
- JWT secret and expirations can be configured via `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` in the environment.
