[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [species/species.service](../modules/species_species_service.md) / SpeciesService

# Class: SpeciesService

[species/species.service](../modules/species_species_service.md).SpeciesService

## Table of contents

### Constructors

- [constructor](species_species_service.SpeciesService.md#constructor)

### Properties

- [prisma](species_species_service.SpeciesService.md#prisma)

### Methods

- [addSpecies](species_species_service.SpeciesService.md#addspecies)
- [deleteSpecies](species_species_service.SpeciesService.md#deletespecies)
- [getAllSpecies](species_species_service.SpeciesService.md#getallspecies)
- [getSpecies](species_species_service.SpeciesService.md#getspecies)
- [updateSpecies](species_species_service.SpeciesService.md#updatespecies)

## Constructors

### constructor

• **new SpeciesService**(`prisma`): [`SpeciesService`](species_species_service.SpeciesService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`SpeciesService`](species_species_service.SpeciesService.md)

#### Defined in

[src/species/species.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L9)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/species/species.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L9)

## Methods

### addSpecies

▸ **addSpecies**(`dto`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

Create a new species

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`CreateSpeciesDto`](species_dto_create_species_dto.CreateSpeciesDto.md) | SpeciesType DTO |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

- The created species (return of Prisma create method)

#### Defined in

[src/species/species.service.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L43)

___

### deleteSpecies

▸ **deleteSpecies**(`id`): `Promise`\<\{ `removedSpecies`: [`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md) ; `updatedBreeds`: `number`  }\>

Delete a species

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Species' ID |

#### Returns

`Promise`\<\{ `removedSpecies`: [`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md) ; `updatedBreeds`: `number`  }\>

- The deleted species (return of Prisma delete method) and the number of updated breeds

#### Defined in

[src/species/species.service.ts:76](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L76)

___

### getAllSpecies

▸ **getAllSpecies**(): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)[]\>

Get all species

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)[]\>

- Array of species

#### Defined in

[src/species/species.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L15)

___

### getSpecies

▸ **getSpecies**(`id`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

Get a species by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Species' ID |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

- SpeciesType

#### Defined in

[src/species/species.service.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L28)

___

### updateSpecies

▸ **updateSpecies**(`id`, `dto`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

Update a species, If the species does not exist, create a new one

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Species' ID |
| `dto` | [`UpdateSpeciesDto`](species_dto_update_species_dto.UpdateSpeciesDto.md) | Species data |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

- The updated species (return of Prisma update method)

#### Defined in

[src/species/species.service.ts:53](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/species/species.service.ts#L53)
