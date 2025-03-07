<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
```bash
# React Code Snippets
``` -->

# Dvago Web Documentation

This app is developed on node v16.15.1

## Table of Contents

1. [Coding Rules](#coding-rules)
1. [How to use Github](#how-to-use-github)
1. [Prettier Setup](#prettier-setup)
1. [Docker Setup](#docker-setup)
1. [Code Snippets](#code-snippets)
   - [Typescript Code Snippets](#typescript-code-snippets)
   - [React Code Snippets](#react-code-snippets)
   - [Scss Code Snippets](#scss-code-snippets)
1. [Folder Structure](#folder-structure)
   - [src](#src-folder)
   - [components](#components-folder)
   - [containers](#containers-folder)
   - [constants](#constants-folder)
   - [features](#features-folder)
   - [functions](#functions-folder)
   - [hooks](#hooks-folder)
   - [layouts](#layouts-folder)
   - [pages](#pages-folder)
   - [redux](#redux-folder)
   - [services](#services-folder)
   - [styles](#styles-folder)
   - [types](#types-folder)
   - [utils](#utils-folder)

<br/>

---

<br/>

## Coding Rules <span id="coding-rules"></span>

Developers must strictly follow these rules while coding to keep the code clean.

- Don't use `npm run dev` for development. Instead, use `make start` for development.
- To stop and remove container run `make stop` command.
- Make sure to Place the files in their appropriate folders.
- Folder and file names should be in kebab casing (i.e. cart-component-layout)
- Each component should be in it's own folder and the name of folder should be same as component file name.
- Each component will have it's own module.scss file.
- Use `rc` to generate react component boilerplate code.
- Use `np` or `np-initial` or `np-ssr` or `np-static` to generate next page component boilerplat code.
- Never use hard coded colors anywhere in the code. Always use colors using css variables (i.e. `var(--primary-color)`).
- Never use hard font families anywhere in the code. Always use colors using scss variables (i.e. `font-family: $font-OpenSans`).
- Always use path aliases to import any kind of local files. (i.e. `import { AxiosPost } from @/utils/api-methods`).
- Avoid using inline styles as much as possible.
- Use Scss mixins as much as possible in scss files.
- Always use `r-dispatch` to generate useDispatch hook code snippet and `r-selector` to generate useSelector hook bolierplat code.
- Each and every component will be divided into atleast 3 to 4 separate files. In this way, ui logic and business logic will be separated and it will be easier for developers to manage them.
  - component-name.tsx file (for actual component)
  - component-name.module.scss file (for scss styling)
  - component-name.logic.ts file (for business logic).
  - component-name.data.ts file (for any static data required in component)
- Related components should be close to each other. For example brands module in containers folder will host brands-popup component as well as it is related to brand. It doesn't matter if it is being used in any other ccontainer's component.
- Page component should only be used for SSR or SSG and no other UI logic should be in them directly. Instead a new module folder will be created in the containers folder and then main layout component will be created in it and then this component will be used in Page component.
- Page component's will never have css or scss file.
- Page component is only responsible for SSR or SSG. Other than this it won't have any logic.
- For every page there will be a folder in containers and the root point of that folder will be page-index.
- Each and every component must be in it's own folder where only files related to that component will be present. No other files or no other sub-component folder are allowed in there.
- If any component is divided into sub-components, it will have a folder in it named as `component-name-index` so that other developers will know that is the the root component.
- Each and every component should be responsible for only one thing. If it has to implement more than one thing then break it into separate sub-component
- Don't use `console.log` instead use `LogInfo` or `LogError` or `LogWarning` methods declared in `@/utils/dev-logging.ts` file.
- Don't leave commented code. If it is not being used then delete it else developer must write the reason why code was commented on top of it.
- Always name variables with meaningful name.
- Always use `===` instead of `==` for comparisions.
- Use `rem` instead of `px` in scss.

<br/>

---

<br/>

## How to use Github <span id="how-to-use-github"></span>

Guide 01: To commit your work in your branch follow these steps<br/>
1). git add .<br/>
2). git commit -m 'describe your changes here'<br/>
3). git push origin YOUR_BRANCH_NAME<br/>

Guide 02: How to change branch<br/>
1). git checkout YOUR_BRANCH_NAME<br/>
2). git pull origin YOUR_BRANCH_NAME<br/>

Guide 03: How to merge your work in main branch<br/>
1). First commit your work by following the Guide 01.<br/>
2). git checkout main<br/>
3). git pull origin main<br/>
4). Make sure there are no conflicts after this step. If there is any then resolve them and then commit them by following Guide 01.<br/>
5). git pull origin YOUR_BRANCH_NAME<br/>
6). Make sure there are no conflicts after this step. If there is any then resolve them and then commit them by following Guide 01.<br/>
7). git push origin main<br/>

IMPORTANT: Make sure you work in your own branch<br/>
IMPORTANT: Never ever work in main branch directly except resolving merge conflicts.

<br/>

---

<br/>

## Prettier Setup <span id="prettier-setup"></span>

Enable prettier on VS Code by editing .vscode/settings.json file and adding these lines in it.

```json
{
  // Add those two lines:
  "editor.formatOnSave": true, // Tell VSCode to format files on save
  "editor.defaultFormatter": "esbenp.prettier-vscode" // Tell VSCode to use Prettier as default file formatter
}
```

<br/>

---

<br/>

## Docker Setup <span id="docker-setup"></span>

Docker must be used for development. Follow these steps to setup and use docker on your system.

- Download and install [Docker Desktop](https://www.docker.com)
- To build image Run `make build` command
- To start container run `make up` command
- To stop and remove container run `make down` command

<br/>

---

<br/>

## Code Snippets <span id="code-snippets"></span>

Code snippets will help developers to write bolierplate code using shortcuts, hence making development faster. Currently we have 3 kinds of code snippets. Code snippets for React's JSX, Typescript and SCSS.

To enable these snippets in your vs code, follow these steps:

- First copy json from &emsp;&emsp; -&emsp; vs-code-setup &nbsp;>&nbsp; snippets &nbsp;>&nbsp; typescript.json
- Then paste this json in &emsp;-&emsp; vs code &nbsp;>&nbsp; Settings &nbsp;>&nbsp; Configure User Snippets &nbsp;>&nbsp; typescript.json

Repeat same steps for typescriptreact.json and scss.json file as well.

<br />

### **Typescript Code Snippets** <span id="typescript-code-snippets"></span>

|                         |                                                         |
| ----------------------- | ------------------------------------------------------- |
| **redux-file-slice**    | Generate redux slice file boilerplate code              |
| **redux-file-reducers** | Generate redux reducers file boilerplate code           |
| **redux-file-actions**  | Generate redux actions file boilerplate code            |
| **redux-async-action**  | Generate redux async action function's boilerplate code |

<br/>

### **React Code Snippets** <span id="react-code-snippets"></span>

|                     |                                               |
| ------------------- | --------------------------------------------- |
| **rc**              | Generate React Component                      |
| **np**              | Generate Next Page                            |
| **np-initial**      | Generate Next Page With Initial Props         |
| **np-ssr**          | Generate Next Page With Server Side Rendering |
| **np-static**       | Generate Next Page With Static Page Props     |
| **r-state**         | Generate useState Hook                        |
| **r-effect**        | Generate useEffect Hook                       |
| **r-ref-mutable**   | Generate Mutable useRef Hook                  |
| **r-ref-immutable** | Generate Immutable useRef Hook                |
| **r-dispatch**      | Generate React Redux useDispatch Hook         |
| **r-selector**      | Generate React Redux useSelector Hook         |

<br />

### **Scss Code Snippets** <span id="scss-code-snippets"></span>

|                            |                                                              |
| -------------------------- | ------------------------------------------------------------ |
| **mixin-responsive**       | Generate SCSS Responsive Mixin                               |
| **mixin-padding**          | Generate SCSS Padding Mixin                                  |
| **mixin-page-padding**     | Generate SCSS Page Padding Mixin                             |
| **mixin-margin**           | Generate SCSS Margin Mixin                                   |
| **mixin-transition**       | Generate SCSS Transition Mixin                               |
| **mixin-flex**             | Generate SCSS Flex Mixin                                     |
| **mixin-limit-text-lines** | Generate SCSS Mixin To Limit Text To Defined Number Of Lines |

<br />

---

<br />

## Folder Structure <span id="folder-structure"></span>

Below is the explanation of folder structure of this app. Each and every folder is for sepcific use and all files must be placed in their appropriate folders.

**src** <span id="src-folder"></span><br/>
This is the root folder and it will host all the source code files.

**components** <span id="components-folder"></span><br/>
This folder folder will host only pure components (a.k.a dumb components).<br/>
Pure component means that these components won't have any business logic and its return value is only determined by its input values.

**containers** <span id="containers-folder"></span><br/>
This folder will host all other components divided into explicit modules.

**constants** <span id="constants-folder"></span><br/>
This folder will host files for static variables and data which is required throughout the code base.

**features** <span id="features-folder"></span><br/>
This folder will host components and other typescript files for each and every new feature. The aim of this folder is to develop every new feature in complete isolation which will ultimately make it easy to debug and it can be easily re-used in other projects.

**functions** <span id="functions-folder"></span><br/>
This folder will host typescript functions/methods that may or may not be a pure function.

**hooks** <span id="hooks-folder"></span><br/>
This folder will host custom hooks

**layouts** <span id="layouts-folder"></span><br/>
This folder will host layout components. Layout components are different from other components as they must be a re-usable and pure component which will wrap around it's child component.

**pages** <span id="pages-folder"></span><br/>
This folder will host a route component for each route as Next.js uses file based routing.

**redux** <span id="redux-folder"></span><br/>
This folder will host redux store and it's slices. Each slice is divided into separate sub-folder and each slice's sub-folder will have 2 or 3 files in it. These files are slice.ts, reducers.ts & actions.ts (optional).<br/>
slice.ts and reducers.ts files will be almost identical for every redux store's slice where as each slice will have different actions.ts files or not have this file at all.

**services** <span id="services-folder"></span><br/>
This folder will host files (divided into modules) for all services that will be required through the code base. Here each module will have 3 files (services.ts, types.ts, index.ts).<br />
services.ts file will export methods to execute service.<br />
types.ts file will export args, response and other types related to the services in services.ts folder.<br />
index.ts file will be the main access points. All other files will import types and services of from index file.

**styles** <span id="styles-folder"></span><br/>
This folder will host css and scss styles, mixins and variables that can be accessed globally.

**types** <span id="types-folder"></span><br/>
This folder will host type declarations files. Here we can declare global or custom types.

**utils** <span id="utils-folder"></span><br/>
This folder will host utility methods which are used throughout the code base
