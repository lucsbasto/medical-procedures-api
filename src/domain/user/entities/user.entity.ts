export class User {
  private _id: string;
  private _username: string;
  private _password: string;
  private _email: string;
  private _roles: string[];

  constructor(id: string, username: string, password: string, email: string, roles?: string[]) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._email = email;
    this._roles = roles || [];
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(roles: string[]) {
    this._roles = roles;
  }
}
