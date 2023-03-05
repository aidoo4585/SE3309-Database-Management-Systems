const express = require("express");
const newConnection = require("./DBConnection");
const app = express();

//Creating a static express app
app.use(express.static("static"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Library for Html--
const HtmlLibrary = require("./HtmlLibrary");

//Request contents for quit
app.get("/quit", (req, res) => {
  let operationResults = "Successfully quit";

  //Quit css/script
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Successfully Quit")}
  ${operationResults}
  ${HtmlLibrary.pgFooter}`;

  res.send(markup);
});

//Request to server for newCustomer content
app.get("/newCustomer", (req, res) => {
  let conn = newConnection();
  conn.connect();
  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("New Customer")}
  ${HtmlLibrary.header("Please add in customer detail below.")}
        <div class = "mx-3">
        <form action="/addCustomer" method="post">
            <ul class="list-group w-25">
              <li class="list-group-item">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="example@gmail.com" required>
              </li>
              <li class="list-group-item">
                <label for="cName">Name</label>
                <input type="text" name="cName" placeholder="John Smith" required>
              </li>
              <li class="list-group-item">
                <label for="phone">Phone Number</label>
                <input type="tel" name="phone" placeholder="5195555555" pattern="[0-9]{10}" required>
              </li>
              <li class="list-group-item">
                <label for="address">Address</label>
                <select name="postCode" required>
          `;
  //Collect query result, and add them as option values
  conn.query(`SELECT * FROM Location`, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      for (r of rows) {
        markup += `<option value="${r.postCode}">${r.address}, ${r.postCode}</option>`;
      }

      markup += `
                          </select>
                        </li>
                        <li class="list-group-item">
                          <label for="cardNo">Card Number</label>
                          <input type="text" name="cardNo" placeholder="1234567890123456" pattern="[0-9]{16}" required>
                        </li>
                      </ul>
                      ${HtmlLibrary.btnToModal("Add Customer")}
                      ${HtmlLibrary.popUpModal(
                        "Confirm Customer",
                        "Are you sure the customer information is correct?",
                        "Confirm"
                      )}
                    </form>
                <a href="/newLocation">Don't see your address?</a>
                ${HtmlLibrary.pgFooter}
                </div>`;

      res.send(markup);
    }
  });

  conn.end();
});

//Creating req for payment
app.get("/payment", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Payments")}
  ${HtmlLibrary.header("Please see payment options below.")}
  <form action="/makePayment" method="post">
    <label for="transaction">Transaction No:</label>
    <select name="transaction" required>`;

  //Collect query result, and add them as option values
  conn.query(
    `SELECT transactionNo, total FROM Payment WHERE payDate IS NULL`,
    (err, rows, fields) => {
      if (err) console.log(error);
      else {
        for (r of rows) {
          markup += `<option value=${r.transactionNo}>${r.transactionNo}</option>`;
        }

        markup += `</select>
                ${HtmlLibrary.btn("Confirm")}
                </form>
                <a href="/newPayment">New Transaction</a>
                ${HtmlLibrary.pgFooter}`;
        res.send(markup);
      }
    }
  );

  conn.end();
});

//Creating req for track
app.get("/track", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Track")}
  ${HtmlLibrary.header("Please select customer details below.")}
  <form action="/getPackages" method="post">
  <label for="customer">Customer:</label> 
    <select name="customer" required>`;

  //Collect query result, and add them as option values
  conn.query(`SELECT email, custName FROM Customer`, (err, rows, fields) => {
    if (err) console.log(error);
    else {
      for (r of rows) {
        markup += `<option value="${r.email}">${r.custName} (${r.email})</option>`;
      }

      markup += `</select>
            ${HtmlLibrary.btn("Confirm")}
            </form>
            ${HtmlLibrary.pgFooter}
            `;
      res.send(markup);
    }
  });

  conn.end();
});

//Creating req for raise
app.get("/raise", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Prep server response as a form that choses user inputed post office for raise
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Raise")}
  ${HtmlLibrary.header("Please select a post office.")}
  <form action="/selectRaise" method="post">
  <select name="officeNo">
  `;

  //Collect query result, and add them as option values
  conn.query(`SELECT officeNo FROM PostOffice`, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      for (r of rows) {
        markup += `<option value=${r.officeNo}>${r.officeNo}</option>`;
      }

      markup += `
            </select>
            ${HtmlLibrary.btn("Confirm")}
            </form>
            ${HtmlLibrary.pgFooter}
            `;

      res.send(markup);
    }
  });

  conn.end();
});

//Request to server for truck content
app.get("/truckInfo", (req, res) => {
  let conn = newConnection();
  conn.connect();

  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Truck Info")}
  ${HtmlLibrary.tblHeaders("Plate #", "Driver", "License #", "Year")}
  `;

  //Collect query result, and add them as row values in the table
  conn.query(
    `SELECT t.plateNo AS plate, d.plateNo, staffName, licenseNo, yearPurchased 
  FROM Truck t, Driver d
  WHERE t.plateNo = d.plateNo`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        for (r of rows) {
          markup += `<tr>
            <td>${r.plate}</td>
            <td>${r.staffName}</td>
            <td>${r.licenseNo}</td>
            <td>${r.yearPurchased}</td>
            </tr>`;
        }

        markup += `</table>`;
        res.send(markup);
      }
    }
  );

  conn.end();
});

