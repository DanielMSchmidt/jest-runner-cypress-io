# jest-runner-cypress-io [![Build Status](https://travis-ci.org/DanielMSchmidt/jest-runner-cypress-io.svg?branch=master)](https://travis-ci.org/DanielMSchmidt/jest-runner-cypress-io)

Jest runner for cypress.io

# Usage

Make sure you have standard already installed.

```
npm install --save-dev jest-runner-cypress-io
```

Your `jest.config.js` should look like this:

```javascript
module.exports = {
  projects: [
    {
      displayName: 'cypress'
      runner: 'jest-runner-cypress-io',
      testMatch: ['<rootDir>/**/*-cy.js'],
    },
    {
      displayName: 'test' // Unit Tests with jest
    }
  ]
}
```

# Credits

This project is inspired by the work of TheBrainFamily in various projects:

* [jest-runner-cypress](https://github.com/TheBrainFamily/jest-runner-cypress)
* [jest-runner-standard](https://github.com/TheBrainFamily/jest-runner-standard)
