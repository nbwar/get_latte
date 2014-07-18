'use strict'

angular.module('getLatte.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, sessionService, userService, facebookService) {
  $ionicModal.fromTemplateUrl('templates/login_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.loginModal = modal
  })

  $ionicModal.fromTemplateUrl('templates/registration_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.registrationModal = modal
  })

  $scope.openLoginModal = function() {
    $scope.loginModal.show()
  }

  $scope.closeLoginModal = function() {
    $scope.loginModal.hide()
  }

  $scope.openRegistrationModal = function() {
    $scope.registrationModal.show()
  }

  $scope.closeRegistrationModal = function() {
    $scope.registrationModal.hide()
  }

  // $scope.connectWithFacebook = function() {
  //   facebookService.login()
  // }

  $scope.login = function(user) {
    $state.go('app.menu')
    // sessionService.login(user)
    // .then(function() {
    //   $scope.loginModal.hide()
    //   $state.go('app.menu')
    // }, function(error) {
    //   userService.resetUser()
    // })
  }

  $scope.register = function(user) {
    sessionService.register(user)
    .then(function() {
      $scope.registrationModal.hide()
      $state.go('app.menu')
    }, function(error) {
      userService.resetUser()
    })
    //   $state.go('app.menu')
  }
})

.controller('AppCtrl', function($scope, $state, sessionService) {
  $scope.logout = function() {
    sessionService.logout()
    $state.go('home')
  }
})

.controller('LoginCtrl', function($scope, $state, sessionService, userService) {
  $scope.login = function(user) {
    //   $state.go('app.menu')
    sessionService.login(user)
    .then(function() {
      userService.isLoggedIn = true
      $state.go('app.menu')
    }, function(error) {
      userService.resetUser()
    })
  }

})

.controller('MenuCtrl', function($scope, $rootScope, $ionicModal, cartService, paymentService) {
  $scope.cart = cartService
  $scope.card = {}

  $rootScope.menuItems = [
    { id: 1, name: 'Latte', price: 5, image: 'latte.png', description: 'Hand crafts beans with a smooth creme flavor. Made by Martin Wallner'},
    { id: 2, name: 'Espresso', price: 3, image: 'espresso.png', description: 'Need that extra boost? Order a few espresso shots to kick your ass in to high gear'},
    { id: 3, name: 'Pastries', price: 3, image: 'pastries.png', description: 'Hey fatty! Yes you! Eat some cake'}
  ]

  $ionicModal.fromTemplateUrl('templates/checkout_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide()
  }

  $scope.toggleOverlay = function($event, item) {
    $event.stopPropagation()
    item.overlayVisible = !item.overlayVisible
  }


  $scope.adjustOrderCount = function(item, amount){
    if (amount > 0)
      cartService.addItem(item)
    else
      cartService.removeItem(item)
  }


  $scope.confirmOrder = function(menuItems) {
    // send CartService.checkoutItems  to server

    // on callback
      // show success and then :
    console.log($scope.card)
    cartService.clearCart()

    paymentService.createToken(document.getElementById('stripe_form'))

    // $scope.modal.hide()


    // or show error
  }
})

.controller('MenuItemCtrl', function($scope, $stateParams) {
})


.controller('SettingsCtrl', function($scope) {
})


