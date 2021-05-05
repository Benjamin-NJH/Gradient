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
            amountList[i].textContent = amount.toFixed(2);
        }
    }
    return
}

const calculateTotalAmt = (totalAmt, TaxRate, amountList) => {
    let totalAmount = 0;
    for (let i = 0; i < amountList.length; i++) {
        totalAmount = totalAmount + parseFloat(amountList[i].textContent);
    }
    if (TaxRate.value === "Standard-Rated") {
        totalAmount = (totalAmount * 1.07).toFixed(2);
    }
    if (!isNaN(totalAmount)) {
        return totalAmt.textContent = totalAmount;
    }
}

function setGradient(tableMain, color1, color2) {
    tableMain.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
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

}
