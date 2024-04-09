[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/strategy/access-token.strategy](../modules/auth_strategy_access_token_strategy.md) / AccessTokenStrategy

# Class: AccessTokenStrategy

[auth/strategy/access-token.strategy](../modules/auth_strategy_access_token_strategy.md).AccessTokenStrategy

## Hierarchy

- `Strategy`\<`this`\>

  ↳ **`AccessTokenStrategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_access_token_strategy.AccessTokenStrategy.md#constructor)

### Properties

- [jwt](auth_strategy_access_token_strategy.AccessTokenStrategy.md#jwt)
- [name](auth_strategy_access_token_strategy.AccessTokenStrategy.md#name)

### Methods

- [authenticate](auth_strategy_access_token_strategy.AccessTokenStrategy.md#authenticate)
- [error](auth_strategy_access_token_strategy.AccessTokenStrategy.md#error)
- [fail](auth_strategy_access_token_strategy.AccessTokenStrategy.md#fail)
- [pass](auth_strategy_access_token_strategy.AccessTokenStrategy.md#pass)
- [redirect](auth_strategy_access_token_strategy.AccessTokenStrategy.md#redirect)
- [success](auth_strategy_access_token_strategy.AccessTokenStrategy.md#success)
- [validate](auth_strategy_access_token_strategy.AccessTokenStrategy.md#validate)

## Constructors

### constructor

• **new AccessTokenStrategy**(`jwt`): [`AccessTokenStrategy`](auth_strategy_access_token_strategy.AccessTokenStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwt` | `JwtService` |

#### Returns

[`AccessTokenStrategy`](auth_strategy_access_token_strategy.AccessTokenStrategy.md)

#### Overrides

PassportStrategy(
  Strategy,
  &#x27;jwt-access-token&#x27;,
).constructor

#### Defined in

[src/auth/strategy/access-token.strategy.ts:16](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-token.strategy.ts#L16)

## Properties

### jwt

• `Private` **jwt**: `JwtService`

#### Defined in

[src/auth/strategy/access-token.strategy.ts:16](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-token.strategy.ts#L16)

___

### name

• **name**: `string`

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-token',
).name

#### Defined in

node_modules/.pnpm/@types+passport-jwt@4.0.1/node_modules/@types/passport-jwt/index.d.ts:13

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
  'jwt-access-token',
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
  'jwt-access-token',
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
  'jwt-access-token',
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
  'jwt-access-token',
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
  'jwt-access-token',
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
  'jwt-access-token',
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
  'jwt-access-token',
).success

#### Defined in

node_modules/.pnpm/@types+passport-strategy@0.2.38/node_modules/@types/passport-strategy/index.d.ts:42

___

### validate

▸ **validate**(`req`, `payload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `payload` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/auth/strategy/access-token.strategy.ts:24](https://github.com/B4LiN7/animal-shelter-backend/blob/1dff22f62fa53a2f3b721b18c90a57a5c18f4cde/src/auth/strategy/access-token.strategy.ts#L24)
