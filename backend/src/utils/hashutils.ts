import crypto from 'crypto';

class HashUtils {
  static hashPassword(password: string, salt: string): string {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  }

  static generateSalt(rounds: number): string {
    return crypto
      .randomBytes(Math.ceil(rounds / 2))
      .toString('hex')
      .slice(0, rounds);
  }
}

export default HashUtils;
