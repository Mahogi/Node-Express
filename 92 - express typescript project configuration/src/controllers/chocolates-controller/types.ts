import { RowDataPacket } from 'mysql2';

export interface ChocolateModel extends RowDataPacket {
// export type PrivateChocolateModel = {
  id: string,
  title: string,
  brand: string,
  ingredients: {
    cocoa: string,
    sugar: string
  },
  price: number,
  rating: number,
  hasNuts: boolean,
  chocoImages: string[],
}

export type ChocolateData = Omit<ChocolateModel, 'id'>;
// export type ChocolateModel = PrivateChocolateModel & RowDataPacket;
// export type ChocolateData = Omit<PrivateChocolateModel, 'id'>;
export type PartialChocolateData = Partial<ChocolateData>;

// export type HouseModel = {
//   id: string,
//   title: string,
//   location: {
//     country: string,
//     city: string
//   },
//   images: string[],
//   price: number,
//   rating: number,
//   hasJacuzzi: boolean,
// };

// export type HouseData = Omit<HouseModel, 'id'>;
// export type PartialHouseData = Partial<HouseData>;
