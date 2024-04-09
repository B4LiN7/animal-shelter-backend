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
- [userHelper](auth_guard_location_guard.LocationGuard.md#userhelper)

### Methods

- [canActivate](auth_guard_location_guard.LocationGuard.md#canactivate)

## Constructors

### constructor

• **new LocationGuard**(`prisma`, `logger`, `userHelper`): [`LocationGuard`](auth_guard_location_guard.LocationGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `logger` | `Logger` |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`LocationGuard`](auth_guard_location_guard.LocationGuard.md)

#### Defined in

[src/auth/guard/location.guard.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/location.guard.ts#L20)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/auth/guard/location.guard.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/location.guard.ts#L22)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/auth/guard/location.guard.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/location.guard.ts#L21)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/auth/guard/location.guard.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/location.guard.ts#L23)

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

[src/auth/guard/location.guard.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/guard/location.guard.ts#L28)
