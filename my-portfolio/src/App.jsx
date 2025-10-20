import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, ChevronDown, ExternalLink, Menu, X, Download,
  Moon, Sun, Code2, Cpu, Database, Server, Globe, Award
} from "lucide-react";

/* ===== Profile / Data ===== */
const profile = {
  name: "Amanda Lakshani",
  role: "Full-Stack Developer",
  tagline: "I craft robust APIs, scalable services, and delightful UIs.",
  location: "Colombo, Sri Lanka",
  email: "amandalakshani699@gmail.com",
  phone: "+94 70 495 4160",
  avatar: "/avatar.jpeg",
  socials: {
    github: "https://github.com/AmandaBND",
    linkedin:
      "https://www.linkedin.com/in/amanda-lakshani-8381482b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    resume: "/Amanda-Lakshani-Resume.pdf",
  },
  highlights: [
    { icon: <Globe className="w-5 h-5" />,   text: "UX → React/Next.js with Tailwind, accessibility-first" },
    { icon: <Server className="w-5 h-5" />,  text: "APIs → Node/Express/NestJS, FastAPI, REST/GraphQL" },
    { icon: <Database className="w-5 h-5" />,text: "Data → MongoDB, SQL, Analytics" },
    { icon: <Cpu className="w-5 h-5" />,     text: "ML → sklearn/NumPy/Pandas, model serving & MLOps" },
    { icon: <Code2 className="w-5 h-5" />,   text: "DevOps → Docker, CI/CD (GitHub Actions), AWS/Azure" },
  ],
};

/* ---- Images with stable IDs (used for deep-links from Projects) ---- */
const gallery = [
  { id: "plant-nursery",  src: "/PlantNursery.png",    caption: "Deshini – Home" },
  { id: "glamourup",      src: "/GlamourUp.png",       caption: "GlamorUp – UI" },
  { id: "movieflix",      src: "/MovieFlix.png",       caption: "MovieFlix – Search" },
  { id: "disease",        src: "/MultiDiseaseSystem.png", caption: "Disease – Prediction" },
  { id: "trip-safety",    src: "/TripSafetyAI.png",    caption: "Trip Safety – Risk result" },
  { id: "wealthwave",     src: "/WealthWave.png",      caption: "WealthWave – Settings" },
];

const skills = [
  { name: "React / Next.js", level: 90, group: "Frontend" },
  { name: "TypeScript", level: 85, group: "Frontend" },
  { name: "Tailwind CSS", level: 88, group: "Frontend" },
  { name: "Node.js / Express", level: 92, group: "Backend" },
  { name: "NestJS", level: 80, group: "Backend" },
  { name: "SQL", level: 86, group: "Data" },
  { name: "MongoDB", level: 82, group: "Data" },
  { name: "Docker", level: 78, group: "DevOps" },
  { name: "GitHub Actions", level: 76, group: "DevOps" },
  { name: "AWS / Azure", level: 74, group: "DevOps" },
];

