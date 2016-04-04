[![npm](https://img.shields.io/npm/v/ng-feathers.svg?style=flat-square)](https://www.npmjs.com/package/ng-feathers)
[![Bower](https://img.shields.io/bower/v/ng-feathers.svg?style=flat-square)](#bower)
[![Travis](https://img.shields.io/travis/beevelop/ng-feathers.svg?style=flat-square)](https://travis-ci.org/beevelop/ng-feathers)
[![Code Climate](https://img.shields.io/codeclimate/github/beevelop/ng-feathers.svg?style=flat-square)](https://codeclimate.com/github/beevelop/ng-feathers)
[![Gemnasium](https://img.shields.io/gemnasium/beevelop/ng-feathers.svg?style=flat-square)](https://gemnasium.com/beevelop/ng-feathers)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Beevelop](https://links.beevelop.com/honey-badge)](https://beevelop.com)

# ngFeathers :bird:

> :warning: Still WIP: API is unstable and might change.

> [FeatherJS](http://feathersjs.com/) for plain old [AngularJS](https://angularjs.org/) (1.X)

## Installation

### Install via Bower:
```bash
bower install --save ng-feathers
```

#### Add standalone version (dependencies included) to your HTML file
```html
<script src="bower_components/ng-feathers/dist/ng-feathers.standalone.min.js"></script>
```

#### Or add Socket.io + Feathers-Client + (minified) ngFeathers individually:
```html
<script src="bower_components/socket.io-client/socket.io.js"></script>
<script src="bower_components/feathers-client/dist/feathers.js"></script>
<script src="bower_components/ng-feathers/dist/ng-feathers.min.js"></script>
```
----

### Install via npm:
```bash
npm install --save ng-feathers
```

#### Add standalone version (dependencies included) to your HTML file
```html
<script src="node_modules/ng-feathers/dist/ng-feathers.standalone.min.js"></script>
```

#### Or add Socket.io + Feathers-Client + (minified) ngFeathers individually:
```html

<script src="node_modules/socket.io-client/socket.io.js"></script>
<script src="node_modules/feathers-client/dist/feathers.js"></script>
<script src="node_modules/ng-feathers/dist/ng-feathers.min.js"></script>
```
----


### REST
- REST requires jQuery as it depends on jQuery's AJAX implementation

## Usage (with Socket.io)
```js
// Add ngFeathers as dependency
angular.module('myApp', ['ngFeathers'])

  // Optionally configure $feathersProvider
  .config(function ($feathersProvider) {
    $feathersProvider.setEndpoint('http://localhost:3030/')
    
    // true is default; set to false if you like to use REST
    $feathersProvider.useSocket(true)
  })
  .controller('app', function ($feathers) {
    var userService = $feathers.service('users')

    userService.on('created', function (msg) {
      console.log(msg)
    })

    userService.create({
      username: 'john',
      password: 'unicorn'
    }).then(function (res) {
      $feathers.authenticate({
        type: 'local',
        username: 'john',
        password: 'unicorn'
      }).then(function (result) {
        console.log('Authenticated!', result)
      }).catch(function (error) {
        console.error('Error authenticating!', error)
      })
      console.log(res)
    }).catch(function (err) {
      console.error(err)
    })
  })
```
