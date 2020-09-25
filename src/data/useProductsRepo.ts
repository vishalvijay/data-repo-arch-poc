import sleep from "sleep-promise";
import synchronisedPromiseMaker from "../dataRepo/utils/synchronisedPromiseMaker";
import useRepo from "../dataRepo/hooks/useRepo";
import Repo from "../dataRepo/types/Repo";
import Product from "./types/Product";

const fetchProducts = synchronisedPromiseMaker(
  async (): Promise<Product[]> => {
    // eslint-disable-next-line no-console
    console.log("Fetching products...");

    await sleep(2000);

    if (Math.floor(Math.random() * 10) % 5 === 0) {
      throw Error("Failed to load products");
    }

    return Array.from({ length: 10 }, (x, i) => i).map((productId) => ({
      id: productId,
      name: `Sample product ${productId}`,
      price: 450,
      quantityAvailable: 23,
      category: "Sample category",
    }));
  }
);

const useProductsRepo = (): Repo<Product[]> =>
  useRepo<Product[]>("products", fetchProducts);

export default useProductsRepo;
