# router
Easy client-side routing

## Installation
Just clone a git repo:

```shell
git clone https://github.com/happyCoda/chronos.git
```

### Getting started
Just as simple as is.

```js
var router = new Router({matchers: {

  '/': function () {

    // this function will be invoked each time you will hit the '/' route
    console.log('hit index route!');
  },

  '/user/:userId': function (userId) {

    // this function will be invoked each time you will hit the '/user/:userId' route
    // :userId param then will be passed into a callback
    console.log(userId);
  }
}});

router.run();
```

## Release History
* 2016-06-14   v0.1.0   First official release.
