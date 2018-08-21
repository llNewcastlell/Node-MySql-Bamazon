var inquirer = require("inquirer");
var mysql = require("mysql");

var Table = require('cli-table');

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "v03041980m!!!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n")
   
});

readProducts();
managerView();





var currentItem;
var currentStock;
function start () {
    inquirer.prompt({
        type: "input",
        name: "item",
        message: "What product would you like to buy?"
    }).then(function (answer) {
            currentItem = answer.item

        if (answer.item === "socks") {
            console.log("Socks");
            purchase();
        } else if (answer.item === "undershirts") {
            console.log("Undershirts");
            purchase();
        } else if (answer.item === "paper towels") {
            console.log("Paper Towles");
            purchase();
        } else if (answer.item === "dish soap") {
            console.log("dish soap");
            purchase();
        } else if (answer.item === "nails") {
            console.log("Nails");
            purchase();
        } else if (answer.item === "toothbrush") {
            console.log("Toothbrush");
            purchase();
        } else if (answer.item === "toothpaste") {
            console.log("Toothpaste");
            purchase();
        } else if (answer.item === "plate") {
            console.log("Plate");
            purchase();
        } else if (answer.item === "cups") {
            console.log("Cup");
            purchase();
        }else if(answer.item === "hammer"){
            console.log("hammer")
            purchase();    
        }
        else {
            console.log("You didn't pick the right product :)");
            start();
            
        }
    })
}


function readProducts() {
    var table = new Table({
        head:["ID","Product","Department","Price","Stock"],
    });
    
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product, res[i].department, res[i].price,res[i].stock]);
        }
        // Log all results of the SELECT statement
        console.log(table.toString());
        // connection.end();
    });
}

function purchase () {
    inquirer.prompt([{
            name: "number",
            type: "input",
            message: "How many units would you like to buy?"
        }

    ]).then(function (answer) {

        
        connection.query("Update products set ? where ?",
         [
            {
                stock: 20 - parseFloat(answer.number),
                
            }, 
            {
                product: currentItem
            }
        ], 
            function (err, res) {
            console.log("this was updated");
            console.log(currentItem);
            readProducts();
            managerView();
            // start();
        })
    })
}

 

function managerView(){
    var  managerOption;
    inquirer.prompt([{
        type: "list",
        name: "manager",
        message: "Please select and option: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"],

     }]).then(function(answer){
            managerOption = answer.manager

            if (managerOption === "View Products for Sale"){
                console.log("View products");
                readProducts();
                managerView();
            }else if(managerOption === "View Low Inventory"){
                lowInventory();
                
            }else if(managerOption === "Add to Inventory"){
                inventoryUpdate();

            }else if(managerOption === "Add New Product"){
               createProduct();
            //    readProducts();
               managerView();
            }else{
                console.log("Not the correct selection");
            }

     })
}


function lowInventory(){
    var table = new Table({
        head:["ID","Product","Department","Price","Stock"],
    });
    
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products Where stock <= 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product, res[i].department, res[i].price,res[i].stock]);
        }
        // Log all results of the SELECT statement
        console.log(table.toString());
        // connection.end();
        managerView();
        // start();
    });

}



function inventoryUpdate(){
    inquirer.prompt([{
        type: "input",
        name: "item",
        message: "What product would you like to update?"},
        {
            name: "number",
            type: "input",
            message: "How many units would you like to update?"
        } 
    
    ]).then(function (answer) {
            
        if (answer.item === "socks") {
            console.log("Socks");
            update();
            readProducts();
            // createProduct();
                      
        } else if (answer.item === "undershirts") {
            console.log("Undershirts");
            update();
            readProducts();
        } else if (answer.item === "paper towels") {
            console.log("Paper Towles");
            update();
            readProducts();
        } else if (answer.item === "dish soap") {
            console.log("dish soap");
            update();
            readProducts();
        } else if (answer.item === "nails") {
            console.log("Nails");
            update();
            readProducts();
        } else if (answer.item === "toothbrush") {
            console.log("Toothbrush");
            update();
            readProducts();
        } else if (answer.item === "toothpaste") {
            console.log("Toothpaste");
            update();
            readProducts();
        } else if (answer.item === "plate") {
            console.log("Plate");
            update();
            readProducts();
        } else if (answer.item === "cups") {
            console.log("Cup");
            update();
            readProducts();
        }else if(answer.item === "hammer"){
            console.log("hammer")
            update();
            readProducts();    
        }
        else {
            console.log("You didn't pick the right product :)");
            start();
            
        }
        function update(){
           connection.query(
                "UPDATE products SET ? WHERE id  ? ",
                [
                  {
                    product: answer.item
                  },
                  {
                    stock: answer.number
                  }
                ],
                function(err, res) {
                  
                    console.log("this was updated");
                    console.log(answer.item);
                    console.log(answer.number);
                    createProduct();
                    managerView();
                }
              );
        
        
        }
        function createProduct(){
            console.log("Insert the product line...\n");
            var query = connection.query("INSERT INTO products set ? where ?",
            [
                {
                    stock: answer.number,
                    product: answer.item,
                    price: 3.0,
                    department: "Clothing",
                },
                function(err, res){
                    console.log(answer.number);
                    console.log(res,affectedRows = "Products deleted!\n");
                    
                }    
        
            ])
        
        }
    })
    
   
}


       

