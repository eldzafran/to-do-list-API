# ToDo List API – Laravel + Sanctum

Project ini adalah REST API sederhana untuk mengelola to-do list per user.  
Fokusnya: autentikasi pakai token (Laravel Sanctum), setiap user hanya bisa mengakses task miliknya sendiri, ada endpoint publik, dan struktur response JSON dibuat konsisten sesuai panduan GitBook.

API ini tidak punya frontend. Pengujian dilakukan lewat Thunder Client / Postman.

---

## Deskripsi Singkat

Fitur utama:

- Register & login user dengan Laravel Sanctum
- CRUD task per user (create, read, update, delete)
- Filter task berdasarkan status (`pending` / `done`)
- Endpoint publik untuk melihat task yang bertanda `is_public`
- Pagination di list task
- Global error handling untuk semua route `api/*`

Struktur data:

- `users`
- `tasks` (id, user_id, title, description, status, due_date, timestamps)

---

## Kesesuaian dengan GitBook

Project ini mengikuti poin-poin GitBook berikut:

1. **Authentication (Wajib)**
   - Menggunakan **Laravel Sanctum**.
   - Endpoint:
     - `POST /api/register`
     - `POST /api/login`
     - `POST /api/logout`
   - Setelah login / register, API mengembalikan token dan data user.

2. **Guest Mode / Public Endpoint (Wajib)**
   - Endpoint tanpa auth:
     - `GET /api/public/tasks` → list task publik (`is_public = true`).

3. **Form Request Class (Wajib)**
   - Semua endpoint `POST / PUT / PATCH` menggunakan Form Request:
     - `RegisterRequest` → register
     - `LoginRequest` → login
     - `LogoutRequest` → logout
     - `StoreTaskRequest` → create task
     - `UpdateTaskRequest` → update task
     - `MarkTaskDoneRequest` → tandai task selesai

4. **Resource Class / JsonResource (Wajib)**
   - Tidak me-return model mentah.
   - `UserResource` untuk data user.
   - `TaskResource` untuk semua response task (list, detail, create, update, dll).

5. **Routing & Middleware (Wajib)**
   - Semua route API ada di `routes/api.php`.
   - Endpoint yang butuh login dibungkus:
     - `Route::middleware('auth:sanctum')->group(...)`
   - Endpoint guest (register, login, public tasks) di luar group tersebut.

6. **Standard Response JSON (Wajib)**
   - Pola response sukses:
     - `message`: string
     - `success`: boolean
     - `data`: object / array
   - Untuk list dengan pagination ada tambahan `meta`.
   - Global error handling di `Handler` membuat error API tetap konsisten:
     - `message`
     - `success` = false
     - `data` = null
     - `errors` (opsional, misalnya untuk validasi).

7. **ToDo-List API Behavior (Wajib)**
   - Endpoint:
     - `GET /api/tasks` → list task user, bisa filter `?status=pending/done`
     - `POST /api/tasks` → create task
     - `GET /api/tasks/{id}` → detail task user
     - `PUT/PATCH /api/tasks/{id}` → update
     - `DELETE /api/tasks/{id}` → delete
     - `PATCH /api/tasks/{id}/done` → tandai selesai (optional di GitBook, di project ini ada)
   - Setiap query task selalu dibatasi `where('user_id', user_login_id)` supaya user tidak bisa mengakses task milik orang lain.

8. **Bonus GitBook**
   - **Pagination**:
     - `GET /api/tasks` dan `GET /api/public/tasks` memakai `paginate(10)` dan mengembalikan `meta`.
   - **Error handling**:
     - Response error API sudah distandarkan lewat custom `Handler`.
   - **README**:
     - File ini menjadi dokumentasi singkat project seperti yang disarankan GitBook.

---

