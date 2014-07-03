'use strict'

angular.module('services.facebook', [])

.factory('facebookService', function($http, $q, $window, $rootScope, userService) {
  var facebook = {
    getLoginStatus: function() {
      FB.getLoginStatus(function(response) {
        console.log(response)
        $rootScope.$broadcast("fb_statusChange", {
          'status': response.status
        })
      }, true)
    },

    login: function() {
      FB.login(function(response) {
        console.log(response)
        if (response.authResponse) {
          $rootScope.$broadcast('fb_connect', {
            facebook_id: response.authResponse.userId,
            userNotAuthorize: true
          })
        } else {
          $rootScope.$broadcast('fb_loginFailed')
        }

      }, {scope: 'user_friends, email, public_profile'})
    },

    logout: function() {
      FB.logout(function(response) {
        if (response) {
          $rootScope.$broadcast('fb_logoutSucceeded')
        } else {
          $rootScope.$broadcast('fb_logoutFailed')
        }
      })
    }
  }

  return facebook
})
