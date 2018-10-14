This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

G+ Archiver is a project for generating a completly client-side, paged and searchable archive of exported G+ posts.
The archive can be hosted publicly for free on [GitHub Pages](https://pages.github.com/)
using the instructions at [react-gh-pages](https://github.com/gitname/react-gh-pages)

1. Fork and clone the [gplus-archive](https://github.com/evilgeniuslabs/gplus-archive) repository.
2. Open `gplus-archive/package.json` and change the `homepage` property to match your GitHub username.
3. Download and install [Node.js and npm](https://www.npmjs.com/get-npm)
4. From the `gplus-archive` directory, run `npm install`.
5. [Export your G+ data](https://support.google.com/plus/answer/1045788?hl=en) in JSON format using [Google Takeout](https://takeout.google.com/settings/takeout).  I clicked `Select None`, then only selected `Google+ Stream`, and unchecked everything except `Posts`.  Then I selected `JSON` as the format.
6. Download and extract all exported files.
7. Copy all of the posts you'd like to host and share **publicly** from `Takeout/Google+ Stream/Posts`.  The files will start with a date and end with `.json`, like `20170623 - Post.json`.
8. Copy the above files to `gplus-archive/public/posts`.
9. Run `node make_index.js` from the `gplus-archive/public/posts` directory.
10. Ensure the 'posts' directory and `index.json` file contain only the posts you'd like to host and share **publicly**.  If you need to remove any, just delete the post .json file and re-run `make-index.js`.
11. From the 'gplus-archive' directory, run `npm start`
12. The site should open in your browser automatically.  If it does not, open [http://localhost:3000/](http://localhost:3001/).
13. View the site, and again verify that it only contains the posts you'd like to host and share **publicly**.
14. Open `gplus-archive/src/settings.json` and change the `basename` property to `gplus-archive`. It has to be blank for local dev/testing, but has to be `gplus-archive` before committing and pushing to GitHub and hosting on GitHub Pages.
15. Commit and push your forked repository to GitHub.
16. From the 'gplus-archive' directory, run `npm run deploy`
17. Your site should now be ready at https://YOUR-NAME.github.io/gplus-archive.  If not, follow the instructions on [GitHub Pages](https://pages.github.com/) to configure your site.
