/**
 * ngFeathers
 *
 * @version 1.6.1
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */

/* global
    angular, feathers, io */

angular
  .module('ngFeathers', [])
  .provider('$feathers', [
    function () {
      var endpoint = null
      var socketOpts = null
      var useSocket = true
      var authStorage = window.localStorage

      return {
        setAuthStorage: function (newAuthStorage) {
          authStorage = newAuthStorage
        },
        setSocketOpts: function (opts) {
          socketOpts = opts
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
              this.socket = io(endpoint, socketOpts)
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
