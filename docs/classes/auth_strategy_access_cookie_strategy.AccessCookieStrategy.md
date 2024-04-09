[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/strategy/access-cookie.strategy](../modules/auth_strategy_access_cookie_strategy.md) / AccessCookieStrategy

# Class: AccessCookieStrategy

[auth/strategy/access-cookie.strategy](../modules/auth_strategy_access_cookie_strategy.md).AccessCookieStrategy

## Hierarchy

- `Strategy`\<`this`\>

  ↳ **`AccessCookieStrategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#constructor)

### Properties

- [jwt](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#jwt)
- [name](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#name)
- [prisma](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#prisma)

### Methods

- [authenticate](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#authenticate)
- [error](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#error)
- [fail](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#fail)
- [pass](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#pass)
- [redirect](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#redirect)
- [success](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#success)
- [validate](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md#validate)

## Constructors

### constructor

• **new AccessCookieStrategy**(`prisma`, `jwt`): [`AccessCookieStrategy`](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prisma` | [`PrismaService`](prisma_prisma_service.PrismaService.md) |
| `jwt` | `JwtService` |

#### Returns

[`AccessCookieStrategy`](auth_strategy_access_cookie_strategy.AccessCookieStrategy.md)

#### Overrides

PassportStrategy(
  Strategy,
  &#x27;jwt-access-cookie&#x27;,
).constructor

#### Defined in

[src/auth/strategy/access-cookie.strategy.ts:17](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-cookie.strategy.ts#L17)

## Properties

### jwt

• `Private` **jwt**: `JwtService`

#### Defined in

[src/auth/strategy/access-cookie.strategy.ts:19](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-cookie.strategy.ts#L19)

___

### name

• **name**: `string`

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).name

#### Defined in

node_modules/.pnpm/@types+passport-jwt@4.0.1/node_modules/@types/passport-jwt/index.d.ts:13

___

### prisma

• `Private` **prisma**: [`PrismaService`](prisma_prisma_service.PrismaService.md)

#### Defined in

[src/auth/strategy/access-cookie.strategy.ts:18](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-cookie.strategy.ts#L18)

## Methods

### authenticate

▸ **authenticate**(`req`, `options?`): `void`

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The request to authenticate. |
| `options?` | `any` | Options passed to the strategy. |

#### Returns

`void`

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).authenticate

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:20

___

### error

▸ **error**(`err`): `void`

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`void`

**`Api`**

public

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).error

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:90

___

### fail

▸ **fail**(`challenge`, `status`): `void`

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `challenge` | `any` | (Can also be an object with 'message' and 'type' fields). |
| `status` | `number` |  |

#### Returns

`void`

**`Api`**

public

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).fail

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:54

▸ **fail**(`status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |

#### Returns

`void`

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).fail

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:55

___

### pass

▸ **pass**(): `void`

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

#### Returns

`void`

**`Api`**

public

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).pass

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:78

___

### redirect

▸ **redirect**(`url`, `status?`): `void`

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `status?` | `number` |

#### Returns

`void`

**`Api`**

public

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).redirect

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:67

___

### success

▸ **success**(`user`, `info?`): `void`

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `any` |
| `info?` | `any` |

#### Returns

`void`

**`Api`**

public

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
).success

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:42

___

### validate

▸ **validate**(`request`, `payload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `payload` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/auth/strategy/access-cookie.strategy.ts:30](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-cookie.strategy.ts#L30)
