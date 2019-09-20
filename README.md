# Deprecation Notice

Use Shopify's [react-shopify-app-route-propagator](https://github.com/Shopify/quilt/tree/master/packages/react-shopify-app-route-propagator) instead

# Shopify App History

While attempting to use [`react-router`](https://github.com/ReactTraining/react-router) to handle routing in embedded [Shopify](https://www.shopify.ca/) apps we noticed that `window.top.location` was not staying in sync with `window.location`. This package attempts to solve that problem.

While it may work with other routing solutions, it is specifically targeting `react-router`.

## Usage

Install:

`$ npm install --save @satel/shopify-app-history`

`$ yarn add @satel/shopify-app-history`

Import:

```js
import { createBrowserHistory } from 'history';
import syncHistory from '@satel/shopify-app-history';
```

Initialize:
```js
const history = createHistory({
  easdk,
  history: createBrowserHistory(),
});
```

## Polaris Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import syncHistory from '@satel/shopify-app-history';
import history from './path/to/custom/history';
import App from './App';

const ShopifyRouter = (({ children }, { easdk }) => {
  const history = syncHistory({
    easdk,
    history,
  });
  return (
    <Router history={history}>
      {children}
    </Router>
  );
});

// This tells react to bind the context
ShopifyRouter.contextTypes = { easdk: PropTypes.any.isRequired };

ReactDOM.render(
  <AppProvider
    apiKey="shh"
    shopOrigin="https://example.myshopify.com"
  >
    <ShopifyRouter>
      <App />
    </ShopifyRouter>
  </AppProvider>,
  document.getElementById('root'),
);
```

## EASDK Example
```html
<!-- Include the EASDK -->
<script src="https://cdn.shopify.com/s/assets/external/app.js"></script>
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import syncHistory from '@satel/shopify-app-history';
import history from './path/to/custom/history';
import App from './App';

syncHistory({
  easdk: window.ShopifyApp,
  history,
});

window.ShopifyApp.init({
  apiKey: "shh",
  shopOrigin: "https://example.myshopify.com",
});

window.ShopifyApp.ready(() => {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root'),
  );
});
```

### Implementation

It is just tiny wrapper around [`history`](https://github.com/ReactTraining/history) that makes calls to `easdk.replaceState()` or `easdk.messenger.send()` depending on which library is used.
