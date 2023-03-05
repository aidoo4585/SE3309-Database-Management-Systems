const { doesNotMatch } = require("assert");
const mysql = require("mysql");

let firstNames = [
  "Justin",
  "Matthew",
  "Liam",
  "Warren",
  "Kenny",
  "Robert",
  "Mary",
  "Patricia",
  "Patrick",
  "Jennifer",
  "Charles",
  "Sarah",
  "Henry",
  "Karen",
  "Olivia",
  "Emma",
  "Chloe",
  "Sophia",
  "Aria",
  "Ava",
  "Candace",
  "Zoey",
  "Abigail",
  "Amilia",
  "Noah",
  "Liam",
  "Jackson",
  "Lucas",
  "Logan",
  "Benjamin",
  "Jacob",
  "William",
  "Oliver",
  "James",
  "Bill",
  "Louis",
  "Mario",
  "Gordon",
  "Cole",
  "Taitum",
  "Ryan",
  "Heather",
  "Lauren",
  "Penny",
  "Jeff",
  "Joel",
  "Ahmed",
  "Margaret",
  "Carl",
  "Angela",
  "Herman",
  "Solomon",
  "Tracy",
  "Cherie",
  "Jane",
  "Thomas",
  "Booker",
  "Omar",
  "Hassan",
  "Keith",
];

let lastNames = [
  "Beaudry",
  "Miller",
  "Sharkey",
  "Sucklal",
  "Aidoo",
  "Smith",
  "Brown",
  "Tremblay",
  "Martin",
  "Roy",
  "Neff",
  "Lee",
  "Wilson",
  "Johnson",
  "MacDonald",
  "Bouchard",
  "Gauthier",
  "Morin",
  "Lavoie",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Martinez",
  "Rodriguez",
  "Jones",
  "Henderson",
  "Wood",
  "Ramsey",
  "Park",
  "Chen",
  "Caufield",
  "Price",
  "Weber",
  "Primeau",
  "Brees",
  "Karlsson",
  "Phoeling",
  "Bezos",
  "Braun",
  "Hussen",
  "Keefe",
  "Atwood",
  "Towels",
  "Kropotkin",
  "Melville",
  "Northup",
  "Chevalier",
  "Dimaline",
  "Austen",
  "Stienbeck",
  "Twain",
  "Sankara",
  "Washington",
];

let emailSuffixs = [
  "gmail.com",
  "yahoo.com",
  "uwo.ca",
  "msn.com",
  "aol.com",
  "hotmail.com",
  "icloud.com",
  "outlook.com",
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Keeping track of possible foregin keys
let allEmails = [];
let allPostCodes = [];
let allTrucks = [];
let years = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
];

let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password!",
  database: "postOffice",
});

function getName() {
  return {
    first: firstNames[Math.floor(Math.random() * firstNames.length)],
    last: lastNames[Math.floor(Math.random() * lastNames.length)],
  };
}

function getEmail(name) {
  let email = name.first + name.last + Math.floor(Math.random() * 10000);
  let suffix =
    "@" + emailSuffixs[Math.floor(Math.random() * emailSuffixs.length)];

  let eAddr = (email + suffix).toLowerCase();

  allEmails.push(eAddr);

  return eAddr;
}

