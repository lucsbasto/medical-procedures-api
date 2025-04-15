import * as bcrypt from 'bcrypt';

export class Password {
  private static SALT_ROUNDS = 10;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, Password.SALT_ROUNDS);
  }

  static async compare(plainText: string, hashed: string): Promise<boolean> {
    try {
      return bcrypt.compare(plainText, hashed);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }
}
