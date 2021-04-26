export {};

import { merchants } from "../../mockMerchantData";
import { editMerchant } from "./editMerchant";
import {
  addPageVisit,
  addDatabaseAccess,
  getAnalyticsData,
} from "./analytics";
import { updateProducts } from "./updateProducts";
import { makePurchase } from "./makePurchase";

export const resolvers = {
  Query: {
    merchants: () => merchants,
    getAnalyticsData,
  },
  Mutation: {
    editMerchant,
    addPageVisit,
    addDatabaseAccess,
    updateProducts,
    makePurchase,
  },
};