function getRandCode() {
  let postCode = "";
  let lets = [];
  let nums = [];

  // Creates id out of given chars of length idLen
  for (var i = 0; i < 3; i++) {
    nums.push(Math.floor(Math.random() * 8 + 1));
    lets.push(letters[Math.floor(Math.random() * letters.length)]);

    postCode += lets[i] + nums[i];
  }

  allPostCodes.push(postCode);

  return postCode;
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandLocValue() {
  let officeNo = Math.floor(Math.random() * 5 + 1);
  let postCode = getRandCode();

  return `("${postCode}", "123 Example St", ${officeNo})`;
}

function getRandLocValues(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandLocValue();
    //sqlStr.push(getRandValue()); //Remove
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandCustVal() {
  let name = getName();
  let postCode = allPostCodes[Math.floor(Math.random() * allPostCodes.length)];

  return `( "${getEmail(name)}", "${name.first} ${
    name.last
  }", "${postCode}", "6470000000", "0000000000000000")`;
}

function getRandCustVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandCustVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandPyVal() {
  let staffNo = randNum(1, 50);

  return `(null, null, CURRENT_DATE(), ${staffNo})`;
}

function getRandPyVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandPyVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandPckVal() {
  let weight = randNum(5, 100);
  let size = randNum(1, 10);
  let price = 5.0;
  let destination =
    allPostCodes[Math.floor(Math.random() * allPostCodes.length)];
  let senderEmail = allEmails[Math.floor(Math.random() * allEmails.length)];
  let transactionNo = randNum(1, 4000);
  let delivered = randNum(1, 200) < 5 ? "null" : "CURRENT_DATE()"; // Low chance not delivered
  //let plate = allTrucks[Math.floor(Math.random() * allTrucks.length)]

  return `(null, ${weight}, ${size}, ${price}, "${destination}", CURRENT_DATE(), ${delivered}, "${senderEmail}", ${transactionNo}, "AV00000")`;
}

function getRandPckVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandPckVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandStaffVal() {
  let name = getName();
  let salary = randNum(50, 100) * 1000;
  let officeNo = Math.floor(Math.random() * 5 + 1);

  return `(null, "${name.first} ${name.last}", "0000000000", CURRENT_DATE(), ${salary}, ${officeNo})`;
}

function getRandStaffVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandStaffVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandTrkVal() {
  let plate = "";
  let mWeight = randNum(250, 500);
  let mSize = randNum(200, 300);
  let year = years[Math.floor(Math.random() * years.length)];
  let region = randNum(1, 2);

  for (let i = 0; i < 7; i++) {
    if (i < 2) plate += letters[Math.floor(Math.random() * letters.length)];
    else plate += randNum(0, 9);
  }

  allTrucks.push(plate);

  return `("${plate}", ${mWeight}, ${mSize}, ${year}, ${region})`;
}

function getRandTrkVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandTrkVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

function getRandDrvVal() {
  let name = getName();
  let hours = randNum(20, 50);
  let plate = allTrucks[Math.floor(Math.random() * allTrucks.length)];
  let num = randNum(1000000000, 9999999999);

  return `(null, "${name.first} ${name.last}", "0000000000", CURRENT_DATE(), "${
    "B2365" + num
  }", ${hours}, "${plate}")`;
}

function getRandDrvVals(num) {
  let sqlStr = ``;
  for (let i = 0; i < num; i++) {
    sqlStr += getRandDrvVal();
    if (i + 1 < num) {
      sqlStr += `, `;
    } else {
      return sqlStr;
    }
  }
}

// Population functions
function popLoc(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO location VALUES ` + getRandLocValues(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Location row(s) inserted");
          }
        );
        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popCust(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO customer VALUES ` + getRandCustVals(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Customer row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popPy(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO payment VALUES ` + getRandPyVals(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Payment row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popPck(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO package VALUES ` + getRandPckVals(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Package row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popStaff(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO postOfficeStaff VALUES ` +
            getRandStaffVals(rowNum) +
            `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Staff row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popTrk(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO truck VALUES ` + getRandTrkVals(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Truck row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

function popDrv(insertNum, rowNum) {
  return new Promise((resolve, reject) => {
    if (insertNum > 0 && rowNum > 0 && rowNum < 101) {
      for (let i = 0; i < insertNum; i++) {
        conn.query(
          `INSERT INTO driver VALUES ` + getRandDrvVals(rowNum) + `;`,
          (err, rows, fields) => {
            if (err) console.log(err);
            else console.log(rowNum + " Driver row(s) inserted");
          }
        );

        if (i + 1 == insertNum) {
          resolve();
        }
      }
    } else {
      console.log(
        "Insert number must be greater than 0 and number of rows must be greater than 0 and less than 101"
      );
      resolve();
    }
  });
}

async function populate(loc, cust, py, pck, staff, trk, drv) {
  conn.connect();

  await popLoc(loc.insert, loc.rows);
  await popCust(cust.insert, cust.rows);
  await popStaff(staff.insert, staff.rows);
  await popPy(py.insert, py.rows);
  await popTrk(trk.insert, trk.rows);
  await popPck(pck.insert, pck.rows);
  await popDrv(drv.insert, drv.rows);

  console.log("Done");

  conn.end();
}

populate(
  { insert: 5, rows: 100 },
  { insert: 20, rows: 100 },
  { insert: 40, rows: 100 },
  { insert: 45, rows: 100 },
  { insert: 1, rows: 50 },
  { insert: 1, rows: 15 },
  { insert: 1, rows: 50 }
);
