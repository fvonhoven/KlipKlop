import uuid from "uuid-random"
import * as AWS from "aws-sdk"
AWS.config.update(configuration)

const ddb = new AWS.DynamoDB()

const configuration = {
  region: "us-east-2",
  secretAccessKey: "",
  accessKeyId: "",
}

const fetchData = tableName => {
  var params = {
    Key: {
      id: {
        S: "1",
      },
    },
    TableName: "klipklop-posts",
  }

  ddb.getItem(params, function (err, data) {
    if (!err) {
      console.log(data)
      setImage(data.Item.url.S)
    } else {
      console.error(err.message)
    }
  })
}
function writeData() {
  var writeParams = {
    TableName: "klipklop-posts",
    Item: {
      id: { S: uuid() },
      name: { S: "Richard Roe" },
    },
  }

  // Call DynamoDB to add the item to the table
  ddb.putItem(writeParams, function (err, data) {
    if (err) {
      console.log("Error", err)
    } else {
      console.log("Success", data)
    }
  })
}
