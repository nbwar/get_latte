API_URL = 'http://localhost:3000/api/'

angular.module('getLatte', ['ionic', 'getLatte.controllers', 'getLatte.services'])

.run(function($ionicPlatform, $location, $rootScope, $state, $window, userService, sessionService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if(window.StatusBar) {
      StatusBar.styleDefault()
    }
  })

  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  //   if (toState.redirectLoggedinUser) {
  //     var token = $window.localStorage.token
  //     if (token) {
  //       sessionService.loginWithToken(token)
  //       .then(function() {
  //         event.preventDefault()
  //         $state.go('app.menu')
  //         // return
  //       }, function(error) {
  //         userService.resetUser()
  //       })
  //     }
  //   }

  // if (!userService.isLoggedIn && toState.access.isProtected) {
  //     event.preventDefault()
  //     $state.go('home')
  //   }
  // })

  $rootScope.user = userService

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl',
      access: {
        isProtected: false
      },
      redirectLoggedinUser: true
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:  'LoginCtrl',
      access: {
        isProtected: false
      },
      redirectLoggedinUser: true

    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/navigation.html",
      controller: 'AppCtrl',
      access: {
        isProtected: true
      }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
        }
      },
      access: {
        isProtected: true
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      },
      access: {
        isProtected: true
      }
    })
    .state('app.menu', {
      url: "/menu",
      views: {
        'menuContent' :{
          templateUrl: "templates/menu.html",
          controller: 'MenuCtrl'
        }
      },
      access: {
        isProtected: true
      }
    })

  $urlRouterProvider.otherwise('/')
})
