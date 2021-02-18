class Item {
    constructor(id, name, price, icon) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.icon = icon;
        Item.all.push(this)
    }
    static all = []
}

function fetchItems(){
    fetch(`https://brunch-madness.herokuapp.com/items`)
    .then(response => response.json())
    .then(res => loadItemData(res))
}

function loadItemData(itemsArray) {
    itemsArray.forEach(item => {
        new Item(id = item.id, name = item.name, price = item.price, icon = item.icon)
    })
}

function barItemsOrdered(formValues) {
    let barOrderItems = []
    for (i=0;i<formValues.length - 1;i++) {
        if (formValues[i].charAt(0) !== "0") {
            for (t=0;t<parseInt(formValues[i].charAt(0), 10);t++) {
                barOrderItems.push(Item.all.find(e => e.name === formValues[i].slice(1)))
                }
        }
    }
    return barOrderItems
}
