[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [role/role.service](../modules/role_role_service.md) / RoleService

# Class: RoleService

[role/role.service](../modules/role_role_service.md).RoleService

## Table of contents

### Constructors

- [constructor](role_role_service.RoleService.md#constructor)

### Properties

- [prisma](role_role_service.RoleService.md#prisma)

### Methods

- [addAllPermissionsToRole](role_role_service.RoleService.md#addallpermissionstorole)
- [addPermissionToRole](role_role_service.RoleService.md#addpermissiontorole)
- [createRole](role_role_service.RoleService.md#createrole)
- [deleteRoleByName](role_role_service.RoleService.md#deleterolebyname)
- [getPermissionsFromRole](role_role_service.RoleService.md#getpermissionsfromrole)
- [getRole](role_role_service.RoleService.md#getrole)
- [getRoleByName](role_role_service.RoleService.md#getrolebyname)
- [getRoles](role_role_service.RoleService.md#getroles)
- [removeAllPermissionsFromRole](role_role_service.RoleService.md#removeallpermissionsfromrole)
- [removePermissionFromRole](role_role_service.RoleService.md#removepermissionfromrole)
- [setPermissionsToRole](role_role_service.RoleService.md#setpermissionstorole)
- [updateRoleByName](role_role_service.RoleService.md#updaterolebyname)

## Constructors

### constructor

• **new RoleService**(`prisma`): [`RoleService`](role_role_service.RoleService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`RoleService`](role_role_service.RoleService.md)

#### Defined in

[src/role/role.service.ts:8](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L8)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/role/role.service.ts:8](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L8)

## Methods

### addAllPermissionsToRole

▸ **addAllPermissionsToRole**(`roleId`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:102](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L102)

___

### addPermissionToRole

▸ **addPermissionToRole**(`roleId`, `permission`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |
| `permission` | `PermissionEnum` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:78](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L78)

___

### createRole

▸ **createRole**(`dto`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateRoleDto`](role_dto_create_role_dto.CreateRoleDto.md) |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:11](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L11)

___

### deleteRoleByName

▸ **deleteRoleByName**(`name`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:45](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L45)

___

### getPermissionsFromRole

▸ **getPermissionsFromRole**(`roleId`): `Promise`\<`PermissionEnum`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`Promise`\<`PermissionEnum`[]\>

#### Defined in

[src/role/role.service.ts:54](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L54)

___

### getRole

▸ **getRole**(`roleId`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L19)

___

### getRoleByName

▸ **getRoleByName**(`name`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L26)

___

### getRoles

▸ **getRoles**(): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }[]\>

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }[]\>

#### Defined in

[src/role/role.service.ts:16](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L16)

___

### removeAllPermissionsFromRole

▸ **removeAllPermissionsFromRole**(`roleId`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:115](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L115)

___

### removePermissionFromRole

▸ **removePermissionFromRole**(`roleId`, `permission`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |
| `permission` | `PermissionEnum` |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:90](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L90)

___

### setPermissionsToRole

▸ **setPermissionsToRole**(`roleId`, `permissions`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |
| `permissions` | `PermissionEnum`[] |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:66](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L66)

___

### updateRoleByName

▸ **updateRoleByName**(`name`, `dto`): `Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `dto` | [`CreateRoleDto`](role_dto_create_role_dto.CreateRoleDto.md) |

#### Returns

`Promise`\<\{ `description`: `string` ; `permissions`: `PermissionEnum`[] ; `roleId`: `string` ; `roleName`: `string`  }\>

#### Defined in

[src/role/role.service.ts:37](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/role/role.service.ts#L37)
