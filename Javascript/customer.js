class Customer {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        Customer.all.push(this)
    }
    static all = []
}

function fetchCustomers(){
    fetch(`https://brunch-madness.herokuapp.com/customers`)
    .then(response => response.json())
    .then(res => loadCustomerData(res))
}

function loadCustomerData(customersArray) {
    customersArray.forEach(customer => {
        new Customer( name = customer.name, id = customer.id)
    })
}
function numberOfOrderItems() {
    if (parseInt(document.getElementById('min').innerText) > 8) {
        return 10
    }
    if (parseInt(document.getElementById('min').innerText) > 6) {
        return 9
    }
    if (parseInt(document.getElementById('min').innerText) > 4) {
        return 8
    }
    if (parseInt(document.getElementById('min').innerText) > 2) {
        return 7
    }
    if (parseInt(document.getElementById('min').innerText) > 1) {
        return 6
    } else {
        return 3
    }
}

function customerOrder(table, customer) {
    numberOfItems = Math.floor(Math.random() * numberOfOrderItems())
    let order = new Order(table = table, customer = customer)
    for (i = 0; i <= numberOfItems; i++) {
        order.items.push(Item.all[Math.floor(Math.random() * 9)])
    }
    let tableContent = document.getElementById(`table-${table}-content`).firstChild
    tableContent.innerText = "🤗"
    sound_effect.src = "new_order.wav"
    sound_effect.load()
    sound_effect.play()
    orderFulfilledCountdown(tableContent, table) 
}

function orderMoreorRequestCheck(tableText) {
    let customer1 = Customer.all.find(e => e.name === tableText.innerText)
    let completedOrders = Table.all[table - 1].orders
    if (completedOrders.length >= 1) {
        let chance = Math.ceil(Math.random() * 2)
        if (chance === 1) {
           customerOrder(table, customer1) 
        }
        if (chance === 2) {
            let tableContent = document.getElementById(`table-${table}-content`).firstChild
            tableContent.innerText = "✍️"
            sound_effect.src = "check_please.wav"
            sound_effect.load()
            sound_effect.play()
            setTimeout(function() {
              if (tableContent.innerText === "✍️") {
                Swal.fire({
                  icon: "error",
                  text: `Ooops! You didn't deliver the check to table #${table} fast enough!`
              })
              addMistakes()
              }
            }, 40000)
        }
    }
  }
  
  function selectCustomer() {
      let customer = Customer.all[Math.floor(Math.random() * Customer.all.length)]
      return customer
  }

  function payWithCashOrCard(tableContent, checkTable) {
    let chance = Math.ceil(Math.random() * 2)
    if (chance === 1) {
      tableContent.innerText = "💳"
      sound_effect.src = "money.wav"
      sound_effect.load()
      sound_effect.play()
    }
    if (chance === 2) {
      tableContent.innerText = "💵"
      sound_effect.src = "money.wav"
      sound_effect.load()
      sound_effect.play()
    }
    setTimeout(function() {
      if (tableContent.innerText === "💵" || tableContent.innerText === "💳") {
        Swal.fire({
          icon: "error",
          text: `Ooops! You didn't close out table #${checkTable.number} fast enough!`
      })
      addMistakes()
      }
    }, 40000)
  }

