[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [prisma/prisma.service](../modules/prisma_prisma_service.md) / PrismaService

# Class: PrismaService

[prisma/prisma.service](../modules/prisma_prisma_service.md).PrismaService

## Hierarchy

- `PrismaClient`

  ↳ **`PrismaService`**

## Implements

- `OnModuleInit`

## Table of contents

### Constructors

- [constructor](prisma_prisma_service.PrismaService.md#constructor)

### Properties

- [$extends](prisma_prisma_service.PrismaService.md#$extends)
- [logger](prisma_prisma_service.PrismaService.md#logger)

### Accessors

- [adoption](prisma_prisma_service.PrismaService.md#adoption)
- [breed](prisma_prisma_service.PrismaService.md#breed)
- [location](prisma_prisma_service.PrismaService.md#location)
- [pet](prisma_prisma_service.PrismaService.md#pet)
- [petStatus](prisma_prisma_service.PrismaService.md#petstatus)
- [role](prisma_prisma_service.PrismaService.md#role)
- [species](prisma_prisma_service.PrismaService.md#species)
- [user](prisma_prisma_service.PrismaService.md#user)
- [userLogin](prisma_prisma_service.PrismaService.md#userlogin)
- [userRole](prisma_prisma_service.PrismaService.md#userrole)

### Methods

- [$connect](prisma_prisma_service.PrismaService.md#$connect)
- [$disconnect](prisma_prisma_service.PrismaService.md#$disconnect)
- [$executeRaw](prisma_prisma_service.PrismaService.md#$executeraw)
- [$executeRawUnsafe](prisma_prisma_service.PrismaService.md#$executerawunsafe)
- [$on](prisma_prisma_service.PrismaService.md#$on)
- [$queryRaw](prisma_prisma_service.PrismaService.md#$queryraw)
- [$queryRawUnsafe](prisma_prisma_service.PrismaService.md#$queryrawunsafe)
- [$transaction](prisma_prisma_service.PrismaService.md#$transaction)
- [$use](prisma_prisma_service.PrismaService.md#$use)
- [onModuleDestroy](prisma_prisma_service.PrismaService.md#onmoduledestroy)
- [onModuleInit](prisma_prisma_service.PrismaService.md#onmoduleinit)

## Constructors

### constructor

• **new PrismaService**(`logger`): [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |

#### Returns

[`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Overrides

PrismaClient.constructor

#### Defined in

[src/prisma/prisma.service.ts:6](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/prisma.service.ts#L6)

## Properties

### $extends

• **$extends**: `ExtendsHook`\<``"extends"``, `TypeMapCb`, `DefaultArgs`, `TypeMap`\<`InternalArgs` & `DefaultArgs`\>\>

#### Inherited from

PrismaClient.$extends

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:273

___

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/prisma/prisma.service.ts:6](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/prisma.service.ts#L6)

## Accessors

### adoption

• `get` **adoption**(): `AdoptionDelegate`\<`ExtArgs`\>

`prisma.adoption`: Exposes CRUD operations for the **Adoption** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Adoptions
 * const adoptions = await prisma.adoption.findMany()
 * ```

#### Returns

`AdoptionDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.adoption

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:323

___

### breed

• `get` **breed**(): `BreedDelegate`\<`ExtArgs`\>

`prisma.breed`: Exposes CRUD operations for the **Breed** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Breeds
 * const breeds = await prisma.breed.findMany()
 * ```

#### Returns

`BreedDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.breed

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:303

___

### location

• `get` **location**(): `LocationDelegate`\<`ExtArgs`\>

`prisma.location`: Exposes CRUD operations for the **Location** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Locations
 * const locations = await prisma.location.findMany()
 * ```

#### Returns

`LocationDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.location

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:353

___

### pet

• `get` **pet**(): `PetDelegate`\<`ExtArgs`\>

`prisma.pet`: Exposes CRUD operations for the **Pet** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Pets
 * const pets = await prisma.pet.findMany()
 * ```

#### Returns

`PetDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.pet

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:283

___

### petStatus

• `get` **petStatus**(): `PetStatusDelegate`\<`ExtArgs`\>

`prisma.petStatus`: Exposes CRUD operations for the **PetStatus** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more PetStatuses
 * const petStatuses = await prisma.petStatus.findMany()
 * ```

#### Returns

`PetStatusDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.petStatus

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:293

___

### role

• `get` **role**(): `RoleDelegate`\<`ExtArgs`\>

`prisma.role`: Exposes CRUD operations for the **Role** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Roles
 * const roles = await prisma.role.findMany()
 * ```

#### Returns

`RoleDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.role

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:373

___

### species

• `get` **species**(): `SpeciesDelegate`\<`ExtArgs`\>

`prisma.species`: Exposes CRUD operations for the **Species** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Species
 * const species = await prisma.species.findMany()
 * ```

#### Returns

`SpeciesDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.species

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:313

___

### user

• `get` **user**(): `UserDelegate`\<`ExtArgs`\>

`prisma.user`: Exposes CRUD operations for the **User** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```

#### Returns

`UserDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.user

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:333

___

### userLogin

• `get` **userLogin**(): `UserLoginDelegate`\<`ExtArgs`\>

`prisma.userLogin`: Exposes CRUD operations for the **UserLogin** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more UserLogins
 * const userLogins = await prisma.userLogin.findMany()
 * ```

#### Returns

`UserLoginDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.userLogin

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:343

___

### userRole

• `get` **userRole**(): `UserRoleDelegate`\<`ExtArgs`\>

`prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more UserRoles
 * const userRoles = await prisma.userRole.findMany()
 * ```

#### Returns

`UserRoleDelegate`\<`ExtArgs`\>

#### Inherited from

PrismaClient.userRole

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:363

## Methods

### $connect

▸ **$connect**(): `Promise`\<`void`\>

Connect with the database

#### Returns

`Promise`\<`void`\>

#### Inherited from

PrismaClient.$connect

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:195

___

### $disconnect

▸ **$disconnect**(): `Promise`\<`void`\>

Disconnect from the database

#### Returns

`Promise`\<`void`\>

#### Inherited from

PrismaClient.$disconnect

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:200

___

### $executeRaw

▸ **$executeRaw**\<`T`\>(`query`, `...values`): `PrismaPromise`\<`number`\>

Executes a prepared raw query and returns the number of affected rows.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `TemplateStringsArray` \| `Sql` |
| `...values` | `any`[] |

#### Returns

`PrismaPromise`\<`number`\>

**`Example`**

```
const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

PrismaClient.$executeRaw

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:218

___

### $executeRawUnsafe

▸ **$executeRawUnsafe**\<`T`\>(`query`, `...values`): `PrismaPromise`\<`number`\>

Executes a raw query and returns the number of affected rows.
Susceptible to SQL injections, see documentation.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `...values` | `any`[] |

#### Returns

`PrismaPromise`\<`number`\>

**`Example`**

```
const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

PrismaClient.$executeRawUnsafe

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:230

___

### $on

▸ **$on**\<`V`\>(`eventType`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventType` | `V` |
| `callback` | (`event`: `V` extends ``"query"`` ? `QueryEvent` : `LogEvent`) => `void` |

#### Returns

`void`

#### Inherited from

PrismaClient.$on

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:190

___

### $queryRaw

▸ **$queryRaw**\<`T`\>(`query`, `...values`): `PrismaPromise`\<`T`\>

Performs a prepared raw query and returns the `SELECT` data.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `TemplateStringsArray` \| `Sql` |
| `...values` | `any`[] |

#### Returns

`PrismaPromise`\<`T`\>

**`Example`**

```
const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

PrismaClient.$queryRaw

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:241

___

### $queryRawUnsafe

▸ **$queryRawUnsafe**\<`T`\>(`query`, `...values`): `PrismaPromise`\<`T`\>

Performs a raw query and returns the `SELECT` data.
Susceptible to SQL injections, see documentation.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `...values` | `any`[] |

#### Returns

`PrismaPromise`\<`T`\>

**`Example`**

```
const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

PrismaClient.$queryRawUnsafe

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:253

___

### $transaction

▸ **$transaction**\<`P`\>(`arg`, `options?`): `Promise`\<`UnwrapTuple`\<`P`\>\>

Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `PrismaPromise`\<`any`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [...P[]] |
| `options?` | `Object` |
| `options.isolationLevel?` | `TransactionIsolationLevel` |

#### Returns

`Promise`\<`UnwrapTuple`\<`P`\>\>

**`Example`**

```
const [george, bob, alice] = await prisma.$transaction([
  prisma.user.create({ data: { name: 'George' } }),
  prisma.user.create({ data: { name: 'Bob' } }),
  prisma.user.create({ data: { name: 'Alice' } }),
])
```

Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).

#### Inherited from

PrismaClient.$transaction

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:268

▸ **$transaction**\<`R`\>(`fn`, `options?`): `Promise`\<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`prisma`: `Omit`\<`PrismaClient`\<`PrismaClientOptions`, `never`, `DefaultArgs`\>, ``"$on"`` \| ``"$connect"`` \| ``"$disconnect"`` \| ``"$use"`` \| ``"$transaction"`` \| ``"$extends"``\>) => `Promise`\<`R`\> |
| `options?` | `Object` |
| `options.isolationLevel?` | `TransactionIsolationLevel` |
| `options.maxWait?` | `number` |
| `options.timeout?` | `number` |

#### Returns

`Promise`\<`R`\>

#### Inherited from

PrismaClient.$transaction

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:270

___

### $use

▸ **$use**(`cb`): `void`

Add a middleware

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `Middleware`\<`any`\> |

#### Returns

`void`

**`Deprecated`**

since 4.16.0. For new code, prefer client extensions instead.

**`See`**

https://pris.ly/d/extensions

#### Inherited from

PrismaClient.$use

#### Defined in

node_modules/.pnpm/@prisma+client@5.12.0_prisma@5.12.0/node_modules/.prisma/client/index.d.ts:207

___

### onModuleDestroy

▸ **onModuleDestroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/prisma/prisma.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/prisma.service.ts#L20)

___

### onModuleInit

▸ **onModuleInit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

OnModuleInit.onModuleInit

#### Defined in

[src/prisma/prisma.service.ts:11](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/prisma.service.ts#L11)
