-- First Type of INSERT (Regular Insert)

INSERT INTO Region VALUES(null, 'London');
INSERT INTO Region VALUES(null, 'Toronto');

INSERT INTO PostOffice VALUES(null, 500, 1);
INSERT INTO PostOffice VALUES(null, 250, 1);
INSERT INTO PostOffice VALUES(null, 500, 2);
INSERT INTO PostOffice VALUES(null, 200, 2);
INSERT INTO PostOffice VALUES(null, 300, 2);

INSERT INTO PostOfficeStaff VALUES(null, 'Justin Beaudry', '0000000000', CURRENT_DATE(), 100000, 1);

INSERT INTO Location VALUES('A1A1A1', '123 Example St', 1);

INSERT INTO Customer VALUES('example@gmail.com', 'Liam Sharkey', 'A1A1A1', '1000000000', '0000000000000000');

INSERT INTO Payment VALUES(null, null, CURRENT_DATE(), 1);

INSERT INTO Package VALUES(null, 10, 2, 25, 'B1A1A1', CURRENT_DATE(), null, 'example@gmail.com', 1, null);

INSERT INTO Truck VALUES('AV00000', 800, 250, 2019, 1);

INSERT INTO Driver VALUES(null, 'Warren Sucklal', '0000000000', CURRENT_DATE(), 'B23600000000000', 40, 'AV00000');

-- Second Type of INSERT (Inserting using values from other tables)

INSERT INTO Visit VALUES(
	(SELECT officeNo FROM PostOffice ORDER BY RAND() LIMIT 1),
    (SELECT plateNo FROM Truck ORDER BY RAND() LIMIT 1),
    CURRENT_DATE()
);

-- Third Type of INSERT (Inserting using aggregate function)

INSERT INTO Location VALUES(
	'C1A1A1',
    '234 Example St',
    (SELECT MAX(officeNo) as officeNo FROM PostOffice)
);

SELECT * FROM PostOffice;
