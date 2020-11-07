console.clear();
if(document.querySelectorAll('div[id="payInfoDiv"]')[0] == null){
    var payInfoDiv = document.createElement("div");
    var payInfoTable = document.createElement("table");
    var totalBalanceRow = payInfoTable.insertRow();
    var totalBalanceTitle = totalBalanceRow.insertCell(-1);
    var totalBalanceValue = totalBalanceRow.insertCell(-1);
    var nonPromoBalanceRow = payInfoTable.insertRow();
    var nonPromoBalanceTitle = nonPromoBalanceRow.insertCell(-1);
    var nonPromoBalanceValue = nonPromoBalanceRow.insertCell(-1);
    var promoBalanceRow = payInfoTable.insertRow();
    var promoBalanceTitle = promoBalanceRow.insertCell(-1);
    var promoBalanceValue = promoBalanceRow.insertCell(-1);
    var promoMinPmtRow = payInfoTable.insertRow();
    var promoMinPmtTitle = promoMinPmtRow.insertCell(-1);
    var promoMinPmtValue = promoMinPmtRow.insertCell(-1);
    var calcPaymentRow = payInfoTable.insertRow();
    var calcPaymentTitle = calcPaymentRow.insertCell(-1);
    var calcPaymentValue = calcPaymentRow.insertCell(-1);    
    var safePaymentRow = payInfoTable.insertRow();
    var safePaymentTitle = safePaymentRow.insertCell(-1);
    var safePaymentValue = safePaymentRow.insertCell(-1);
    payInfoTable.id = "payInfoTable";
    totalBalanceRow.id = "payInfoTableTotalBalanceRow";
    nonPromoBalanceRow.id = "payInfoTableNonPromoBalanceRow";
    promoBalanceRow.id = "payInfoTablePromoBalanceRow";
    promoMinPmtRow.id = "payInfoPromoMinPmtRow";
    calcPaymentRow.id = "payInfoCalcPaymentRow";
    safePaymentRow.id = "payInfoSafePaymentRow";
    totalBalanceValue.id = "payInfoTotalBalanceValue";
    nonPromoBalanceValue.id = "payInfoNonPromoBalanceValue";
    promoBalanceValue.id = "payInfoPromoBalanceValue";
    promoMinPmtValue.id = "payInfoPromoMinPmtValue";
    calcPaymentValue.id = "payInfoCalcPaymentValue";
    safePaymentValue.id = "payInfoSafePaymentValue";
    totalBalanceTitle.innerText = "Total Bal:";
    totalBalanceTitle.style.padding = "10px";
    totalBalanceTitle.style.textAlign = "right";
    totalBalanceValue.style.padding = "10px";
    nonPromoBalanceTitle.innerText = "Non-Promo Bal:";
    nonPromoBalanceTitle.style.padding = "10px";
    nonPromoBalanceTitle.style.textAlign = "right";
    nonPromoBalanceValue.style.padding = "10px";
    promoBalanceTitle.innerText = "Promo Bal:";
    promoBalanceTitle.style.padding = "10px";
    promoBalanceTitle.style.textAlign = "right";
    promoBalanceValue.style.padding = "10px";
    promoMinPmtTitle.innerText = "Promo Min Pmt:";
    promoMinPmtTitle.style.padding = "10px";
    promoMinPmtTitle.style.textAlign = "right";
    promoMinPmtValue.style.padding = "10px";
    calcPaymentTitle.innerText = "Calc. Pmt Amt:";
    calcPaymentTitle.style.padding = "10px";
    calcPaymentTitle.style.textAlign = "right";
    calcPaymentValue.style.padding = "10px";
    safePaymentTitle.innerText = "Safe Pmt Amt:";
    safePaymentTitle.style.padding = "10px";
    safePaymentTitle.style.textAlign = "right";
    safePaymentValue.style.padding = "10px";
    payInfoDiv.id = "payInfoDiv";
    payInfoDiv.style.position = "absolute";
    payInfoDiv.style.display = "block";
    payInfoDiv.style.top = "1%";
    payInfoDiv.style.left = "0.5%";
    payInfoDiv.style.margin = "1px 1px 1px 1px";
    payInfoDiv.style.padding = "7px 7px 7px 7px"; 
    payInfoDiv.style.border = "10px groove darkgreen";
    payInfoDiv.style.fontSize = "x-large";
    payInfoDiv.style.fontWeight = "600";
    payInfoDiv.style.backgroundColor = "lightblue";
    payInfoDiv.style.opacity = "1.0";
    document.body.append(payInfoDiv);
    payInfoDiv.append(payInfoTable);
    payInfoDiv.style.minWidth = window.getComputedStyle(payInfoDiv, null).getPropertyValue("width");
    payInfoDiv.style.minHeight = window.getComputedStyle(payInfoDiv, null).getPropertyValue("height");
}
//Get Total Balance
getHTML("https://amazon.syf.com/eService/AccountSummary/initiateAccSummaryAction.action",function(response){
    //document.getElementById("payInfoTotalBalanceValue").innerText = response.querySelectorAll('p[class*="ADADollarVal"]')[0].innerText.replace("$","").replace("*","").trim();
    localStorage.setItem("totalBalance",response.querySelectorAll('p[class*="ADADollarVal"]')[0].innerText.replace("$","").replace("*","").trim());
});
//Get Promo Balance and Promo Minimum Payment Amount
getHTML("https://amazon.syf.com/eService/PromotionalPurchase/initiatePromoPurchaseAction.action",function(response){
    //Get Promo Minimum Payment Amount
    var promoMinPay = 0;
    response.querySelectorAll('ul[id="promotionalPurchaseList"] li[class*="promoRow"] div[class*="activityTermsInfo"] dd:first-of-type').forEach((originalPromoAmount) => {
    promoMinPay = promoMinPay + parseFloat(originalPromoAmount.innerText.trim().replace("$",""))/(parseFloat(originalPromoAmount.nextElementSibling.nextElementSibling.innerText.trim().replace("EQUAL PAY 0% APR - ","").replace(" MOS",""))-1)
    });
    //document.getElementById("payInfoPromoMinPmtValue").innerText = promoMinPay.toFixed(2);
    localStorage.setItem("promoMinPay",promoMinPay.toFixed(2));
    //Get Promo Balance
    var promoBalance = 0;
    response.querySelectorAll('ul[id="promotionalPurchaseList"] li[class*="promoRow"] div[class*="activityAmtBlock"] p[class*="balanceAmount"]').forEach((promoCurrentBal)=>{
        if(promoCurrentBal.nextElementSibling.innerText.trim()=="Current Balance"){
            promoBalance = promoBalance + parseFloat(promoCurrentBal.innerText.replace("$","").trim());
        }
    });
    //document.getElementById("payInfoPromoBalanceValue").innerText = promoBalance;
    localStorage.setItem("promoBalance",promoBalance);
});

