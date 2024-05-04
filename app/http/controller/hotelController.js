import { validationResult } from 'express-validator';

import Hotel from '../../model/hotel';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

 
export const index = async (req, res) => {
    try {
        const hotels = await Hotel.find();

        return success(res, 'ok!.', 200, hotels);
    } catch (e) {
        return error(res, e.message, 500);
    }
}

export const store = async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     const myErrors = validationErrors(errors.array());
        //     return error(res, 'Validation Error!.', 500, myErrors);
        // }
        
        const { theaterId, location } = req.body;
        
        const existingHotel = await Hotel.find({theaterId: theaterId});

        if(existingHotel.length !== 0) { return error(res, 'The Hotel does exist!.', 409); }

        const hotel = new Hotel({ theaterId, location });
        const createdHotel = await hotel.save();

        return success(res, 'Created successfully!.', 201, createdHotel);
    } catch (e) {
        return error(res, e.message, 500);
    }
}