//Request to server for newLocation content
app.get("/newLocation", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("New Location")}
  ${HtmlLibrary.header("Please enter in location details detail below.")}
  <form action="/addLocation" method="post">
        <label for="address">Address</label>
        <input type="text" name="address" placeholder="123 Example St" required>
        <label for="postCode">Postal Code</label>
        <input type="text" name="postCode" placeholder="A1A1A1" pattern="[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}" required>
        <label for="officeNo">Office Number</label>
        <select name="officeNo" required>
        `;

  //Collect query result, and add them as option values
  conn.query(`SELECT officeNo FROM PostOffice`, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      for (r of rows) {
        markup += `<option value=${r.officeNo}>${r.officeNo}</option>`;
      }

      markup += `
                </select>
                ${HtmlLibrary.btn("Confirm")}
                ${HtmlLibrary.pgFooter}
                `;

      res.send(markup);
    }
  });

  conn.end();
});

//Request to server for newPayment content
app.get("/newPayment", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("New Payment")}
  ${HtmlLibrary.header("Please see payment options below.")}
  <form action="/addPayment" method="post">
    <select name="staffNo">
    `;

  //Collect query result, and add them as option values
  conn.query(
    `SELECT staffNo, staffName FROM PostOfficeStaff ORDER BY staffNo`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        for (r of rows) {
          markup += `<option value=${r.staffNo}>${r.staffNo}: ${r.staffName}  </option>`;
        }
        markup += `</select>
            ${HtmlLibrary.btn("Confirm")}
            </form>
            ${HtmlLibrary.pgFooter}
            `;

        res.send(markup);
      }
    }
  );

  conn.end();
});

//Request to server for addLocation content
app.post("/addLocation", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Insert recieved values from form to Location tbl and notify user of error or redirect to newCustomer page
  conn.query(
    `INSERT INTO Location VALUES ("${req.body["postCode"]}", "${req.body["address"]}", 1)`,
    (err, rows, fields) => {
      if (err) {
        let operationResults =
          "A location with this postal code already exists. Please go back and select it from the list";

        let markup = `
        ${HtmlLibrary.pgHeader}
        ${HtmlLibrary.navbar("Add Location")}
        ${operationResults}
        
        <script type="text/javascript">
        function alert(){
          alert(${operationResults})
        }
        </script>
        ${HtmlLibrary.pgFooter}
        `;

        res.send(markup);
      } else res.redirect("/newCustomer");
    }
  );
  conn.end();
});

//Request to server for addCustomer content
app.post("/addCustomer", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Insert recieved values from form to Customer tbl and notify user of error or success
  conn.query(
    `INSERT INTO Customer VALUES ("${req.body["email"]}", "${req.body["cName"]}", "${req.body["postCode"]}", "${req.body["phone"]}", "${req.body["cardNo"]}")`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        let queryResult = `Successfully added ${req.body["cName"]}!`;

        let markup = `
        ${HtmlLibrary.pgHeader}
        ${HtmlLibrary.navbar("Add Customer")}
        ${queryResult}
        ${HtmlLibrary.pgFooter}
        `;
        res.send(markup);
      }
    }
  );

  conn.end();
});

//Request to server for addPayment content
app.post("/addPayment", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Insert recieved values from form to Payment tbl and notify user of error or success
  conn.query(
    `INSERT INTO Payment VALUES (null, null, null, ${req.body["staffNo"]})`
  );

  //Display values from form to PostOfficeStaff tbl and notify user of error or success
  conn.query(
    `SELECT staffNo, staffName FROM PostOfficeStaff WHERE staffNo=${req.body["staffNo"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        let operationResults = `Payment successfully added! Initialized by: ${rows[0].staffName} ID:#${rows[0].staffNo}`;

        let markup = `
        ${HtmlLibrary.pgHeader}
        ${HtmlLibrary.navbar("Add Payment")}
        ${operationResults}
        ${HtmlLibrary.pgFooter}
        `;

        res.send(markup);
      }
    }
  );
  conn.end();
});

