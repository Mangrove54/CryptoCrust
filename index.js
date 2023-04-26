import { menuArray } from './data.js'// javascript
const menu = document.getElementById("menu")
const complete = document.getElementById("comp-order")
const modal = document.getElementById("modal")
let mybutton = document.getElementById("myBtn");
const orderCont = document.getElementById("order-box")
const order = document.getElementById("order");
let addedOrderItems = [];
function addMenu() {
  let menuHtml = ``
  menuArray.forEach(function (menu) {
    menuHtml += `
        <div class="menu-container"> 
        <img class="item-img" src="${menu.picture}"/> 
                    <div class="menu-item-description">
                        <div class="menu-item-name"> ${menu.name} </div>
                        <div class="menu-item-ingredients"> [${menu.ingredients}] </div>
                        <div class="menu-item-description"> ${menu.description} </div>
                        <div class="menu-item-price"> $${menu.price} </div>  
                    </div> 
                    <div class="button-con">
                    <button class="item-add" data-add-id="${menu.id}"><img class="add-img" src="images/add.png"/></button>
                    <button class="item-remove" data-remove-id="${menu.id}"><img class="remove-img" src="images/remove.png"/></button>
                    </div>
                    
        </div>
        
            <div class="menu-item-container-divider"> </div>`
      ;
  });
  return menuHtml;
}
menu.innerHTML = addMenu();
mybutton.addEventListener("click", topFunction)
function topFunction() {
  if (document.body.scrollTop !== undefined) {
    document.body.scrollTop = 0;
  }
  if (document.documentElement.scrollTop !== undefined) {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

function getOrderHtml() {
  const orderList = document.getElementById("order-box");
  let orderHtml = ``;

  addedOrderItems.forEach(function (order) {
    orderHtml += `
                        <div class="menu-item-description order-item">   
                            <div class="menu-item-name order-name"> ${order.name} </div>
                            <div class="menu-item-name remove" data-remove-id="${order.id}"> remove </div>
                            <div class="menu-item-price order-price">$${order.price}</div>
                        </div>
                    `;
  });

  orderList.innerHTML = orderHtml;
  getOrderTotalPrice();
  hideOrder();
}

document.addEventListener("click", function (e) {

  if (e.target.parentElement.dataset.addId) {
    handleAddItem(e.target.parentElement.dataset.addId)
  }
  else if (e.target.parentElement.dataset.removeId) {
    removeOrderItem(e.target.parentElement.dataset.removeId)
  }
  
  else if (e.target.dataset.removeId) {
    removeOrderItem(e.target.dataset.removeId)
  }
  else if (e.target.parentElement.dataset.complete) {
    modal.classList.toggle("hidden");
  }

})

function handleAddItem(menuId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return Number(menu.id) === Number(menuId);
  })[0];
  // addedOrderItems.forEach(element => {
  //   if(element.id === )
  // });
  addedOrderItems.push(targetMenuObj);
  getOrderHtml();
}

function removeOrderItem(orderItemId) {
  for (let i = 0; i < addedOrderItems.length; i++) {
    if (Number(addedOrderItems[i].id) === Number(orderItemId)) {
      addedOrderItems.splice(i, 1);
      break;
    }
  }
  getOrderHtml();
}
function hideOrder() {
  if (addedOrderItems.length > 0) {
    if (order.classList.contains("hidden")) order.classList.remove("hidden");
  } else {
    order.classList.add("hidden");
  }
}

function getOrderTotalPrice() {
  const totalPrice = addedOrderItems.reduce((sum, item) => sum + item.price, 0);
  const totalElement = document.getElementById("total");
  totalElement.innerHTML = totalPrice;
}

const paymentForm = document.getElementById("payment-form");
const thankYou = document.getElementById("thank-you");

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("fullName");
  thankYou.innerHTML = `Thanks, ${name} Your order is on its way! `;

  removeOrderPayThankYou();
});

function removeOrderPayThankYou() {
  order.classList.toggle("hidden");
  thankYou.classList.remove("hidden");
  modal.classList.toggle("hidden");
  addedOrderItems.length = 0;
  paymentForm.reset();
  const myTimeout = setTimeout(removeThankYou, 5000);
}

function removeThankYou() {
  thankYou.classList.add("hidden");
}