# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

### Access Tokens

Access tokens are used to authenticate requests to the API. They are sent in the `Authorization` header with each request. The format of the authorization header is `Bearer {access_token}`.

### Refresh Tokens

Refresh tokens are used to obtain a new access token when the current one expires. They are stored in `HttpOnly` cookies that are automatically sent with each request. The server sets the refresh token in a `Set-Cookie` header in the response to the login request.

### Endpoints

The endpoints are grouped herein in a similar way to their grouping in the code. They are grouped according to the type of user which can make calls to the endpoints.

**Note:** All endpoint URLs provided should be preceded by the server's URL.

- [Authentication](#authentication)
- [Admin](#admin)
- [Doctor](#doctor)
- [Patient](#patient)
- [User (Multi-role endpoints)](#user-multi-role-endpoints)

## Authentication

<details>
<summary>Patient or Admin Login</summary>

```http
  POST /api/v1/auth/login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type     | Description                                                 |
| :--------- | :------- | :---------------------------------------------------------- |
| `username` | `string` | **Required**. Username of the account of a Patient or Admin |
| `password` | `string` | **Required**. Password of the corresponding account.        |

</details>

<details>
<summary>Doctor Login</summary>

```http
  POST /api/v1/auth/doctor-login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type     | Description                                          |
| :--------- | :------- | :--------------------------------------------------- |
| `username` | `string` | **Required**. Username of the account of a Doctor.   |
| `password` | `string` | **Required**. Password of the corresponding account. |

</details>

<details>
<summary>Logout</summary>

```http
  POST /api/v1/auth/logout/
```

| Header Parameter | Type     | Description                                                                         |
| :--------------- | :------- | :---------------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient, Doctor or Admin. |

Invalidates the refresh token of the user.

</details>

<details>
<summary>Refresh the access token</summary>

```http
  POST /api/v1/auth/refresh-token/
```

Returns a new access token.

| Header Parameter | Type     | Description                                               |
| :--------------- | :------- | :-------------------------------------------------------- |
| `Cookie`         | `string` | **Required**. Refresh token previously set by the server. |

</details>

<details>
<summary>Register as Patient</summary>

```http
  POST /api/v1/auth/registration
```

Registers a new patient.

| Body Field         | Type     | Description                                     |
| :----------------- | :------- | :---------------------------------------------- |
| `username`         | `string` | **Required**. Username of the new patient.      |
| `name`             | `string` | **Required**. Name of the new patient.          |
| `email`            | `string` | **Required**. Email of the new patient.         |
| `password`         | `string` | **Required**. Password of the new patient.      |
| `dateOfBirth`      | `Date`   | **Required**. Date of birth of the new patient. |
| `gender`           | `string` | **Required**. Gender of the new patient.        |
| `mobileNumber`     | `string` | **Required**. Mobile number of the new patient. |
| `emergencyContact` | `object` | **Required**. Username of the new patient.      |

#### `emergencyContact` object:

| Attribute           | Type     | Description                                                     |
| :------------------ | :------- | :-------------------------------------------------------------- |
| `fullname`          | `string` | **Required**. Full name of the emergency contact.               |
| `mobileNumber`      | `string` | **Required**. Mobile number of the emergency contact            |
| `relationToPatient` | `string` | **Required**. Relation of the emergency contact to the patient. |

</details>

<details>
<summary>Register as Doctor</summary>

```http
  POST /api/v1/auth/doctor-registration
```

Registers a new doctor registration request.

| Body Field              | Type     | Description                                                        |
| :---------------------- | :------- | :----------------------------------------------------------------- |
| `username`              | `string` | **Required**. Username of the new doctor.                          |
| `name`                  | `string` | **Required**. Name of the new doctor.                              |
| `email`                 | `string` | **Required**. Email of the new doctor.                             |
| `password`              | `string` | **Required**. Password of the new doctor.                          |
| `dateOfBirth`           | `Date`   | **Required**. Date of birth of the new doctor.                     |
| `hourlyRate`            | `number` | **Required**. Hourly rate for the pay of the new doctor.           |
| `affiliation`           | `string` | **Required**. Hospital to which the new doctor is affiliated with. |
| `educationalBackground` | `string` | **Required**. Educational background of the new doctor.            |

</details>

<details>
<summary>Reset Password Request</summary>

```http
  POST /api/v1/auth/reset-password-request
```

Initiates a request for a password reset and sends OTP to the provided email.

| Body Field | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User's email. |

</details>

<details>
<summary>Delete Password Reset Info</summary>

```http
  DELETE /api/v1/auth/delete-password-reset-info
```

Deletes/Invalidates password reset information/OTP

| Body Field | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User's email. |

</details>

<details>
<summary>Validate Password Reset Info</summary>

```http
  POST /api/v1/auth/validate-password-reset-info
```

Validates the OTP for password reset.

| Body Field | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `userData` | `object` | **Required**. User's data.            |
| `otp`      | `string` | **Required**. OTP for password reset. |

#### `userData` object:

| Attribute | Type     | Description                                                            |
| :-------- | :------- | :--------------------------------------------------------------------- |
| `id`      | `object` | **Required**. Database ID of the user.                                 |
| `role`    | `string` | **Required**. Role of the user (admin, patient, or admin in this case) |

</details>

<details>
<summary>Reset Password</summary>

```http
  POST /api/v1/auth/reset-password
```

Resets the user’s password.

| Body Field        | Type     | Description                                     |
| :---------------- | :------- | :---------------------------------------------- |
| `password`        | `string` | **Required**. New password.                     |
| `confirmPassword` | `string` | **Required**. Confirmation of the new password. |

</details>

## Admin

## Doctor

## Patient

## User (Multi-role endpoints)