// Make the DIV element draggable:
dragElement(payInfoDiv);

//Calcluate Non-Promo Balance and Safe Payment Amount
//Non Promo Balance = Total - Promo Balance
var totalBalance = localStorage.getItem("totalBalance");
var totalPromoBalance = localStorage.getItem("promoBalance");
var promoMinPmtAmt = localStorage.getItem("promoMinPay");
//console.log(totalBalance + " " + totalPromoBalance + " " + promoMinPmtAmt);
document.getElementById("payInfoTotalBalanceValue").innerText = totalBalance;
document.getElementById("payInfoPromoBalanceValue").innerText = totalPromoBalance;
document.getElementById("payInfoPromoMinPmtValue").innerText = promoMinPmtAmt;
//Calc Non Promo Balance = Total - Promo Balance
var totalNonPromoBalance = (totalBalance - totalPromoBalance).toFixed(2);
//console.log(totalNonPromoBalance);
document.getElementById("payInfoNonPromoBalanceValue").innerText = totalNonPromoBalance;
//Calc Payment Amount = Non Promo Balance + Promo Minimum Payment Amount
var calcPaymentValue = (parseFloat(totalNonPromoBalance) + parseFloat(promoMinPmtAmt)).toFixed(2);
document.getElementById("payInfoCalcPaymentValue").innerText = calcPaymentValue;
//Safe Payment Amount = Round Calc Payment Amount to nearest 10's place
document.getElementById("payInfoSafePaymentValue").innerText = Math.ceil((calcPaymentValue+1)/10)*10+".00";

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if((elmnt.offsetTop - pos2) < 0){
        elmnt.style.top = "0px";
    }
    else if((elmnt.offsetTop - pos2) > window.innerHeight - parseInt(window.getComputedStyle(elmnt,null).getPropertyValue("height")) - 6){
          elmnt.style.top  = window.innerHeight - parseInt(window.getComputedStyle(elmnt,null).getPropertyValue("height")) - 6 +"px";
    }
    else{
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    if((elmnt.offsetLeft - pos1) < 0){
        elmnt.style.left = "0px";
    }
    else if((elmnt.offsetLeft - pos1) > window.innerWidth - parseInt(window.getComputedStyle(elmnt,null).getPropertyValue("width")) - 20){
          elmnt.style.left  = window.innerWidth - parseInt(window.getComputedStyle(elmnt,null).getPropertyValue("width")) - 20 +"px";
    }
    else{
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function getHTML(url,callback){
	// Feature detection
	if (!window.XMLHttpRequest) return;
	// Create new request
	var xhr = new XMLHttpRequest();
	// Setup callback
	xhr.onload = function(){
		if (callback && typeof(callback) === 'function'){
			callback(this.responseXML);
		}
	}
	// Get the HTML
	xhr.open('GET',url);
	xhr.responseType = 'document';
	xhr.send();
}