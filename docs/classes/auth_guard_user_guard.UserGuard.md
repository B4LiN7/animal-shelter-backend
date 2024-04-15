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

### Methods

- [canActivate](auth_guard_user_guard.UserGuard.md#canactivate)

## Constructors

### constructor

• **new UserGuard**(`logger`): [`UserGuard`](auth_guard_user_guard.UserGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |

#### Returns

[`UserGuard`](auth_guard_user_guard.UserGuard.md)

#### Defined in

[src/auth/guard/user.guard.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/user.guard.ts#L17)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/auth/guard/user.guard.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/user.guard.ts#L17)

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

[src/auth/guard/user.guard.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/user.guard.ts#L21)
