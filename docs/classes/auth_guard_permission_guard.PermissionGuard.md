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

### Methods

- [canActivate](auth_guard_permission_guard.PermissionGuard.md#canactivate)

## Constructors

### constructor

• **new PermissionGuard**(`reflector`): [`PermissionGuard`](auth_guard_permission_guard.PermissionGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reflector` | `Reflector` |

#### Returns

[`PermissionGuard`](auth_guard_permission_guard.PermissionGuard.md)

#### Defined in

[src/auth/guard/permission.guard.ts:12](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/permission.guard.ts#L12)

## Properties

### reflector

• `Private` **reflector**: `Reflector`

#### Defined in

[src/auth/guard/permission.guard.ts:12](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/permission.guard.ts#L12)

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

[src/auth/guard/permission.guard.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/permission.guard.ts#L14)
