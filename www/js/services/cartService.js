'use strict'

angular.module('services.cart', [])

.factory('cartService', function() {
  function Cart() {
    this.items = {}
  }

  Cart.prototype.addItem = function(menuItem) {
    if (!this.items[menuItem.id]) {
      this.items[menuItem.id] = 0
    }
    this.items[menuItem.id] += 1
  }

  Cart.prototype.removeItem = function(menuItem) {
    if (!this.items[menuItem.id]) {
      this.items[menuItem.id] = 0
    }

    if (this.items[menuItem.id]) {
      this.items[menuItem.id] -= 1
    }
  }

  Cart.prototype.totalCost = function(menuItems) {
    return _.reduce(this.items, function(sum, count, id) {
      return sum += _.find(menuItems, {id: parseInt(id)}).price * count
    }, 0)
  }

  Cart.prototype.countForItem = function(menuItem) {
    return this.items[menuItem.id] || 0
  }

  Cart.prototype.hasItems = function() {
    return _.any(_.values(this.items))
  }

  Cart.prototype.clearCart = function() {
    this.items = {}
  }

  Cart.prototype.checkoutItems = function(menuItems) {
    var self = this
    return _.reduce(menuItems, function(items, item) {
      var amount = self.items[item.id]
      if (!amount) return items

      item.amount = amount
      return items.concat([item])
    }, [])
  }

  Cart.prototype.priceForItem = function(item) {
    return item.price * item.amount
  }

  var cart = new Cart()
  return {
    cart: cart
  }
})
