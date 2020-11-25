> Ctrl + Shift + V: Open Markdown Preview.

# Soloen:
Soloen Digital Currency Wallet

# I. Set up development environment: 

1. 
```commandline
https://github.com/CoderandGymnast/Soloen.git
```

2. 
```commandline
cd Soloen
npm install
```

# II. Errors: 
## II.1. Tron (TRX): 
1. "class org.tron.core.exception.ContractValidateException : Validate TransferContract error, no OwnerAccount.":
* Error code: 
```JS
  const param = [
        accounts[0].address.base58, 10, accounts[1].address.base58, { permissionId: 2 }
    ]
```

* Solution: 
```JS
  const param = [
        accounts[1].address.base58, 10, accounts[0].address.base58, { permissionId: 2 }
    ]
```