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
        let DocCode = decodeURIComponent(event.pathParameters.DocCode);
        //console.log("DocumentID: ",DocCode);
        let params= {
            TableName: tableName,
            IndexName: "DocCode-index",
            KeyConditionExpression: "DocCode= :DocCode",
            ExpressionAttributeValues: {
                ":DocCode": DocCode
            },
            Limit: 10
        };
        let data= await dynamodb.query(params).promise();
        if (!_.isEmpty(data.Items)) {
            return{
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data)
            } 
        }else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders()
            }
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