/* ---- Each project points to a gallery image via imageId ---- */
const projects = [
  {
    title: "Deshini-plant-nursery",
    description:
      "Plant nursery web application design for SLIIT second year second semester using the MERN stack (MongoDB, Express.js, React, Node.js) with MUI for frontend styling.",
    stack: ["MongoDB","Express","React","Node"],
    imageId: "plant-nursery",
    repo: "https://github.com/AmandaBND/Deshini-plant-nursery",
    tags: ["Full-stack","E-commerce","Auth","Frontend","Backend"],
  },
  {
    title: "Trip Safety AI",
    description:
      "Multi-agent travel risk advisor: weather, incidents, and emergency tips with RL-powered scoring.",
    stack: ["Python","Streamlit (UI)","Pandas","scikit-learn (model)","OpenAI API","NLP"],
    imageId: "trip-safety",
    repo: "https://github.com/chamidugunathunga1212-coder/Trip-Safety-Agentic-Ai",
    tags: ["AI","Data","Full-stack"],
  },
  {
    title: "Disease Prediction System",
    description:
      "Streamlit app that predicts disease likelihood from patient symptoms/demographics. Includes data cleaning (title-case/normalize), median imputation, label encoding, and a RandomForest classifier with a confidence indicator + disclaimer.",
    stack: ["Python","Streamlit (UI)","scikit-learn (RandomForest,XGBosst,Desicion tree,Histgradient)","Pandas","NumPy"],
    imageId: "disease",
    repo: "https://github.com/AmandaBND/Disease_predictiig_system",
    tags: ["ML","Healthcare","Classification","Multi-class Classification"],
  },
  {
    title: "MovieFlix",
    description:
      "Movie discovery web app with search, filters, and personalized watchlists. Clean React UI, reusable components, and REST API integration for movie metadata, posters, and ratings.",
    stack: ["React (Vite)","Tailwind","TMDB API"],
    imageId: "movieflix",
    repo: "https://github.com/AmandaBND/Movieflix",
    tags: ["Full-stack","Media","Auth"],
  },
  {
    title: "GlamourUp – Beauty Salon",
    description:
      "Mobile app UI for discovering salons: browse services, view locations on map, and preview styles with a VR/AR try-on experience.",
    stack: ["Android (Kotlin)","Jetpack (ViewModel/LiveData/Navigation)"],
    imageId: "glamourup",
    repo: "https://github.com/AmandaBND/GlamourUp",
    tags: ["Mobile Apps","Android","Maps","AR/VR","Frontend"],
  },
  {
    title: "WealthWave Public – Personal Finance",
    description:
      "Personal finance tracker with incomes, expenses, category totals, and rich transaction history. Includes secure backup & restore of user data and credential-protected access.",
    stack: [
      "Android (Kotlin, XML Views)",
      "SharedPreferences (UserPrefs/FinanceData)",
      "Intents/Activities",
      "ArrayAdapter + Spinner",
      "Toast/UI feedback",
    ],
    imageId: "wealthwave",
    repo: "https://github.com/AmandaBND/WealthWave",
    tags: ["Mobile Apps","Android","Finance","Offline"],
  },
];

/* ---- NEW: Achievements data ---- */
const achievements = [
  {
    title: "Dean’s List",
    issuer: "SLIIT",
    date: "2024 \n For Academic Excellence",
    image: "/deanlist.jpg",
       
  },
  {
    title: "Introduction to Azure virtual machines",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureVM.png",
  },
  {
    title: "AWS SimuLearn: Computing Solutions",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSComputingSolutions.png",
  },
  {
    title: "Add and size disks in Azure virtual machines",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureDisks.png",
  },
  {
    title: "AWS SimuLearn: File Systems in the Cloud",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSFileSystem.png",
  },
  {
    title: "Configure Azure Blob Storage",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureBlobStorage.png",
  },
  {
    title: " Introduction to Amazon Simple Storage Service (S3)",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSS3.png",
  },
  {
    title: "Configure Azure Blob Storage",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureBlobStorage.png",
  },
  {
    title: "AWS SimuLearn: Connecting VPCs",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSVPC.png",
  },
  {
    title: "AWS SimuLearn: Networking Concepts",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSNetworking.png",
  },
  {
    title: "Configure virtual networks",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureVN.png",
  },
  {
    title: "AWS SimuLearn: Auto-Healing and Scaling Applications",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSAutoScaling.png",
  },
  {
    title: "AWS SimuLearn: Highly Available Web Applications",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/AWSAvailability.png",
  },
  {
    title: " Improve application scalability and resiliency by using Azure Load Balancer",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureLB.png",
  },
  {
    title: "Configure virtual machine availability",
    issuer: "Microsoft",
    date: "2025",
    image: "/AzureAvailability.png",
  },
];

/* ---- NAV: replace Experience with Achievements ---- */
const nav = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "images", label: "Images" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" }, // << changed
  { id: "contact", label: "Contact" },
];

const filters = ["All","Full-stack","Frontend","Backend","AI","ML","E-commerce","Mobile Apps"];

