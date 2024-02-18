"use strict"
const planModel = rquire(".//Models/planModel");

async function searchByOperations(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,heightUpper,heightLower,floors,buildingType,searchOperations} = req.query;
    operations = req.query.searchOperations;
    /*
        searchOperations is supposed to be an array of strings. checboxes return
        as arrays of strings ONLY if multiple boxes are checked. the block below
        makes sure that searchOperations is ALWAYS an array when the request is
        sent to the server.
    */
    if (typeof operations != "object") {
        operations = [operations]
    }
    // this just logs the request query for debugging
    console.log(operations);
    console.log(req.query);
    // total results of the whole search query
    let results = [];
    /*
        all of the input values except for searchOperations need to be parsed from
        strings to integers in order to be fed to the database
    */
    SQFTUpper = parseInt(SQFTUpper);
    SQFTLower = parseInt(SQFTLower);
    lengthUpper = parseInt(lengthUpper);
    lengthLower = parseInt(lengthLower);
    widthUpper = parseInt(widthUpper);
    widthLower = parseInt(widthLower);
    heightUpper = parseInt(heightUpper);
    heightLower = parseInt(heightLower);
    floors = parseInt(floors);
    /*
        currentResults are the results gotten from each iteration of this loop.
        the function will go through each element in the "operations" array and for each element
        it will conduct the corresponding search operation to that particular string,
        and add it's results to the total search results without creating duplicates. 
        
        ** NOTE: currently there's a limitation where the search result will return
        all values that meet every criteria first, then every value that meets
        AT LEAST ONE criteria after that. I haven't figured out how yet but this needs
        to be changed so that it exclusively returns values that meet all critiera,
        since most people search by their given constraints for a reason. 
    */
    for(let i = 0; i < operations.length; i++) {
        let currentResults;
        if (operations[i] === "searchBySQFT") {
            currentResults = planModel.searchBySQFT(SQFTLower,SQFTUpper);
        } else if (operations[i] === "searchByWidth") {
            currentResults = planModel.searchByWidth(widthLower,widthUpper);
        } else if (operations[i] === "searchByLength") {
            currentResults = planModel.searchByLength(lengthLower,lengthUpper);
        } else if (operations[i] === "searchByHeight") {
            currentResults = planModel.searchBySidewallLength(heightLower, heightUpper);
        } else if (operations[i] === "searchByFloors") {
            currentResults = planModel.searchByFloors(floors);
        } else {
            // console the results for debugging and return 404 if the operation input isn't valid
            console.log(results);
            return res.sendStatus(404);
        }
        results = [...results, currentResults];
    }
    // console the search results for debugging
    console.log(results);
    // if results aren't defined then return error 404
    if(!results) {
        return res.sendStatus(404);
    }
    // CJ, this'll be needed for the frontend. this will allow is to render
    // the whole list of search results. 
    res.render("results", {"results": results});
}
// this will also allow us to render individual search results, so that a user
// can click on whatever number they want and get more detailed information about
// that plan. 
function renderSingleResult(req,res) {
    const plan = planModel.getPlanByID(req.params.planID);
    if(!plan) {
        return res.sendStatus(404);
    }
    res.render("singlePlanPage", {"plan":plan});
}

module.exports = {
    searchByOperations,
    renderSingleResult
}