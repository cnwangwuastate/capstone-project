"use strict";
const db = require("./db");

function generalSearch(params, searchOperations = []) {
    let { SQFTLower, SQFTUpper, lengthUpper, lengthLower, widthUpper, widthLower, HeightUpper, HeightLower, floors} = params;
    let conditions = [];
    let args = {};
    //console.log(params);
    
    // Add conditions based on search operations
    searchOperations.forEach(operation => {
        switch (operation) {
            case 'searchBySQFT':
                if (SQFTLower !== undefined && SQFTUpper !== undefined) {
                    conditions.push(`overallSQFT >= @SQFTLower`);
                    conditions.push(`overallSQFT <= @SQFTUpper`);
                    args['SQFTLower'] = SQFTLower;
                    args['SQFTUpper'] = SQFTUpper;
                }
                break;
            case 'searchByWidth':
                if (widthLower !== undefined && widthUpper !== undefined) {
                    conditions.push(`widthFt <= @widthUpper`);
                    conditions.push(`widthFt >= @widthLower`);
                    args['widthLower'] = widthLower;
                    args['widthUpper'] = widthUpper;
                }
                break;
            case 'searchByLength':
                if (lengthLower !== undefined && lengthUpper !== undefined) {
                    conditions.push(`lengthFt <= @lengthUpper`);
                    conditions.push(`lengthFt >= @lengthLower`);
                    args['lengthLower'] = lengthLower;
                    args['lengthUpper'] = lengthUpper;
                }
                break;
            case 'searchByHeight':
                if (HeightLower !== undefined && HeightUpper !== undefined) {
                    conditions.push(`HeightFt <= @HeightUpper`);
                    conditions.push(`HeightFt >= @HeightLower`);
                    args['HeightLower'] = HeightLower;
                    args['HeightUpper'] = HeightUpper;
                }
                break;

            case 'searchByFloors':
                if (floors !== undefined) {
                    conditions.push(`floors = @floors`);
                    args['floors'] = floors;
                }
                break;
        }
    });

    console.log("current conditions: ", conditions)
    console.log("args: ", args)
    // Construct the WHERE clause
    let whereClause = '';
    if (conditions.length > 0) {
        whereClause = 'WHERE ' + conditions.join(' AND ');
    }
    console.log("current Where Clause: ", whereClause)

    // Prepare and execute SQL query
    const sqlQuery = `SELECT * FROM plans ${whereClause}`;
    const stmt = db.prepare(sqlQuery);
    const result = stmt.all(args);

    return result;
}

function addPlan(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const sqlQuery = `INSERT INTO plans (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;

    const stmt = db.prepare(sqlQuery);
    stmt.run(...values);

}

/*
    MODIFY DATABASE:
    INSERT INTO plans(columns) VALUES (values)
    how do you go about doing this?
    a similar structure to the add function, however: each column should be input into a "columns" string,
    and each value being inserted into a "values" string
    once those strings are complete, do a similar loop for the columns and values clauses

    let columnClause = '';
    if(columns.length > 0) {
        columnClause = 'plans(' + columns.join() + ')');
    }

    let valueClause = '';
    if (values.length > 0) {
        valueClause = 'VALUES(' + values.join() + ')');
    }
*/

function editPlan(planID, editParams) {
    let setStatements = [];
    let args = { "planID": planID };

    // Add conditions based on edit parameters
    Object.entries(editParams).forEach(([key, value]) => {
        switch (key) {
            case 'overallSQFT':
                setStatements.push(`overallSQFT = @overallSQFT`);
                args['overallSQFT'] = value;
                break;
            case 'lengthFt':
                setStatements.push(`lengthFt = @lengthFt`);
                args['lengthFt'] = value;
                break;
            case 'lengthIn':
                setStatements.push(`lengthIn = @lengthIn`);
                args['lengthIn'] = value;
                break;
            case 'widthFt':
                setStatements.push(`widthFt = @widthFt`);
                args['widthFt'] = value;
                break;
            case 'widthIn':
                setStatements.push(`widthIn = @widthIn`);
                args['widthIn'] = value;
                break;
            case 'heightFt':
                setStatements.push(`heightFt = @heightFt`);
                args['heightFt'] = value;
                break;
            case 'heightIn':
                setStatements.push(`heightIn = @heightIn`);
                args['heightIn'] = value;
                break;
            case 'floors':
                setStatements.push(`floors = @floors`);
                args['floors'] = value;
                break;
        }
    });

    // Construct the SET clause
    let setClause = '';
    if (setStatements.length > 0) {
        setClause = 'SET ' + setStatements.join(', ');
    }

    // Prepare and execute SQL query
    const sqlQuery = `BEGIN TRANSACTION;
    UPDATE plans ${setClause} WHERE planID = @planID
    END TRANSACTION`;
    const stmt = db.prepare(sqlQuery);
    stmt.run(args);
}

function testFunction() {
    const sql = `SELECT * FROM plans`;
    const stmt = db.prepare(sql);
    const result = stmt.all();
    return result;
}

function deletePlan(planID) {
    const sql = `BEGIN TRANSACTION;
    DELETE FROM plans WHERE planID=@planID;
    END TRANSACTION;`;
    const stmt = db.prepare(sql);
    stmt.run({
        "@planID": planID
    });
}

function searchByWidth(upper, lower) {
    const sql = `SELECT * FROM plans WHERE widthFt BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchByHeight(upper, lower) {
    const sql = `SELECT * FROM plans WHERE heightFt BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchBySQFT(upper, lower) {
    const sql = `SELECT * FROM plans WHERE overallSQFT BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByFloors(floors) {
    const sql = `SELECT * FROM plans WHERE floors=@floors`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "floors":floors
    });
    return result;

}

function getPlanByID(planID) {
    const sql = 'SELECT * FROM plans WHERE planID=@planID';
    const stmt = db.prepare(sql);
    const row = stmt.get({planID});
    return row;
}

module.exports = {
    testFunction,
    searchByFloors,
    searchByWidth,
    searchBySQFT,
    getPlanByID,
    searchByHeight,
    generalSearch,
    deletePlan,
    editPlan,
    addPlan
}