/* ===== Component ===== */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    document.documentElement.classList.add("dark"); // keep dark base
  }, []);

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    const key = slug(activeFilter);
    return projects.filter((p) => p.tags.some((t) => slug(t) === key));
  }, [activeFilter]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed text-neutral-100 font-sans"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* soft dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" aria-hidden />

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        <Hero />
        <Highlights />
        <Projects
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          projects={filteredProjects}
        />
        <Gallery />
        <Skills />
        {/* NEW: Achievements */}
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollCue />
      {menuOpen && <MobileNav setMenuOpen={setMenuOpen} />}
    </div>
  );
}

/* ===== UI Pieces ===== */
function Header({ menuOpen, setMenuOpen, theme, setTheme }) {
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        atTop
          ? "bg-transparent"
          : "backdrop-blur bg-neutral-900/70 border-b border-neutral-800"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2" aria-label="Home">
          <img
            src={profile.avatar}
            alt={`${profile.name} profile`}
            className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-sm"
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="hover:bg-pink-900/30 px-2 py-1 rounded-lg"
            >
              {n.label}
            </a>
          ))}

          <a
            href={profile.socials.resume}
            download
            className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-xl hover:bg-pink-900/30"
          >
            <Download className="w-4 h-4" /> Resume
          </a>

        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl border hover:bg-pink-900/30"
            aria-label="Toggle theme"
            title="Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        <button
          className="md:hidden p-2 rounded-xl border"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function MobileNav({ setMenuOpen }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/60 md:hidden"
        onClick={() => setMenuOpen(false)}
      />
      <motion.nav
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="fixed right-0 top-0 h-full w-80 bg-neutral-900 text-neutral-100 p-6 z-50 space-y-4 md:hidden"
      >
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            onClick={() => setMenuOpen(false)}
            className="block text-lg py-2 border-b border-neutral-800 hover:bg-pink-900/30 rounded-lg"
          >
            {n.label}
          </a>
        ))}
        <div className="pt-6 flex gap-3">
          <a
            href={profile.socials.github}
            className="p-2 border rounded-xl flex items-center gap-2 hover:bg-pink-900/30"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            className="p-2 border rounded-xl flex items-center gap-2 hover:bg-pink-900/30"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-3 text-lg md:text-xl text-neutral-200"
        >
          {profile.role} · {profile.location}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-5 max-w-2xl text-neutral-200/90"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-600 text-white hover:bg-pink-700"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </a>
          <a
            href={profile.socials.github}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border hover:bg-pink-900/30"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border hover:bg-pink-900/30"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </motion.div>
      </div>
      <GradientOrbs />
    </section>
  );
}

function GradientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.2 }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-pink-600 to-pink-400 opacity-40"
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-pink-700 to-pink-500 opacity-30"
      />
    </div>
  );
}

