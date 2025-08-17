// Shopping Cart API (адаптований для роботи без sessionStorage)
var shoppingCart = (function() {
  var cart = [];
  
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  var obj = {};
  
  obj.addItemToCart = function(name, price, count) {
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].name === name) {
        cart[i].count++;
        return;
      }
    }
    var item = new Item(name, price, count || 1);
    cart.push(item);
  }
  
  obj.setCountForItem = function(name, count) {
    for(var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  
  obj.removeItemFromCart = function(name) {
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].name === name) {
        cart[i].count--;
        if(cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
  }

  obj.removeItemFromCartAll = function(name) {
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
  }

  obj.clearCart = function() {
    cart = [];
  }

  obj.totalCount = function() {
    var totalCount = 0;
    for(var i = 0; i < cart.length; i++) {
      totalCount += cart[i].count;
    }
    return totalCount;
  }

  obj.totalCart = function() {
    var totalCart = 0;
    for(var i = 0; i < cart.length; i++) {
      totalCart += cart[i].price * cart[i].count;
    }
    return Number(totalCart.toFixed(2));
  }

  obj.listCart = function() {
    var cartCopy = [];
    for(var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var itemCopy = {};
      for(var p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  }

  return obj;
})();

// Event Handlers
$(document).ready(function() {
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
    
    // Show notification
    $(this).text('Додано!').addClass('btn-success').removeClass('add-to-cart');
    setTimeout(() => {
      $(this).text('Купити').removeClass('btn-success').addClass('add-to-cart');
    }, 1000);
  });

  // Clear items
  $('.clear-cart').click(function() {
    if(confirm('Ви впевнені, що хочете очистити кошик?')) {
      shoppingCart.clearCart();
      displayCart();
    }
  });

  // Delete item button
  $(document).on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });

  // -1
  $(document).on("click", ".minus-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
  });

  // +1
  $(document).on("click", ".plus-item", function(event) {
    var name = $(this).data('name');
    var price = $(this).data('price');
    shoppingCart.addItemToCart(name, price);
    displayCart();
  });

  // Item count input
  $(document).on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  
  if(cartArray.length === 0) {
    output = '<div class="empty-cart">Ваш кошик порожній 🛒</div>';
  } else {
    for(var i = 0; i < cartArray.length; i++) {
      output += `
        <div class="cart-item row align-items-center">
          <div class="col-md-4">
            <strong>${cartArray[i].name}</strong>
          </div>
          <div class="col-md-2 text-center">
            $${cartArray[i].price}
          </div>
          <div class="col-md-3">
            <div class="btn-group" role="group">
              <button class="btn btn-sm btn-outline-primary minus-item" data-name="${cartArray[i].name}" data-price="${cartArray[i].price}">-</button>
              <input type="number" class="form-control form-control-sm item-count" data-name="${cartArray[i].name}" value="${cartArray[i].count}" min="1" style="width: 60px; text-align: center;">
              <button class="btn btn-sm btn-outline-primary plus-item" data-name="${cartArray[i].name}" data-price="${cartArray[i].price}">+</button>
            </div>
          </div>
          <div class="col-md-2 text-center">
            <strong>$${cartArray[i].total}</strong>
          </div>
          <div class="col-md-1">
            <button class="btn btn-sm btn-danger delete-item" data-name="${cartArray[i].name}">×</button>
          </div>
        </div>
      `;
    }
  }
  
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}
