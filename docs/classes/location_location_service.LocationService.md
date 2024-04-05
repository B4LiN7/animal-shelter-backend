[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [location/location.service](../modules/location_location_service.md) / LocationService

# Class: LocationService

[location/location.service](../modules/location_location_service.md).LocationService

## Table of contents

### Constructors

- [constructor](location_location_service.LocationService.md#constructor)

### Properties

- [prisma](location_location_service.LocationService.md#prisma)
- [userHelper](location_location_service.LocationService.md#userhelper)

### Methods

- [addLocation](location_location_service.LocationService.md#addlocation)
- [addToMyLocations](location_location_service.LocationService.md#addtomylocations)
- [deleteLocation](location_location_service.LocationService.md#deletelocation)
- [getAllLocations](location_location_service.LocationService.md#getalllocations)
- [getLocation](location_location_service.LocationService.md#getlocation)
- [getMyLocations](location_location_service.LocationService.md#getmylocations)
- [updateLocation](location_location_service.LocationService.md#updatelocation)

## Constructors

### constructor

• **new LocationService**(`prisma`, `userHelper`): [`LocationService`](location_location_service.LocationService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `userHelper` | [`UserHelperService`](user_user_helper_service.UserHelperService.md) |

#### Returns

[`LocationService`](location_location_service.LocationService.md)

#### Defined in

[src/location/location.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L9)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/location/location.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L10)

___

### userHelper

• `Private` **userHelper**: [`UserHelperService`](user_user_helper_service.UserHelperService.md)

#### Defined in

[src/location/location.service.ts:11](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L11)

## Methods

### addLocation

▸ **addLocation**(`dto`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`LocationDto`](location_dto_location_dto.LocationDto.md) |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.service.ts:50](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L50)

___

### addToMyLocations

▸ **addToMyLocations**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`LocationDto`](location_dto_location_dto.LocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.service.ts:27](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L27)

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

[src/location/location.service.ts:69](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L69)

___

### getAllLocations

▸ **getAllLocations**(): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.service.ts:38](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L38)

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

[src/location/location.service.ts:42](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L42)

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

[src/location/location.service.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L14)

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

[src/location/location.service.ts:58](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/location/location.service.ts#L58)
