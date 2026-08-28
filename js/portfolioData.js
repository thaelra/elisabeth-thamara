/**
 * =================================================================
 * PORTFOLIO DATA CONFIGURATION
 * Edit this file to update your portfolio details, skills, 
 * experiences, and projects!
 * =================================================================
 */

const portfolioData = {
  // 1. MY PROFILE / PERSONAL INFORMATION
  profile: {
    name: "Elisabeth Thamara",
    role: "Computer Science & Creative Tech Student",
    edition: "2026 Edition",
    tagline: "CREATING IMPACT THROUGH DESIGN, TECHNOLOGY, AND CREATIVITY",
    bio: "Halo! Saya Elisabeth Thamara, mahasiswa Teknik Informatika / Computer Science yang sangat antusias memadukan dunia pemrograman, UI/UX design, dan editing media kreatif. Saya percaya bahwa kreativitas, kerja sama tim, dan keinginan belajar tanpa henti adalah kunci menciptakan karya digital yang impactful.",
    location: "Jakarta / Indonesia",
    status: "Open for Internships & Projects",
    email: "elisabeth.thamara@example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    instagram: "https://instagram.com/",
    avatar: "assets/avatar.jpg",
    quickStats: [
      { label: "Projects Completed", count: 18, suffix: "+" },
      { label: "Creative Fields", count: 3, suffix: "" },
      { label: "Years Learning", count: 3, suffix: "+" },
      { label: "Client Satisfaction", count: 99, suffix: "%" }
    ]
  },

  // 2. MY EXPERTISE / SKILLS CATEGORIES
  expertise: [
    {
      category: "Web Development",
      icon: "code-2",
      description: "Membangun website modern, responsif, dan interaktif dengan HTML, CSS, JavaScript, React, dan animasi web.",
      skills: [
        { name: "HTML5 & Modern CSS3", level: 95 },
        { name: "JavaScript (ES6+) & React", level: 88 },
        { name: "Three.js & Canvas 3D", level: 80 },
        { name: "Responsive & Web Performance", level: 90 }
      ]
    },
    {
      category: "Design & UI/UX",
      icon: "figma",
      description: "Merancang antarmuka pengguna yang ramah, visual wireframe, desain sistem, dan prototype interaktif.",
      skills: [
        { name: "Figma & Wireframing", level: 92 },
        { name: "Canva & Graphic Design", level: 96 },
        { name: "Design Systems & Color Theory", level: 88 },
        { name: "User Research & Prototyping", level: 85 }
      ]
    },
    {
      category: "Video Editing & Motion",
      icon: "film",
      description: "Memproduksi dan menyunting konten video kreatif, motion graphics, serta visual effect untuk branding & media sosial.",
      skills: [
        { name: "Adobe Premiere Pro", level: 90 },
        { name: "After Effects & Motion", level: 82 },
        { name: "CapCut & Social Media Reels", level: 95 },
        { name: "Storyboarding & Audio Mixing", level: 85 }
      ]
    }
  ],

  // 3. MY EXPERIENCE TIMELINE
  experience: [
    {
      year: "2025 - Present",
      title: "Lead Creative & Web Developer",
      organization: "Campus Media & Tech Lab",
      type: "Organization / University",
      description: "Mengembangkan sistem antarmuka web kampus dan memimpin tim visual desain untuk event teknologi nasional.",
      tags: ["Web Dev", "Figma", "Project Management"]
    },
    {
      year: "2024 - 2025",
      title: "UI/UX & Multimedia Intern",
      organization: "Digital Agency Studio",
      type: "Internship",
      description: "Merancang wireframe aplikasi mobile, landing page responsif, dan memproduksi video promosi produk digital klien.",
      tags: ["UI/UX", "Video Editing", "After Effects"]
    },
    {
      year: "2023 - 2024",
      title: "Computer Science Student",
      organization: "Universitas / Computer Science Dept",
      type: "Education",
      description: "Mempelajari algoritma pemrosesan data, pemrogramam berorientasi objek, pengembang sistem web, dan desain grafis.",
      tags: ["Algorithms", "Web Tech", "OOP"]
    }
  ],

  // 4. PORTFOLIO PROJECTS (Categorized by Fields)
  // Categories: 'web', 'design', 'video'
  projects: [
    {
      id: 1,
      title: "Nexus Cyber Dashboard",
      category: "web",
      categoryLabel: "Web Development",
      badge: "Featured 3D Web App",
      image: "assets/project_web.jpg",
      shortDesc: "Dashboard analytics futuristik dengan integrasi visualisasi data 3D real-time dan dark mode neon.",
      fullDesc: "Nexus Cyber Dashboard adalah proyek web app responsif yang dibangun menggunakan JavaScript modular, Three.js 3D chart visualization, dan CSS custom properties. Menampilkan data real-time, monitoring server, dan interface yang super smooth.",
      tags: ["HTML/CSS", "JavaScript", "Three.js", "Chart.js"],
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/example/nexus-dashboard"
    },
    {
      id: 2,
      title: "Aura Mobile Wellness App",
      category: "design",
      categoryLabel: "UI/UX Design",
      badge: "Figma Concept Case Study",
      image: "assets/project_design.jpg",
      shortDesc: "Desain sistem & prototype aplikasi meditasi & kesehatan mental dengan estetika folder modern.",
      fullDesc: "Studi kasus UI/UX lengkap mulai dari user research, persona, wireframing low-fidelity hingga hi-fidelity prototype interaktif di Figma. Menggunakan skema warna tenang, aksen tab biru kreatif, dan aksesibilitas ramah pengguna.",
      tags: ["Figma", "UI/UX Design", "Prototyping", "Design System"],
      demoUrl: "https://figma.com/@example",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Explore Beyond Motion Reels",
      category: "video",
      categoryLabel: "Video Editing",
      badge: "Commercial Motion Project",
      image: "assets/project_video.jpg",
      shortDesc: "Video komersial & motion graphics dengan efek transisi 3D sinematik dan sound design memukau.",
      fullDesc: "Video showreel promo teknologi dengan teknik rotoscoping, kinetic typography, color grading sinematik, dan sinkronisasi audio ritmis. Diproduksi menggunakan Adobe Premiere Pro dan After Effects.",
      tags: ["Adobe Premiere", "After Effects", "Color Grading", "Sound FX"],
      demoUrl: "https://youtube.com/",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Folder-Tab Portfolio Theme",
      category: "web",
      categoryLabel: "Web Development",
      badge: "Interactive 3D Portfolio",
      image: "assets/project_web.jpg",
      shortDesc: "Website portofolio unik bergaya folder fisik interaktif dengan 3D canvas dan sound FX.",
      fullDesc: "Karya portofolio interaktif dengan animasi tab folder 3D, Web Audio API sound feedback, dynamic theme switcher, dan optimasi performa tinggi untuk GitHub Pages.",
      tags: ["HTML5", "Vanilla CSS", "Three.js", "GSAP"],
      demoUrl: "https://github.com/",
      githubUrl: "https://github.com/"
    },
    {
      id: 5,
      title: "Brand Identity & Canva Kit",
      category: "design",
      categoryLabel: "UI/UX Design",
      badge: "Branding & Canva",
      image: "assets/project_design.jpg",
      shortDesc: "Paket identitas visual brand, template social media Canva, dan guideline logo untuk UMKM digital.",
      fullDesc: "Perancangan identitas visual lengkap mulai dari skema warna, tipografi, elemen grafis vector, hingga 20+ template postingan Canva yang mudah disesuaikan.",
      tags: ["Canva", "Graphic Design", "Branding", "Social Media"],
      demoUrl: "https://canva.com/",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Tech Event Aftermovie Highlight",
      category: "video",
      categoryLabel: "Video Editing",
      badge: "Event Aftermovie",
      image: "assets/project_video.jpg",
      shortDesc: "Video dokumentasi event hackathon dan seminar IT dengan tempo cepat dan grafik motion dinamis.",
      fullDesc: "Video rangkuman acara 3 menit yang menampilkan wawancara peserta, atmosfer event, motion title, dan transisi visual berkecepatan tinggi.",
      tags: ["Video Editing", "CapCut Pro", "Motion Title", "Storytelling"],
      demoUrl: "https://vimeo.com/",
      githubUrl: "#"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
