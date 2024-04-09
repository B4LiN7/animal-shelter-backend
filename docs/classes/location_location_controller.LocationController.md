[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [location/location.controller](../modules/location_location_controller.md) / LocationController

# Class: LocationController

[location/location.controller](../modules/location_location_controller.md).LocationController

## Table of contents

### Constructors

- [constructor](location_location_controller.LocationController.md#constructor)

### Properties

- [locationService](location_location_controller.LocationController.md#locationservice)

### Methods

- [addLocation](location_location_controller.LocationController.md#addlocation)
- [addLocationToMyLocations](location_location_controller.LocationController.md#addlocationtomylocations)
- [deleteLocation](location_location_controller.LocationController.md#deletelocation)
- [getAllLocations](location_location_controller.LocationController.md#getalllocations)
- [getLocation](location_location_controller.LocationController.md#getlocation)
- [getMyLocations](location_location_controller.LocationController.md#getmylocations)
- [updateLocation](location_location_controller.LocationController.md#updatelocation)

## Constructors

### constructor

• **new LocationController**(`locationService`): [`LocationController`](location_location_controller.LocationController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `locationService` | [`LocationService`](location_location_service.LocationService.md) |

#### Returns

[`LocationController`](location_location_controller.LocationController.md)

#### Defined in

[src/location/location.controller.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L24)

## Properties

### locationService

• `Private` `Readonly` **locationService**: [`LocationService`](location_location_service.LocationService.md)

#### Defined in

[src/location/location.controller.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L24)

## Methods

### addLocation

▸ **addLocation**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`LocationDto`](location_dto_location_dto.LocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:66](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L66)

___

### addLocationToMyLocations

▸ **addLocationToMyLocations**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`LocationDto`](location_dto_location_dto.LocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:32](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L32)

___

### deleteLocation

▸ **deleteLocation**(`id`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:52](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L52)

___

### getAllLocations

▸ **getAllLocations**(): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.controller.ts:60](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L60)

___

### getLocation

▸ **getLocation**(`id`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:42](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L42)

___

### getMyLocations

▸ **getMyLocations**(`req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.controller.ts:28](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L28)

___

### updateLocation

▸ **updateLocation**(`id`, `dto`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`LocationDto`](location_dto_location_dto.LocationDto.md) |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:47](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.controller.ts#L47)
