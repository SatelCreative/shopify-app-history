# Shopify App History

While attempting to use [`react-router`](https://github.com/ReactTraining/react-router) to handle routing in embedded [Shopify](https://www.shopify.ca/) apps we noticed that `window.top.location` was not staying in sync with `window.location`. This package attempts to solve that problem.

While it may work with other routing solutions, it is specifically targeting `react-router`.

## Usage

Install:

`$ npm install --save @satel/shopify-app-history`

`$ yarn add @satel/shopify-app-history`

Import:

```js
// using es modules
import createHistory from '@satel/shopify-app-history';

// using cjs modules
const createHistory = require('@satel/shopify-app-history');
```

Initialize:
```js
const history = createHistory({ easdk });
```

Configure:
```js
const history = createHistory({ easdk }, myHistoryConfiguration);
```

## React Router
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from '@satel/shopify-app-history';
import App from './App';

// TODO show usage with @shopify/polaris

const history = createHistory({ easdk }, args);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
```

### Implementation

It is just tiny wrapper around [`createBrowserHistory`](https://github.com/ReactTraining/history) that makes calls to `easdk.replaceState()` when necessary.
