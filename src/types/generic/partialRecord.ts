/**
 * Acts like a {@link Record} but does not require all properties.
 */
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
