import fs from "fs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const products = JSON.parse(fs.readFileSync("dank-products.json", "utf-8"));

const addProducts = async () => {
  for (const product of products) {
    try {
      await addDoc(collection(db, "products"), product);
      console.log(`Added product: ${product.name}`);
    } catch (error) {
      console.error(`Error adding product: ${product.name}`, error);
    }
  }
};

addProducts();