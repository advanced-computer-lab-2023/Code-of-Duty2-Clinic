# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

### Access Tokens

Access tokens are used to authenticate requests to the API. They are sent in the `Authorization` header with each request. The format of the authorization header is `Bearer {access_token}`.

### Refresh Tokens

Refresh tokens are used to obtain a new access token when the current one expires. They are stored in `HttpOnly` cookies that are automatically sent with each request. The server sets the refresh token in a `Set-Cookie` header in the response to the login request.

### Endpoints

The endpoints are grouped herein in a similar way to their grouping in the code. They are grouped according to the type of user which can make calls to the endpoints.

- [Authentication](#authentication)
- [Admin](#admin)
- [Doctor](#doctor)
- [Patient](#patient)
- [User (Multi-role endpoints)](#user-multi-role-endpoints)

## Authentication

## Admin

## Doctor

## Patient

## User (Multi-role endpoints)
