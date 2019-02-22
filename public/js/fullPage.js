function pageLoad() {
  var queryStr = window.location.search;
  if(queryStr){
    var paramPairs = queryStr.substr(1).split('&');
    var params = {};
    for (var i = 0; i < paramPairs.length; i++) {
        var parts = paramPairs[i].split('=');
        params[parts[0]] = parts[1];
    }
    if(params.operation && params.operation==="success"){
      alert("Payment completed with Payment-id: "+params.paymentId);
    } else if(params.operation && params.operation==="failed"){
      alert("Payment failed with Payment-id: "+params.paymentId);
    } 
  } 
}

function createPayment(){
  var body = {
    intent: "sale",
    payer: {
         "payment_method": "paypal"
    },
    transactions: [
        {
            amount: { 
                total: document.getElementById("amountId").value, 
                currency: document.getElementById("selectedCurrency").value
            }
        }
    ],
    redirect_urls : {
     // "return_url": "https://paypal-integration-sample.herokuapp.com/api/paypal/ec/web/success",
     "return_url": "http://localhost:8080/api/paypal/ec/web/success",
      "cancel_url": "http://www.hawaii.com"
    }
   };

  fetch('/api/paypal/ec/create-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(r => r.json())
      .then(data => {
        console.log(data.links); 
        for(var i=0; i< data.links.length; i++){
          var link = data.links[i];
          if(link.rel == "approval_url"){
            console.log(link.href);
            window.location = link.href;
            break;
          }
        }      
  });
}

