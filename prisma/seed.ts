import { randomBytes, scryptSync } from 'crypto';
import {prisma} from './prisma-client';
import { categories,  ingredients, products } from './constans';
import { Prisma } from '@prisma/client';

const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};
const hashSync = (password: string, _rounds?: number) => hashPassword(password);


const randomNumber = (min: number, max: number) => {

  return (Math.random() * (max - min) * 10 + min * 10) / 10;
};


// const generateProductItem = (
//   { productId, burgerType, size }:{
//     productId: number;
//     burgerType?: number;
//     size?: number;
//   }
// ) => {
  
//   return {
//     productId,
//     burgerType,
//     size,
//     price: randomNumber(150, 400),
//   } as Prisma.ProductItemUncheckedCreateInput;
// };



async function up() {

await prisma.user.createMany({

  data: [
    {
      fullName: "User Test",
      email: "user@test.com",
      password: hashSync("123456", 10),
      role: "USER",
      verified: new Date(),
    },
    {

      fullName: "Admin Admin",
      email: "admin@test.com",
      password: hashSync("111111", 10),
      role: "ADMIN",
      verified: new Date(),
    },
  ]
});


await prisma.category.createMany({
  data: categories
});


await prisma.ingredient.createMany({
  data: ingredients
});

await prisma.product.createMany({
  data: products,
});


const burger1 = await prisma.product.create({
  data: {
    name: "Classic Cheeseburger",
    imageUrl: "/burger-1.png",
    categoryId: 1,
    text: "Класичний чизбургер з ніжним сиром та соковитою яловичиною.",
    ingredients: {
      connect: ingredients.slice(0, 5),
    },
  },
});

const burger2 = await prisma.product.create({
  data: {
    name: "Bacon Burger",
    imageUrl: "/burger-2.png",
    categoryId: 1,
    text: "Бургер з беконом та сиром для справжніх гурманів.",
    ingredients: {
      connect: ingredients.slice(5, 10),
    },
  },
});

const burger3 = await prisma.product.create({
  data: {
    name: "Spicy Burger",
    imageUrl: "/burger-3.png",
    categoryId: 1,
    text: "Пікантний бургер для любителів гострих смаків.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger4 = await prisma.product.create({
  data: {
    name: "Ranch Burger",
    imageUrl: "/burger-4.png",
    categoryId: 1,
    text: "Соковитий бургер з ранч-соусом для насолоди.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger5 = await prisma.product.create({
  data: {
    name: "BBQ Burger",
    imageUrl: "/burger-5.png",
    categoryId: 1,
    text: "Бургер з ароматним BBQ соусом та копченим беконом.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger6 = await prisma.product.create({
  data: {
    name: "Swiss Burger",
    imageUrl: "/burger-6.png",
    categoryId: 1,
    text: "Швейцарський бургер з сиром та грибним соусом.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger7 = await prisma.product.create({
  data: {
    name: "Stack Burger",
    imageUrl: "/burger-7.png",
    categoryId: 2,
    text: "Величезний бургер для справжнього голодного героя.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger8 = await prisma.product.create({
  data: {
    name: "Delight Burger",
    imageUrl: "/burger-8.png",
    categoryId: 2,
    text: "Легкий бургер для насолоди у будь-який час.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger9 = await prisma.product.create({
  data: {
    name: "Chipotle Burger",
    imageUrl: "/burger-9.png",
    categoryId: 2,
    text: "Бургер з гострим чіпотле-соусом та соковитим м’ясом.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger10 = await prisma.product.create({
  data: {
    name: "Blue Burger",
    imageUrl: "/burger-10.png",
    categoryId: 2,
    text: "Бургер з благородним блакитним сиром для гурманів.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger11 = await prisma.product.create({
  data: {
    name: "Texas Burger",
    imageUrl: "/burger-11.png",
    categoryId: 2,
    text: "Техаський бургер з гострим соусом і хрусткою цибулею.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger12 = await prisma.product.create({
  data: {
    name: "Hawaiian Burger",
    imageUrl: "/burger-12.png",
    categoryId: 2,
    text: "Гавайський бургер з ананасом та солодким соусом.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger13 = await prisma.product.create({
  data: {
    name: "Chicken Burger",
    imageUrl: "/burger-13.png",
    categoryId: 3,
    text: "Курячий бургер з хрустким філе та вершковим соусом.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger14 = await prisma.product.create({
  data: {
    name: "Crispy Burger",
    imageUrl: "/burger-14.png",
    categoryId: 3,
    text: "Бургер з хрусткими курячими шматочками для ідеальної закуски.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger15 = await prisma.product.create({
  data: {
    name: "Beef Burger",
    imageUrl: "/burger-15.png",
    categoryId: 3,
    text: "Бургер з соковитою яловичиною та класичними інгредієнтами.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger16 = await prisma.product.create({
  data: {
    name: "Ultimate Burger",
    imageUrl: "/burger-16.png",
    categoryId: 3,
    text: "Бургер з усім найкращим для найвибагливіших.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger17 = await prisma.product.create({
  data: {
    name: "Truffle Burger",
    imageUrl: "/burger-17.png",
    categoryId: 3,
    text: "Трюфельний бургер для цінителів вишуканих смаків.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});

const burger18 = await prisma.product.create({
  data: {
    name: "Teriyaki Burger",
    imageUrl: "/burger-18.png",
    categoryId: 3,
    text: "Бургер з теріякі соусом для поціновувачів азійської кухні.",
    ingredients: {
      connect: ingredients.slice(10, 16),
    },
  },
});



// Бургери (categoryId 1-3): три розміри (20/30/40 см) і два варіанти
const burgers = [
  burger1, burger2, burger3, burger4, burger5, burger6,
  burger7, burger8, burger9, burger10, burger11, burger12,
  burger13, burger14, burger15, burger16, burger17, burger18,
];

const burgerItems: Prisma.ProductItemUncheckedCreateInput[] = [];
for (const b of burgers) {
  for (const size of [20, 30, 40]) {
    for (const burgerType of [1, 2]) {
      burgerItems.push({
        productId: b.id,
        size,
        burgerType,
        price: Math.round(randomNumber(150, 400)),
      });
    }
  }
}
await prisma.productItem.createMany({ data: burgerItems });

// Інші товари (випічка / напої / десерти) — один варіант без розмірів
const otherProducts = await prisma.product.findMany({
  where: { items: { none: {} } },
});
await prisma.productItem.createMany({
  data: otherProducts.map((p) => ({
    productId: p.id,
    price: Math.round(randomNumber(80, 250)),
  })),
});


await prisma.cart.createMany({

 data: [

  {
    userId:1,
    totalAmount: 0,
    token: '111111',
  },

  { userId:2,
    totalAmount: 0,
    token: '111111',},
 ]

});



await prisma.cartItem.create({

data:{
    productItemId: 1,
    cartId: 1,
    quantity: 2, 
    ingredients: {
      connect:[{id: 1}, {id: 2}, {id: 3}],
    

  }
  
}




});


}


async function down() {

await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;


}
async function main() {

try { 
  await down();
  await up();
} catch (e) {
  console.error(e);
}

}


main().then(async () => {
await prisma.$disconnect();
})
.catch(async (e) => {
console.error(e);
await prisma.$disconnect();
process.exit(1);
  
});
