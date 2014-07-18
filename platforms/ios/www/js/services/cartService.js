'use strict'

angular.module('services.cart', [])

.factory('cartService', function() {
  var cart = {
    items: {},

    addItem: function(menuItem) {
      if (!this.items[menuItem.id]) {
        this.items[menuItem.id] = 0
      }
      this.items[menuItem.id] += 1
    },

    removeItem: function(menuItem) {
      if (!this.items[menuItem.id]) {
        this.items[menuItem.id] = 0
      }

      if (this.items[menuItem.id]) {
        this.items[menuItem.id] -= 1
      }
    },

    totalCost: function(menuItems) {
      return _.reduce(this.items, function(sum, count, id) {
        return sum += _.find(menuItems, {id: parseInt(id)}).price * count
      }, 0)
    },

    countForItem: function(menuItem) {
      return this.items[menuItem.id] || 0
    },

    hasItems: function() {
      return _.any(_.values(this.items))
    },

    clearCart: function() {
      this.items = {}
    },

    checkoutItems: function(menuItems) {
      var _self = this
      return _.reduce(menuItems, function(items, item) {
        var amount = _self.items[item.id]
        if (!amount) return items

        item.amount = amount
        return items.concat([item])
      }, [])
    },

    priceForItem: function(item) {
      return item.price * item.amount
    }
  }

  return cart
})
