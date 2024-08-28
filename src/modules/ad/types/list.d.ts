import { AnimalAdNModel } from "@modules/ad/model/ad";

type ListAd ={
      data: AnimalAdNModel[];
      total: number;
      totalPages: number;
      currentPage: number;
      nextPage: number;
      prevPage: number;
    }
  | AnimalAdNModel;
