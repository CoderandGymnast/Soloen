const fetch = require('node-fetch');

const callAPI = (urlPattern, body, callback) => {
    fetch(`http://localhost:3000/${urlPattern}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.text())
    .then(response => callback(response))    
}

const createAddress = params => {
    const walletID = JSON.parse(params).id
    callAPI("address/create", {"walletID": walletID}, (params) => {console.log(params)})
}


callAPI("wallet/create", {"label": "Soloen III"}, createAddress)