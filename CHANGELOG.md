# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/nathakritbc/expense_tracker_api/compare/v1.1.1...v1.2.0) (2025-08-29)

### Features

* 🎸 Add keepalive workflow to ensure Render service remains active with scheduled health checks ([e5185d9](https://github.com/nathakritbc/expense_tracker_api/commit/e5185d98a241fec2fb44b22ac74c8cdd880233be))

## [1.1.1](https://github.com/nathakritbc/expense_tracker_api/compare/v1.1.0...v1.1.1) (2025-08-29)

### Bug Fixes

* 🐛 Update keepalive workflow to use API_URL secret for health check ([1cb321f](https://github.com/nathakritbc/expense_tracker_api/commit/1cb321fcfe5b2a8493079654166f8494f0f51a11))

## [1.1.0](https://github.com/nathakritbc/expense_tracker_api/compare/v1.0.1...v1.1.0) (2025-08-29)

### Features

* 🎸 Add GitHub Actions workflow to keep Render service alive with scheduled health checks ([1334e1c](https://github.com/nathakritbc/expense_tracker_api/commit/1334e1cf44a9d200226200b60acc058f87f4794e))

## [1.0.1](https://github.com/nathakritbc/expense_tracker_api/compare/v1.0.0...v1.0.1) (2025-08-29)

### Code Refactoring

* 💡 Extract Swagger configuration into a separate file and update setup to use the new configuration ([bf2d50e](https://github.com/nathakritbc/expense_tracker_api/commit/bf2d50e29b413626a63162703116b61f2f4593ee))

## 1.0.0 (2025-08-29)

### Features

*  🎸 add Docker support and environment configuration ([057d42f](https://github.com/nathakritbc/expense_tracker_api/commit/057d42fdba32e2f179563ac30b48fc984f7de814))
*  🎸 update HTTP documentation for authentication and expenses ([08f4ed4](https://github.com/nathakritbc/expense_tracker_api/commit/08f4ed45222221e7328e89266aa8f2946cc50455))
* 🎉 add comprehensive README.md for Expense Tracker API ([563dc2d](https://github.com/nathakritbc/expense_tracker_api/commit/563dc2d76115690e433187df3de32126a0446293))
* 🎸 add authentication module with login and registration use cases, JWT strategy, and controller ([79d720e](https://github.com/nathakritbc/expense_tracker_api/commit/79d720e1f7ca6d69df2cfb13bb19383dfd4dc5c6))
* 🎸 add configuration and utility files for authentication, validation, and data handling ([5a1f96b](https://github.com/nathakritbc/expense_tracker_api/commit/5a1f96b405320a680d832289615ad07df1bb6d67))
* 🎸 add GetExpenseById use case with error handling and corresponding tests ([831e717](https://github.com/nathakritbc/expense_tracker_api/commit/831e717796dc86f334db90edea0456daaf97f761))
* 🎸 add TypeORM configuration and database module for PostgreSQL integration ([bc3fd25](https://github.com/nathakritbc/expense_tracker_api/commit/bc3fd2533e5697b8ca607d64e99ef7fe82c2864e))
* 🎸 add user and expenses tables with relationships ([cd4d44f](https://github.com/nathakritbc/expense_tracker_api/commit/cd4d44f455a9dafd09e0b45e1445658909d6f813))
* 🎸 configure TypeORM settings and introduce data source ([d3f7de4](https://github.com/nathakritbc/expense_tracker_api/commit/d3f7de4bd1d4c32411a3eb9d01a01c6747a67f29))
* 🎸 enhance expense update functionality by adding UUID handling and updating example expense data in HTTP documentation ([8113b95](https://github.com/nathakritbc/expense_tracker_api/commit/8113b9500c35fa4c5fb48c88cd61cc1cb5117804))
* 🎸 enhance migration utilities with type safety and detailed logging ([aae9402](https://github.com/nathakritbc/expense_tracker_api/commit/aae9402bc3c1a273bef6b795d0b9dc6cb619d39c))
* 🎸 implement expenses module with CRUD operations, expense reporting, and DTOs for expense management ([4637916](https://github.com/nathakritbc/expense_tracker_api/commit/46379163cfa4aa7447b69ac9104fa2537246cef5))
* 🎸 implement user module with user entity, repository, and use cases for user management ([7a7340c](https://github.com/nathakritbc/expense_tracker_api/commit/7a7340c621216b7602d5fd53106ed54296536824))
* 🎸 init project ([f0cfedc](https://github.com/nathakritbc/expense_tracker_api/commit/f0cfedca42bf6ed0243bde678f4ffafe8e2e83d1))
* 🎸 update Docker configuration and deployment scripts ([1af5584](https://github.com/nathakritbc/expense_tracker_api/commit/1af558498ae2a0a5d02f00ffa790ca87639b2c47))
* 🎸 update expense examples in HTTP documentation with new titles and UUIDs ([96ec5ff](https://github.com/nathakritbc/expense_tracker_api/commit/96ec5ffb8a7becfe3d7ee31974ac5ebc2782d75b))
* 🎸 update Swagger authentication configuration for expenses ([c2939a2](https://github.com/nathakritbc/expense_tracker_api/commit/c2939a28125e9e98cb85a9918258bcc347ab106b))
* 🎸implement enhanced migration system with custom tracking ([dc1de70](https://github.com/nathakritbc/expense_tracker_api/commit/dc1de702fa1c9cc28b57e85f17b9f7401480524a))
* 🎸remove custom validation functions for date format and integer number ([75947d8](https://github.com/nathakritbc/expense_tracker_api/commit/75947d8a2f86c6575546a16297abac0a4ca82754))

### Code Refactoring

* 💡 enhance expense query logic by consolidating query builder usage and adding totalPages to metadata ([786beb9](https://github.com/nathakritbc/expense_tracker_api/commit/786beb966b378a5b1ccb1b07453afbb0a5104297))
* 💡 improve code readability in ExpenseTypeOrmRepositor ([eaee3cf](https://github.com/nathakritbc/expense_tracker_api/commit/eaee3cf324c9d36b0c00f0b1500bb914f0ca7ec1))
* 💡 optimize expense report query by consolidating query builders and improving type conversions ([7312983](https://github.com/nathakritbc/expense_tracker_api/commit/7312983aba694bf48c7e9f68bf9bfa6ad4e61d02))

## 1.0.0 (2025-08-29)

### Features

*  🎸 add Docker support and environment configuration ([057d42f](https://github.com/nathakritbc/expense_tracker_api/commit/057d42fdba32e2f179563ac30b48fc984f7de814))
*  🎸 update HTTP documentation for authentication and expenses ([08f4ed4](https://github.com/nathakritbc/expense_tracker_api/commit/08f4ed45222221e7328e89266aa8f2946cc50455))
* 🎉 add comprehensive README.md for Expense Tracker API ([563dc2d](https://github.com/nathakritbc/expense_tracker_api/commit/563dc2d76115690e433187df3de32126a0446293))
* 🎸 add authentication module with login and registration use cases, JWT strategy, and controller ([79d720e](https://github.com/nathakritbc/expense_tracker_api/commit/79d720e1f7ca6d69df2cfb13bb19383dfd4dc5c6))
* 🎸 add configuration and utility files for authentication, validation, and data handling ([5a1f96b](https://github.com/nathakritbc/expense_tracker_api/commit/5a1f96b405320a680d832289615ad07df1bb6d67))
* 🎸 add GetExpenseById use case with error handling and corresponding tests ([831e717](https://github.com/nathakritbc/expense_tracker_api/commit/831e717796dc86f334db90edea0456daaf97f761))
* 🎸 add TypeORM configuration and database module for PostgreSQL integration ([bc3fd25](https://github.com/nathakritbc/expense_tracker_api/commit/bc3fd2533e5697b8ca607d64e99ef7fe82c2864e))
* 🎸 add user and expenses tables with relationships ([cd4d44f](https://github.com/nathakritbc/expense_tracker_api/commit/cd4d44f455a9dafd09e0b45e1445658909d6f813))
* 🎸 configure TypeORM settings and introduce data source ([d3f7de4](https://github.com/nathakritbc/expense_tracker_api/commit/d3f7de4bd1d4c32411a3eb9d01a01c6747a67f29))
* 🎸 enhance expense update functionality by adding UUID handling and updating example expense data in HTTP documentation ([8113b95](https://github.com/nathakritbc/expense_tracker_api/commit/8113b9500c35fa4c5fb48c88cd61cc1cb5117804))
* 🎸 enhance migration utilities with type safety and detailed logging ([aae9402](https://github.com/nathakritbc/expense_tracker_api/commit/aae9402bc3c1a273bef6b795d0b9dc6cb619d39c))
* 🎸 implement expenses module with CRUD operations, expense reporting, and DTOs for expense management ([4637916](https://github.com/nathakritbc/expense_tracker_api/commit/46379163cfa4aa7447b69ac9104fa2537246cef5))
* 🎸 implement user module with user entity, repository, and use cases for user management ([7a7340c](https://github.com/nathakritbc/expense_tracker_api/commit/7a7340c621216b7602d5fd53106ed54296536824))
* 🎸 init project ([f0cfedc](https://github.com/nathakritbc/expense_tracker_api/commit/f0cfedca42bf6ed0243bde678f4ffafe8e2e83d1))
* 🎸 update Docker configuration and deployment scripts ([1af5584](https://github.com/nathakritbc/expense_tracker_api/commit/1af558498ae2a0a5d02f00ffa790ca87639b2c47))
* 🎸 update expense examples in HTTP documentation with new titles and UUIDs ([96ec5ff](https://github.com/nathakritbc/expense_tracker_api/commit/96ec5ffb8a7becfe3d7ee31974ac5ebc2782d75b))
* 🎸 update Swagger authentication configuration for expenses ([c2939a2](https://github.com/nathakritbc/expense_tracker_api/commit/c2939a28125e9e98cb85a9918258bcc347ab106b))
* 🎸implement enhanced migration system with custom tracking ([dc1de70](https://github.com/nathakritbc/expense_tracker_api/commit/dc1de702fa1c9cc28b57e85f17b9f7401480524a))
* 🎸remove custom validation functions for date format and integer number ([75947d8](https://github.com/nathakritbc/expense_tracker_api/commit/75947d8a2f86c6575546a16297abac0a4ca82754))

### Code Refactoring

* 💡 enhance expense query logic by consolidating query builder usage and adding totalPages to metadata ([786beb9](https://github.com/nathakritbc/expense_tracker_api/commit/786beb966b378a5b1ccb1b07453afbb0a5104297))
* 💡 improve code readability in ExpenseTypeOrmRepositor ([eaee3cf](https://github.com/nathakritbc/expense_tracker_api/commit/eaee3cf324c9d36b0c00f0b1500bb914f0ca7ec1))
* 💡 optimize expense report query by consolidating query builders and improving type conversions ([7312983](https://github.com/nathakritbc/expense_tracker_api/commit/7312983aba694bf48c7e9f68bf9bfa6ad4e61d02))

## [1.2.0](https://github.com/nathakritbc/expense_tracker_api/compare/v1.1.0...v1.2.0) (2025-08-28)

### Features

*  🎸 add Docker support and environment configuration ([057d42f](https://github.com/nathakritbc/expense_tracker_api/commit/057d42fdba32e2f179563ac30b48fc984f7de814))
* 🎸 update Docker configuration and deployment scripts ([1af5584](https://github.com/nathakritbc/expense_tracker_api/commit/1af558498ae2a0a5d02f00ffa790ca87639b2c47))
* 🎸 update Swagger authentication configuration for expenses ([c2939a2](https://github.com/nathakritbc/expense_tracker_api/commit/c2939a28125e9e98cb85a9918258bcc347ab106b))

## [1.1.0](https://github.com/nathakritbc/expense_tracker_api/compare/v1.0.0...v1.1.0) (2025-08-28)

### Features

*  🎸 update HTTP documentation for authentication and expenses ([08f4ed4](https://github.com/nathakritbc/expense_tracker_api/commit/08f4ed45222221e7328e89266aa8f2946cc50455))
* 🎉 add comprehensive README.md for Expense Tracker API ([563dc2d](https://github.com/nathakritbc/expense_tracker_api/commit/563dc2d76115690e433187df3de32126a0446293))
* 🎸 add user and expenses tables with relationships ([cd4d44f](https://github.com/nathakritbc/expense_tracker_api/commit/cd4d44f455a9dafd09e0b45e1445658909d6f813))
* 🎸 configure TypeORM settings and introduce data source ([d3f7de4](https://github.com/nathakritbc/expense_tracker_api/commit/d3f7de4bd1d4c32411a3eb9d01a01c6747a67f29))
* 🎸 enhance migration utilities with type safety and detailed logging ([aae9402](https://github.com/nathakritbc/expense_tracker_api/commit/aae9402bc3c1a273bef6b795d0b9dc6cb619d39c))
* 🎸 update expense examples in HTTP documentation with new titles and UUIDs ([96ec5ff](https://github.com/nathakritbc/expense_tracker_api/commit/96ec5ffb8a7becfe3d7ee31974ac5ebc2782d75b))
* 🎸implement enhanced migration system with custom tracking ([dc1de70](https://github.com/nathakritbc/expense_tracker_api/commit/dc1de702fa1c9cc28b57e85f17b9f7401480524a))
* 🎸remove custom validation functions for date format and integer number ([75947d8](https://github.com/nathakritbc/expense_tracker_api/commit/75947d8a2f86c6575546a16297abac0a4ca82754))

### Code Refactoring

* 💡 enhance expense query logic by consolidating query builder usage and adding totalPages to metadata ([786beb9](https://github.com/nathakritbc/expense_tracker_api/commit/786beb966b378a5b1ccb1b07453afbb0a5104297))
* 💡 optimize expense report query by consolidating query builders and improving type conversions ([7312983](https://github.com/nathakritbc/expense_tracker_api/commit/7312983aba694bf48c7e9f68bf9bfa6ad4e61d02))

## 1.0.0 (2025-08-28)

### Features

* 🎸 add authentication module with login and registration use cases, JWT strategy, and controller ([79d720e](https://github.com/nathakritbc/expense_tracker_api/commit/79d720e1f7ca6d69df2cfb13bb19383dfd4dc5c6))
* 🎸 add configuration and utility files for authentication, validation, and data handling ([5a1f96b](https://github.com/nathakritbc/expense_tracker_api/commit/5a1f96b405320a680d832289615ad07df1bb6d67))
* 🎸 add GetExpenseById use case with error handling and corresponding tests ([831e717](https://github.com/nathakritbc/expense_tracker_api/commit/831e717796dc86f334db90edea0456daaf97f761))
* 🎸 add TypeORM configuration and database module for PostgreSQL integration ([bc3fd25](https://github.com/nathakritbc/expense_tracker_api/commit/bc3fd2533e5697b8ca607d64e99ef7fe82c2864e))
* 🎸 enhance expense update functionality by adding UUID handling and updating example expense data in HTTP documentation ([8113b95](https://github.com/nathakritbc/expense_tracker_api/commit/8113b9500c35fa4c5fb48c88cd61cc1cb5117804))
* 🎸 implement expenses module with CRUD operations, expense reporting, and DTOs for expense management ([4637916](https://github.com/nathakritbc/expense_tracker_api/commit/46379163cfa4aa7447b69ac9104fa2537246cef5))
* 🎸 implement user module with user entity, repository, and use cases for user management ([7a7340c](https://github.com/nathakritbc/expense_tracker_api/commit/7a7340c621216b7602d5fd53106ed54296536824))
* 🎸 init project ([f0cfedc](https://github.com/nathakritbc/expense_tracker_api/commit/f0cfedca42bf6ed0243bde678f4ffafe8e2e83d1))

### Code Refactoring

* 💡 improve code readability in ExpenseTypeOrmRepositor ([eaee3cf](https://github.com/nathakritbc/expense_tracker_api/commit/eaee3cf324c9d36b0c00f0b1500bb914f0ca7ec1))
