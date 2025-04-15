import { v4 as uuidv4 } from 'uuid';
import { User } from '../user.entity';

describe('User', () => {
  let userId: string;
  const username = 'testuser';
  const password = 'testpassword';
  const email = 'test@example.com';
  const roles = ['VIEWER'];
  let user: User;

  beforeEach(() => {
    userId = uuidv4();
    user = new User(userId, username, password, email, roles);
  });

  it('should create a User instance with correct properties', () => {
    expect(user.id).toBe(userId);
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
    expect(user.roles).toEqual(roles);
  });

  it('should get the id', () => {
    expect(user.id).toBe(userId);
  });

  it('should get the username', () => {
    expect(user.username).toBe(username);
  });

  it('should set the username', () => {
    const newUsername = 'updateduser';
    user.username = newUsername;
    expect(user.username).toBe(newUsername);
  });

  it('should get the password', () => {
    expect(user.password).toBe(password);
  });
});
