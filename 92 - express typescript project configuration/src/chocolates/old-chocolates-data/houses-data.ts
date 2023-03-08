// import { HouseModel } from './types';
//
// const houses: HouseModel[] = [
//   {
//     id: '1',
//     title: 'Earth Hobbit House',
//     location: {
//       country: 'Germany',
//       city: 'Greifenstein',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/2cad476b-ec88-4384-b1d8-ace46b2fab3b.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/b0ebf587-56ee-4b15-88c3-f6b5a391a5b5.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/miso/Hosting-718023/original/68c9bf4d-272e-4454-99b8-570a0e6972a3.jpeg?im_w=720',
//     ],
//     price: 233,
//     rating: 4.68,
//     hasJacuzzi: false,
//   },
//   {
//     id: '2',
//     title: 'Hut Lago Maggiore',
//     location: {
//       country: 'Italy',
//       city: 'Miazzina',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/c655192a-7599-4e77-a2ee-a42f4365d7b4.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/miso/Hosting-44485429/original/69090a60-fa82-4f23-8eb0-c751c2a5c6d8.jpeg?im_w=1440',
//       'https://a0.muscache.com/im/pictures/miso/Hosting-44485429/original/fb96ba3b-23ef-4485-a0a3-3d16c3eecd35.jpeg?im_w=720',
//     ],
//     price: 62,
//     rating: 4.24,
//     hasJacuzzi: true,
//   },
//   {
//     id: '3',
//     title: 'Jarga Clay hut year-round',
//     location: {
//       country: 'Poland',
//       city: 'Biernacice',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/81e7bf0c-3933-4fd0-9eb3-d78d878b8f7c.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/5bda35a7-3178-4db8-94ff-1650b13636ce.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/4bf9a8b0-b560-4335-8386-8191888d215d.jpg?im_w=720',
//     ],
//     price: 82,
//     rating: 3,
//     hasJacuzzi: false,
//   },
//   {
//     id: '4',
//     title: 'Architect surfhouse',
//     location: {
//       country: 'Sweden',
//       city: 'Gotland',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/b36fa73a-26bc-4b2c-9198-1fe1c2c967e8.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/0ad4a34d-051b-4128-98dd-2364208ac9a6.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/f5598280-d070-44e5-9ddc-7dd79ea6b83c.jpg?im_w=720',
//     ],
//     price: 269,
//     rating: 4.45,
//     hasJacuzzi: true,
//   },
//   {
//     id: '5',
//     title: 'Eco Strawbale Retreat',
//     location: {
//       country: 'Poland',
//       city: 'Przełomka',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/e1c7ecbf-f8f6-446c-99de-a31c472eba98.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/45c3ec2f-16ff-4646-9152-6489913a0617.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/23e05999-701d-443e-8e59-efc1037472fb.jpg?im_w=720',
//     ],
//     price: 45,
//     rating: 4.98,
//     hasJacuzzi: false,
//   },
//   {
//     id: '6',
//     title: 'Peaceful Earth House',
//     location: {
//       country: 'Hungary',
//       city: 'Paloznak',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/473dd677-d71f-42f8-82e7-b3dc880d22ba.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/bc79a9c5-ae13-435c-ad71-c0abc58a7856.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/5bfa1537-029f-4a59-9ce8-8216079139dd.jpg?im_w=720',
//     ],
//     price: 71,
//     rating: 4.2,
//     hasJacuzzi: false,
//   },
//   {
//     id: '7',
//     title: 'Silver Check Holiday Home',
//     location: {
//       country: 'Italy',
//       city: 'Lombardia',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/miso/Hosting-29557492/original/15099f1f-40fa-4fd3-83c4-0e6e9fa063be.jpeg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/93fb5cac-4dcf-4af8-aa56-2bb2ddee9394.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/24914ad9-bd28-4f61-8a7a-d09037ca70f0.jpg?im_w=720',
//     ],
//     price: 66,
//     rating: 4.87,
//     hasJacuzzi: true,
//   },
//   {
//     id: '8',
//     title: 'Apartment villa Casa Storia',
//     location: {
//       country: 'Croatia',
//       city: 'Veprinac',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/9524c985-bdea-40ae-99b5-a98cd37bcb1a.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/miso/Hosting-23247852/original/f6492f76-7856-401f-a89d-bfc7e22e2f61.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/baf5a240-e031-4e8e-9b41-e6e6b0888942.jpg?im_w=720',
//     ],
//     price: 146,
//     rating: 4.34,
//     hasJacuzzi: false,
//   },
//   {
//     id: '9',
//     title: 'Large and modern cabin',
//     location: {
//       country: 'Norway',
//       city: 'Lillehammer',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/c670d367-c24b-43bd-921a-0f3bab59489c.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/37654cc0-3eb1-4849-a3ea-fa1250b2164f.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/b2fb15bf-0a7e-4691-bf51-a8aad2597104.jpg?im_w=720',
//     ],
//     price: 388,
//     rating: 4.18,
//     hasJacuzzi: true,
//   },
//   {
//     id: '10',
//     title: 'Norka Nizilka in Old Pompka',
//     location: {
//       country: 'Poland',
//       city: 'Czeremcha',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/a4420040-88bb-4809-ac24-e9c7f005f0ed.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/miso/Hosting-46637050/original/a6cd4ab6-ec38-4c36-9437-cddf076f45cc.jpeg?im_w=720',
//       'https://a0.muscache.com/im/pictures/a0fb396e-e381-45e5-b6a0-e91e274da967.jpg?im_w=720',
//     ],
//     price: 57,
//     rating: 4.68,
//     hasJacuzzi: false,
//   },
//   {
//     id: '11',
//     title: 'SA FONDA Ecolodge',
//     location: {
//       country: 'Morocco',
//       city: 'Tamesluht',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/228e9151-97c8-4e44-83fc-52993da09761.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/9f23b388-d955-41d7-9e0a-8eb2daa23be7.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/5641cb6e-2477-4a93-b471-cf34e8972e8e.jpg?im_w=720',
//     ],
//     price: 439,
//     rating: 3.75,
//     hasJacuzzi: false,
//   },
//   {
//     id: '12',
//     title: 'Tahoe Stonehenge',
//     location: {
//       country: 'California',
//       city: 'South Lake Tahoe',
//     },
//     images: [
//       'https://a0.muscache.com/im/pictures/6f661499-126e-4228-b9a6-4e023c2933a4.jpg?im_w=1200',
//       'https://a0.muscache.com/im/pictures/7b19aea3-0728-4c7b-8afa-a964e1f78f34.jpg?im_w=720',
//       'https://a0.muscache.com/im/pictures/92989ae2-f7f6-42b6-bf56-101d94053f8c.jpg?im_w=720',
//     ],
//     price: 923,
//     rating: 5,
//     hasJacuzzi: true,
//   },
// ];
//
// export default houses;
