/**
 * Base interface for DTOs.
 *
 * @export
 * @interface IDTO
 */
export interface IDTO {
  toJSON(): any;
  toJSONString(): string;
}
