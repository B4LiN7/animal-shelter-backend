[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [user/user.controller](../modules/user_user_controller.md) / UserController

# Class: UserController

[user/user.controller](../modules/user_user_controller.md).UserController

## Table of contents

### Constructors

- [constructor](user_user_controller.UserController.md#constructor)

### Properties

- [userService](user_user_controller.UserController.md#userservice)

### Methods

- [createUser](user_user_controller.UserController.md#createuser)
- [deletePet](user_user_controller.UserController.md#deletepet)
- [getAllUsers](user_user_controller.UserController.md#getallusers)
- [getMyUser](user_user_controller.UserController.md#getmyuser)
- [getUser](user_user_controller.UserController.md#getuser)
- [getUserName](user_user_controller.UserController.md#getusername)
- [updateMyUser](user_user_controller.UserController.md#updatemyuser)
- [updatePet](user_user_controller.UserController.md#updatepet)

## Constructors

### constructor

• **new UserController**(`userService`): [`UserController`](user_user_controller.UserController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userService` | [`UserService`](user_user_service.UserService.md) |

#### Returns

[`UserController`](user_user_controller.UserController.md)

#### Defined in

[src/user/user.controller.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L25)

## Properties

### userService

• `Private` `Readonly` **userService**: [`UserService`](user_user_service.UserService.md)

#### Defined in

[src/user/user.controller.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L25)

## Methods

### createUser

▸ **createUser**(`dto`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateUserDto`](user_dto_create_user_dto.CreateUserDto.md) |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Defined in

[src/user/user.controller.ts:41](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L41)

___

### deletePet

▸ **deletePet**(`id`): `Promise`\<\{ `createdAt`: `Date` ; `deletedRoles`: `number` = deletedRoles.count; `email`: `string` ; `hashedPassword`: `string` ; `name`: `string` ; `profileImageUrl`: `string` ; `updatedAt`: `Date` ; `userId`: `string` ; `username`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `createdAt`: `Date` ; `deletedRoles`: `number` = deletedRoles.count; `email`: `string` ; `hashedPassword`: `string` ; `name`: `string` ; `profileImageUrl`: `string` ; `updatedAt`: `Date` ; `userId`: `string` ; `username`: `string`  }\>

#### Defined in

[src/user/user.controller.ts:68](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L68)

___

### getAllUsers

▸ **getAllUsers**(): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)[]\>

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)[]\>

#### Defined in

[src/user/user.controller.ts:47](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L47)

___

### getMyUser

▸ **getMyUser**(`req`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Defined in

[src/user/user.controller.ts:29](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L29)

___

### getUser

▸ **getUser**(`id`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Defined in

[src/user/user.controller.ts:54](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L54)

___

### getUserName

▸ **getUserName**(`id`): `Promise`\<\{ `name`: `string` ; `userId`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `name`: `string` ; `userId`: `string`  }\>

#### Defined in

[src/user/user.controller.ts:76](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L76)

___

### updateMyUser

▸ **updateMyUser**(`req`, `dto`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `dto` | [`UpdateUserDto`](user_dto_update_user_dto.UpdateUserDto.md) |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Defined in

[src/user/user.controller.ts:33](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L33)

___

### updatePet

▸ **updatePet**(`id`, `dto`, `req`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`UpdateUserDto`](user_dto_update_user_dto.UpdateUserDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

#### Defined in

[src/user/user.controller.ts:59](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/user/user.controller.ts#L59)
