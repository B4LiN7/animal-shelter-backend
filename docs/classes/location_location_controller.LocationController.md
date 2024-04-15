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

[src/location/location.controller.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L25)

## Properties

### locationService

• `Private` `Readonly` **locationService**: [`LocationService`](location_location_service.LocationService.md)

#### Defined in

[src/location/location.controller.ts:25](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L25)

## Methods

### addLocation

▸ **addLocation**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateLocationDto`](location_dto_create_location_dto.CreateLocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:70](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L70)

___

### addLocationToMyLocations

▸ **addLocationToMyLocations**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateLocationDto`](location_dto_create_location_dto.CreateLocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:33](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L33)

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

[src/location/location.controller.ts:56](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L56)

___

### getAllLocations

▸ **getAllLocations**(): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.controller.ts:64](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L64)

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

[src/location/location.controller.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L43)

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

[src/location/location.controller.ts:29](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L29)

___

### updateLocation

▸ **updateLocation**(`id`, `dto`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `dto` | [`UpdateLocationDto`](location_dto_update_location_dto.UpdateLocationDto.md) |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.controller.ts:48](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.controller.ts#L48)
