[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [pet/pet-helper.service](../modules/pet_pet_helper_service.md) / PetHelperService

# Class: PetHelperService

[pet/pet-helper.service](../modules/pet_pet_helper_service.md).PetHelperService

## Table of contents

### Constructors

- [constructor](pet_pet_helper_service.PetHelperService.md#constructor)

### Properties

- [logger](pet_pet_helper_service.PetHelperService.md#logger)
- [prisma](pet_pet_helper_service.PetHelperService.md#prisma)

### Methods

- [deletePet](pet_pet_helper_service.PetHelperService.md#deletepet)
- [getLatestStatusForPet](pet_pet_helper_service.PetHelperService.md#getlateststatusforpet)
- [getPetWithLatestStatus](pet_pet_helper_service.PetHelperService.md#getpetwithlateststatus)
- [getPetsBySearch](pet_pet_helper_service.PetHelperService.md#getpetsbysearch)
- [getPetsWithLatestStatus](pet_pet_helper_service.PetHelperService.md#getpetswithlateststatus)

## Constructors

### constructor

• **new PetHelperService**(`prisma`, `logger`): [`PetHelperService`](pet_pet_helper_service.PetHelperService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `logger` | `Logger` |

#### Returns

[`PetHelperService`](pet_pet_helper_service.PetHelperService.md)

#### Defined in

[src/pet/pet-helper.service.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L14)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/pet/pet-helper.service.ts:16](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L16)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/pet/pet-helper.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L15)

## Methods

### deletePet

▸ **deletePet**(`id`): `Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

This function deletes a pet by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the pet to delete. |

#### Returns

`Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

A promise that resolves when the pet is deleted.

#### Defined in

[src/pet/pet-helper.service.ts:95](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L95)

___

### getLatestStatusForPet

▸ **getLatestStatusForPet**(`id`): `Promise`\<`PetStatusEnum`\>

This function gets the latest status for a pet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the pet. |

#### Returns

`Promise`\<`PetStatusEnum`\>

The latest status of the pet.

#### Defined in

[src/pet/pet-helper.service.ts:82](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L82)

___

### getPetWithLatestStatus

▸ **getPetWithLatestStatus**(`id`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

This function gets a pet and it latest status by pet's ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the pet to get. |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

The pet with the latest status.

#### Defined in

[src/pet/pet-helper.service.ts:66](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L66)

___

### getPetsBySearch

▸ **getPetsBySearch**(`search`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

This function gets all pets. If a search is provided, it filters the pets by the search parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search` | [`SearchPetDto`](pet_dto_search_pet_dto.SearchPetDto.md) | The search parameters to filter the pets. |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

#### Defined in

[src/pet/pet-helper.service.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L25)

___

### getPetsWithLatestStatus

▸ **getPetsWithLatestStatus**(): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

This function gets all pets and their latest status.

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

The pets with the latest status.

#### Defined in

[src/pet/pet-helper.service.ts:51](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet-helper.service.ts#L51)
