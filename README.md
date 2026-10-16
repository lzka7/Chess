# Our Friend Group Chess League

Static website: no build step, no dependencies.

## Update results
Open `script.js`, edit the numbers in the `PLAYERS` block (top of the file), commit, push.
Points, totals and ranking update automatically.

## Publish on GitHub Pages
1. Create a repo and upload `index.html`, `style.css`, `script.js`, `README.md`.
2. Repo **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Your site appears at `https://<username>.github.io/<repo>/` after a minute.

## Ranking rules
Total points → head-to-head (optional `HEAD_TO_HEAD` list) → Rapid wins → Blitz wins → playoff.
