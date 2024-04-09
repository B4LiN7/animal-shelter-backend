[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/guard/permission.guard](../modules/auth_guard_permission_guard.md) / PermissionGuard

# Class: PermissionGuard

[auth/guard/permission.guard](../modules/auth_guard_permission_guard.md).PermissionGuard

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](auth_guard_permission_guard.PermissionGuard.md#constructor)

### Properties

- [reflector](auth_guard_permission_guard.PermissionGuard.md#reflector)
- [userHelper](auth_guard_permission_guard.PermissionGuard.md#userhelper)

### Methods

- [canActivate](auth_guard_permission_guard.PermissionGuard.md#canactivate)

## Constructors

### constructor

• **new PermissionGuard**(`reflector`, `userHelper`): [`PermissionGuard`](auth_guard_permission_guard.PermissionGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reflector` | `Reflector` |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`PermissionGuard`](auth_guard_permission_guard.PermissionGuard.md)

#### Defined in

[src/auth/guard/permission.guard.ts:13](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/permission.guard.ts#L13)

## Properties

### reflector

• `Private` **reflector**: `Reflector`

#### Defined in

[src/auth/guard/permission.guard.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/permission.guard.ts#L14)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/auth/guard/permission.guard.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/permission.guard.ts#L15)

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

[src/auth/guard/permission.guard.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/permission.guard.ts#L18)
