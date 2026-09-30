# Understanding the EwareDev React Portfolio

This guide explains how this React portfolio works in beginner-friendly language. It is written so you can use it to explain the project to a classmate, instructor, or another developer.

## 1. What this project is

This is a single-page React application. It is a portfolio website with these sections:

- Home
- About
- Projects
- Education
- Services
- Contact

Although the website has several URLs, the browser does not need to load a completely new HTML page every time. React changes the content shown on the screen while the application keeps running. This is why it is called a single-page application, or SPA.

The project was created with Create React App. React is responsible for building the user interface from reusable components. `react-router-dom` is responsible for changing the visible page when the user visits a different URL.

## 2. The most important idea: how the app starts

The application follows this path:

```text
public/index.html
        |
        v
src/index.js
        |
        v
src/App.js
        |
        +--> Navbar
        |
        +--> Route: /          -> page/Home.js
        +--> Route: /about     -> page/About.js
        +--> Route: /projects  -> page/Projects.js
        +--> Route: /education -> page/Education.js
        +--> Route: /services  -> page/Service.js
        +--> Route: /contact   -> page/Contact.js
```

In simple terms:

1. The browser opens `public/index.html`.
2. The HTML contains an empty element with `id="root"`.
3. `src/index.js` finds that element and places the React application inside it.
4. `src/App.js` decides which page component should be displayed.
5. The selected page returns JSX, which React turns into HTML elements on the screen.
6. CSS files control the appearance of those elements.

## 3. The project folders

```text
Assignment1/
|-- package.json                 Root command that starts my-portfolio
|-- my-portfolio/
    |-- package.json             React dependencies and scripts
    |-- public/                  Files copied or served directly
    |   |-- index.html            HTML template containing #root
    |   |-- profile.jpg           Profile image used by pages
    |   |-- resume.pdf            Downloadable resume
    |   |-- manifest.json          Progressive web app information
    |   |-- robots.txt             Search-engine instructions
    |   `-- favicon.ico            Browser tab icon
    |-- src/                      React source code
    |   |-- index.js               React entry point
    |   |-- App.js                 Main routing component
    |   |-- index.css              Global styles
    |   |-- App.css                Create React App starter styles
    |   |-- components/            Reusable interface components
    |   |-- page/                  Active page components
    |   |-- pages/                 Empty duplicate folder, currently unused
    |   `-- assets/                Empty folder, currently unused
    |-- build/                    Generated production files
    `-- README.md                 Original Create React App instructions
