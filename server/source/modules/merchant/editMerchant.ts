interface IEditMerchantData {
  index: number;
  publishedState: boolean;
}

import { merchants } from "../../mockMerchantData";

/*****************************************************************
 * Edits a merchant's published state
 * @param _root   - Root value. Undefined by default
 * @param data    - Data arguments for the mutation
 * @returns       - Edited merchant
 *****************************************************************/
export const editMerchant = (_root: undefined, data: IEditMerchantData) => {
  const { index, publishedState } = data;
  merchants[index].publishedState = publishedState;
  return merchants[index];
};

