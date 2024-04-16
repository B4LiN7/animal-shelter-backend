[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [adoption/adoption.controller](../modules/adoption_adoption_controller.md) / AdoptionController

# Class: AdoptionController

[adoption/adoption.controller](../modules/adoption_adoption_controller.md).AdoptionController

## Table of contents

### Constructors

- [constructor](adoption_adoption_controller.AdoptionController.md#constructor)

### Properties

- [adoptionService](adoption_adoption_controller.AdoptionController.md#adoptionservice)

### Methods

- [cancelAdoptionProcess](adoption_adoption_controller.AdoptionController.md#canceladoptionprocess)
- [createAdoptionProcess](adoption_adoption_controller.AdoptionController.md#createadoptionprocess)
- [deleteAdoptionProcess](adoption_adoption_controller.AdoptionController.md#deleteadoptionprocess)
- [getAdoptionProcesses](adoption_adoption_controller.AdoptionController.md#getadoptionprocesses)
- [getAllAdoptionProcesses](adoption_adoption_controller.AdoptionController.md#getalladoptionprocesses)
- [getMyAdoptionProcesses](adoption_adoption_controller.AdoptionController.md#getmyadoptionprocesses)
- [setAdoptionProcess](adoption_adoption_controller.AdoptionController.md#setadoptionprocess)
- [startAdoptionProcess](adoption_adoption_controller.AdoptionController.md#startadoptionprocess)

## Constructors

### constructor

• **new AdoptionController**(`adoptionService`): [`AdoptionController`](adoption_adoption_controller.AdoptionController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `adoptionService` | [`AdoptionService`](adoption_adoption_service.AdoptionService.md) |

#### Returns

[`AdoptionController`](adoption_adoption_controller.AdoptionController.md)

#### Defined in

[src/adoption/adoption.controller.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L26)

## Properties

### adoptionService

• `Private` `Readonly` **adoptionService**: [`AdoptionService`](adoption_adoption_service.AdoptionService.md)

#### Defined in

[src/adoption/adoption.controller.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L26)

## Methods

### cancelAdoptionProcess

▸ **cancelAdoptionProcess**(`petId`, `req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `petId` | `string` |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:41](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L41)

___

### createAdoptionProcess

▸ **createAdoptionProcess**(`dto`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateAdoptionDto`](adoption_dto_update_adoption_dto.UpdateAdoptionDto.md) |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:59](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L59)

___

### deleteAdoptionProcess

▸ **deleteAdoptionProcess**(`adoptionId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adoptionId` | `string` |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:70](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L70)

___

### getAdoptionProcesses

▸ **getAdoptionProcesses**(`adoptionId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adoptionId` | `string` |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:53](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L53)

___

### getAllAdoptionProcesses

▸ **getAllAdoptionProcesses**(`search`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | [`SearchAdoptionDto`](adoption_dto_search_adoption_dto.SearchAdoptionDto.md) |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.controller.ts:48](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L48)

___

### getMyAdoptionProcesses

▸ **getMyAdoptionProcesses**(`req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.controller.ts:31](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L31)

___

### setAdoptionProcess

▸ **setAdoptionProcess**(`dto`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateAdoptionDto`](adoption_dto_update_adoption_dto.UpdateAdoptionDto.md) |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:65](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L65)

___

### startAdoptionProcess

▸ **startAdoptionProcess**(`petId`, `req`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `petId` | `string` |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:36](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/adoption/adoption.controller.ts#L36)
