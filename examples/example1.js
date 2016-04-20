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

    /* $feathers.service('/auth/facebook').create({
      access_token: ''
    }).then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.error(err)
    })*/

    $feathers.authenticate({
      type: 'google',
      access_token: '...'
    // type: 'local',
    // email: 'john@test.de',
    // password: 'unicorn'
    }).then(function (result) {
      console.log('Authenticated!', result)
      console.log('User', $feathers.get('user'))
    }).catch(function (error) {
      console.error(error)
    })

    return

  /* userService.create({
  username: 'john',
  email: 'john@test.de',
  password: 'unicorn'
  }).then(function (res) {
  $feathers.authenticate({
  type: 'facebook-token',
  access_token: ''
  // type: 'local',
  // email: 'john@test.de',
  // password: 'unicorn'
  }).then(function (result) {
  console.log('Authenticated!', result)
  }).catch(function (error) {
  console.error('Error authenticating!', error)
  })
  console.log(res)
  }).catch(function (err) {
  console.error(err)
  })*/
  })
