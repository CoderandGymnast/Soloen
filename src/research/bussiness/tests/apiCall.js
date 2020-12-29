const fetch = require('node-fetch');
const FormData = require('form-data');

const body = {
    "label": "..."
}

fetch('http://localhost:3000/wallet/create', {
    method: 'POST', 
    body:  JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
}).then(res => res.text())
.then(body => console.log(body))