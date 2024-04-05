[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [prisma/exception/prisma.exception](../modules/prisma_exception_prisma_exception.md) / PrismaExceptionFilter

# Class: PrismaExceptionFilter

[prisma/exception/prisma.exception](../modules/prisma_exception_prisma_exception.md).PrismaExceptionFilter

## Implements

- `ExceptionFilter`

## Table of contents

### Constructors

- [constructor](prisma_exception_prisma_exception.PrismaExceptionFilter.md#constructor)

### Properties

- [logger](prisma_exception_prisma_exception.PrismaExceptionFilter.md#logger)

### Methods

- [catch](prisma_exception_prisma_exception.PrismaExceptionFilter.md#catch)

## Constructors

### constructor

• **new PrismaExceptionFilter**(): [`PrismaExceptionFilter`](prisma_exception_prisma_exception.PrismaExceptionFilter.md)

#### Returns

[`PrismaExceptionFilter`](prisma_exception_prisma_exception.PrismaExceptionFilter.md)

#### Defined in

[src/prisma/exception/prisma.exception.ts:9](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/exception/prisma.exception.ts#L9)

## Properties

### logger

• `Private` **logger**: `Logger`

#### Defined in

[src/prisma/exception/prisma.exception.ts:8](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/exception/prisma.exception.ts#L8)

## Methods

### catch

▸ **catch**(`exception`, `host`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `PrismaClientKnownRequestError` |
| `host` | `ArgumentsHost` |

#### Returns

`void`

#### Implementation of

ExceptionFilter.catch

#### Defined in

[src/prisma/exception/prisma.exception.ts:13](https://github.com/B4LiN7/animal-shelter-backend/blob/5a6ce9f/src/prisma/exception/prisma.exception.ts#L13)
