document.addEventListener("DOMContentLoaded", function () {

  function getOrders(){
    return JSON.parse(localStorage.getItem("orders") || "[]");
  }

  function saveOrders(data){
    localStorage.setItem("orders", JSON.stringify(data));
  }

  let container = document.getElementById("orders-container");

  function renderOrders(){

    let orders = getOrders();

    container.innerHTML = "";

    if(!orders || orders.length === 0){
      container.innerHTML = "<p>No orders found</p>";
      return;
    }

    orders.forEach(function(order, index){

      let itemsHTML = "";

      if(order.items){
        order.items.forEach(item => {
          itemsHTML += `<li>${item.name} - $${item.price} x ${item.qty || 1}</li>`;
        });
      }

      let div = document.createElement("div");
      div.className = "order-card";

      div.innerHTML = `
        <h3>Order #${index + 1}</h3>

        <p><b>Name:</b> ${order.customer?.name || ""}</p>
        <p><b>Phone:</b> ${order.customer?.phone || ""}</p>
        <p><b>Email:</b> ${order.customer?.email || ""}</p>
        <p><b>Address:</b> ${order.customer?.address || ""}</p>

        <p><b>Payment:</b> ${order.payment?.method || "COD"}</p>
        <p><b>Number:</b> ${order.payment?.number || "N/A"}</p>

        <ul>${itemsHTML}</ul>

        <h4>Total: $${order.total || 0}</h4>
        <p><small>${order.date || ""}</small></p>

        <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      container.appendChild(div);

    });

    // attach delete events AFTER render
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function(){
        let index = this.getAttribute("data-index");

        let orders = getOrders();
        orders.splice(index, 1);

        saveOrders(orders);
        renderOrders();
      });
    });

  }

  // clear all orders button
  let clearBtn = document.createElement("button");
  clearBtn.innerText = "Clear All Orders";

  clearBtn.style.margin = "20px";
  clearBtn.style.padding = "10px";
  clearBtn.style.background = "red";
  clearBtn.style.color = "white";
  clearBtn.style.border = "none";
  clearBtn.style.cursor = "pointer";

  clearBtn.addEventListener("click", function(){
    
    renderOrders();
  });

  container.parentElement.insertBefore(clearBtn, container);

  renderOrders();

});