function CustomerDTO(id,name,address,salary) {
    var id=id;
    var name=name;
    var address=address;
    var salary=salary;

    this.getCustomerID=function () {
        return id;
    }
    this.setCustomerID=function (idPara) {
        id=idPara;
    }
    this.getCustomerName=function () {
        return name;
    }
    this.setCustomerName=function (namePara) {
        name=namePara;
    }
    this.getCustomerAddress=function () {
        return address;
    }
    this.setCustomerAddress=function (addressPara) {
        address=addressPara;
    }
    this.getCustomerSalary=function () {
        return salary;
    }
    this.setCustomeSalary=function (salaryPara) {
        salary=salaryPara;
    }
}