# ResumeIt — ATS-Optimized IT Resume Builder

A web application designed specifically for IT professionals, software engineers, and developers to build recruiter-approved, ATS-optimized resumes with real-time preview, auto-save, PDF export, and Supabase Authentication.

---

## 🚀 Features

- **ATS-Friendly Layout**: Clean, single-column semantic structure optimized for Applicant Tracking Systems.
- **Categorized Technical Skills**: Languages, Frameworks, Databases, Cloud & DevOps, Tools.
- **IT-Focused Details**: GitHub, LinkedIn, Tech Stack tags per job/project, and Certifications.
- **Live Preview & PDF Export**: Instant visual feedback with 1-click clean PDF download.
- **Authentication**: Built with Supabase Auth (Email/Password & Magic Link).
- **Dark/Light Mode**: Full theme toggle support.

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resumebuilder.git
cd resumebuilder
```

### 2. Configure Supabase
1. Copy the example configuration file:
   - On Windows: `copy js\supabase-config.example.js js\supabase-config.js`
   - On Mac/Linux: `cp js/supabase-config.example.js js/supabase-config.js`
2. Open `js/supabase-config.js` and insert your Supabase project URL and anon public key:
   ```javascript
   const SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 3. Run Locally
Open `index.html` in your web browser, or run a local web server:
```bash
# Example with Python:
python -m http.server 3000

# Example with Node npx:
npx serve .
```

---

## 🔒 Security

- `js/supabase-config.js` is included in `.gitignore` to prevent committing live credentials to GitHub.
- Database access is protected with PostgreSQL **Row Level Security (RLS)** in Supabase.
