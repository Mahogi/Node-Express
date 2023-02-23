export type HouseModel = {
  id: string,
  title: string,
  location: {
    country: string,
    city: string
  },
  images: string[],
  price: number,
  rating: number,
  hasJacuzzi: boolean,
};

export type HouseData = Omit<HouseModel, 'id'>;
export type PartialHouseData = Partial<HouseData>;
