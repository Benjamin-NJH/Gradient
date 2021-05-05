const checkIfDigit = (evt) => {
    let priceString = evt.target.value
    let price = priceString.replace(/\,/g, "");
    let castFloatPrice = parseFloat(price);

    //Check if number is entered
    if (priceString !== "" && !Number.isFinite(castFloatPrice)) {
        alert("Please enter a number.");
    }
    // console.log(priceString.match(/(\d{1,3},?)+(\.\d{2}$)/g))
}

const calculateIndAmt = (qtyList, priceList, amountList) => {
    let amount = 0;
    for (let i = 0; i < priceList.length; i++) {
        amount = qtyList[i].value * priceList[i].value;
        if (!isNaN(amount)) {
            amountList[i].value = amount.toFixed(2);
        }
    }
    return
}

const calculateTotalAmt = (totalAmt, TaxRate, amountList) => {
    let totalAmount = 0;
    for (let i = 0; i < amountList.length; i++) {
        totalAmount = totalAmount + parseFloat(amountList[i].value);
    }
    if (TaxRate.value === "Standard-Rated") {
        totalAmount = totalAmount * 1.07;
    }
    if (!isNaN(totalAmount)) {
        return totalAmt.value = totalAmount.toFixed(2);
    }
}

function setGradient(tableMain, color1, color2) {
    tableMain.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
}

function submitInvoice() {
    fetch('http://localhost:3000/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formDetails) //converts from javascript to json
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

const getFormField = () => {
    let formList = document.querySelectorAll(".inv");
    for (eachNode of formList) {
        switch (eachNode.getAttribute('name')) {
            case "product":
                formDetails.Product = eachNode.value;
                break;
            case "productCategory":
                formDetails.ProductCategory = eachNode.value;
                break;
            case "vendor":
                formDetails.Vendor = eachNode.value;
                break;
            case "billTo":
                formDetails.BillTo = eachNode.value;
                break;
            case "shipTo":
                formDetails.ShipTo = eachNode.value;
                break;
            case "geography":
                formDetails.Geography = eachNode.value;
                break;
            case "country":
                formDetails.Country = eachNode.value;
                break;
            case "invoiceRef":
                formDetails.Invoice = eachNode.value;
                break;
            case "purchaseOrder":
                formDetails.PurchaseOrder = eachNode.value;
                break;
            case "serviceDate":
                formDetails.ServiceDate = eachNode.value;
                break;
            case "invoiceDate":
                formDetails.InvoiceDate = eachNode.value;
                break;
            case "quantity":
                if (eachNode.value !== '') {
                    formDetails.Quantity.push(eachNode.value);
                    break;
                }
            case "description":
                if (eachNode.value !== '') {    
                    formDetails.Description.push(eachNode.value);
                    break;
                }
            case "price":
                if (eachNode.value !== '') {
                    formDetails.UnitPrice.push(eachNode.value);
                    break;
                }
            case "amount":
                if (eachNode.value !== '' && eachNode.value !== '0.00') {
                    formDetails.Amount.push(eachNode.value);
                    break;
                }
            case "taxRate":
                formDetails.TaxRate = eachNode.value;
                break;
            case "totalAmount":
                formDetails.Total = eachNode.value;
                break;
            case "comments":
                formDetails.Comments = eachNode.value;
                break;
            case "submitter":
                formDetails.Submitter = eachNode.value;
                break;
            case "submittedDate":
                formDetails.SubmitOn = eachNode.value;
                break;
            case "acknowledgement":
                formDetails.Acknowledgement = eachNode.checked;
                break;
        }
    }
}

formDetails = {
    Product: '',
        ProductCategory: '',
        Vendor: '',
        BillTo: '',
        ShipTo: '',
        Geography: '',
        Country: '',
        Invoice: '',
        PurchaseOrder: '',
        ServiceDate: '',
        InvoiceDate: '',
        Quantity: [],
        Description: [],
        UnitPrice: [],
        Amount: [],
        TaxRate: '',
        Total: '',
        Comments: '',
        Submitter: '',
        SubmitOn: '',
        Acknowledgement: ''
}

const clearTheForm = () => {
    let formList = document.querySelectorAll(".inv");
    for (eachNode of formList) {
        switch (eachNode.getAttribute('name')) {
            case "acknowledgement":
                eachNode.checked = false;
                break;
            default:
                eachNode.value = '';
        }
    }
}

window.onload = function() {
    let priceAmt = document.querySelectorAll(".s4PnA");
    let submissionDate = document.getElementById("SubmitDate");
    let currentDate = new Date().toISOString().substr(0, 10);

    //check Unit Price and Amount if entered correctly
    for (eachNode of priceAmt) {
        eachNode.addEventListener("input", checkIfDigit)
    }

    //auto-populate submission date
    submissionDate.value = currentDate;

    //calculate individual and total amount
    let totalAmt = document.querySelector("#TotalAmount");
    let TaxRate = document.querySelector("#TaxRate");
    let amountList = document.querySelectorAll(".s4A");
    let priceList = document.querySelectorAll(".s4P");
    let qtyList = document.querySelectorAll(".s4Q");

    document.addEventListener("input", () => {
        calculateIndAmt(qtyList, priceList, amountList);
        calculateTotalAmt(totalAmt, TaxRate, amountList);
    })

    //color form with gradient
    let tableMain = document.querySelector("#main");
    let color1 = document.querySelector(".color1");
    let color2 = document.querySelector(".color2");
    let btnGradient = document.querySelector("#btnGradient");
    btnGradient.addEventListener("click", () => {
        setGradient(tableMain, color1, color2);
    })

    //submit form
    let submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', () => {
        getFormField();
        submitInvoice();
        clearTheForm();
    })

    //clear form
    let clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', () => {
        clearTheForm();
    })

}
