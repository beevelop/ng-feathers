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
