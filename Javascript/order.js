class Order {
    constructor(table, customer) {
        this.table = table;
        this.customer = customer.id;
        this.items = []
        this.displayItems
        Order.all.push(this)
    }
    displayItems() {
        let uniqNames = [...new Set(this.items)]
        let displayOrderContent = ""
        uniqNames.forEach(item => {
            let count = this.items.filter(orderItem => orderItem === item).length
            displayOrderContent += `${count} ${item.name}, `
        })
          return displayOrderContent.split(",").splice(0, displayOrderContent.split(",").length - 1)
    }
    static tableLastOrder(table) {
        let tableOrders1 = Order.all.filter(e => e.table === table)
        return tableOrders1[tableOrders1.length - 1]
    }
    static all = []
}
let orderInterval

function displayOrder(order) {
    Swal.fire(`${Customer.all.find(e => e.id === order.customer).name}'s Order`,
    `${printOrderContent(order)}`)
}

function printOrderContent(order) {
    let string = ""
    for(i = 0; i < order.displayItems().length; i ++) {
        string += ((order.displayItems()[i] + "<br>"))}
    return string
}

function compareOrders(firstItems, secondItems) {
    let compareArray = []
    firstItems.forEach((item, index) => {
        if (item === secondItems[index]) {
            compareArray.push("true")
        } 
        if (item !== secondItems[index]) {
        compareArray.push("false")
        }
    })
    return compareArray
}

function orderFulfilledCountdown(tableContent, table) {
    let timesRun = 0;
    orderInterval = setInterval(function(){
        timesRun += 1;
        if (timesRun === 1 && tableContent.innerText === "🤗") {
            tableContent.innerText = "😬"
        }
        if (timesRun === 2 && tableContent.innerText === "😬") {
            tableContent.innerText = "🙄"
        }
        if (timesRun === 3 && tableContent.innerText === "🙄") {
            tableContent.innerText = "😡"
        }
        if (timesRun === 4 && tableContent.innerText === "😡"){
            tableContent.innerText = "🤬"
        }
        if (timesRun === 5 && tableContent.innerText === "🤬") {
            clearInterval(orderInterval)
            Swal.fire({
                icon: "error",
                title: "Ooops",
                text: `You have neglected table #${table} for too long!`})
                addMistakes()
        }
    }
, 12000)
}

function displayOrderToTable(thisTableOrder, tableOrderFilled) {
    let emojiOrder = ""
    if (thisTableOrder.items.length === 1) {
      addTips()
      tableOrderFilled.innerText = thisTableOrder.items[0].icon
    } else {
      if (thisTableOrder.items.length > 6) {
        emojiOrder += `${thisTableOrder.items[0].icon}${thisTableOrder.items[1].icon}${thisTableOrder.items[2].icon}${thisTableOrder.items[3].icon}${thisTableOrder.items[4].icon}${thisTableOrder.items[5].icon}`
        tableOrderFilled.innerText = emojiOrder
    } else {
        thisTableOrder.items.forEach(item => emojiOrder += `${item.icon}`)
        tableOrderFilled.innerText = emojiOrder 
      }
      let tablesServed
      let tipsEarned 
      addTips()
    }
  }
