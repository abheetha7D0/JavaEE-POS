loadAllItems()

function loadAllItems() {

    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/POS/item",
        method: "GET",
        success(resp) {
            console.log(resp.data);
            for (var i of resp.data) {
                var row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.unitPrice}</td></tr>`;

                $("#itemTable").append(row);


                $("#itemTable>tr").click(function () {


                    $("#btnSearchItem").val($(this).children(":eq(0)").text());
                    $("#inputUCode").val($(this).children(":eq(0)").text());
                    $("#inputUName").val($(this).children(":eq(1)").text());
                    $("#inputUPrice").val($(this).children(":eq(2)").text());
                    $("#inputUQuantity").val($(this).children(":eq(3)").text());


                });
            }
        }
    });
}

function saveItem() {
    var data = $("#itemForm").serialize();


    $.ajax({
        url: "http://localhost:8080/POS/item",
        method: "POST",
        data: data,
        success(res) {
            if (res.status == 200) {
                alert(res.data);
                loadAllItems();


            } else {
                alert(res.data);
            }
        },

    });
}

function deleteItem(code) {
    if (code != null) {
        $.ajax({
            url: "http://localhost:8080/POS/item?itemCode=" + code,
            method: "DELETE",
            success(resp) {
                if (resp.status == 200) {
                    alert(resp.message);
                    loadAllItems()
                    clearAll();
                } else if (resp.status == 400) {
                    alert(resp.message);
                    return false;

                } else {
                    alert(resp.data);
                    return false;
                }
            }
        });
        return true;
    } else {
        return false;
    }
}

$("#btnItemDelete").click(function () {
    let code = $('#btnSearchItem').val();
    let option = confirm(`Do you want to delete ID:${code}`);
    if (option) {
        deleteItem(code);

        $('#btnSearchItem').val("");

    }

    $("#itemTable").empty();
});

function updateItem() {
    let formData = $("#itemUpdateForm").serialize();
    $.ajax({
        url: "http://localhost:8080/POS/item?" + formData,
        method: "PUT",
        success: function (resp) {
            if (resp.status == 200) {
                alert(resp.message);
                loadAllItems();
            } else {
                alert(resp.data);
            }
        }


    });
}

function searchItem() {

    $("#itemTable").empty()
    let item;
    for (var i = 0; i < itemDB.length; i++) {
        if ($('#btnSearchItem').val() == itemDB[i].getItemCode()) {
            item = itemDB[i];
            let row = `<tr><td>${item.getItemCode()}</td><td>${item.getItemName()}</td><td>${item.getItemQTY()}</td><td>${item.getUnitPrice()}</td></tr>`;
            $("#itemTable").append(row);
        }
    }
}

$("#btnItemSave").click(function () {

    saveItem();
    loadAllItems();
    $("#inputCode,#inputItemName,#inputPrice,#inputQuantity").val("");
});


$("#btnItemUpdate").click(function () {
    updateItem();
    loadAllItems();
    $('#inputCode,#inputName,#inputPrice,#inputQuantity').val("");
});

$("#btnSearchItem").click(function () {
    searchItem();
});

$("#btnGetAllItem").click(function () {
    loadAllItems();
    $('#btnSearchItem').val("");
});


const ItemCodeRegEx = /^(I)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const qtyRegEx = /^[0-9]{1,}$/;
const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#inputCode,#inputItemName,#inputPrice,#inputQuantity').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#inputCode,#inputItemName,#inputPrice,#inputQuantity').on('blur', function () {
    formValidItem();
});

//focusing events
$("#inputCode").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#inputItemName").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#inputPrice").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#inputQuantity").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});
// focusing events end
$("#btnItemSave").attr('disabled', true);

function clearAllItem() {
    $('#inputCode,#inputItemName,#inputPrice,#inputQuantity').val("");
    $('#inputCode,#inputItemName,#inputPrice,#inputQuantity').css('border', '2px solid #ced4da');
    $('#inputCode').focus();
    $("#btnItemSave").attr('disabled', true);
    loadAllItems();
    $("#inputCode,#inputItemName,#inputPrice,#inputQuantity").text("");
}

function formValidItem() {
    var itemCode = $("#inputCode").val();
    $("#inputCode").css('border', '2px solid green');
    $("#ItemCodeError").text("");
    if (ItemCodeRegEx.test(itemCode)) {
        var itemName = $("#inputItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#inputItemName").css('border', '2px solid green');
            $("#ItemNameError").text("");
            var qty = $("#inputQuantity").val();
            if (qtyRegEx.test(qty)) {
                var price = $("#inputPrice").val();
                var resp = priceRegEx.test(price);
                $("#inputQuantity").css('border', '2px solid green');
                $("#ItemQTYError").text("");
                if (resp) {
                    $("#inputPrice").css('border', '2px solid green');
                    $("#ItemPriceError").text("");
                    return true;
                } else {
                    $("#inputPrice").css('border', '2px solid red');
                    $("#ItemPriceError").text("Item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#inputQuantity").css('border', '2px solid red');
                $("#ItemQTYError").text("Item Qty is a required field : Only Number");
                return false;
            }
        } else {
            $("#inputItemName").css('border', '2px solid red');
            $("#ItemNameError").text("Item Name is a required field : Mimimum 2, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#inputCode").css('border', '2px solid red');
        $("#ItemCodeError").text("Item Code is a required field : Pattern I000");

        return false;
    }
}

function checkIfValidItem() {
    var itemCode = $("#inputCode").val();
    if (ItemCodeRegEx.test(itemCode)) {
        $("#inputItemName").focus();
        var ItemName = $("#inputItemName").val();
        if (itemNameRegEx.test(ItemName)) {
            $("#inputQuantity").focus();
            var qty = $("#inputQuantity").val();
            if (qtyRegEx.test(qty)) {
                $("#inputPrice").focus();
                var price = $("#inputPrice").val();
                var resp = priceRegEx.test(price);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveItem();
                        clearAllItem();
                    }
                } else {
                    $("#inputPrice").focus();
                }
            } else {
                $("#inputQuantity").focus();
            }
        } else {
            $("#inputItemName").focus();
        }
    } else {
        $("#inputCode").focus();
    }
}

function setButtonItem() {
    let b = formValidItem();
    if (b) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}

$('#btnItemSave').click(function () {
    checkIfValidItem();
});

