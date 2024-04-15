[animal-shelter-backend](../README.md) / [Exports](../modules.md) / [auth/strategy/refresh-cookie.strategy](../modules/auth_strategy_refresh_cookie_strategy.md) / JwtAccessCookieStrategy

# Class: JwtAccessCookieStrategy

[auth/strategy/refresh-cookie.strategy](../modules/auth_strategy_refresh_cookie_strategy.md).JwtAccessCookieStrategy

## Hierarchy

- `Strategy`\<`this`\>

  ↳ **`JwtAccessCookieStrategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#constructor)

### Properties

- [name](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#name)

### Methods

- [authenticate](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#authenticate)
- [error](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#error)
- [fail](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#fail)
- [pass](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#pass)
- [redirect](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#redirect)
- [success](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#success)
- [validate](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md#validate)

## Constructors

### constructor

• **new JwtAccessCookieStrategy**(): [`JwtAccessCookieStrategy`](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md)

#### Returns

[`JwtAccessCookieStrategy`](auth_strategy_refresh_cookie_strategy.JwtAccessCookieStrategy.md)

#### Overrides

PassportStrategy(
  Strategy,
  &#x27;jwt-access-cookie&#x27;,
).constructor

#### Defined in

[src/auth/strategy/refresh-cookie.strategy.ts:13](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/strategy/refresh-cookie.strategy.ts#L13)

## Properties

### name

• **name**: `string`

#### Inherited from

PassportStrategy(
  Strategy,
  'jwt-access-cookie',
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

▸ **validate**(`payload`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/auth/strategy/refresh-cookie.strategy.ts:23](https://github.com/B4LiN7/animal-shelter-backend/blob/433cf0c1c0d87c638e9f68cdba4d5975f6f24447/src/auth/strategy/refresh-cookie.strategy.ts#L23)
