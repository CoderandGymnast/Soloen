# Notes:
1. Must create DB firstly.

# Errors: 
1. "No repository for "Wallet" was found. Looks like this entity is not registered in current "default" connection?":
* Solution: controllers.
2. NestJS does not load module without the definition type.
* Solution: tsconfig.json.

# Plans: 
1. Restrict creating wallet via IP address.
2. Optimize add entities to module.
3. Catch queries errors.
