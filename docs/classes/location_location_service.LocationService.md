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

[src/location/location.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L9)

## Properties

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/location/location.service.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L9)

## Methods

### addLocation

▸ **addLocation**(`dto`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateLocationDto`](location_dto_create_location_dto.CreateLocationDto.md) |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.service.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L43)

___

### addToMyLocations

▸ **addToMyLocations**(`dto`, `req`): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | [`CreateLocationDto`](location_dto_create_location_dto.CreateLocationDto.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }\>

#### Defined in

[src/location/location.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L20)

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

[src/location/location.service.ts:62](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L62)

___

### getAllLocations

▸ **getAllLocations**(): `Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Returns

`Promise`\<\{ `address`: `string` ; `addressExtra`: `string` ; `city`: `string` ; `country`: `string` ; `locationId`: `string` ; `name`: `string` ; `state`: `string` ; `userId`: `string` ; `zipCode`: `number`  }[]\>

#### Defined in

[src/location/location.service.ts:31](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L31)

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

[src/location/location.service.ts:35](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L35)

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

[src/location/location.service.ts:11](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L11)

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

[src/location/location.service.ts:51](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/location/location.service.ts#L51)
