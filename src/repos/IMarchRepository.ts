import { March } from "../domain/March";

export interface IMarchRepository {
  getAllMarches(): Promise<Array<March>>
}
