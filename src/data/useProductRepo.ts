import sleep from "sleep-promise";
import synchronisedPromiseMaker from "../dataRepo/utils/synchronisedPromiseMaker";
import useRepo from "../dataRepo/hooks/useRepo";
import Repo from "../dataRepo/types/Repo";
import Product from "./types/Product";

const fetchProduct = synchronisedPromiseMaker(
  async (productId: number): Promise<Product> => {
    // eslint-disable-next-line no-console
    console.log("Fetching product...", productId);

    await sleep(2000);

    if (Math.floor(Math.random() * 10) % 5 === 0) {
      throw Error("Failed to load product");
    }

    return {
      id: productId,
      name: `Sample product ${productId}`,
      price: 450,
      quantityAvailable: 23,
      category: "Sample category",
    };
  }
);

const useProductRepo = (productId: number): Repo<Product> =>
  useRepo<Product>("product", fetchProduct, productId);

export default useProductRepo;
