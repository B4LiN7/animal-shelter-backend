[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [breed/breed.controller](../modules/breed_breed_controller.md) / BreedController

# Class: BreedController

[breed/breed.controller](../modules/breed_breed_controller.md).BreedController

## Table of contents

### Constructors

- [constructor](breed_breed_controller.BreedController.md#constructor)

### Properties

- [breedService](breed_breed_controller.BreedController.md#breedservice)

### Methods

- [addBreed](breed_breed_controller.BreedController.md#addbreed)
- [deleteBreed](breed_breed_controller.BreedController.md#deletebreed)
- [getAllBreeds](breed_breed_controller.BreedController.md#getallbreeds)
- [getBreed](breed_breed_controller.BreedController.md#getbreed)
- [updateBreed](breed_breed_controller.BreedController.md#updatebreed)

## Constructors

### constructor

• **new BreedController**(`breedService`): [`BreedController`](breed_breed_controller.BreedController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `breedService` | [`BreedService`](breed_breed_service.BreedService.md) |

#### Returns

[`BreedController`](breed_breed_controller.BreedController.md)

#### Defined in

[src/breed/breed.controller.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L21)

## Properties

### breedService

• `Private` `Readonly` **breedService**: [`BreedService`](breed_breed_service.BreedService.md)

#### Defined in

[src/breed/breed.controller.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L21)

## Methods

### addBreed

▸ **addBreed**(`dto`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateBreedDto`](breed_dto_create_breed_dto.CreateBreedDto.md) |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Defined in

[src/breed/breed.controller.ts:36](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L36)

___

### deleteBreed

▸ **deleteBreed**(`id`): `Promise`\<\{ `removedBreed`: [`BreedType`](../interfaces/breed_type_breed_type.BreedType.md) ; `updatedPets`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `removedBreed`: [`BreedType`](../interfaces/breed_type_breed_type.BreedType.md) ; `updatedPets`: `number`  }\>

#### Defined in

[src/breed/breed.controller.ts:50](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L50)

___

### getAllBreeds

▸ **getAllBreeds**(): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)[]\>

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)[]\>

#### Defined in

[src/breed/breed.controller.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L25)

___

### getBreed

▸ **getBreed**(`id`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Defined in

[src/breed/breed.controller.ts:29](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L29)

___

### updateBreed

▸ **updateBreed**(`id`, `dto`): `Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`UpdateBreedDto`](breed_dto_update_breed_dto.UpdateBreedDto.md) |

#### Returns

`Promise`\<[`BreedType`](../interfaces/breed_type_breed_type.BreedType.md)\>

#### Defined in

[src/breed/breed.controller.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/breed/breed.controller.ts#L43)
