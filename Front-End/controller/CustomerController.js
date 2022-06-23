function loadAllCustomers() {

 $("#customerTable ").empty();

    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "get",
        success(resp) {

            for (const respElement of resp.data) {
                $("#customerTable").append("<tr>" + "<td>" + respElement.custId + "</td>" + "<td>" + respElement.custName + "</td>" + "<td>" + respElement.address + "</td>" + "<td>" + respElement.salary + "</td>" + "</tr>");

            }
            bindClickEvents();
        }
    });

}


function saveCustomer() {

    var data = $("#Customer-Form").serialize();

    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "post",
        data: data,
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else {
                alert(res.data);

                loadAllCustomers();
            }

        },
    })
    clearAll();

}

function deleteCustomer(id) {
    if (id != null) {
        $.ajax({
            url: "http://localhost:8080/POS/customer?customerID=" + id,
            method: "DELETE",
            success(resp) {
                if (resp.status == 200) {
                    alert(resp.message);
                    loadAllCustomers();
                    clearAll();
                } else if (resp.status == 400) {
                    alert(resp.message);
                } else {
                    alert(resp.data);
                }
            }
        });
        return true;
    } else {
        return false;
    }
}

$("#btnCusDelete").click(function () {
    let id = $('#inputSearchCus').val();
    let option = confirm(`Do you want to delete ID:${id}`);
    if (option) {
        deleteCustomer(id);
    }
    $("#customerTable ").empty();
});

$("#btnCusUpdate").click(function () {
    updateCustomer();
    clearAll();
    loadAllCustomers();
});

function updateCustomer() {

    let formData = $("#Customer-update-Form").serialize();
    $.ajax({
        url: "http://localhost:8080/POS/customer?" + formData,
        method: "PUT",
        success: function (resp) {

            alert(resp.message);
            loadAllCustomers();
        }
    });
}

function bindClickEvents() {
    $("#customerTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();


        $("#inputUId").val(id);
        $("#inputUCustomerName").val(name);
        $("#inputUAddress").val(address);
        $("#inputUSalary").val(salary);
        $("#inputSearchCus").val(id);
    });
}

function searchCustomer() {

    if ($('#inputSearchCus').val() == '') {
        loadAllCustomers();
    } else {
        $("#customerTable").empty()
        let cus;
        for (var i = 0; i < customerDB.length; i++) {
            if ($('#inputSearchCus').val() == customerDB[i].getCustomerID()) {
                cus = customerDB[i];
                let row = `<tr><td>${cus.getCustomerID()}</td><td>${cus.getCustomerName()}</td><td>${cus.getCustomerAddress()}</td><td>${cus.getCustomerSalary()}</td></tr>`;
                $("#customerTable").append(row);
            }
        }
    }
}

function searchCustomerFromID(typedCustomerID) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

$("#btnCusSave").click(function () {

    saveCustomer();
    clearAll();

});


$("#btnCusSearch").click(function () {
    searchCustomer();
});

$("#btnGetAllCus").click(function () {
    loadAllCustomers();
    $('#inputSearchCus').val("");
});


const cusIDRegEx = /^(C)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('blur', function () {
    formValid();
});


$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCusID").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCusID").val(srcCustomer.getCustomerID());
        $("#txtCusName").val(srcCustomer.getCustomerName());
        $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCusSalary").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnCusSave").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary,#inputUId,#inputUAddress,#inputUCustomerName,#inputUSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnCustomer").attr('disabled', true);

    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    $("#btnCusSave").attr('disabled', true);

}

function formValid() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCusSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtCusSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCusSalary").focus();
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCusSalary").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnCusSave").attr('disabled', false);
    } else {
        $("#btnCusSave").attr('disabled', true);
    }
}

$('#btnCustomer').click(function () {
    checkIfValid();
    loadAllCustomers();
});

