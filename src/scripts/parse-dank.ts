
import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync("dank.html", "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

const products: any[] = [];

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  const category = section.querySelector("h2")?.textContent?.trim() || "";
  const productItems = section.querySelectorAll(".product-item-card");

  productItems.forEach((item) => {
    const name = item.querySelector(".product-item-name")?.textContent?.trim() || "";
    const priceString = item.querySelector(".product-item-price")?.textContent?.trim() || "";
    const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    const description = item.querySelector(".product-item-back")?.textContent?.trim() || "";
    const imageUrl = item.querySelector(".product-item-image-area img")?.getAttribute("src") || "";

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

fs.writeFileSync("dank-products.json", JSON.stringify(products, null, 2));

console.log("Successfully parsed and saved dank-products.json");
