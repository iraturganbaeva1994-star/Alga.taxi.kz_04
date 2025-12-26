App Settings module

Provides endpoints:
- GET /api/admin/settings
- PATCH /api/admin/settings

Requires authenticated user with roles `admin` (PATCH) or `admin|dispatcher` (GET).
