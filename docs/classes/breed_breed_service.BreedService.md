[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [breed/breed.service](../modules/breed_breed_service.md) / BreedService

# Class: BreedService

[breed/breed.service](../modules/breed_breed_service.md).BreedService

## Table of contents

### Constructors

- [constructor](breed_breed_service.BreedService.md#constructor)

### Properties

- [prisma](breed_breed_service.BreedService.md#prisma)

### Methods

- [addBreed](breed_breed_service.BreedService.md#addbreed)
- [deleteBreed](breed_breed_service.BreedService.md#deletebreed)
- [getAllBreeds](breed_breed_service.BreedService.md#getallbreeds)
- [getBreed](breed_breed_service.BreedService.md#getbreed)
- [updateBreed](breed_breed_service.BreedService.md#updatebreed)

## Constructors

### constructor

• **new BreedService**(`prisma`): [`BreedService`](breed_breed_service.BreedService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`BreedService`](breed_breed_service.BreedService.md)

#### Defined in

[src/breed/breed.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L9)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/breed/breed.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L9)

## Methods

### addBreed

▸ **addBreed**(`dto`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

Add a new breed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`CreateBreedDto`](breed_dto_create_breed_dto.CreateBreedDto.md) | The data to create a new breed |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

- The newly created breed (return of Prisma create method)

#### Defined in

[src/breed/breed.service.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L43)

___

### deleteBreed

▸ **deleteBreed**(`id`): `Promise`\<\{ `removedBreed`: [`BreedType`](../interfaces/breed_type_breed_type.BreedType.md) ; `updatedPets`: `number`  }\>

Delete a breed by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the breed |

#### Returns

`Promise`\<\{ `removedBreed`: [`BreedType`](../interfaces/breed_type_breed_type.BreedType.md) ; `updatedPets`: `number`  }\>

- The deleted breed (return of Prisma delete method) and the number of updated pets

#### Defined in

[src/breed/breed.service.ts:82](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L82)

___

### getAllBreeds

▸ **getAllBreeds**(): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)[]\>

Get all breeds, If not found any, throw a NotFoundException

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)[]\>

- A promise of an array of breeds

#### Defined in

[src/breed/breed.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L15)

___

### getBreed

▸ **getBreed**(`id`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

Get a breed by ID, If not found, throw a NotFoundException

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the breed |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

- A promise of a breed

#### Defined in

[src/breed/breed.service.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L28)

___

### updateBreed

▸ **updateBreed**(`id`, `dto`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

Update a breed by ID, If not found, create a new breed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the breed |
| `dto` | [`UpdateBreedDto`](breed_dto_update_breed_dto.UpdateBreedDto.md) | The data to update the breed |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

- The updated (or added) breed (return of Prisma update method)

#### Defined in

[src/breed/breed.service.ts:57](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.service.ts#L57)
