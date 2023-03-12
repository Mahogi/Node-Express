import { RowDataPacket } from 'mysql2';

export interface ChocolateViewModel extends RowDataPacket {
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
  person: {
    id: number,
    name: string,
    surname: string,
    email: string,
    photo: string,
    isMarried: boolean,
  }
}

export type ChocolateData = Omit<ChocolateViewModel, 'id' | 'person'> & {
  personId: number,
};

export type ChocolateBody = Omit<ChocolateData, 'personId'>;
// export type ChocolateModel = PrivateChocolateModel & RowDataPacket;
// export type ChocolateData = Omit<PrivateChocolateModel, 'id'>;
export type PartialChocolateBody = Partial<ChocolateBody>;

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
