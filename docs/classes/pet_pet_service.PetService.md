[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [pet/pet.service](../modules/pet_pet_service.md) / PetService

# Class: PetService

[pet/pet.service](../modules/pet_pet_service.md).PetService

## Table of contents

### Constructors

- [constructor](pet_pet_service.PetService.md#constructor)

### Properties

- [petHelper](pet_pet_service.PetService.md#pethelper)
- [prisma](pet_pet_service.PetService.md#prisma)

### Methods

- [createPet](pet_pet_service.PetService.md#createpet)
- [deletePet](pet_pet_service.PetService.md#deletepet)
- [getAllPets](pet_pet_service.PetService.md#getallpets)
- [getPet](pet_pet_service.PetService.md#getpet)
- [getPetStatus](pet_pet_service.PetService.md#getpetstatus)
- [updatePet](pet_pet_service.PetService.md#updatepet)

## Constructors

### constructor

• **new PetService**(`prisma`, `petHelper`): [`PetService`](pet_pet_service.PetService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `petHelper` | [`PetHelperService`](pet_pet_helper_service.PetHelperService.md) |

#### Returns

[`PetService`](pet_pet_service.PetService.md)

#### Defined in

[src/pet/pet.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L20)

## Properties

### petHelper

• `Private` **petHelper**: [`PetHelperService`](pet_pet_helper_service.PetHelperService.md)

#### Defined in

[src/pet/pet.service.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L22)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/pet/pet.service.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L21)

## Methods

### createPet

▸ **createPet**(`dto`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

Create a new pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`CreatePetDto`](pet_dto_create_pet_dto.CreatePetDto.md) | New pet data |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

- The newly created pet

#### Defined in

[src/pet/pet.service.ts:56](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L56)

___

### deletePet

▸ **deletePet**(`id`): `Promise`\<\{ `deletedAdoptions`: `BatchPayload` ; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

Delete a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |

#### Returns

`Promise`\<\{ `deletedAdoptions`: `BatchPayload` ; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

The deleted pet, adoptions and statuses

#### Defined in

[src/pet/pet.service.ts:154](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L154)

___

### getAllPets

▸ **getAllPets**(`search?`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

Get all pets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search?` | [`SearchPetDto`](pet_dto_search_pet_dto.SearchPetDto.md) | Search parameters (optional) |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)[]\>

- List of pets

#### Defined in

[src/pet/pet.service.ts:30](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L30)

___

### getPet

▸ **getPet**(`id`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

Get a pet by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

- The pet with the given ID

#### Defined in

[src/pet/pet.service.ts:47](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L47)

___

### getPetStatus

▸ **getPetStatus**(`id`): `Promise`\<[`PetStatusDto`](../interfaces/pet_type_pet_status_dto.PetStatusDto.md)[]\>

Get the status history of a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |

#### Returns

`Promise`\<[`PetStatusDto`](../interfaces/pet_type_pet_status_dto.PetStatusDto.md)[]\>

- The status history of the pet

#### Defined in

[src/pet/pet.service.ts:163](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L163)

___

### updatePet

▸ **updatePet**(`id`, `dto`): `Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

Update a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |
| `dto` | [`UpdatePetDto`](pet_dto_update_pet_dto.UpdatePetDto.md) | New pet data |

#### Returns

`Promise`\<[`PetType`](../interfaces/pet_type_pet_type.PetType.md)\>

- The updated pet

#### Defined in

[src/pet/pet.service.ts:89](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/pet/pet.service.ts#L89)
