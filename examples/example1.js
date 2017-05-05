window.angular.module('ngFeathers.example1', ['ngFeathers'])
  .config(function ($feathersProvider) {
    $feathersProvider.setSocketOpts({
      path: '/ws/'
    })
    $feathersProvider.setEndpoint('http://localhost:3030')
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
      }).then(function (response) {
        console.log('Authenticated!', response);
        // By this point your accessToken has been stored in
        // localstorage
        return $feathers.passport.verifyJWT(response.accessToken);
      }).then(function (payload) {
        console.log('JWT Payload', payload);
        return $feathers.service('users').get(payload.userId);
      }).then(function (user) {
        app.set('user', user);
        console.log('User', app.get('user'));
        // Do whatever you want now
      }).catch(function (error) {
        console.error('Error authenticating!', error);
      });
    }).catch(function (err) {
      console.error('Error authenticating!', err);
    });
  });
