[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [pet/pet.controller](../modules/pet_pet_controller.md) / PetController

# Class: PetController

[pet/pet.controller](../modules/pet_pet_controller.md).PetController

## Table of contents

### Constructors

- [constructor](pet_pet_controller.PetController.md#constructor)

### Properties

- [petService](pet_pet_controller.PetController.md#petservice)

### Methods

- [createPet](pet_pet_controller.PetController.md#createpet)
- [deletePet](pet_pet_controller.PetController.md#deletepet)
- [readAllPets](pet_pet_controller.PetController.md#readallpets)
- [readPet](pet_pet_controller.PetController.md#readpet)
- [readPetStatus](pet_pet_controller.PetController.md#readpetstatus)
- [updatePet](pet_pet_controller.PetController.md#updatepet)

## Constructors

### constructor

• **new PetController**(`petService`): [`PetController`](pet_pet_controller.PetController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `petService` | [`PetService`](pet_pet_service.PetService.md) |

#### Returns

[`PetController`](pet_pet_controller.PetController.md)

#### Defined in

[src/pet/pet.controller.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L23)

## Properties

### petService

• `Private` `Readonly` **petService**: [`PetService`](pet_pet_service.PetService.md)

#### Defined in

[src/pet/pet.controller.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L23)

## Methods

### createPet

▸ **createPet**(`dto`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreatePetDto`](pet_dto_create_pet_dto.CreatePetDto.md) |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Defined in

[src/pet/pet.controller.ts:41](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L41)

___

### deletePet

▸ **deletePet**(`id`): `Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

#### Defined in

[src/pet/pet.controller.ts:55](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L55)

___

### readAllPets

▸ **readAllPets**(`dto`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`SearchPetDto`](pet_dto_search_pet_dto.SearchPetDto.md) |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

#### Defined in

[src/pet/pet.controller.ts:27](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L27)

___

### readPet

▸ **readPet**(`id`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Defined in

[src/pet/pet.controller.ts:34](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L34)

___

### readPetStatus

▸ **readPetStatus**(`id`): `Promise`\<[`PetStatusType`](../interfaces/pet_type_pet_status_type.PetStatusType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`PetStatusType`](../interfaces/pet_type_pet_status_type.PetStatusType.md)[]\>

#### Defined in

[src/pet/pet.controller.ts:62](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L62)

___

### updatePet

▸ **updatePet**(`id`, `dto`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`UpdatePetDto`](pet_dto_update_pet_dto.UpdatePetDto.md) |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

#### Defined in

[src/pet/pet.controller.ts:48](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.controller.ts#L48)
