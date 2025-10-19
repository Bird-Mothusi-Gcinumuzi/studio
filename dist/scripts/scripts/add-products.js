"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../src/lib/firebase");
const products = JSON.parse(fs_1.default.readFileSync("dank-products.json", "utf-8"));
const addProducts = async () => {
    for (const product of products) {
        try {
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "products"), product);
            console.log(`Added product: ${product.name}`);
        }
        catch (error) {
            console.error(`Error adding product: ${product.name}`, error);
        }
    }
};
addProducts();
