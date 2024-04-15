[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [media/media.service](../modules/media_media_service.md) / MediaService

# Class: MediaService

[media/media.service](../modules/media_media_service.md).MediaService

## Table of contents

### Constructors

- [constructor](media_media_service.MediaService.md#constructor)

### Properties

- [logger](media_media_service.MediaService.md#logger)
- [prisma](media_media_service.MediaService.md#prisma)

### Methods

- [clearUnusedFiles](media_media_service.MediaService.md#clearunusedfiles)
- [getFileLinksInDB](media_media_service.MediaService.md#getfilelinksindb)
- [getFilesInDirectory](media_media_service.MediaService.md#getfilesindirectory)
- [removeFile](media_media_service.MediaService.md#removefile)
- [serveMedia](media_media_service.MediaService.md#servemedia)
- [uploadFile](media_media_service.MediaService.md#uploadfile)
- [uploadFiles](media_media_service.MediaService.md#uploadfiles)
- [uploadSingleFile](media_media_service.MediaService.md#uploadsinglefile)

## Constructors

### constructor

• **new MediaService**(`prisma`, `logger`): [`MediaService`](media_media_service.MediaService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `logger` | `Logger` |

#### Returns

[`MediaService`](media_media_service.MediaService.md)

#### Defined in

[src/media/media.service.ts:13](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L13)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/media/media.service.ts:15](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L15)

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/media/media.service.ts:14](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L14)

## Methods

### clearUnusedFiles

▸ **clearUnusedFiles**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/media/media.service.ts:136](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L136)

___

### getFileLinksInDB

▸ **getFileLinksInDB**(`formatToUploadsFolderContext?`): `Promise`\<`string`[]\>

Get file links in the database

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `formatToUploadsFolderContext` | `boolean` | `false` | format the links to the uploads folder context (default: false) - if true, the links will be formatted to the uploads folder context (just file names) |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[src/media/media.service.ts:185](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L185)

___

### getFilesInDirectory

▸ **getFilesInDirectory**(`directory`): `Promise`\<`string`[]\>

Get files in directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `directory` | `string` | directory to get files from |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[src/media/media.service.ts:169](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L169)

___

### removeFile

▸ **removeFile**(`filePath`): `Promise`\<`void`\>

Remove file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | path of the file to remove |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/media/media.service.ts:156](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L156)

___

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

[src/media/media.service.ts:26](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L26)

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

[src/media/media.service.ts:87](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L87)

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

[src/media/media.service.ts:43](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L43)

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

[src/media/media.service.ts:73](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/media/media.service.ts#L73)
