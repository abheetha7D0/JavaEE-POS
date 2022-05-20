function ItemDTO(itemCode, itemName, itemQTY, unitPrice) {

    var itemCode = itemCode;
    var itemName = itemName;
    var itemQty = itemQTY;
    var unitPrice = unitPrice;

    this.getItemCode = function () {
        return itemCode;
    }
    this.setItemCode = function (code) {
        itemCode = code;
    }
    this.getItemName = function () {
        return itemName;
    }
    this.setItemName = function (name) {
        itemName = name;
    }
    this.getItemQTY = function () {
        return itemQty;
    }
    this.setItemQTY = function (qty) {
        itemQty = qty;
    }
    this.getUnitPrice = function () {
        return unitPrice;
    }
    this.setUnitPrice = function (price) {
        unitPrice = price;
    }
}