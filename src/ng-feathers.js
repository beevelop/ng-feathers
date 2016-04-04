/**
 * ngFeathers
 *
 * @version 0.0.2
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */

/*global
    angular, feathers, io */

angular
  .module('ngFeathers', [])
  .provider('$feathers', [
    function () {
      var endpoint = null
      var useSocket = true
      var authStorage = window.localStorage

      return {
        setAuthStorage: function (newAuthStorage) {
          authStorage = newAuthStorage
        },
        useSocket: function (socketEnabled) {
          useSocket = !!socketEnabled
        },
        setEndpoint: function (newEndpoint) {
          endpoint = newEndpoint
        },
        $get: [
          function () {
            this.app = feathers()
              .configure(feathers.hooks())

            if (useSocket) {
              this.socket = io(endpoint)
              this.app.configure(feathers.socketio(this.socket))
            } else {
              this.app.configure(feathers.rest(endpoint).jquery(window.jQuery))
            }

            this.app.configure(feathers.authentication({
              storage: authStorage
            }))

            return this.app
          }]
      }
    }]
)
