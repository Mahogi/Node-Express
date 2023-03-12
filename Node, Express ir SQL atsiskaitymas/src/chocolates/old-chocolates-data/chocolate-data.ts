import { ChocolateViewModel } from '../types';

const chocolates: ChocolateViewModel[] = [
  {
    id: '1',
    title: 'Dark Chocolate',
    brand: 'Amul',
    ingredients: {
      cocoa: '55%',
      sugar: '43g',
    },
    chocoImages: [
      'https://bettyfresh.com/1712-large_default/amul-dark-chocolate-150g-rp1001.jpg',
      'https://www.foodsarena.xyz/wp-content/uploads/2022/09/amul-dark-chocolate-in-bangladesh-1.jpg',
      'https://rukminim1.flixcart.com/image/416/416/kpa39u80/chocolate/g/c/5/150-dark-chocolate-150-gm-1-amul-original-imag3jwg8pkumerh.jpeg?q=70',
    ],
    price: 3.99,
    rating: 4.68,
    hasNuts: false,
  },
  {
    id: '2',
    title: 'Kit Kat',
    brand: 'Nestlé',
    ingredients: {
      cocoa: '10%',
      sugar: '46g',
    },
    chocoImages: [
      'https://cdn.barbora.lt/products/860223f6-74d3-45e5-8e8d-dbae0899cd94_m.png',
      'https://scontent.fvno2-1.fna.fbcdn.net/v/t39.30808-6/240999660_4399188920148113_1975985748266501935_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=QsKu3YhW0dsAX9paNGv&_nc_ht=scontent.fvno2-1.fna&oh=00_AfAgEWpIDng0QZ2f5VoaBOQoXga9Flrrx_jdqXLrynl4BA&oe=6401FF43',
    ],
    price: 3.59,
    rating: 4.24,
    hasNuts: false,
  },
  {
    id: '3',
    title: 'Cocoa Creations',
    brand: 'Hershey’s',
    ingredients: {
      cocoa: '49%',
      sugar: '33g',
    },
    chocoImages: [
      'https://cdn.shopify.com/s/files/1/0587/1950/2389/products/71OXtjMhBCL._AC_SL1500.jpg?v=1659960168',
      'https://m.media-amazon.com/images/I/81AATqSwsSL.jpg',
      'https://m.media-amazon.com/images/I/81kkpdZCezL._AC_UF894,1000_QL80_.jpg',
    ],
    price: 4.99,
    rating: 3.9,
    hasNuts: true,
  },
  {
    id: '4',
    title: 'Toffee Wholenut',
    brand: 'Milka',
    ingredients: {
      cocoa: '9%',
      sugar: '49g',
    },
    chocoImages: [
      'https://cdn.barbora.lt/products/5e2e720f-deac-4c50-9b10-ea74bf4e7d76_m.png',
      'https://res.cloudinary.com/dj484tw6k/image/upload/v1663627758/92679_813.png',
    ],
    price: 3.99,
    rating: 4.45,
    hasNuts: true,
  },
  {
    id: '5',
    title: 'Protein',
    brand: 'Mars',
    ingredients: {
      cocoa: '23%',
      sugar: '35g',
    },
    chocoImages: [
      'https://www.marsbar.co.uk/cdn-cgi/image/width=600,height=600,f=auto,quality=90/sites/g/files/fnmzdf646/files/migrate-product-files/bjlm6oe7mdye7hvylujs.png',
      'https://www.adiada.lt/images_mod/products/mars-hi-protein-bar-valgubatoon-66-g962533.jpg',
      'https://papildistas.lt/5261-large_default/snickers-hi-protein-peanut-brownie-grynasis-kiekis-50g.jpg',
    ],
    price: 1.99,
    rating: 4.98,
    hasNuts: false,
  },
  {
    id: '6',
    title: 'Dinky Deckers',
    brand: 'Cadbury',
    ingredients: {
      cocoa: '18%',
      sugar: '15g',
    },
    chocoImages: [
      'https://images.sweetauthoring.com/product/85552.png',
      'https://onetreatatatime.files.wordpress.com/2016/08/dscf3313-2.jpg?w=663',
    ],
    price: 1.99,
    rating: 4.2,
    hasNuts: false,
  },
  {
    id: '7',
    title: 'Gold Collection',
    brand: 'Godiva',
    ingredients: {
      cocoa: '33%',
      sugar: '35g',
    },
    chocoImages: [
      'https://www.godiva.com/dw/image/v2/AAKG_PRD/on/demandware.static/-/Sites-godiva-master-catalog-us/default/dwbedb3abb/product_images/13962-1.jpg',
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Godiva_Chocolatier_Logo.svg/200px-Godiva_Chocolatier_Logo.svg.png',
    ],
    price: 110,
    rating: 5,
    hasNuts: true,
  },
  {
    id: '8',
    title: 'Almond Brittle',
    brand: 'Dove',
    ingredients: {
      cocoa: '10%',
      sugar: '45g',
    },
    chocoImages: [
      'https://i5.walmartimages.com/asr/32055ec3-fc1d-4134-be44-0dc72ccdf31f.1211b0899dd2aa95ceed8135c4ae29d2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      'https://cdn.shopify.com/s/files/1/0634/5592/0349/products/dove-chocolate-bar-almond-scaled.jpg?v=1648326566',
      'https://images.heb.com/is/image/HEBGrocery/000931692',
    ],
    price: 5.15,
    rating: 4.34,
    hasNuts: true,
  },
  {
    id: '9',
    title: 'Milk Chocolate Caramel',
    brand: 'Ghirardelli',
    ingredients: {
      cocoa: '6%',
      sugar: '55g',
    },
    chocoImages: [
      'https://i.pinimg.com/564x/93/3c/71/933c71abcd8edce86fe1fba42ea21555.jpg',
      'https://s7.orientaltrading.com/is/image/OrientalTrading/FXBanner_808/ghirardelli-chocolate-squares-milk-and-caramel-9-04-oz-2-pack~14273444.jpg',
    ],
    price: 4.41,
    rating: 4.18,
    hasNuts: false,
  },
  {
    id: '10',
    title: 'Duo',
    brand: 'Kinder',
    ingredients: {
      cocoa: '11%',
      sugar: '44g',
    },
    chocoImages: [
      'https://cdn.shopify.com/s/files/1/0923/2910/products/KinderDuoBiscuits-Chocolate_MoreDelights_grande.jpg?v=1674814613',
      'https://lofficinadelgusto.com/wp-content/uploads/2022/11/kinder-duo.jpg',
      'https://www.worldofsweets.de/out/pictures/generated/product/4/540_340_75/kinder-duo-biscuits-12er-no4-3524.jpg',
    ],
    price: 4.99,
    rating: 4.68,
    hasNuts: false,
  },
  {
    id: '11',
    title: 'Gourmet Chocolate Gift Box',
    brand: 'Ferrero Rocher',
    ingredients: {
      cocoa: '22%',
      sugar: '31g',
    },
    chocoImages: [
      'https://target.scene7.com/is/image/Target/GUEST_eddcc55d-249b-4b7d-a09c-96d7c6699753?wid=488&hei=488&fmt=pjpeg',
      'https://www.bigw.com.au/medias/sys_master/images/images/h0f/h93/33463268442142.jpg',
    ],
    price: 10.48,
    rating: 4.75,
    hasNuts: true,
  },
  {
    id: '12',
    title: 'Honey Salted Almonds',
    brand: 'Ritter Sport',
    ingredients: {
      cocoa: '40%',
      sugar: '48g',
    },
    chocoImages: [
      'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_176707_PCE_LT',
      'https://shop.ritter-sport.co.uk/content/uploads/RI_100g_NC_Honey_Salted_Almonds_2021_EXT-1-lbox-1440x960-trans.webp',
      'https://irp.cdn-website.com/a263c22f/dms3rep/multi/100g_HoneySeaSaltAlmonds_Composing_clean.webp',
    ],
    price: 2.05,
    rating: 4.4,
    hasNuts: true,
  },
];

export default chocolates;