```

The source code that you normally edit is in `src/`. The `build/` folder is generated when you run a production build. It is not the main place to make changes.

## 4. `public/index.html`: the HTML starting point

The important line in this file is:

```html
<div id="root"></div>
```

This is an empty container. React uses it as the mounting point for the entire application. React does not replace the whole browser document. It renders the application inside this element.

Other important parts are:

- The `viewport` meta tag makes the page display correctly on phones.
- The `title` sets the browser tab title to `EwareDev | Developer Portfolio`.
- The description meta tag describes the website to search engines and other tools.
- The manifest link connects the website to `public/manifest.json`.
- The `noscript` message is shown if JavaScript is disabled.

The `%PUBLIC_URL%` value is replaced by Create React App during development or production building. Files in `public/` can also be used in React with paths beginning with `/`. For example, `/profile.jpg` means `public/profile.jpg`.

## 5. `src/index.js`: connecting React to the browser

The important code is:

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

What each part means:

- `document.getElementById('root')` finds the empty HTML container.
- `ReactDOM.createRoot(...)` creates a React root for that container.
- `root.render(...)` tells React what to display.
- `<App />` is the main React component.
- `<React.StrictMode>` is a development helper. It can make React run some checks more than once so possible problems are easier to notice. It does not add visible content to the website.
- `import './index.css'` loads the global stylesheet before the application is shown.

The file imports `ReactDOM` because ReactDOM connects React components to the actual browser DOM. The DOM is the browser's tree of HTML elements.

## 6. `src/App.js`: the application and the routes

`App.js` imports the router tools and all active page components:

```js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
```

The imported tools have these jobs:

- `BrowserRouter` watches the browser URL. It is renamed to `Router` in this project.
- `Routes` holds the possible routes.
- `Route` connects one URL path to one React component.

The main structure is:

```jsx
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Router>
```

Because `Navbar` is outside `Routes`, it appears on every page. Each `Route` says: when the URL matches this path, render this component.

The complete route table is:

| URL | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Introduction and focus areas |
| `/about` | `About` | Background, skills, resume link, and email link |
| `/projects` | `Projects` | Selected project cards |
| `/education` | `Education` | Education timeline |
| `/services` | `Services` | Services offered |
| `/contact` | `Contact` | Contact form |

`export default App` makes the component available to `index.js`.

## 7. `src/components/Navbar.js`: reusable navigation

The navbar is a reusable component because it is used once in `App.js` but appears across all routes.

```js
import { Link, NavLink } from "react-router-dom";
```

- `Link` changes the URL inside the React application without doing a full browser refresh.
- `NavLink` does the same thing, but it can automatically receive an `active` class when its URL is currently selected.

For example:

```jsx
<NavLink to="/projects">Projects</NavLink>
```

When the user clicks it, React Router changes the URL to `/projects`, and `App.js` renders the `Projects` component. The CSS selector `.nav-links a.active` changes the appearance of the selected link.

The Home link uses `end`:

```jsx
<NavLink to="/" end>Home</NavLink>
```

`end` means that Home should be active only when the URL is exactly `/`, not when another route is displayed.

The brand link uses `to="/"`, so clicking the EwareDev logo also returns to Home. The `aria-label` and `aria-hidden` attributes improve accessibility for people using screen readers.

## 8. The page components in `src/page/`

Every page is a function component. A function component is a JavaScript function that returns JSX.

### `page/Home.js`

Home is the landing page. It contains:

- A hero section with the introduction.
- A profile image loaded from `/profile.jpg`.
- Links to Projects and About.
- A mission statement.
- A list of technology focus areas.
- A link to Services.

The `Link` import is used for internal navigation. For example, this is an internal React route:

```jsx
<Link to="/projects">Explore my work</Link>
```

The `<span>` elements are used to style only part of a sentence, such as the coral-colored word `solve.`.

The `<figure>` and `<figcaption>` elements give the image and its caption meaningful HTML structure. The `alt` text describes the image for accessibility.

### `page/About.js`

About is mostly static content. It displays:

- A heading.
- The profile image.
- Paragraphs describing the developer's background and skills.
- A resume download link.
- An email link using `mailto:`.

This link:

```jsx
<a href="/resume.pdf" download>Download my resume</a>
```

points to `public/resume.pdf`. The `download` attribute asks the browser to download the file instead of navigating to it normally.

The email link opens the user's email application:

```jsx
<a href="mailto:ewaremorel1@gmail.com">Get in touch</a>
```

### `page/Projects.js`

Projects demonstrates how data can be separated from the layout. The `projects` constant is an array of objects. Each object stores the information for one project, such as its title, category, description, and CSS style name.

The page displays the projects with:

```jsx
{projects.map((project) => (
  <article key={project.number}>...</article>
))}
```

`map()` visits every item in the array and returns one piece of JSX for it. This avoids writing the same card markup three times.

The `key` gives React a stable identity for each item. React uses keys to understand which list items changed.

This expression combines fixed and data-driven class names:

```jsx
className={`project-art ${project.style}`}
```

The result might be `project-art project-art-one`. That lets the shared styles apply to every project while a second class gives each project a different visual treatment.

### `page/Education.js`

Education uses the same array-and-`map()` pattern as Projects. Each education object contains:

- A date range.
- A title.
- A credential.
- An institution.
- Details.

Each object becomes an `<article>`. The `key={item.year}` gives each article a unique React key in the current data.

### `page/Service.js`

This file defines the `Services` component, even though the file name is singular (`Service.js`). `App.js` imports it with this alias:

```js
import Services from "./page/Service";
```

The name after `import` is local to the file, so the component can be called `Services` even though the filename is `Service.js`.

The `services` array contains the number, title, and description for each service. `.map()` creates one service card per object.

### `page/Contact.js`

Contact is the most interactive page. It uses two React features:

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
```

#### State with `useState`

```js
const [form, setForm] = useState({
  first: "",
  last: "",
  phone: "",
  email: "",
  message: ""
});
```

`form` stores the current values. `setForm` changes those values. When state changes, React renders the component again with the updated information.

#### Updating the form

Every input has a `name` that matches a property in the `form` object. When a user types, `handleChange` runs:

```js
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}
```

- `e` is the browser event object.
- `e.target` is the input that changed.
- `e.target.name` selects the property to update.
- `e.target.value` is the new text.
- `...form` copies the existing fields so updating one field does not erase the others.

For example, typing a first name updates `{ first: "..." }` while preserving last name, phone, email, and message.

#### Submitting the form

```js
function handleSubmit(e) {
  e.preventDefault();
  console.log("Form submitted:", form);
  navigate("/");
}
```

`preventDefault()` stops the browser's normal form submission, which would refresh the page. The data is currently printed to the browser console, and then `navigate("/")` sends the user back to Home.

Important limitation: this form does not currently send an email or save data to a server. To make it a real contact form, it would need a backend API or a form service. The current code demonstrates collecting and handling form data in the browser only.

The `required` attribute performs basic browser validation for first name, last name, email, and message. Phone is optional because it does not have `required`.

## 9. CSS files

### `src/index.css`

This is the main stylesheet. It contains global rules and shared classes used by multiple pages.

The `:root` section defines CSS variables such as:

```css
:root {
  --paper: #f4f7f1;
  --ink: #1b2924;
  --green: #286b58;
}
```

Variables make the color palette easier to maintain. A rule can use `var(--green)` instead of repeating the color value.

The universal selector applies `box-sizing: border-box` to every element. This makes width and height calculations easier because padding and borders are included in the declared size.

The body rules set the page margin, background, font, text color, and line spacing. The Google Fonts import loads DM Sans and Space Grotesk.

