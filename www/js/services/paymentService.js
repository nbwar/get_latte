'use strict'

angular.module('services.payment', [])

.factory('paymentService', function($http, $q) {
  Stripe.setPublishableKey('pk_test_Iz1I4zggLsglxkw7xAGhwJd9')

  var payment = {
    createToken: function(form) {
      Stripe.card.createToken(form, this.stripeResponseHandler)
    },
    stripeResponseHandler: function(status, response) {
      console.log(status)
      console.log(response)
    }


  }

  return payment
})
