"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const html = fs_1.default.readFileSync("dank.html", "utf-8");
const dom = new jsdom_1.JSDOM(html);
const document = dom.window.document;
const products = [];
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
    var _a, _b;
    const category = ((_b = (_a = section.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
    const productItems = section.querySelectorAll(".product-item-card");
    productItems.forEach((item) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const name = ((_b = (_a = item.querySelector(".product-item-name")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        const priceString = ((_d = (_c = item.querySelector(".product-item-price")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
        const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
        const description = ((_f = (_e = item.querySelector(".product-item-back")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || "";
        const imageUrl = ((_g = item.querySelector(".product-item-image-area img")) === null || _g === void 0 ? void 0 : _g.getAttribute("src")) || "";
        products.push({
            name,
            category: "cannabis",
            price,
            description,
            imageUrl,
            stockLevel: 100, // Default stock level
        });
    });
});
fs_1.default.writeFileSync("dank-products.json", JSON.stringify(products, null, 2));
console.log("Successfully parsed and saved dank-products.json");
