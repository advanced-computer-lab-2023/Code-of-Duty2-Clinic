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
  - [Unverified Doctor](#unverified-doctor)

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

<details>
<summary>Add Health Package</summary>

```http
  POST /api/v1/admins/health-packages
```

Adds a new health package.

| Body Field               | Type     | Description                                                 |
| :----------------------- | :------- | :---------------------------------------------------------- |
| `name`                   | `string` | **Required**. The name of the health package.               |
| `amountToPay`            | `number` | **Required**. The amount to pay for the health package.     |
| `packageDurationInYears` | `number` | **Required**. The duration of the health package in years.  |
| `discounts`              | `object` | **Required**. The discounts provided by the health package. |

#### `discounts` object:

| Attribute                         | Type     | Description                                        |
| :-------------------------------- | :------- | :------------------------------------------------- |
| `gainedDoctorSessionDiscount`     | `number` | **Required**. The discount for doctor sessions.    |
| `gainedPharmacyMedicinesDiscount` | `number` | **Required**. The discount for pharmacy medicines. |
| `gainedFamilyMembersDiscount`     | `number` | **Required**. The discount for family members.     |

</details>

<details>
<summary>Get All Health Packages</summary>

```http
GET /api/v1/admins/health-packages
```

Retrieves all available health packages. No parameters are required for this endpoint.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get a Health Package</summary>

```http
GET /api/v1/admins/health-packages/:id
```

Retrieves a specific health package by ID.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Update a Health Package</summary>

```http
PUT /api/v1/admins/health-packages/:id
```

Updates a specific health package by ID.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Delete a Health Package</summary>

```http
DELETE /api/v1/admins/health-packages/:id
```

Deletes a specific health package by ID.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Add Admin</summary>

```http
POST /api/v1/admins/admin
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get Doctor Registration Request by Email</summary>

```http
GET /api/v1/admins/doctor-registration-requests/:email
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get Doctor Registration Request by ID</summary>

```http
GET /api/v1/admins/doctor-registration/:doctorId
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Accept Doctor Registration Request by Username</summary>

```http
POST /api/v1/admins/acceptDoctor/:username
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Reject Doctor Registration Request by Username</summary>

```http
POST /api/v1/admins/rejectDoctor/:username
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Remove User</summary>

```http
DELETE /api/v1/admins/users
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>View Users by Type</summary>

```http
GET /api/v1/admins/users/:Type
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get All Doctor Registration Requests</summary>

```http
GET /api/v1/admins/doctor-registration-requests
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Update Admin Password</summary>

```http
PATCH /api/v1/admins/change-password
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Reject Doctor Registration Request by ID</summary>

```http
PUT /api/v1/admins/rejectDoctor/:doctorId
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Accept Doctor Registration Request</summary>

```http
PUT /api/v1/admins/accept-doctor/:doctorId
```

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

## Doctor

<details>
<summary>Get Doctor Account</summary>

\`\`\`http
GET /api/v1/doctors/account
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Update Doctor Account</summary>

\`\`\`http
PATCH /api/v1/doctors/account
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Doctor's Patients</summary>

\`\`\`http
GET /api/v1/doctors/patients
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Registered Patient Details</summary>

\`\`\`http
GET /api/v1/doctors/patients/:patientId
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Doctor By ID</summary>

\`\`\`http
GET /api/v1/doctors
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Doctor Schedule</summary>

\`\`\`http
GET /api/v1/doctors/schedule
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Add Doctor Schedule</summary>

\`\`\`http
POST /api/v1/doctors/schedule
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Update Doctor Password</summary>

\`\`\`http
PATCH /api/v1/doctors/change-password
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Schedule Follow Up Appointment</summary>

\`\`\`http
POST /api/v1/doctors/appointments/:patientId/follow-up
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Delete Doctor Working Slot</summary>

\`\`\`http
DELETE /api/v1/doctors/available-time-slots/:startTime
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Add Patient Health Record</summary>

\`\`\`http
PUT /api/v1/doctors/patients/:patientId/health-records
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get All Appointments</summary>

\`\`\`http
GET /api/v1/doctors/appointments
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Appointment Details</summary>

\`\`\`http
GET /api/v1/doctors/appointments/:appointmentId
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Doctor By ID</summary>

\`\`\`http
GET /api/v1/doctors
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Check If Doctor Has Wallet</summary>

\`\`\`http
GET /api/v1/doctors/wallets/exists
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Validate Wallet Pin Code</summary>

\`\`\`http
POST /api/v1/doctors/validate-wallet-pin-code
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Add Wallet to Doctor</summary>

\`\`\`http
POST /api/v1/doctors/wallets
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Get Doctor Wallet</summary>

\`\`\`http
GET /api/v1/doctors/wallets
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Perform Wallet Transaction</summary>

\`\`\`http
PATCH /api/v1/doctors/wallet-transactions
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Recharge Doctor Wallet</summary>

\`\`\`http
PATCH /api/v1/doctors/wallet-recharge
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Configure Credit Card Payment</summary>

\`\`\`http
GET /api/v1/doctors/credit-card-configuration
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Make Credit Card Payment</summary>

\`\`\`http
POST /api/v1/doctors/credit-card-payment
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Reject Follow Up Request for Registered</summary>

\`\`\`http
PATCH /api/v1/doctors/reject-follow-up-request-for-registered
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Accept Follow Up Request for Registered</summary>

\`\`\`http
POST /api/v1/doctors/accept-follow-up-request-for-registered
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Reject Follow Up Request for Dependent</summary>

\`\`\`http
PATCH /api/v1/doctors/reject-follow-up-request-for-dependent
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

<details>
<summary>Accept Follow Up Request for Dependent</summary>

\`\`\`http
POST /api/v1/doctors/accept-follow-up-request-for-dependent
\`\`\`

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

</details>

## Patient

<details>
<summary>Get Appointments With All Doctors</summary>

\`\`\`http
GET /api/v1/patients/appointments
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Doctor Appointment Fees</summary>

\`\`\`http
GET /api/v1/patients/appointments/:doctorId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Book An Appointment</summary>

\`\`\`http
POST /api/v1/patients/appointments/:doctorId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Book An Appointment For A Registered Family Member</summary>

\`\`\`http
POST /api/v1/patients/registered-family-members/:familyMemberId/appointments/:doctorId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Book An Appointment For A Dependent Family Member</summary>

\`\`\`http
POST /api/v1/patients/dependent-family-members/:dependentNationalId/appointments/:doctorId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get All Doctors</summary>

\`\`\`http
GET /api/v1/patients/doctors
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Doctor By ID</summary>

\`\`\`http
GET /api/v1/patients/doctors/:doctorId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Doctors</summary>

\`\`\`http
GET /api/v1/patients/patient-doctors
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Doctor Schedule</summary>

\`\`\`http
GET /api/v1/patients/doctors/:doctorId/schedule
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add Family Members</summary>

\`\`\`http
POST /api/v1/patients/family-members
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Registered Family Member Requests</summary>

\`\`\`http
GET /api/v1/patients/family-members/requests
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Registered Family Member By ID</summary>

\`\`\`http
GET /api/v1/patients/family-members/:familyMemberId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add Patient Registered Family Member</summary>

\`\`\`http
POST /api/v1/patients/family-members/registered
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Delete Patient Registered Family Member</summary>

\`\`\`http
DELETE /api/v1/patients/family-members/registered
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Reject Patient Registered Family Member</summary>

\`\`\`http
POST /api/v1/patients/family-members/requests/:familyMemberId/reject
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Registered Family Members</summary>

\`\`\`http
GET /api/v1/patients/family-members
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Dependent Family Members</summary>

\`\`\`http
GET /api/v1/patients/dependent-family-members
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Follow Up Requests For Dependent</summary>

\`\`\`http
GET /api/v1/patients/follow-up-requests-for-dependent
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Follow Up Request For Dependent</summary>

\`\`\`http
POST /api/v1/patients/follow-up-requests-for-dependent
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Follow Up Requests For Registered</summary>

\`\`\`http
GET /api/v1/patients/follow-up-requests-for-registered
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Follow Up Request For Registered</summary>

\`\`\`http
POST /api/v1/patients/follow-up-requests-for-registered
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Health Records</summary>

\`\`\`http
GET /api/v1/patients/health-records
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add Patient Health Record</summary>

\`\`\`http
PUT /api/v1/patients/health-records
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Delete Patient Health Record</summary>

\`\`\`http
DELETE /api/v1/patients/health-records
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Health Packages Options</summary>

\`\`\`http
GET /api/v1/patients/health-packages
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Subscribe to Health Package</summary>

\`\`\`http
POST /api/v1/patients/subscribe/:packageId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Subscribe Registered Member to Health Package</summary>

\`\`\`http
POST /api/v1/patients/registered-members/:patientId/subscribe/:packageId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Subscribe Dependent Member to Health Package</summary>

\`\`\`http
POST /api/v1/patients/dependent-members/:dependentNid/subscribe/:packageId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Subscribed Health Package</summary>

\`\`\`http
GET /api/v1/patients/patient-health-package
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Subscribed Package Details for Dependent</summary>

\`\`\`http
GET /api/v1/patients/package-dependent
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Health Care Package Status</summary>

\`\`\`http
GET /api/v1/patients/health-care-package-status
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Subscribed Health Package Details for Dependent Family Member</summary>

\`\`\`http
GET /api/v1/patients/dependent-family-members/:patientNId/health-package
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Subscribed Health Package Details for Registered Family Member</summary>

\`\`\`http
GET /api/v1/patients/registered-family-members/:patientId/health-package
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Cancel Subscription</summary>

\`\`\`http
PATCH /api/v1/patients/cancel-subscription
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Cancel Subscription for Registered Family Member</summary>

\`\`\`http
PATCH /api/v1/patients/cancel-subscription/:patientId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Cancel Subscription for Dependent Family Member</summary>

\`\`\`http
PATCH /api/v1/patients/cancel-subscription-dependent/:dependentNid
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>View Subscribed Health Package Benefits</summary>

\`\`\`http
GET /api/v1/patients/package-benefits
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Cancel Subscription for Registered Family</summary>

\`\`\`http
PATCH /api/v1/patients/registered-family/cancel-subscription
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Health Package</summary>

\`\`\`http
GET /api/v1/patients/health-packages/:packageId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Info</summary>

\`\`\`http
GET /api/v1/patients/patient-info
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Change Patient Password</summary>

\`\`\`http
PATCH /api/v1/patients/change-password
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Check if Patient Has a Wallet</summary>

\`\`\`http
GET /api/v1/patients/wallets/exists
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Validate Wallet Pin Code</summary>

\`\`\`http
POST /api/v1/patients/validate-wallet-pin-code
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add Wallet to Patient</summary>

\`\`\`http
POST /api/v1/patients/wallets
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient Wallet</summary>

\`\`\`http
GET /api/v1/patients/wallets
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Perform Wallet Transaction</summary>

\`\`\`http
PATCH /api/v1/patients/wallet-transactions
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Recharge Patient Wallet</summary>

\`\`\`http
PATCH /api/v1/patients/wallet-recharge
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Payment Configuration</summary>

\`\`\`http
GET /api/v1/patients/payments/configuration
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Payment Intent</summary>

\`\`\`http
POST /api/v1/patients/payments/create-payment-intent
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Patient by ID</summary>

\`\`\`http
GET /api/v1/patients/:patientId
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Search Patient</summary>

\`\`\`http
GET /api/v1/patients/search
\`\`\`

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get Patient Prescriptions</summary>

\`\`\`http
GET /api/v1/patients/prescriptions
\`\`\`

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

## User (Multi-role endpoints)

### Unverified Doctor

<details>
<summary>Add Doctor Registration Request Files</summary>

\`\`\`http
PUT /api/v1/users/doctor-registration
\`\`\`

| Header Parameter | Type     | Description                                                                  |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Unverified Doctor. |

</details>

<details>
<summary>Accept Doctor Registration Request</summary>

\`\`\`http
POST /api/v1/users/accept-contract
\`\`\`

| Header Parameter | Type     | Description                                                                  |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Unverified Doctor. |

</details>

<details>
<summary>Reject Contract</summary>

\`\`\`http
POST /api/v1/users/reject-contract
\`\`\`

| Header Parameter | Type     | Description                                                                  |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Unverified Doctor. |

</details>

<details>
<summary>Get Doctor Contract</summary>

\`\`\`http
GET /api/v1/users/contract
\`\`\`

| Header Parameter | Type     | Description                                                                  |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Unverified Doctor. |

</details>
