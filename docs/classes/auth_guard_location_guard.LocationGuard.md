[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/guard/location.guard](../modules/auth_guard_location_guard.md) / LocationGuard

# Class: LocationGuard

[auth/guard/location.guard](../modules/auth_guard_location_guard.md).LocationGuard

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](auth_guard_location_guard.LocationGuard.md#constructor)

### Properties

- [logger](auth_guard_location_guard.LocationGuard.md#logger)
- [prisma](auth_guard_location_guard.LocationGuard.md#prisma)

### Methods

- [canActivate](auth_guard_location_guard.LocationGuard.md#canactivate)

## Constructors

### constructor

• **new LocationGuard**(`prisma`, `logger`): [`LocationGuard`](auth_guard_location_guard.LocationGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `logger` | `Logger` |

#### Returns

[`LocationGuard`](auth_guard_location_guard.LocationGuard.md)

#### Defined in

[src/auth/guard/location.guard.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/location.guard.ts#L19)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/auth/guard/location.guard.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/location.guard.ts#L21)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/auth/guard/location.guard.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/location.guard.ts#L20)

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

[src/auth/guard/location.guard.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/guard/location.guard.ts#L26)
