import { validationResult } from 'express-validator';

import Product from '../../model/product';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

 
export const index = async (req, res) => {
    try {
        const products = await Product.find();

        return success(res, 'ok!.', 200, products);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
    
export const show = async (req, res) => {
    const { id_product } = req.params;
    
    try {
        const product = await Product.findById(id_product);
        
        if (!product) { return error(res, 'The Product does not exist!.', 404); }
        
        return success(res, 'ok!.', 200, product);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
    
export const store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!.', 500, myErrors);
        }
        
        const { description, total, stock } = req.body;
        
        const existingProduct = await Product.find({description: description});

        if(existingProduct.length !== 0) { return error(res, 'The Product does exist!.', 409); }

        const product = new Product({ description, total, stock });
        const createdProduct = await product.save();

        return success(res, 'Created successfully!.', 201, createdProduct);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
       
export const update = async (req, res) => {
    const { id_product } = req.params;
    // return success(res, 'Updated successfully!.', 200, {id_product});
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!.', 500, myErrors);
        }

        const { description, total, stock } = req.body;
        
        const product = await Product.findById(id_product);            
        
        if (!product) { return error(res, 'The Product does not exist!.', 400); }

        const arrData = { description, total, stock };
        Object.assign(product, arrData);
        await product.save();

        return success(res, 'Updated successfully!.', 200, product);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
    
export const destroy = async (req, res) => {
    const { id_product } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id_product);
        if (!product) { return error(res, 'The Product does not exist!.', 404); }
        
        return success(res, 'Deleted successfully!.', 200);
    } catch (e) {
        return error(res, e.message, 500);
    }
}