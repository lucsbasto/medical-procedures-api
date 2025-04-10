export interface ICacheProvider {
  del(key: string): Promise<void>;
  get(key: string): Promise<string | null>;
  set(key: string, ttl: number, value: string): Promise<void>;
}

export const ICacheProvider = Symbol('ICacheProvider');
