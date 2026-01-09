## Cara Pengetesan API dengan Thunder Client

Base URL yang digunakan:
- http://127.0.0.1:9000/api/...

Pastikan server Laravel sedang berjalan dengan perintah:
- php artisan serve --host=127.0.0.1 --port=8000

Secara umum, di setiap request di Thunder Client:
- Pilih method (GET / POST / PUT / PATCH / DELETE)
- Isi URL
- Jika butuh body, gunakan tab Body → JSON
- Jika butuh autentikasi, gunakan tab Auth → Bearer Token

---

### 1. Register User

Tujuan: membuat akun user baru.

- Method: POST  
- URL: http://127.0.0.1:8000/api/register  
- Auth: None  
- Headers:
  - Content-Type: application/json  
- Body (JSON):

  {
    "name": "User Satu",
    "email": "user1@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }

Respon yang diharapkan:
- success: true  
- message: "Registered successfully"  
- data.user: berisi detail user  
- data.token: token akses (opsional dipakai, biasanya tetap login lagi)

---

### 2. Login User

Tujuan: mendapatkan token untuk digunakan di endpoint yang butuh auth.

- Method: POST  
- URL: http://127.0.0.1:8000/api/login  
- Auth: None  
- Headers:
  - Content-Type: application/json  
- Body (JSON):

  {
    "email": "user1@example.com",
    "password": "password123"
  }

Respon yang diharapkan:
- success: true  
- message: "Login successful"  
- data.user: data user  
- data.token: string token Sanctum (copy nilai ini untuk Bearer Token)

---

### 3. Mengatur Bearer Token di Thunder Client

Token dari response login digunakan untuk semua endpoint yang butuh autentikasi.

Untuk setiap request yang protected:
- Buka tab Auth
- Type: Bearer Token
- Token: isi dengan token hasil login, misalnya:

  5|cp7VdtjM0UgBOkLqeW9CdEHE2K8Gjw1UhqIeOoQTff9ee741

Jika token salah atau kosong, respon akan berupa error 401 (Unauthenticated).

---

### 4. Melihat List Task User (GET /tasks)

Tujuan: melihat semua task milik user yang sedang login.

- Method: GET  
- URL: http://127.0.0.1:8000/api/tasks  
- Auth: Bearer Token  
- Body: kosong  

Opsional query:
- status=pending atau status=done  
- page=1 (untuk pagination)

Contoh:
- http://127.0.0.1:8000/api/tasks?status=pending&page=1

Respon berisi:
- message: "List tasks"
- success: true
- data: array task milik user
- meta: informasi pagination (current_page, last_page, total, dll)

---

### 5. Membuat Task Baru (POST /tasks)

Tujuan: menambah task baru untuk user login.

- Method: POST  
- URL: http://127.0.0.1:8000/api/tasks  
- Auth: Bearer Token  
- Headers:
  - Content-Type: application/json  
- Body (JSON contoh):

  {
    "title": "Belajar Laravel API",
    "description": "Mengerjakan project to-do list",
    "due_date": "2025-12-31",
    "is_public": true,
    "status": "pending"
  }

Catatan:
- Field minimal: title (field lain menyesuaikan aturan di StoreTaskRequest).

Respon berisi:
- message: "Task created"
- success: true
- data: detail task yang baru dibuat (termasuk id task)

Simpan nilai id task untuk pengujian detail, edit, dan delete.

---

### 6. Melihat Detail Task (GET /tasks/{id})

Tujuan: melihat detail satu task tertentu milik user.

- Method: GET  
- URL: http://127.0.0.1:8000/api/tasks/{id}  
  (ganti {id} dengan id task yang valid, misalnya 3)  
- Auth: Bearer Token  
- Body: kosong  

Respon berisi:
- message: "Task detail"
- success: true
- data: satu object task

Jika id bukan milik user yang login atau tidak ada di database, respon akan berupa error 404 dengan message "Resource not found".

---

### 7. Mengedit Task (PUT/PATCH /tasks/{id})

Tujuan: mengubah data task.

A. Contoh menggunakan PUT (biasanya mengirim field lebih lengkap):

- Method: PUT  
- URL: http://127.0.0.1:8000/api/tasks/{id}  
- Auth: Bearer Token  
- Headers:
  - Content-Type: application/json  
- Body (JSON contoh):

  {
    "title": "Update judul task",
    "description": "Deskripsi diperbarui",
    "status": "pending",
    "due_date": "2026-01-01",
    "is_public": false
  }

B. Contoh menggunakan PATCH (partial update):

- Method: PATCH  
- URL: http://127.0.0.1:8000/api/tasks/{id}  
- Auth: Bearer Token  
- Headers:
  - Content-Type: application/json  
- Body (JSON contoh):

  {
    "title": "Judul baru versi singkat"
  }

Respon (baik PUT maupun PATCH) berisi:
- message: "Task updated"
- success: true
- data: task yang sudah diperbarui

---

### 8. Menandai Task Selesai (PATCH /tasks/{id}/done)

Jika endpoint ini diaktifkan di project, fungsinya untuk langsung mengubah status task menjadi done.

- Method: PATCH  
- URL: http://127.0.0.1:8000/api/tasks/{id}/done  
- Auth: Bearer Token  
- Body: kosong  

Respon berisi:
- message: "Task marked as done"
- success: true
- data: task dengan status sudah berubah menjadi "done"

---

### 9. Menghapus Task (DELETE /tasks/{id})

Tujuan: menghapus task milik user.

- Method: DELETE  
- URL: http://127.0.0.1:8000/api/tasks/{id}  
- Auth: Bearer Token  
- Body: kosong  

Respon berisi:
- message: "Task deleted"
- success: true
- data: null

Jika setelah itu dipanggil kembali GET /api/tasks/{id}, maka harusnya mendapatkan error 404 (Resource not found).

---

### 10. Logout (POST /logout)

Tujuan: menghapus token yang sedang aktif.

- Method: POST  
- URL: http://127.0.0.1:8000/api/logout  
- Auth: Bearer Token  
- Body: kosong  

Respon berisi:
- message: "Logged out"
- success: true
- data: null

Setelah logout, jika mencoba mengakses endpoint protected (misalnya GET /api/tasks) dengan token yang sama, respon akan berupa 401 (Unauthenticated).

---

Dengan mengikuti urutan:
- register → login → set token → list task → create task → detail → update → (optional: mark done) → delete → logout,

seluruh flow utama API dapat diuji secara lengkap menggunakan Thunder Client.
 