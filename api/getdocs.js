// Route: GET /notes
// LAMBDA BoilerPlate Code
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

const _ = require('underscore');
const util =require('./util.js');

const dynamodb=new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DynamoDBTABLE;

exports.handler = async (event) =>{
    try {
        let query = event.queryStringParameters;
        let limit = query && query.limit ? parseInt(query.limit) : 5;
        //let user_id=util.getUserId(event.headers);
       
        let params= {
            TableName: tableName           
        };
        let data= await dynamodb.scan(params).promise();
                   return{
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data)
            } 
    
    } catch (err) {
        console.log("Error",err);
//Have to return HTTP response with status codes
        return {
            statusCode: err.statusCode ? err.StatusCode : 500, 
            headers: util.getResponseHeaders(),
            body: JSON.stringify ({
                error: err.name ? err.name : "Exception",
                message: err.message? err.message: "unknown error"
            })
        }
    }

}
