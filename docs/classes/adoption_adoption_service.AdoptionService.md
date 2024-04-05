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
- [getAdoptionProcess](adoption_adoption_service.AdoptionService.md#getadoptionprocess)
- [getAllAdoptionProcess](adoption_adoption_service.AdoptionService.md#getalladoptionprocess)
- [getAllAdoptionProcessesForPet](adoption_adoption_service.AdoptionService.md#getalladoptionprocessesforpet)
- [setAdoption](adoption_adoption_service.AdoptionService.md#setadoption)
- [setAdoptionProcess](adoption_adoption_service.AdoptionService.md#setadoptionprocess)
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

[src/adoption/adoption.service.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L17)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/adoption/adoption.service.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L17)

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

[src/adoption/adoption.service.ts:105](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L105)

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

[src/adoption/adoption.service.ts:60](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L60)

___

### getAllAdoptionProcess

▸ **getAllAdoptionProcess**(): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

Get all adoption processes

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.service.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L23)

___

### getAllAdoptionProcessesForPet

▸ **getAllAdoptionProcessesForPet**(`petId`, `isPending?`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

Get the adoption status for a pet

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `petId` | `string` | `undefined` | The ID of the pet |
| `isPending` | `boolean` | `false` | If the adoption is pending |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.service.ts:37](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L37)

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

[src/adoption/adoption.service.ts:143](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L143)

___

### setAdoptionProcess

▸ **setAdoptionProcess**(`adoptionId`, `dto`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

Set the adoption process for a pet (for admin or shelter worker only)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `adoptionId` | `string` | The ID of the adoption |
| `dto` | [`UpdateAdoptionDto`](adoption_dto_update_adoption_dto.UpdateAdoptionDto.md) | The adoption DTO |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.service.ts:126](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L126)

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

[src/adoption/adoption.service.ts:77](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.service.ts#L77)
