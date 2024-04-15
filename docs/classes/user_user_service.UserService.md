[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [user/user.service](../modules/user_user_service.md) / UserService

# Class: UserService

[user/user.service](../modules/user_user_service.md).UserService

## Table of contents

### Constructors

- [constructor](user_user_service.UserService.md#constructor)

### Properties

- [logger](user_user_service.UserService.md#logger)
- [prisma](user_user_service.UserService.md#prisma)
- [role](user_user_service.UserService.md#role)
- [userHelper](user_user_service.UserService.md#userhelper)

### Methods

- [createUser](user_user_service.UserService.md#createuser)
- [deleteUser](user_user_service.UserService.md#deleteuser)
- [deleteUserRoleConnections](user_user_service.UserService.md#deleteuserroleconnections)
- [getAllUsers](user_user_service.UserService.md#getallusers)
- [getMyUser](user_user_service.UserService.md#getmyuser)
- [getUser](user_user_service.UserService.md#getuser)
- [getUserName](user_user_service.UserService.md#getusername)
- [hashPassword](user_user_service.UserService.md#hashpassword)
- [isUsernameExists](user_user_service.UserService.md#isusernameexists)
- [setUserRoles](user_user_service.UserService.md#setuserroles)
- [updateMyUser](user_user_service.UserService.md#updatemyuser)
- [updateUser](user_user_service.UserService.md#updateuser)

## Constructors

### constructor

• **new UserService**(`logger`, `prisma`, `role`, `userHelper`): [`UserService`](user_user_service.UserService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `role` | [`RoleService`](role_role_service.RoleService.md) |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`UserService`](user_user_service.UserService.md)

#### Defined in

[src/user/user.service.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L22)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/user/user.service.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L23)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/user/user.service.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L24)

___

### role

• `Private` **role**: [`RoleService`](role_role_service.RoleService.md)

#### Defined in

[src/user/user.service.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L25)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/user/user.service.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L26)

## Methods

### createUser

▸ **createUser**(`dto`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

Create user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`CreateUserDto`](user_dto_create_user_dto.CreateUserDto.md) | CreateUserDto with user data |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

- Promise with created user (return of Prisma create method)

#### Defined in

[src/user/user.service.ts:124](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L124)

___

### deleteUser

▸ **deleteUser**(`id`): `Promise`\<\{ `createdAt`: `Date` ; `deletedRoles`: `number` = deletedRoles.count; `email`: `string` ; `hashedPassword`: `string` ; `name`: `string` ; `profileImageUrl`: `string` ; `updatedAt`: `Date` ; `userId`: `string` ; `username`: `string`  }\>

Delete user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | User's ID |

#### Returns

`Promise`\<\{ `createdAt`: `Date` ; `deletedRoles`: `number` = deletedRoles.count; `email`: `string` ; `hashedPassword`: `string` ; `name`: `string` ; `profileImageUrl`: `string` ; `updatedAt`: `Date` ; `userId`: `string` ; `username`: `string`  }\>

#### Defined in

[src/user/user.service.ts:230](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L230)

___

### deleteUserRoleConnections

▸ **deleteUserRoleConnections**(`userId`): `Promise`\<`BatchPayload`\>

Delete all user's role connections

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | User's ID |

#### Returns

`Promise`\<`BatchPayload`\>

#### Defined in

[src/user/user.service.ts:246](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L246)

___

### getAllUsers

▸ **getAllUsers**(): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)[]\>

Get all users

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)[]\>

- Promise with array of users (return of Prisma findMany method)

#### Defined in

[src/user/user.service.ts:35](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L35)

___

### getMyUser

▸ **getMyUser**(`req`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

Get user who is currently logged in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

- Promise with user

#### Defined in

[src/user/user.service.ts:101](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L101)

___

### getUser

▸ **getUser**(`id`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

Get user by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | User's ID |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

- Promise with user

#### Defined in

[src/user/user.service.ts:60](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L60)

___

### getUserName

▸ **getUserName**(`id`): `Promise`\<\{ `name`: `string` ; `userId`: `string`  }\>

Get user's username and name by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | User's ID |

#### Returns

`Promise`\<\{ `name`: `string` ; `userId`: `string`  }\>

- Promise with user's ID and name

#### Defined in

[src/user/user.service.ts:84](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L84)

___

### hashPassword

▸ **hashPassword**(`password`): `Promise`\<`string`\>

Hashes a password using bcrypt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | The password to hash |

#### Returns

`Promise`\<`string`\>

- The hashed password

#### Defined in

[src/user/user.service.ts:306](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L306)

___

### isUsernameExists

▸ **isUsernameExists**(`username`): `Promise`\<`boolean`\>

Checks if a user exists in the database by username

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | The username to check (string) |

#### Returns

`Promise`\<`boolean`\>

- True if the user exists, false otherwise

#### Defined in

[src/user/user.service.ts:316](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L316)

___

### setUserRoles

▸ **setUserRoles**(`userId`, `roleNames`): `Promise`\<`void`\>

Set the roles for a user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The user's ID |
| `roleNames` | `string`[] | The roles' names |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/user/user.service.ts:259](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L259)

___

### updateMyUser

▸ **updateMyUser**(`req`, `dto`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

Update user who is currently logged in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |
| `dto` | [`UpdateUserDto`](user_dto_update_user_dto.UpdateUserDto.md) | UpdateUserDto with new data |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

- Promise with updated user (return of Prisma update method)

#### Defined in

[src/user/user.service.ts:113](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L113)

___

### updateUser

▸ **updateUser**(`id`, `dto`, `req`): `Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

Update user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | userId |
| `dto` | [`UpdateUserDto`](user_dto_update_user_dto.UpdateUserDto.md) | UpdateUserDto with new data |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | Request object |

#### Returns

`Promise`\<[`UserType`](../interfaces/user_type_user_type.UserType.md)\>

- Promise with updated user (return of Prisma update method)

#### Defined in

[src/user/user.service.ts:183](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/user/user.service.ts#L183)
