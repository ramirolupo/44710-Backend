import {dirname} from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
import { faker } from "@faker-js/faker";

import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateProduct = () => {
  return {
    brand: faker.commerce.product(),
    model: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({dec: 0}),
    stock: faker.commerce.price({min: 1, max: 100, dec: 0}),
    status: true,
  };
};