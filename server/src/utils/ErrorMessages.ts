export const entityIdDoesNotExistError = (
  entityName: string,
  entityId: string
) => `${entityName} with id ${entityId} does not exist`;

export const entityEmailDoesNotExistError = (
  entityName: string,
  entityEmail: string
) => `${entityName} with email ${entityEmail} does not exist`;

export const usernameOrPasswordIncorrectErrorMessage =
  "Username or password is incorrect";