Shared classes include:

- `.page-shell`: common width, centered layout, and page spacing.
- `.eyebrow`: small uppercase label above headings.
- `.page-title`: large heading used by internal pages.
- `.page-lead`: supporting text under a heading.
- `.button-link`: reusable styled link that looks like a button.
- `.text-link`: smaller text-style link.
- `.hero-grid`: two-column Home layout.
- `.project-grid`, `.education-list`, `.service-grid`, and `.contact-layout`: page-specific layouts.

Media queries such as `@media (max-width: 760px)` change the layout for smaller screens. This is called responsive design.

### `src/components/Navbar.css`

This stylesheet controls the navigation component. It defines:

- The horizontal desktop layout.
- The brand and brand mark.
- Spacing between navigation links.
- Hover and active-link effects.
- A vertical mobile layout below 760 pixels.
- A three-column navigation grid below 420 pixels.

The stylesheet uses variables from `index.css`, such as `var(--green)` and `var(--line)`. Because `index.css` is imported by `index.js`, those global variables are available to the navbar.

### `src/App.css`

This file contains the original Create React App starter styles, such as `.App-header` and the spinning `.App-logo` animation. The current `App.js` does not use those class names, so most of this file is inactive for the portfolio. The actual portfolio styles are mainly in `index.css` and `Navbar.css`.

## 10. `package.json` files and commands

There are two package files because the workspace has a root folder and a React application folder.

### Root `package.json`

The root has this convenience script:

```json
"start": "npm --prefix my-portfolio start"
```

It tells npm to run the `start` script inside the `my-portfolio` folder. Therefore, from the Assignment1 root, you can run:

```bash
npm start
```

### `my-portfolio/package.json`

Important dependencies are:

- `react`: creates components and manages the interface.
- `react-dom`: renders React into the browser DOM.
- `react-router-dom`: provides client-side routing.
- `react-scripts`: Create React App development and build tools.
- Testing Library packages: tools for writing UI tests.
- `web-vitals`: measures some browser performance information.

Important scripts are:

```bash
npm start       # Start the development server
npm test        # Run tests in watch mode
npm run build   # Create an optimized production build
npm run eject   # Expose hidden Create React App configuration; rarely needed
```

From inside `my-portfolio`, these commands work directly. From the Assignment1 root, the root `npm start` command forwards only the start command to that folder.

## 11. `build/`: production output

The `build/` folder contains the result of `npm run build`. Create React App bundles and minifies the source files, then creates files with hashed names such as `main.a952fa84.js` and `main.c1783626.css`.

You normally do not edit files in `build/` manually. If source code changes, run the build command again to generate a new version.

## 12. The duplicate `src/pages/` folder

The application imports page components from `src/page/`, not `src/pages/`. The files currently found in `src/pages/` are empty, so they do not affect the running application.

The difference is easy to miss:

```js
import Home from "./page/Home";
```

This points to the singular folder `page`. If you later decide to use `pages/`, you would need to move or recreate the components and update every import in `App.js`.

Similarly, `src/assets/` is currently empty. Images stored there would normally be imported into JavaScript, while files in `public/` can be referenced directly with paths such as `/profile.jpg`.

## 13. How to explain React concepts in this project

Here are simple definitions you can use:

- **Component:** A reusable JavaScript function that returns part of the user interface.
- **JSX:** HTML-like syntax written inside JavaScript. JSX must be returned by a component.
- **Route:** A URL pattern connected to a React component.
- **State:** Data stored by React that can change while the user interacts with the application.
- **Hook:** A React function such as `useState` that gives a component extra abilities.
- **Render:** React's process of converting component output into visible browser elements.
- **Event handler:** A function that runs after an event, such as a click, typing, or form submission.
- **Array mapping:** Turning every item in an array into a repeated piece of JSX with `.map()`.
- **Responsive design:** CSS rules that adapt the layout to different screen sizes.

## 14. A short presentation explanation

You can explain the project like this:

> This is a React single-page portfolio application created with Create React App. The browser starts with `public/index.html`, which contains the root element. `src/index.js` mounts the React application into that element. `App.js` uses React Router to connect URL paths to page components. The Navbar is shared across all routes, while the Home, About, Projects, Education, Services, and Contact components render the page content. Projects, education, and services store their content in arrays and use `.map()` to generate repeated cards. The Contact page uses `useState` to store form values and `useNavigate` to return to Home after submission. CSS files provide the layout, color palette, typography, hover effects, and mobile responsive behavior. The contact form currently logs data in the browser console rather than sending it to a server.

## 15. How to run and inspect the project

From the Assignment1 root folder:

```bash
npm start
```

Then open `http://localhost:3000`.

Useful checks while learning:

1. Open the browser developer tools and look at the Console after submitting the contact form.
2. Change one text value in a page component and watch the browser update automatically.
3. Change a CSS variable in `index.css` and observe how several parts of the site change.
4. Visit `/about`, `/projects`, and `/contact` directly to see React Router select different components.
5. Run `npm run build` to see how the development source becomes optimized files in `build/`.
