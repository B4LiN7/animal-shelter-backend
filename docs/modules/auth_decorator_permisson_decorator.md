[animal-shelter-backend](../README.md) / [Exports](../modules.md) / auth/decorator/permisson.decorator

# Module: auth/decorator/permisson.decorator

## Table of contents

### Variables

- [PERMISSION\_KEY](auth_decorator_permisson_decorator.md#permission_key)

### Functions

- [Permissions](auth_decorator_permisson_decorator.md#permissions)

## Variables

### PERMISSION\_KEY

• `Const` **PERMISSION\_KEY**: ``"permissons"``

#### Defined in

[src/auth/decorator/permisson.decorator.ts:4](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/decorator/permisson.decorator.ts#L4)

## Functions

### Permissions

▸ **Permissions**(`...perms`): `CustomDecorator`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...perms` | `PermissionEnum`[] |

#### Returns

`CustomDecorator`\<`string`\>

#### Defined in

[src/auth/decorator/permisson.decorator.ts:6](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/decorator/permisson.decorator.ts#L6)
