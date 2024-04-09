[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/auth.controller](../modules/auth_auth_controller.md) / AuthController

# Class: AuthController

[auth/auth.controller](../modules/auth_auth_controller.md).AuthController

## Table of contents

### Constructors

- [constructor](auth_auth_controller.AuthController.md#constructor)

### Properties

- [authService](auth_auth_controller.AuthController.md#authservice)

### Methods

- [login](auth_auth_controller.AuthController.md#login)
- [logout](auth_auth_controller.AuthController.md#logout)
- [refresh](auth_auth_controller.AuthController.md#refresh)
- [register](auth_auth_controller.AuthController.md#register)

## Constructors

### constructor

• **new AuthController**(`authService`): [`AuthController`](auth_auth_controller.AuthController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authService` | [`AuthService`](auth_auth_service.AuthService.md) |

#### Returns

[`AuthController`](auth_auth_controller.AuthController.md)

#### Defined in

[src/auth/auth.controller.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L19)

## Properties

### authService

• `Private` `Readonly` **authService**: [`AuthService`](auth_auth_service.AuthService.md)

#### Defined in

[src/auth/auth.controller.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L19)

## Methods

### login

▸ **login**(`dto`, `req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`LoginDto`](auth_dto_login_dto.LoginDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.controller.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L23)

___

### logout

▸ **logout**(`req`): `Promise`\<\{ `message`: `string` = 'You have been logged out (refresh token revoked)' }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `message`: `string` = 'You have been logged out (refresh token revoked)' }\>

#### Defined in

[src/auth/auth.controller.ts:50](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L50)

___

### refresh

▸ **refresh**(`req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.controller.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L43)

___

### register

▸ **register**(`dto`, `req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`RegisterDto`](auth_dto_register_dto.RegisterDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/auth/auth.controller.ts:32](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/auth.controller.ts#L32)
