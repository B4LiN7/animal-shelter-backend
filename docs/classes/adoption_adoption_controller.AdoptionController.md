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
- [getAdoptionProcesses](adoption_adoption_controller.AdoptionController.md#getadoptionprocesses)
- [getAllAdoptionProcesses](adoption_adoption_controller.AdoptionController.md#getalladoptionprocesses)
- [getAllAdoptionProcessesForPet](adoption_adoption_controller.AdoptionController.md#getalladoptionprocessesforpet)
- [getAllPendingAdoptionProcessesForPet](adoption_adoption_controller.AdoptionController.md#getallpendingadoptionprocessesforpet)
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

[src/adoption/adoption.controller.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L24)

## Properties

### adoptionService

• `Private` `Readonly` **adoptionService**: [`AdoptionService`](adoption_adoption_service.AdoptionService.md)

#### Defined in

[src/adoption/adoption.controller.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L24)

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

[src/adoption/adoption.controller.ts:58](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L58)

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

[src/adoption/adoption.controller.ts:34](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L34)

___

### getAllAdoptionProcesses

▸ **getAllAdoptionProcesses**(): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.controller.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L28)

___

### getAllAdoptionProcessesForPet

▸ **getAllAdoptionProcessesForPet**(`petId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `petId` | `string` |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.controller.ts:40](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L40)

___

### getAllPendingAdoptionProcessesForPet

▸ **getAllPendingAdoptionProcessesForPet**(`petId`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `petId` | `string` |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)[]\>

#### Defined in

[src/adoption/adoption.controller.ts:46](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L46)

___

### setAdoptionProcess

▸ **setAdoptionProcess**(`adoptionId`, `dto`): `Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `adoptionId` | `string` |
| `dto` | [`UpdateAdoptionDto`](adoption_dto_update_adoption_dto.UpdateAdoptionDto.md) |

#### Returns

`Promise`\<[`AdoptionType`](../interfaces/adoption_type_adoption_type.AdoptionType.md)\>

#### Defined in

[src/adoption/adoption.controller.ts:65](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L65)

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

[src/adoption/adoption.controller.ts:52](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/adoption/adoption.controller.ts#L52)
