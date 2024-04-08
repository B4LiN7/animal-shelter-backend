[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [species/species.controller](../modules/species_species_controller.md) / SpeciesController

# Class: SpeciesController

[species/species.controller](../modules/species_species_controller.md).SpeciesController

## Table of contents

### Constructors

- [constructor](species_species_controller.SpeciesController.md#constructor)

### Properties

- [speciesService](species_species_controller.SpeciesController.md#speciesservice)

### Methods

- [addSpecies](species_species_controller.SpeciesController.md#addspecies)
- [deleteSpecies](species_species_controller.SpeciesController.md#deletespecies)
- [getAllSpecies](species_species_controller.SpeciesController.md#getallspecies)
- [getSpecies](species_species_controller.SpeciesController.md#getspecies)
- [updateSpecies](species_species_controller.SpeciesController.md#updatespecies)

## Constructors

### constructor

• **new SpeciesController**(`speciesService`): [`SpeciesController`](species_species_controller.SpeciesController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `speciesService` | [`SpeciesService`](species_species_service.SpeciesService.md) |

#### Returns

[`SpeciesController`](species_species_controller.SpeciesController.md)

#### Defined in

[src/species/species.controller.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L20)

## Properties

### speciesService

• `Private` `Readonly` **speciesService**: [`SpeciesService`](species_species_service.SpeciesService.md)

#### Defined in

[src/species/species.controller.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L20)

## Methods

### addSpecies

▸ **addSpecies**(`dto`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateSpeciesDto`](species_dto_create_species_dto.CreateSpeciesDto.md) |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Defined in

[src/species/species.controller.ts:35](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L35)

___

### deleteSpecies

▸ **deleteSpecies**(`id`): `Promise`\<\{ `removedSpecies`: [`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md) ; `updatedBreeds`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `removedSpecies`: [`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md) ; `updatedBreeds`: `number`  }\>

#### Defined in

[src/species/species.controller.ts:49](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L49)

___

### getAllSpecies

▸ **getAllSpecies**(): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)[]\>

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)[]\>

#### Defined in

[src/species/species.controller.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L24)

___

### getSpecies

▸ **getSpecies**(`id`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Defined in

[src/species/species.controller.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L28)

___

### updateSpecies

▸ **updateSpecies**(`id`, `dto`): `Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`CreateSpeciesDto`](species_dto_create_species_dto.CreateSpeciesDto.md) |

#### Returns

`Promise`\<[`SpeciesType`](../interfaces/species_type_species_type.SpeciesType.md)\>

#### Defined in

[src/species/species.controller.ts:42](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/species/species.controller.ts#L42)
