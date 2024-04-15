[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/auth.service](../modules/auth_auth_service.md) / AuthService

# Class: AuthService

[auth/auth.service](../modules/auth_auth_service.md).AuthService

## Table of contents

### Constructors

- [constructor](auth_auth_service.AuthService.md#constructor)

### Properties

- [jwt](auth_auth_service.AuthService.md#jwt)
- [logger](auth_auth_service.AuthService.md#logger)
- [prisma](auth_auth_service.AuthService.md#prisma)
- [user](auth_auth_service.AuthService.md#user)
- [userHelper](auth_auth_service.AuthService.md#userhelper)

### Methods

- [login](auth_auth_service.AuthService.md#login)
- [logout](auth_auth_service.AuthService.md#logout)
- [makeAccessToken](auth_auth_service.AuthService.md#makeaccesstoken)
- [makeRefreshToken](auth_auth_service.AuthService.md#makerefreshtoken)
- [refresh](auth_auth_service.AuthService.md#refresh)
- [register](auth_auth_service.AuthService.md#register)

## Constructors

### constructor

• **new AuthService**(`logger`, `jwt`, `prisma`, `user`, `userHelper`): [`AuthService`](auth_auth_service.AuthService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |
| `jwt` | `JwtService` |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `user` | [`UserService`](user_user_service.UserService.md) |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`AuthService`](auth_auth_service.AuthService.md)

#### Defined in

[src/auth/auth.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L15)

## Properties

### jwt

• `Private` **jwt**: `JwtService`

#### Defined in

[src/auth/auth.service.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L17)

___

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/auth/auth.service.ts:16](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L16)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/auth/auth.service.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L18)

___

### user

• `Private` **user**: [`UserService`](user_user_service.UserService.md)

#### Defined in

[src/auth/auth.service.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L19)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/auth/auth.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L20)

## Methods

### login

▸ **login**(`dto`, `req`, `res`): `Promise`\<`void`\>

Logs in the user and sets the token cookie

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`LoginDto`](auth_dto_login_dto.LoginDto.md) | LoginDto object containing username and password |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.service.ts:31](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L31)

___

### logout

▸ **logout**(`req`): `Promise`\<\{ `message`: `string` = 'You have been logged out (refresh token revoked)' }\>

Logs out the user by clearing the token cookie

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |

#### Returns

`Promise`\<\{ `message`: `string` = 'You have been logged out (refresh token revoked)' }\>

#### Defined in

[src/auth/auth.service.ts:171](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L171)

___

### makeAccessToken

▸ **makeAccessToken**(`userId`, `permissions`, `expire?`): `Promise`\<`string`\>

Makes the access and refresh tokens

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `string` | `undefined` | The user's ID |
| `permissions` | `PermissionEnum`[] | `undefined` | The permissions of the user |
| `expire` | `string` | `'10m'` | The expiration time of the access token (default: 15 minutes) |

#### Returns

`Promise`\<`string`\>

The access token

#### Defined in

[src/auth/auth.service.ts:197](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L197)

___

### makeRefreshToken

▸ **makeRefreshToken**(`userId`, `expire?`): `Promise`\<`string`\>

Makes the refresh token

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `string` | `undefined` | The user's ID |
| `expire` | `string` | `'7d'` | The expiration time of the refresh token (default: 7 days) |

#### Returns

`Promise`\<`string`\>

The refresh token

#### Defined in

[src/auth/auth.service.ts:214](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L214)

___

### refresh

▸ **refresh**(`req`, `res`): `Promise`\<`void`\>

Refreshes the user's access and refresh tokens

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.service.ts:117](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L117)

___

### register

▸ **register**(`dto`, `req`, `res`): `Promise`\<`void`\>

Registers a new user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`RegisterDto`](auth_dto_register_dto.RegisterDto.md) | RegisterDto object containing username, password and email |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.service.ts:89](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/auth.service.ts#L89)
