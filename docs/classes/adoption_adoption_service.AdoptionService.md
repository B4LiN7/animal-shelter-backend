[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [adoption/adoption.service](../modules/adoption_adoption_service.md) / AdoptionService

# Class: AdoptionService

[adoption/adoption.service](../modules/adoption_adoption_service.md).AdoptionService

## Table of contents

### Constructors

- [constructor](adoption_adoption_service.AdoptionService.md#constructor)

### Properties

- [prisma](adoption_adoption_service.AdoptionService.md#prisma)

### Methods

- [cancelAdoptionProcess](adoption_adoption_service.AdoptionService.md#canceladoptionprocess)
- [deleteAdoptionProcess](adoption_adoption_service.AdoptionService.md#deleteadoptionprocess)
- [getAdoptionProcess](adoption_adoption_service.AdoptionService.md#getadoptionprocess)
- [getAllAdoptionProcess](adoption_adoption_service.AdoptionService.md#getalladoptionprocess)
- [getMyAdoptionProcesses](adoption_adoption_service.AdoptionService.md#getmyadoptionprocesses)
- [setAdoption](adoption_adoption_service.AdoptionService.md#setadoption)
- [startAdoptionProcess](adoption_adoption_service.AdoptionService.md#startadoptionprocess)

## Constructors

### constructor

• **new AdoptionService**(`prisma`): [`AdoptionService`](adoption_adoption_service.AdoptionService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`AdoptionService`](adoption_adoption_service.AdoptionService.md)

#### Defined in

[src/adoption/adoption.service.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L18)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/adoption/adoption.service.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L18)

## Methods

### cancelAdoptionProcess

▸ **cancelAdoptionProcess**(`petId`, `req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Finish the adoption process for a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `petId` | `string` | The ID of the pet |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The Request object for userId |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.service.ts:105](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L105)

___

### deleteAdoptionProcess

▸ **deleteAdoptionProcess**(`adoptionId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Delete the adoption process and set the pet status to unknown

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adoptionId` | `string` | The ID of the adoption |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.service.ts:123](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L123)

___

### getAdoptionProcess

▸ **getAdoptionProcess**(`adoptionId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Get the adoption process

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adoptionId` | `string` | The ID of the adoption |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.service.ts:54](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L54)

___

### getAllAdoptionProcess

▸ **getAllAdoptionProcess**(`search?`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

Get all adoption processes

#### Parameters

| Name | Type |
| :------ | :------ |
| `search?` | [`SearchAdoptionDto`](adoption_dto_search_adoption_dto.SearchAdoptionDto.md) |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

- The list of adoption processes

#### Defined in

[src/adoption/adoption.service.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L24)

___

### getMyAdoptionProcesses

▸ **getMyAdoptionProcesses**(`req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

Get the adoption processes for the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The Request object for userId |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

- The list of adoption processes

#### Defined in

[src/adoption/adoption.service.ts:71](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L71)

___

### setAdoption

▸ **setAdoption**(`dto`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Set the adoption status for a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dto` | [`UpdateAdoptionDto`](adoption_dto_update_adoption_dto.UpdateAdoptionDto.md) | The adoption DTO which contains the pet ID, user ID and the new status |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

- The modified adoption status

#### Defined in

[src/adoption/adoption.service.ts:158](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L158)

___

### startAdoptionProcess

▸ **startAdoptionProcess**(`petId`, `req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Start the adoption process for a pet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `petId` | `string` | The ID of the pet |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The Request object for userId |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.service.ts:86](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.service.ts#L86)
