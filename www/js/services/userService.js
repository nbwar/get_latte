'use strict'

angular.module('services.user', [])

.factory('userService', function($http, $q) {
  var user = {
    firstName: '',
    lastName: '',
    email: '',
    isLoggedIn: false,
    addresses: [],
    phone: '',
    card: {},
    stripeId,

    resetUser: function() {
      this.firstName = ''
      this.lastname = ''
      this.email = ''
      this.isLoggedIn = false
      this.address = []
      this.phone = ''
      this.card = {}
      this.stripeId = ''
    },

    setUser: function(user) {
      this.firstName = user.first_name
      this.lastName = user.last_name
      this.email = user.email
      this.isLoggedIn = true
      this.addresses = user.addresses
      this.phone = user.phone
      this.card = user.card
      this.stripeId = user.stripe_id
    },

    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }
  }

  return user
})
