'use strict'

angular.module('services.session', [])

.factory('sessionService', function($http, $q, $window, userService) {
  var session =  {
    login: function(user) {
      var _self = this
      var deferred = $q.defer()
      $http.post(API_URL + 'auth.json', user)
      .success(function(data) {
        userService.setUser(data.user)
        _self.setToken(data.meta.token)
        deferred.resolve()
      })
      .error(function() {
        _self.clearToken()
        deferred.reject()
      })
      return deferred.promise
    },

    loginWithToken: function(token) {
      var deferred = $q.defer()

      $http.post(API_URL + 'auth_token.json', { token: token })
      .success(function (data) {
        userService.setUser(data.user)
        deferred.resolve(true)
      })
      .error(function () {
        deferred.reject()
       })
      return deferred.promise
    },

    logout: function() {
      // TODO logout on rails server
      userService.resetUser()
      this.clearToken()
    },

    register: function(user) {
      var _self = this
      var deferred = $q.defer()

      $http.post(API_URL + 'users', {user: user})
      .success(function(data) {
        userService.setUser(data.user)
        _self.setToken(data.meta.token)
        deferred.resolve()
      })
      .error(function() {
        _self.clearToken()
        userService.resetUser()
        deferred.reject()
      })
      return deferred.promise
    },

    setToken: function(token) {
      $window.localStorage.setItem('token', token)
      $http.defaults.headers.common.Authorization = 'Basic ' + token
    },

    clearToken: function() {
      $window.localStorage.removeItem('token')
      $http.defaults.headers.common.Authorization = ''
    }
  }

  return session
})

