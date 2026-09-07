# RealTalkWithDara

A static site (plain HTML/CSS/JS, no build step) with a login-protected
admin dashboard so Dara can edit journal entries, photos, and page text
herself — no code required after setup.

---

## Part 1 — Get the site live (one-time setup)

**1. Push this folder to GitHub**
- Create a new repository on github.com (keep it private or public, either works).
- Upload everything in this folder to that repo (drag-and-drop on
  github.com works fine, or `git push` if you're comfortable with git).

**2. Connect it to Netlify**
- Go to [app.netlify.com](https://app.netlify.com) → **Add new site** →
  **Import an existing project** → choose GitHub → pick the repo.
- Build command: leave blank. Publish directory: `.` (a dot — already
  set in `netlify.toml`).
- Click **Deploy**. You'll get a live URL like `random-name.netlify.app`
  (you can rename it or add a custom domain later in Site settings).

**3. Turn on Netlify Identity (this is what makes login possible)**
- In your Netlify site dashboard: **Site configuration** → **Identity** → **Enable Identity**.
- Under **Registration**, set it to **Invite only** (so random people can't sign up).
- Under **Services**, enable **Git Gateway** — this lets the dashboard
  save changes back to your GitHub repo automatically.

**4. Invite Dara**
- Still in Identity → **Invite users** → enter her email.
- She'll get an email with a link to set her password.

**5. Log in to the dashboard**
- Go to `yoursite.netlify.app/admin/`
- Log in with the email + password from the invite.
- That's the CMS — a clean dashboard, not code.

Every save she makes there commits a change to the GitHub repo, and
Netlify automatically republishes the live site within a minute or two.

---

## Part 2 — What Dara can do from the dashboard

Two sections, both editable without touching any code:

### "Journal Entries"
Add, edit, delete, or reorder blog posts. Each entry has: title, URL
slug, category, date, cover photo, a short excerpt, and the body text
(paragraph by paragraph — click "Add paragraph" to add more).

### "Site Settings"
One place to change everything else:
- The logo
- Homepage headline, intro text, and photo
- About page bio paragraphs and portrait photo
- Contact email, response-time note, and social links (leave a link
  blank to hide that icon automatically)

---

## Editing the code directly (optional)

If you ever want to hand-edit instead of using the dashboard:

```
index.html             Home
about.html              About Dara
contact.html            Contact form (Netlify Forms — submissions show
                         up in Site → Forms in your Netlify dashboard)
journals/index.html     All entries, with category filters
journals/post.html      Single-entry template (reads ?slug= from the URL)
content/posts.json      ← the data behind every journal entry
content/settings.json   ← the data behind logo/hero/about/contact text
css/style.css           All styling — colors and fonts are CSS
                         variables at the very top under :root
js/main.js              Shared behaviour: nav menu, and the code that
                         reads settings.json and fills it into the page
js/render-*.js          Reads posts.json and builds each page's post list
images/                 Logo, real photos, and the illustrated post
                         thumbnails (all plain files — replace freely)
admin/                  The CMS dashboard (config.yml defines the
                         fields Dara sees — safe to leave alone)
```

Both `content/posts.json` and `content/settings.json` are just JSON —
editable by hand in any text editor if you'd rather skip the dashboard
for a specific change. The dashboard is simply a friendlier way to
edit those same two files.

**Note:** because the pages load their content with `fetch()`, you
can't just double-click an `.html` file to preview it locally — open
it through a local server (e.g. `python3 -m http.server` in this
folder, then visit `localhost:8000`) or push and preview on Netlify.
