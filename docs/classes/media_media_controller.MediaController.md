[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [media/media.controller](../modules/media_media_controller.md) / MediaController

# Class: MediaController

[media/media.controller](../modules/media_media_controller.md).MediaController

## Table of contents

### Constructors

- [constructor](media_media_controller.MediaController.md#constructor)

### Properties

- [mediaService](media_media_controller.MediaController.md#mediaservice)

### Methods

- [serveMedia](media_media_controller.MediaController.md#servemedia)
- [uploadFiles](media_media_controller.MediaController.md#uploadfiles)

## Constructors

### constructor

• **new MediaController**(`mediaService`): [`MediaController`](media_media_controller.MediaController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaService` | [`MediaService`](media_media_service.MediaService.md) |

#### Returns

[`MediaController`](media_media_controller.MediaController.md)

#### Defined in

[src/media/media.controller.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.controller.ts#L22)

## Properties

### mediaService

• `Private` `Readonly` **mediaService**: [`MediaService`](media_media_service.MediaService.md)

#### Defined in

[src/media/media.controller.ts:22](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.controller.ts#L22)

## Methods

### serveMedia

▸ **serveMedia**(`path`, `res`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[src/media/media.controller.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.controller.ts#L26)

___

### uploadFiles

▸ **uploadFiles**(`files`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `File`[] |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/media/media.controller.ts:34](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.controller.ts#L34)
