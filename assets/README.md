# Panduan Penggunaan & Deploy GitHub Pages

Selamat! Web portofolio interaktif 3D kreatif Anda telah siap.
Proyek ini dibuat menggunakan **HTML5, Modern Modular CSS, JavaScript (ES6+), Three.js, GSAP, dan Web Audio API**.

---

## 🚀 1. Cara Mengubah Data Portofolio (Nama, Biodata, Karya, & Kontak)

Semua data diatur terpusat pada 1 file agar sangat mudah diubah tanpa perlu mengedit kode HTML!

Buka file: [`js/portfolioData.js`](file:///Users/zachariaselsa/Documents/webporto/js/portfolioData.js)

### **A. Mengubah Data Profil (Nama & Bio)**
```javascript
profile: {
  name: "Elisabeth Thamara", // Ubah dengan Nama Anda
  role: "Computer Science & Creative Tech Student", // Ubah Pekerjaan / Status
  edition: "2026 Edition",
  tagline: "CREATING IMPACT THROUGH DESIGN, TECHNOLOGY, AND CREATIVITY",
  bio: "Tuliskan biografi singkat Anda di sini...",
  location: "Jakarta / Indonesia",
  email: "email-anda@domain.com",
  github: "https://github.com/username-anda",
  linkedin: "https://linkedin.com/in/username-anda",
  instagram: "https://instagram.com/username-anda",
  avatar: "assets/avatar.jpg" // Foto Profil Anda
}
```

### **B. Menambahkan / Mengubah Karya Portofolio**
Pada array `projects`, Anda dapat menambahkan project baru sesuai bidangnya (`web`, `design`, atau `video`):

```javascript
{
  id: 7,
  title: "Judul Project Baru Anda",
  category: "web", // Pilihan: 'web', 'design', atau 'video'
  categoryLabel: "Web Development",
  badge: "Featured Web App",
  image: "assets/project_web.jpg", // Path gambar project Anda
  shortDesc: "Deskripsi singkat project...",
  fullDesc: "Deskripsi lengkap yang akan muncul saat project di-klik...",
  tags: ["React", "CSS", "API"],
  demoUrl: "https://link-demo-live.com",
  githubUrl: "https://github.com/username/repository"
}
```

### **C. Mengubah Gambar Profil & Project**
Simpan gambar foto profil atau screenshot karya Anda ke folder `assets/`, lalu ganti path filenya di `js/portfolioData.js`:
- `assets/avatar.jpg` -> Foto profil Anda
- `assets/project_web.jpg` -> Thumbnail project web
- `assets/project_design.jpg` -> Thumbnail project UI/UX
- `assets/project_video.jpg` -> Thumbnail project video

---

## 🌐 2. Cara Upload ke GitHub & Deploy ke GitHub Pages (Publikasi Online)

Untuk mempublikasikan website ini ke publik secara **GRATIS** via GitHub Pages:

### **Langkah 1: Buat Repository di GitHub**
1. Buka [GitHub.com](https://github.com/) dan login.
2. Klik tombol **New Repository** (`+` di kanan atas).
3. Beri nama repository, contoh: `webporto` atau `portfolio-elisabeth`.
4. Pilih **Public**, lalu klik **Create repository**.

### **Langkah 2: Upload Kode dari Komputer Anda**
Jalankan perintah berikut di Terminal komputer Anda (pada folder `/Users/zachariaselsa/Documents/webporto`):

```bash
git init
git add .
git commit -m "Initial commit - 3D Interactive Portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO.git
git push -u origin main
```

*(Atau jika menggunakan GitHub Desktop / Upload Web: Upload semua file & folder `index.html`, `styles.css`, folder `js/`, dan folder `assets/` langsung ke GitHub).*

### **Langkah 3: Aktifkan GitHub Pages**
1. Masuk ke halaman repository Anda di GitHub.
2. Klik tab **Settings** -> pilih menu **Pages** di bilah kiri.
3. Di bawah **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1 - 2 menit, link portofolio online Anda siap diakses di:
   `https://USERNAME-ANDA.github.io/NAMA-REPO/`

---

## ✨ Fitur Unggulan Web Portofolio Ini:
- 🎨 **Folder Tab Design System**: Desain tab folder interaktif sesuai contoh foto referensi.
- 🧊 **3D Interactive WebGL (Three.js)**: Elemen folder 3D, particle dust, dan efek mouse tilt.
- 📱 **Filter Portofolio Berdasarkan Bidang**: Memilih karya Web Dev, UI/UX, dan Video Editing dengan instan.
- 🔊 **Web Audio API**: Efek suara tactile halus saat berpindah tab & tombol.
- 🌓 **Dark / Light Mode Toggle**: Penglihatan malam neon & siang clean cream.
- ⚡ **Siap GitHub Pages**: Tanpa perakitan server, murni static web super cepat!
