// functions/createUser.js
// const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.USER_TABLE,
        Item: {
            id: uuidv4(), 
            email: data.email,
            password: data.password, // @TODO: hash password before storing
            given_name: data.given_name,
            family_name: data.family_name,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: "User created successfully" }) };
    } catch (error) {
        console.error("Error creating user:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Could not create user" }) };
    }
};
