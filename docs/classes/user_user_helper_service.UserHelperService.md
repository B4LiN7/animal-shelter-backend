[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [user/user-helper.service](../modules/user_user_helper_service.md) / UserHelperService

# Class: UserHelperService

[user/user-helper.service](../modules/user_user_helper_service.md).UserHelperService

## Table of contents

### Constructors

- [constructor](user_user_helper_service.UserHelperService.md#constructor)

### Properties

- [jwt](user_user_helper_service.UserHelperService.md#jwt)
- [prisma](user_user_helper_service.UserHelperService.md#prisma)

### Methods

- [addRoleToUser](user_user_helper_service.UserHelperService.md#addroletouser)
- [decodeAccessTokenFromReq](user_user_helper_service.UserHelperService.md#decodeaccesstokenfromreq)
- [getUserAllPermissions](user_user_helper_service.UserHelperService.md#getuserallpermissions)
- [getUserRoleNames](user_user_helper_service.UserHelperService.md#getuserrolenames)
- [removeRoleFromUser](user_user_helper_service.UserHelperService.md#removerolefromuser)

## Constructors

### constructor

• **new UserHelperService**(`prisma`, `jwt`): [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `jwt` | `JwtService` |

#### Returns

[`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/user/user-helper.service.ts:13](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L13)

## Properties

### jwt

• `Private` **jwt**: `JwtService`

#### Defined in

[src/user/user-helper.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L15)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/user/user-helper.service.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L14)

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

[src/user/user-helper.service.ts:65](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L65)

___

### decodeAccessTokenFromReq

▸ **decodeAccessTokenFromReq**(`req`): `Promise`\<[`AccessTokenType`](../interfaces/auth_type_access_token_type.AccessTokenType.md)\>

Decode the access token from the request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The (Express) Request object |

#### Returns

`Promise`\<[`AccessTokenType`](../interfaces/auth_type_access_token_type.AccessTokenType.md)\>

#### Defined in

[src/user/user-helper.service.ts:100](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L100)

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

[src/user/user-helper.service.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L23)

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

[src/user/user-helper.service.ts:48](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L48)

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

[src/user/user-helper.service.ts:87](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/user/user-helper.service.ts#L87)