function Highlights() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl border p-4 bg-neutral-900/60 backdrop-blur"
          >
            <span className="p-2 rounded-xl border hover:bg-pink-900/30">{h.icon}</span>
            <span className="text-sm md:text-base">{h.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects({ activeFilter, setActiveFilter, projects }) {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <p className="text-neutral-300">Production-grade builds with end-to-end ownership.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl border text-sm ${
                  activeFilter === f
                    ? "bg-pink-600 text-white"
                    : "hover:bg-pink-900/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group rounded-3xl border p-5 bg-neutral-900/70 backdrop-blur"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-lg border">{t}</span>
                ))}
              </div>
              <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-neutral-200">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {p.stack.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-lg bg-neutral-800 border">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {/* Jump to specific image in the Images section */}
                <a
                  href={`#img-${p.imageId}`}
                  className="inline-flex items-center gap-1 text-sm underline underline-offset-4 text-pink-300 hover:text-pink-200"
                >
                  See image <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={p.repo}
                  className="inline-flex items-center gap-1 text-sm underline underline-offset-4 text-pink-300 hover:text-pink-200"
                >
                  Repo <Github className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = Array.from(new Set(skills.map((s) => s.group)));
  return (
    <section id="skills" className="py-16 bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g} className="rounded-3xl border p-5 bg-neutral-900/70">
              <h3 className="font-semibold mb-3">{g}</h3>
              <div className="space-y-4">
                {skills.filter((s) => s.group === g).map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.name}</span><span>{s.level}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-pink-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== NEW: Achievements Section ===== */
/* ===== NEW: Achievements Section (4-up smaller cards) ===== */
function Achievements() {
  const [preview, setPreview] = useState(null);

  return (
    <section id="achievements" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5" />
          <h2 className="text-2xl md:text-3xl font-bold">Achievements</h2>
        </div>
        <p className="text-neutral-300 mt-1">Certificates and badges I’m proud of.</p>

        {/* 4 columns on large screens, 2 on small, 1 on mobile */}
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-neutral-900/70 p-3 backdrop-blur"
            >
              <div
                className="rounded-xl overflow-hidden border bg-neutral-900/60 cursor-zoom-in"
                onClick={() => setPreview(a.image)}
                title="Click to zoom"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-32 object-contain bg-neutral-950"
                />
              </div>

              <h3 className="mt-3 font-semibold text-base leading-tight">{a.title}</h3>
              <p className="text-xs text-neutral-300 whitespace-pre-wrap">
                {a.issuer} · {a.date}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {a.verifyUrl && (
                  <a
                    href={a.verifyUrl}
                    className="text-xs underline underline-offset-4 text-pink-300 hover:text-pink-200"
                  >
                    Verify
                  </a>
                )}
                {a.downloadUrl && (
                  <a
                    href={a.downloadUrl}
                    download
                    className="text-xs underline underline-offset-4 text-pink-300 hover:text-pink-200"
                  >
                    Download
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.img
              src={preview}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Images gallery ===== */
function Gallery() {
  const [preview, setPreview] = useState(null);

  return (
    <section id="images" className="py-16 bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Images</h2>
        <p className="text-neutral-300">Screenshots from selected projects.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((g) => (
            <motion.figure
              key={g.id}
              id={`img-${g.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border overflow-hidden bg-neutral-900/70 cursor-zoom-in scroll-mt-28"
              onClick={() => setPreview(g.src)}
            >
              <img src={g.src} alt={g.caption} className="w-full h-48 object-cover" />
              <figcaption className="p-3 text-sm text-neutral-200">{g.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.img
              src={preview}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border p-6 bg-neutral-900/70">
            <p className="text-neutral-200">
              Let’s build something great. I’m open to full-time roles, internships, and freelance.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-pink-300">
                <Mail className="w-4 h-4" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-pink-300">
                <Phone className="w-4 h-4" /> {profile.phone}
              </a>
              <a href={profile.socials.github} className="flex items-center gap-2 hover:text-pink-300">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={profile.socials.linkedin} className="flex items-center gap-2 hover:text-pink-300">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border p-6 bg-neutral-900/70"
          >
            <div className="grid gap-3">
              <input placeholder="Your name" className="px-4 py-2 rounded-xl border bg-transparent" />
              <input placeholder="Email" className="px-4 py-2 rounded-xl border bg-transparent" />
              <textarea placeholder="Message" rows={4} className="px-4 py-2 rounded-xl border bg-transparent" />
              <button
                type="submit"
                className="px-4 py-2 rounded-2xl bg-pink-600 text-white hover:bg-pink-700"
              >
                Send
              </button>
              <p className="text-xs text-neutral-300">
                This form is a demo. Hook it to your backend or an email service.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm flex items-center justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4 text-neutral-300">
          <a href="#home" className="hover:text-pink-300">Back to top</a>
          <a href={profile.socials.github} className="hover:text-pink-300">GitHub</a>
          <a href={profile.socials.linkedin} className="hover:text-pink-300">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

function ScrollCue() {
  return (
    <a
      href="#projects"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100"
    >
      <ChevronDown className="w-5 h-5 animate-bounce" />
      <span className="text-xs">See my work</span>
    </a>
  );
}
