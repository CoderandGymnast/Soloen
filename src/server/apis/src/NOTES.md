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
4. Gracefully Shutdown mechanism for the Synchronizer.
5. General source of balance.
6. Change datatype for balance.
7. Change tracked data's structure at Address Tracker.
8. Remove **Node Client** at **contract.service.ts**.