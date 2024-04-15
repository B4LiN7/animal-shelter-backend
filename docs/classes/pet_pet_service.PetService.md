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

[src/pet/pet.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L20)

## Properties

### petHelper

• `Private` **petHelper**: [`PetHelperService`](pet_pet_helper_service.PetHelperService.md)

#### Defined in

[src/pet/pet.service.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L22)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/pet/pet.service.ts:21](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L21)

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

[src/pet/pet.service.ts:51](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L51)

___

### deletePet

▸ **deletePet**(`id`): `Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

Delete a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |

#### Returns

`Promise`\<\{ `deletedAdoptions`: `number` = deletedAdoptions.count; `deletedPet`: \{ `birthDate`: `Date` ; `breedId`: `string` ; `createdAt`: `Date` ; `description`: `string` ; `imageUrls`: `string`[] ; `name`: `string` ; `petId`: `string` ; `sex`: `PetSexEnum` ; `updatedAt`: `Date`  } ; `deletedStatuses`: `number` = deletedStatuses.count }\>

The deleted pet, adoptions and statuses

#### Defined in

[src/pet/pet.service.ts:164](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L164)

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

[src/pet/pet.service.ts:30](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L30)

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

[src/pet/pet.service.ts:42](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L42)

___

### getPetStatus

▸ **getPetStatus**(`id`): `Promise`\<[`PetStatusType`](../interfaces/pet_type_pet_status_type.PetStatusType.md)[]\>

Get the status history of a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Pet's ID |

#### Returns

`Promise`\<[`PetStatusType`](../interfaces/pet_type_pet_status_type.PetStatusType.md)[]\>

- The status history of the pet

#### Defined in

[src/pet/pet.service.ts:173](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L173)

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

[src/pet/pet.service.ts:84](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/pet/pet.service.ts#L84)
