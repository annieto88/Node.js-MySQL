//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'',
  database:'bamazon'
})

connection.query('SELECT * FROM products', function(err, res) {
  if (err) throw err;
  
  console.log(res);
  
  promptUser();
});

var promptUser = function(){

// message
inquirer.prompt([{
  name: "Item_ID",
  message: "What is the ID of the product you would like to buy?.",

      // Ensure a number is entered & not a letter
  validate: function(value){
          if (isNaN(value) == false) {
              return true;
          }
          else {
            return false;
          }
  }
},{

      // After the first prompt, do another
      name: "userQuantity",
      message: "How many units would you like to buy?",

      // Validate they typed in a number
      validate: function(value){
          if (isNaN(value) == false) {
              return true;
          }
          else {
              return false;
          }
      }
      // After the series of prompts
  }]).then(function(answers){

          // Set the userinput to currentItem and currentAmount
      var currentItem = answers.Item_ID;
      var currentAmount = answers.userQuantity;

          //Read from database. If they requested too much, don't perform the transaction.
          //Otherwise fulfuill the request.
          connection.query('SELECT * FROM products WHERE ?',{
              Item_ID: answers.Item_ID
          },function(err, res){

              //If the amount requested is greater than the amount in stock.
              if (currentAmount > res[0].Stock_Quantity){
                  console.log("Insufficient Quantity!");

                  // Back to prompt
                  promptUser();
              }
              // Otherwise they may buy it
              else { 
                  console.log("Sufficient quantity!");

                  // Calculate the new quantity to update in the database
                  var newQuantity = (res[0].Stock_Quantity - currentAmount);
                  var totalCost = res[0].Price*currentAmount;

                  // Update the quantity
                  connection.query('UPDATE products SET ? WHERE ?',[{
                      Stock_Quantity: newQuantity
                  },{
                      Item_ID: currentItem
                  }], function(err, res){
                      console.log("You were charged $" + totalCost);

                      // Back to the prompt
                      promptUser();
                  });
              }
          })
   })
}   
