import { March } from "../domain/March";

export interface IMarchInterface {
  getAllMarches(): Promise<Array<March>>
  createMarch(march: March)
}
