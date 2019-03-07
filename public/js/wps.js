function pageLoad() {
  var queryStr = window.location.search;
  if(queryStr){
    var paramPairs = queryStr.substr(1).split('&');
    var params = {};
    for (var i = 0; i < paramPairs.length; i++) {
        var parts = paramPairs[i].split('=');
        params[parts[0]] = parts[1];
    }
    console.log(params);
    if(params.operation && params.operation==="success"){
      if(params.st==="Completed"){
        alert("Payment completed with txn-id: "+params.tx);
      } else {
        alert("Some error occured");
      }    
    } else if(params.operation && params.operation==="cancel"){
      alert("Transaction canceled");
    } 
  } 
}

