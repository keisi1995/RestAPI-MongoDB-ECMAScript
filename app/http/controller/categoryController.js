import { validationResult } from 'express-validator';

import Category from '../../model/category';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

 
export const index = async (req, res) => {
    try {
        const categorys = await Category.find();

        return success(res, 'ok!.', 200, categorys);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
    
export const show = async (req, res) => {
    const { id_category } = req.params;
    try {
        const category = await Category.findById(id_category);
        
        if (!category) { return error(res, 'The User does not exist!.', 404); }
        
        return success(res, 'ok!.', 200, category);
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
        
        const { description, total, photo_url } = req.body;
        
        const existingCategory = await Category.find({description: description});

        if(existingCategory.length !== 0) { return error(res, 'The Category does exist!.', 409); }

        const category = new Category({ description, total, photo_url });
        const createdCategory = await category.save();

        return success(res, 'Created successfully!.', 201, createdCategory);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
       
export const update = async (req, res) => {
    const { id_category } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!.', 500, myErrors);
        }

        const { description, total, photo_url } = req.body;
        
        const category = await Category.findById(id_category);            
        
        if (!category) { return error(res, 'The Category does not exist!.', 400); }

        const arrData = { description, total, photo_url };
        Object.assign(category, arrData);
        await category.save();

        return success(res, 'Updated successfully!.', 200, category);
    } catch (e) {
        return error(res, e.message, 500);
    }
}
    
export const destroy = async (req, res) => {
    const { id_category } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id_category);
        if (!category) { return error(res, 'The Category does not exist!.', 404); }
        
        return success(res, 'Deleted successfully!.', 200);
    } catch (e) {
        return error(res, e.message, 500);
    }
}