[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [media/media.service](../modules/media_media_service.md) / MediaService

# Class: MediaService

[media/media.service](../modules/media_media_service.md).MediaService

## Table of contents

### Constructors

- [constructor](media_media_service.MediaService.md#constructor)

### Properties

- [logger](media_media_service.MediaService.md#logger)

### Methods

- [serveMedia](media_media_service.MediaService.md#servemedia)
- [uploadFile](media_media_service.MediaService.md#uploadfile)
- [uploadFiles](media_media_service.MediaService.md#uploadfiles)
- [uploadSingleFile](media_media_service.MediaService.md#uploadsinglefile)

## Constructors

### constructor

• **new MediaService**(`logger`): [`MediaService`](media_media_service.MediaService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |

#### Returns

[`MediaService`](media_media_service.MediaService.md)

#### Defined in

[src/media/media.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L10)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/media/media.service.ts:10](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L10)

## Methods

### serveMedia

▸ **serveMedia**(`reqPath`, `res`): `void`

Serve media files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reqPath` | `string` | path of the file |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`void`

- the file

#### Defined in

[src/media/media.service.ts:20](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L20)

___

### uploadFile

▸ **uploadFile**(`file`): `Promise`\<[`MediaUploadResType`](../modules/media_type_response_type.md#mediauploadrestype)\>

Upload file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | file to upload |

#### Returns

`Promise`\<[`MediaUploadResType`](../modules/media_type_response_type.md#mediauploadrestype)\>

- status of the upload

#### Defined in

[src/media/media.service.ts:81](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L81)

___

### uploadFiles

▸ **uploadFiles**(`files`, `res`): `Promise`\<`void`\>

Upload files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `File`[] | array of files |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/media/media.service.ts:37](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L37)

___

### uploadSingleFile

▸ **uploadSingleFile**(`file`, `res`): `Promise`\<`void`\>

Upload single file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | file to upload |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> | Response object |

#### Returns

`Promise`\<`void`\>

- status of the upload

#### Defined in

[src/media/media.service.ts:67](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/media/media.service.ts#L67)
