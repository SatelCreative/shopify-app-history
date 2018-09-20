import { createBrowserHistory } from 'history';

/**
 * Creates a history object that will keep the iframe and top in sync
 * @name createHistory
 * @param {object} options
 * @param {*} options.easdk shopify easdk instance
 * @param {object} args arguments passed through to createBrowserHistory
 */
export default ({ easdk }, ...args) => {
  const history = createBrowserHistory(...args);

  history.listen(({ pathname, search, hash }, action) => {
    if (action === 'PUSH') {
      const location = `${pathname}${search}${hash}`;
      /*
       * @shopify/polaris removed the .replaceState method
       * exposed by the standalone ShopifyApp umd build.
       * 
       * If using polaris we have to send the raw message
       * but otherwise the replaceState method works
       */
      if (easdk.messenger) {
        easdk.messenger.send('Shopify.API.replaceState', { location })
      } else {
        easdk.replaceState(location);
      }
    }
  });

  return history;
};