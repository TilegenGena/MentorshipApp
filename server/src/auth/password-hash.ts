import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export class PasswordHash {
  private hash: string;

  private constructor(hashString: string) {
    this.hash = hashString;
  }

  static fromHashString(hashString: string): PasswordHash {
    return new PasswordHash(hashString);
  }

  static async fromPassword(password: string): Promise<PasswordHash> {
    const hashString = await bcrypt.hash(password, saltRounds);
    return new PasswordHash(hashString);
  }

  getHash(): string {
    return this.hash;
  }

  async isCorrectPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hash);
  }
}
