[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/guard/user.guard](../modules/auth_guard_user_guard.md) / UserGuard

# Class: UserGuard

[auth/guard/user.guard](../modules/auth_guard_user_guard.md).UserGuard

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](auth_guard_user_guard.UserGuard.md#constructor)

### Properties

- [logger](auth_guard_user_guard.UserGuard.md#logger)
- [userHelper](auth_guard_user_guard.UserGuard.md#userhelper)

### Methods

- [canActivate](auth_guard_user_guard.UserGuard.md#canactivate)

## Constructors

### constructor

• **new UserGuard**(`logger`, `userHelper`): [`UserGuard`](auth_guard_user_guard.UserGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`UserGuard`](auth_guard_user_guard.UserGuard.md)

#### Defined in

[src/auth/guard/user.guard.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/user.guard.ts#L18)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/auth/guard/user.guard.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/user.guard.ts#L19)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/auth/guard/user.guard.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/user.guard.ts#L20)

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[src/auth/guard/user.guard.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/user.guard.ts#L25)
