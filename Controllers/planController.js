"use strict"
const planModel = rquire(".//Models/planModel");

async function searchByOperations(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,heightUpper,heightLower,floors,bathrooms,buildingType,specialFeatures,searchOperations} = req.query;
    
}