//Request to server for makePayment content
app.post("/makePayment", (req, res) => {
  let conn = newConnection();
  conn.connect();

  let transactionNo = req.body["transaction"];

  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Make Payment")}
  ${HtmlLibrary.header("You are editing transaction")}
  ${HtmlLibrary.tblHeaders("Transaction #", "Total", "Staff No")}
  `;

  //Updates Payment with transactionNo from form to update a transaction
  conn.query(
    `UPDATE Payment py
  SET total = (SELECT SUM(price) FROM Package pk
               WHERE py.transactionNo = pk.transactionNo)
               WHERE py.transactionNo = ${req.body["transaction"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );

  //Collect query result, and add them as table rows
  conn.query(
    `SELECT * FROM Payment WHERE transactionNo=${req.body["transaction"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        markup += `<tr>
        <td>${rows[0].transactionNo}</td>
        <td>${rows[0].total}</td>
        <td>${rows[0].staffNo}</td>
        </tr>
        </table>
        <div class = "mx-4">
        <form action="/confirmPayment" method="post">
            <input type="number" name="transaction" class="hidden" value=${
              req.body["transaction"]
            }>
            ${HtmlLibrary.btnToModal("Confirm Payment")}
            ${HtmlLibrary.popUpModal(
              "Confirm Payment",
              "Are you sure you'd like to confirm the payment?",
              "Confirm Payment"
            )}
        </form>
        <a href="/newPackage">Add new package</a>
        </div>
        ${HtmlLibrary.tblHeaders("ID", "Price")}`;
      }
    }
  );

  //Collect query result, and add them as table rows
  conn.query(
    `SELECT packageID, price FROM Package WHERE transactionNo=${req.body["transaction"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        for (r of rows) {
          markup += `<tr>
                <td>${r.packageID}</td>
                <td>${r.price}</td>
                </tr>`;
        }
        markup += `
        </table>
        <style>
          body { padding-bottom: 150px; }
        </style>
        ${HtmlLibrary.pgFooter}`;
        res.send(markup);
      }
    }
  );
  conn.end();
});

//Request to server for newPackage content
app.get("/newPackage", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("New Package")}
  ${HtmlLibrary.header("Please enter in package details below.")}
  <div class="mx-4">
  <form action="/addPackage" method="post">
    <ul class = "list-group w-50">
      <li class="list-group-item">
        <label for="weight">Weight (kg)</label>
        <input type="number" name="weight" required>
      </li>
      <li class="list-group-item">
        <label for="size">Size (m³)</label>
        <input type="number" name="size" required>
      </li>
      <li class="list-group-item">
        <label for="price">Price (CAD)</label>
        <input type="number" name="price" required>
      </li>
      <li class="list-group-item">
        <label for="destination">Destination</label>
        <select name="destination">
    `;

  //Collect query result, and add them as option values
  conn.query(`SELECT postCode, address FROM Location`, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      for (r of rows) {
        markup += `<option value="${r.postCode}">${r.address}, ${r.postCode}</option>`;
      }
      markup += `</select> 
      </li>
      <li class = "list-group-item">
        <label for="sender">Sender</label>
        <select name="sender">`;
    }
  });

  //Collect query result, and add them as option values
  conn.query(`SELECT email, custName FROM Customer`, (err, rows, fields) => {
    if (err) console.log(error);
    else {
      for (r of rows) {
        markup += `<option value="${r.email}">${r.custName} (${r.email})</option>`;
      }

      markup += `</select>
      </li>
      <li class = "list-group-item" >
        <label for="transaction">Transaction #</label>
        <select name="transaction">
        `;
    }
  });

  //Collect query result, and add them as option values
  conn.query(
    `SELECT transactionNo, total FROM Payment WHERE payDate IS NULL`,
    (err, rows, fields) => {
      if (err) console.log(error);
      else {
        for (r of rows) {
          markup += `<option value=${r.transactionNo}>${r.transactionNo}</option>`;
        }

        markup += `</select> </li>
        </ul>
                ${HtmlLibrary.btn("Confirm")} 
                </form>
                </div>
                ${HtmlLibrary.pgFooter}
                `;
        res.send(markup);
      }
    }
  );

  conn.end();
});

//Request to server for addPackage content
app.post("/addPackage", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Insert recieved values from form to Packages tbl and notify user of error or redirect to payment
  conn.query(
    `INSERT INTO Package VALUES (null, ${req.body["weight"]}, ${req.body["size"]}, ${req.body["price"]}, "${req.body["destination"]}", CURRENT_DATE(), null, "${req.body["sender"]}", ${req.body["transaction"]}, null)`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        res.redirect("/payment");
      }
    }
  );

  conn.end();
});

//Request to server for getPackages content
app.post("/getPackages", (req, res) => {
  let conn = newConnection();
  conn.connect();

  let markup = `
  ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Get Package")}
  ${HtmlLibrary.tblHeaders(
    "ID",
    "Weight",
    "Size (m³)",
    "Price (CAD)",
    "Destination",
    "Order Date",
    "Delivery Date",
    "Transaction #",
    "Truck"
  )}
    `;

  //Collect query result, and add them as table rows
  conn.query(
    `SELECT packageID, weight, size, price, destination, orderDate, deliveryDate, transactionNo, plateNo
    FROM Package
    WHERE senderEmail = "${req.body["customer"]}"`,
    (err, rows, fields) => {
      for (r of rows) {
        markup += `<tr>
            <td>${r.packageID}</td>
            <td>${r.weight}</td>
            <td>${r.size}</td>
            <td>${r.price}</td>
            <td>${r.destination}</td>
            <td>${r.orderDate}</td>
            <td>${r.deliveryDate != null ? r.deliveryDate : "Undelivered"}</td>
            <td>${r.transactionNo}</td>
            <td>${r.plateNo != null ? r.plateNo : "Unloaded"}</td>
            </tr>`;
      }
      markup += `</table>
                  ${HtmlLibrary.pgFooter}`;
      res.send(markup);
    }
  );

  conn.end();
});

//Update to server for confirmPayment content
app.post("/confirmPayment", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Updates Payment with transactionNo from form to update the payDate
  conn.query(
    `UPDATE Payment SET payDate = CURRENT_DATE() WHERE transactionNo=${req.body["transaction"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        let queryResult = `Transaction #${req.body["transaction"]} completed!`;

        let markup = `
        ${HtmlLibrary.pgHeader}
        ${HtmlLibrary.navbar("Confirm Payment")}
        ${queryResult}
        ${HtmlLibrary.pgFooter}
        `;

        res.send(markup);
      }
    }
  );

  conn.end();
});

