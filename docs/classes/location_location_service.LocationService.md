[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [location/location.service](../modules/location_location_service.md) / LocationService

# Class: LocationService

[location/location.service](../modules/location_location_service.md).LocationService

## Table of contents

### Constructors

- [constructor](location_location_service.LocationService.md#constructor)

### Properties

- [prisma](location_location_service.LocationService.md#prisma)

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

• **new LocationService**(`prisma`): [`LocationService`](location_location_service.LocationService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |

#### Returns

[`LocationService`](location_location_service.LocationService.md)

#### Defined in

[src/location/location.service.ts:8](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L8)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/location/location.service.ts:8](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L8)

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

[src/location/location.service.ts:46](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L46)

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

[src/location/location.service.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L23)

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

[src/location/location.service.ts:65](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L65)

___

### getAllLocations

▸ **getAllLocations**(): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.service.ts:34](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L34)

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

[src/location/location.service.ts:38](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L38)

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

[src/location/location.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L10)

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

[src/location/location.service.ts:54](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/location/location.service.ts#L54)
