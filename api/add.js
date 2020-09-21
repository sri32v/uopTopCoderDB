// Route: POST /note
// LAMBDA BoilerPlate Code
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
const moment = require('moment');
const {v4:uuidv4}=require('uuid');
const util =require('./util.js');

const dynamodb=new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DynamoDBTABLE;

exports.handler = async (event) =>{

    try {

        //console.log(event);
        const item = JSON.parse(event.body);
        console.log(item);
//          const item= {
//       DocId: '3234324e',
//       PersonId: 1234566,
//       title: 'changed title',
//       content: 'changed content',
//       DocType:'pdf',
//       DocCode:'UOPUS_Transcript1',
//       Url:"urlddafeate",
//       formData:{
//           " AC59":"Srikanth",
//           " AC79":"Vangala",
//           " DocumentOwner":"Student",
//           "age":36,
//           "recipientSetInfos":{
//              "recipientSetMemberInfos":{
//                 "email":"1234567@phoenix.edu"
//              },
//              "recipientSetRole":"SIGNER"
//           }
//        }

//   }
      let data2= await dynamodb.put({
        TableName:tableName,
        Item: item
      }).promise();
        return{
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
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
