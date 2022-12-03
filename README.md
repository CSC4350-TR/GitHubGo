# GitHubGo - Team10

![GitHub contributors](https://img.shields.io/github/contributors/CSC4350-TR/GitHubGo?color=palevioletred) ![GitHub last commit](https://img.shields.io/github/last-commit/CSC4350-TR/GitHubGo?color=mediumorchid) ![GitHub deployments](https://img.shields.io/github/deployments/CSC4350-TR/GitHubGo/github-pages?label=deploy&color=mediumseagreen)

---

## Project Setup

#### Node.js

This project requires Node.js. To check if your device has node.js installed, open your terminal and type:

```console
node -v
```

- If it is displaying any version, then it is installed!

- Otherwise, install [Node.js](https://nodejs.org/en/download/)

<br/>

#### Package Manager

For this project, we are using yarn as our package manager. Inside your terminal, type:

```console
npm i -g yarn
```

<br/>

#### Clone Project

Go to the folder where you want to clone this project, and type the following in your terminal:

```console
git clone https://github.com/CSC4350-TR/GitHubGo.git
```

<br />

#### Dependencies installation

Go to your project folder and write the following in your terminal:

```console
yarn
```

- This will install all the dependencies that are in the package.json file

<br/>

#### Run Project

Open your project folder and type this in your terminal:

```console
yarn start
```

The website will run on `localhost:3000/GitHubGo`

<br/>

#### Website Deployment

To deploy the lastest changes to the production website, run:

```console
yarn run deploy
```

#### Note

- **Always run the following commands whenever you start working on the project or change a git branch to get fresh changes**

```console
git pull
yarn
```

---

## Project Overview

#### Styling

We are using TailwindCSS for styling

Read their docs to learn more about them:

- TailwindCSS [docs](https://tailwindcss.com/docs/installation)

<br />

#### Extensions for VS Code

- **ESLint** `dbaeumer.vscode-eslint`
- **ES7+ React/Redux/React-Native snippets** `dsznajder.es7-react-js-snippets`
- **Prettier - Code Formatter** `esbenp.prettier-vscode`

<br/>

#### Project Structure

| Path                | Description                                |
| :------------------ | :----------------------------------------- |
| **/public**         | Static files                               |
| **/src**            | Source code                                |
| **/src/assets**     | Images and styles                          |
| **/src/components** | Functional components                      |
| **/src/pages**      | Routes                                     |
| **/src/utils**      | Things that are not related to client side |

<br/>

#### Working with GitHub API using GraphQL

`Step 0:` Run `git pull origin main` and `yarn` in the **main** branch of your IDE.

- To change your branch, type: `git checkout main`

`Step 1`: Create a `.env.development` file on the root of this project(where this readme file is) and fill the following things in it.

```console
BROWSER=None
REACT_APP_GITHUB_TOKEN=<paste your personal token here>
```

!! ⚠️ **Write .env.development inside .gitignore** ⚠️ !!

- To create your personal GitHub token:

```console
- Go to GitHub
- Settings
- Developer settings (At bottom of the page)
- Personal access token
- Tokens (classic)
- Generate new token
- Generate new token (classic)
- Name anything you want
- Click on Generate
```

When generating the token, make sure you select all the permissions mentioned below

```console
repo
read:packages
read:org
read:public_key
read:repo_hook
user
read:discussion
read:enterprise
read:gpg_key
```

- Now copy that token and paste it into your `.env.development` file

<br />

**Example**

```js
// To request using graphql api, you have to firstimport the following function from the index.js file in the src folder'
import { axiosGitHubGraphQL } from "..";

// You can write your query this way
const res = await axiosGitHubGraphQL.post("", {
  query: `query{
        viewer{
            name,
            login
        }
    }`,
});

const data = res.data ?? "";

// Or you can write your query the following way
const Query = `query{
    viewer{
        name,
        login
    }
}
`;
const res = await axiosGitHubGraphQL.post("", {
  query: Query,
});

const data = res.data ?? "";

//...there are many more ways !!
```

- Always sync your current working branch with the main branch by typing `git pull origin main` 

- To add changes from your current working branch to the main branch, read documentations or watch videos on: `git merge` and `git rebase` command.