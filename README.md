fxPocket
========

**A simple currency converter.**

## TL;DR:

Install required dependencies with:

```sh
# Install Node.js first (https://nodejs.org/en/)
npm install
```

Start the web server with:

```sh
npm start
```

Then go check http://localhost:3000/.

## Specs & Tests

* High-level specs are available in [docs/features](./docs/features).
* Unit and functional tests may be run with `npm run test`.

## A Student's Noteworthy Features

* [Pull Request #2](https://github.com/chikamichi/fxpocket/pull/2) demonstrates *Test-Driven Development* (TDD) in a step-by-step fashion.
* [Pull Request #9](https://github.com/chikamichi/fxpocket/pull/9) demonstrates a simple API-aware component's lifecycle, with underlying limitations.
* [Pull Request #11](https://github.com/chikamichi/fxpocket/pull/12) demonstrates the "Lifting State Up" pattern.
* [Pull Request #15](https://github.com/chikamichi/fxpocket/pull/15) demonstrates a more complex PR, including review and incrementally fixing code chunks based on peer-feedback.
* [Pull Request #21](https://github.com/chikamichi/fxpocket/pull/21) demonstrates TDD bug-fixing on a grown-up project.
* [Pull Request #23](https://github.com/chikamichi/fxpocket/pull/23) demonstrates separating concerns between fetching and rendering data, as well as mocking external dependencies & requests in tests.

## Quality of Life

This project was bootstrapped with [*Create React App*](https://github.com/facebookincubator/create-react-app) the following way:

```sh
npm install -g npx # https://github.com/zkat/npx
npx create-react-app fxpocket # https://github.com/facebook/create-react-app
```

*Create React App* does all the heavy-lifting. More information about *Create React App* is available [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Suggested Atom plugins for this project:

- https://atom.io/packages/file-icons
- https://atom.io/packages/atom-beautify
- https://atom.io/packages/language-gherkin
- https://atom.io/packages/atom-ide-ui
- https://atom.io/packages/ide-css
- https://atom.io/packages/ide-html
- https://atom.io/packages/ide-standardjs
- https://atom.io/packages/linter-ui-default
- https://atom.io/packages/linter-eslint (depends on https://eslint.org/)
- https://atom.io/packages/esdoc
