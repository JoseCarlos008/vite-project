import express from "express";
import { getProduct, addProduct, deleteProduct, updateProduct} from "../controller/product.js";

const router = express.Router();

router.get("/", getProducts);


router.post("/", addProducts)


router.delete("/:cod", deleteProducts)


router.put("/:cod", updateProducts)

export default router;