/**
 * Converts enum key to enum value by returning value as enum type
 * @param key Corresponding enum key
 * @param en Corresponding enum type
 * @returns Enum value as enum
 */
export function keyToEnum<V, T extends { [name: string]: V }>(key: string, en: T): V {
  return en[key as keyof typeof en];
}
