function loadAllCustomers() {

    $("#customerTable ").empty();

    $.ajax({
        url: "http://localhost:8080/POS/customer", method: "get", success(resp) {

            for (const respElement of resp.data) {
                $("#customerTable").append("<tr>" + "<td>" + respElement.custId + "</td>" + "<td>" + respElement.custName + "</td>" + "<td>" + respElement.address + "</td>" + "<td>" + respElement.salary + "</td>" + "</tr>");
            }
        }
    })
}

function saveCustomer() {

    var data = $("#Customer-Form").serialize();

    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "post",
        data: data,
        success(res) {
            alert("success");
            $("#txtCusID").val("");
            $("#txtCusName").val("");
            $("#txtCusAddress").val("");
            $("#txtCusSalary").val("");
            loadAllCustomers();
        },
        error(res) {
            alert("Fail");
        }
    })



}

function deleteCustomer(id) {
    let customer;
    if (id != null) {
        for (var i = 0; i < customerDB.length; i++) {
            if (id == customerDB[i].getCustomerID()) {
                customer = customerDB[i];
            }
        }
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function updateCustomer() {
    var data = $("#Customer-update-Form").serialize();
    var cusObject ={
        "id":$("#inputUId").val(),
        "name":$("#inputUCustomerName").val(),
        "address":$("#inputUAddress").val(),
        "salary":$("#inputUSalary").val()
    }
    $.ajax({

        url:"http://localhost:8080/POS/customer",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(cusObject),
        success(resp){
            if(resp.status==200){
                loadAllCustomers();
                alert(resp.message);
            }else {
                alert(resp.data);

            }
        }
    });
}

function searchCustomer() {

    if($('#inputSearchCus').val() == ''){
        loadAllCustomers();
    }else {
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
    loadAllCustomers();

});

$("#btnCusDelete").click(function () {
    let id = $('#inputSearchCus').val();
    let option = confirm(`Do you want to delete ID:${id}`);
    if (option) {
        let erase = deleteCustomer(id);
        if (erase) {
            alert("Customer Deleted");
            $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').val("");
        } else {
            alert("Delete Failed , Try again");
        }
    }

    loadAllCustomers();
    $('#inputSearchCus').val("");
});

$("#btnCusUpdate").click(function () {
    updateCustomer();
    loadAllCustomers();
    $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').val("");
});

$("#btnCusSearch").click(function () {
    searchCustomer();
});

$("#btnGetAllCus").click(function () {
    loadAllCustomers();
    $('#inputSearchCus').val("");
});


const cusIDRegEx = /^(C0-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
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


$("#btnCustomer").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
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
        $("#btnCustomer").attr('disabled', false);
    } else {
        $("#btnCustomer").attr('disabled', true);
    }
}

$('#btnCustomer').click(function () {
    checkIfValid();
    loadAllCustomers();
});

