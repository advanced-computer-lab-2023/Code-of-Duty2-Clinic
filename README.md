# El7a2ni Clinic

<p align="center">
  <img height="190" src="client/src/assets/el7a2ni_logo.png">
</p>

A web application which allows **_Patients_** to schedule appointments for themselves and their family members and chat or call doctors, **_Doctors_** to manage their patient appointments, follow-ups and medical health records, and **_Admins_** to manage the users and system as a whole.

It is part of the larger _El7a2ni Healthcare Platform_, which also includes the [El7a2ni Pharmacy](https://github.com/advanced-computer-lab-2023/Code-of-Duty2-Pharmacy) web application.

## Table of Contents

- [Badges](#badges)
- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Screenshots](#screenshots)
- [Tech/Framework used](#techframework-used)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Tests](#tests)
- [How to Use](#how-to-use)
- [Authors](#authors)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)

## Badges

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ReactJS](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Motivation

Bringing _convenience_, _speed_, and _ease of use_ to the forefront of healthcare is our primary objective.

Our application brings a very straight-forward way for patients to interact with doctors and schedule appointments for themselves and their family members and manage their health packages. We also provide the necessary tools for Doctors and Admins to operate the system effectively and efficiently. All of our features are implemented with the user's convenience at mind, and are designed to be intuitive and easy to learn.

We provide all the necessary features that our user types require and eliminate any and all unnecessary clutter, simplifying the processes as much as possible and making it possible to learn and use the system at an extremely rapid rate.

## Build Status

- The project is currently in development.
- A CI/CD pipeline needs to be implemented.
- Testing needs to be implemented for the backend using Jest.

## Code Style

The code style is enforced using `prettier`. You can find the code formatting rules in the `.prettierrc` file.

## Screenshots

<details>
<summary>Welcome page</summary>

![Welcome page]()

</details>

## Tech/Framework used

This software uses the `MERN` technology stack. Here is a more comprehensive list of used technologies in this software:

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [Firebase](https://firebase.google.com/)
- [Gmail API](https://developers.google.com/gmail/api/guides)
- [NodeMailer](https://nodemailer.com/about/)
- [Jest](https://jestjs.io/)
- [Material-UI](https://material-ui.com/)
- [Stripe](https://stripe.com/)
- [Stripe Elements](https://stripe.com/payments/elements)
- [Typescript](https://www.typescriptlang.org/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)

## Features

The system has four user types: **_Guest_**, **_Patient_**, **_Doctor_** and **_Admin_**.

<details>

 <summary> Patient features </summary>

- </details>

<details>

 <summary> Doctors features </summary>

-

</details>

<details>

 <summary> Admin features </summary>

-

</details>

<details>

<summary> Guest features </summary>

- Sign up as a patient.
- Submit a registration request as a doctor and go through a registration process.

</details>

## Code Examples

<details>
    <summary>
    Forget Password Controller
    </summary>

```typescript
import { Request, Response } from "express";
import {
  deletePasswordResetInfo,
  sendPasswordResetOTPIfUserExists,
  validateOTP,
} from "../../services/auth/reset-password";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail, updatePassword } from "../../services/users";
import {
  signAndGetPasswordResetToken,
  verifyAndDecodePasswordResetToken,
} from "../../utils/jwt";
import { User } from "../../types/User";

export const resetPasswordRequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email is required" });
  try {
    const userData = await sendPasswordResetOTPIfUserExists(email);
    console.log(userData);
    res.status(StatusCodes.OK).json(userData);
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const deletePasswordResetInfoHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email is required" });
  try {
    const user = await findUserByEmail(email);
    await deletePasswordResetInfo(user);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset info deleted successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const validateOTPHandler = async (req: Request, res: Response) => {
  const { userData, otp } = req.body;
  if (!userData || !otp)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserData and OTP are required" });
  try {
    const user = await validateOTP(userData, otp);
    const passwordResetToken = signAndGetPasswordResetToken({
      id: user._id,
      role: userData.role,
    } as User);
    res.cookie("passwordResetToken", passwordResetToken, {
      httpOnly: true,
      expires: user.passwordReset?.expiryDate,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset OTP is correct" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Both Password and Confirm password is required" });
  if (password !== confirmPassword)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Password and Confirm password must be same" });
  try {
    const { passwordResetToken } = req.cookies;
    if (!passwordResetToken) throw new Error("Password reset token not found");
    const userData = verifyAndDecodePasswordResetToken(passwordResetToken);
    await updatePassword(userData, password);
    res.clearCookie("passwordResetToken", { httpOnly: true });
    res.status(StatusCodes.OK).json({ message: "Password reset successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

<details>
    <summary>
    code example
    </summary>

```typescript

```

</details>

## Installation

To install the project with `npm`, run the following commands in order.

```bash
> git clone https://github.com/advanced-computer-lab-2023/Code-of-Duty2-Clinic.git
> cd Code-of-Duty2-Clinic/
> cd server
> npm i
> cd ../client
> npm i
> cd ..
```

## API reference

Please refer to the `api-reference.md` file under the `docs` directory for a comprehensive understanding of the API’s capabilities and usage guidelines.

## Tests

Testing was done for this software using Postman.

![Postman](docs/screenshots/test/postman.png)

## How to Use

Please follow the following steps to run and use this software.

### Set Environment Variables

To use this software, you must first add your environment variables.
To do so, you must create two `.env` files, one directly inside the `server/` folder and the other directly inside the `client/` folder.

In each of those directories, you will find a `.env.example` file. You must copy its content and paste in your newly created `.env` files respectively. You must then fill in the values needed for each environment variable, with guidance on how to do so provided in each `.env.example` file.

**Note:** Some (and only some) environment variables can be ignored for the sake of ease of setup at the cost of the operation of one or two features, such as the Stripe API environment variables which will just prevent the credit card payment feature from working, however the rest of the system will work just fine.

### Run the Backend

```bash
> cd server
> npm run dev
```

### Run the Frontend

```bash
> cd client
> npm run dev
```

### Access the client/server on the specified ports

The client and the server will be running on the ports specified in your `.env` files respectively.

## Authors

From the **Pharmacy** Team

- [@MoTammaa](https://github.com/MoTammaa)
- [@mahmoudaboueleneen](https://github.com/mahmoudaboueleneen)

From the **Clinic** Team

- [@AbdelrahmanRewaished](https://github.com/AbdelrahmanRewaished)
- [@abdelrahmanAbouelkheir](https://github.com/abdelrahmanAbouelkheir)
- [@omarhesham02](https://github.com/omarhesham02)
- [@ahmedmonsef184](https://github.com/ahmedmonsef184)
- [@OmarAhmedAdel](https://github.com/OmarAhmedAdel)
- [@Ahmedmandil44](https://github.com/Ahmedmandil44)

## Contribute

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started. Please adhere to the `Code of Conduct` for this software outlined in said document.

## Credits

- [Linear Depression Project Repository](https://github.com/Advanced-Computer-Lab-2022/Linear-Depression)

## License

This software currently has no license in place.