//Request to server for selectRaise content
app.post("/selectRaise", (req, res) => {
  let conn = newConnection();
  conn.connect();

  //Creating var for server response as a form to accpt user credentials
  let markup = `
    ${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Enter Raise Amount")}
  ${HtmlLibrary.header(
    "Please enter the % raise you would like to give to employees with a below average salary."
  )}
  <form action="/applyRaise" method="post">
  <input name="officeNo" value="${req.body["officeNo"]}" class="hidden">
  <input name="percent" type="number" min="1" max="100">
  ${HtmlLibrary.btn("Confirm")}
  </form>
  ${HtmlLibrary.tblHeaders("Staff #", "Name", "Salary")}`;

  //Collect query result, and add them as table rows
  conn.query(
    `SELECT staffNo, staffName, salary FROM PostOfficeStaff WHERE officeNo = ${req.body["officeNo"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        for (r of rows) {
          markup += `<tr>
            <td>${r.staffNo}</td>
            <td>${r.staffName}</td>
            <td>${r.salary}</td>
            </tr>`;
        }

        markup += `</table>
        ${HtmlLibrary.pgFooter}`;

        res.send(markup);
      }
    }
  );

  conn.end();
});

//Update to server for selectRaise content
app.post("/applyRaise", (req, res) => {
  let conn = newConnection();
  conn.connect();

  let markup = `${HtmlLibrary.pgHeader}
  ${HtmlLibrary.navbar("Updated Salaries")}
  ${HtmlLibrary.tblHeaders("Staff #", "Name", "Salary")}`;

  //Updates PostOfficeStaff with values from form to update salaries
  conn.query(
    `UPDATE PostOfficeStaff 
    SET salary = salary * ${1 + req.body["percent"] / 100} 
    WHERE officeNo = ${req.body["officeNo"]} AND salary < (
        SELECT * FROM (
            SELECT AVG(salary) 
            FROM PostOfficeStaff
        ) as t1
    )`,
    (err, rows, fields) => {
      if (err) console.log(err);
    }
  );

  //Collect query result, and add them as table rows
  conn.query(
    `SELECT staffNo, staffName, salary FROM PostOfficeStaff WHERE officeNo = ${req.body["officeNo"]}`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else {
        for (r of rows) {
          markup += `<tr>
            <td>${r.staffNo}</td>
            <td>${r.staffName}</td>
            <td>${r.salary}</td>
            </tr>`;
        }

        markup += `</table>
        ${HtmlLibrary.pgFooter}`;

        res.send(markup);
      }
    }
  );

  conn.end();
});

app.listen(3000);
