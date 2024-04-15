[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [user/user-helper.service](../modules/user_user_helper_service.md) / UserHelperService

# Class: UserHelperService

[user/user-helper.service](../modules/user_user_helper_service.md).UserHelperService

## Table of contents

### Constructors

- [constructor](user_user_helper_service.UserHelperService.md#constructor)

### Properties

- [prisma](user_user_helper_service.UserHelperService.md#prisma)

### Methods

- [addRoleToUser](user_user_helper_service.UserHelperService.md#addroletouser)
- [getUserAllPermissions](user_user_helper_service.UserHelperService.md#getuserallpermissions)
- [getUserRoleNames](user_user_helper_service.UserHelperService.md#getuserrolenames)
- [removeRoleFromUser](user_user_helper_service.UserHelperService.md#removerolefromuser)

## Constructors

### constructor

• **new UserHelperService**(`prisma`): [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/user/user-helper.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L10)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/user/user-helper.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L10)

## Methods

### addRoleToUser

▸ **addRoleToUser**(`roleId`, `userId`): `Promise`\<`void`\>

Add a role to a user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleId` | `string` | The role's ID |
| `userId` | `string` | The user's ID |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/user/user-helper.service.ts:59](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L59)

___

### getUserAllPermissions

▸ **getUserAllPermissions**(`userId`): `Promise`\<`PermissionEnum`[]\>

Get all permissions for a user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The user's ID |

#### Returns

`Promise`\<`PermissionEnum`[]\>

- A list of permissions

#### Defined in

[src/user/user-helper.service.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L17)

___

### getUserRoleNames

▸ **getUserRoleNames**(`userId`): `Promise`\<`string`[]\>

Get all roles' name for a user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The user's ID |

#### Returns

`Promise`\<`string`[]\>

- A list of roles

#### Defined in

[src/user/user-helper.service.ts:42](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L42)

___

### removeRoleFromUser

▸ **removeRoleFromUser**(`roleId`, `userId`): `Promise`\<`void`\>

Remove a role from a user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleId` | `string` | The role's ID |
| `userId` | `string` | The user's ID |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/user/user-helper.service.ts:81](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user-helper.service.ts#L81)
