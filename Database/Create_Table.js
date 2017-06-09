var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "Gallery_DB"
});

con.connect(function(err){
    if(err) throw err;
	console.log("Connected!");

	var sql_CreateTB = "CREATE TABLE IF NOT EXISTS User(	U_ID VARCHAR(10) NOT NULL,\
											U_Password VARCHAR(10) NOT NULL,\
											U_SSN INT NOT NULL,	\
											U_Name TINYTEXT NOT NULL,			\
											U_Address TEXT NOT NULL,				\
											U_Phone TINYTEXT NOT NULL,			\
											U_MoneyBuy_LastYear BIGINT NOT NULL DEFAULT 0,	\
											U_MoneyBuy_ThisYear BIGINT NOT NULL DEFAULT 0,	\
											U_MoneyEarn_LastYear BIGINT NOT NULL DEFAULT 0,	\
											U_MoneyEarn_ThisYear BIGINT NOT NULL DEFAULT 0,	\
											CONSTRAINT UNIQUE (U_ID),\
											CONSTRAINT PRIMARY KEY (U_SSN)\
											)";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( User ) Created");
	});

	sql_CreateTB = "CREATE TABLE IF NOT EXISTS Salesperson(	S_SSN INT NOT NULL,		\
													S_Name TINYTEXT NOT NULL,				\
													S_Address TEXT NOT NULL,				\
													S_Phone TINYTEXT NOT NULL,			\
													S_Starting_Date TIMESTAMP NOT NULL,	\
													CONSTRAINT PRIMARY KEY (S_SSN)		\
													)";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( Salesperson ) Created");
	});

	sql_CreateTB = "CREATE TABLE IF NOT EXISTS Artist(	A_SSN INT NOT NULL,		\
												A_Name TINYTEXT NOT NULL,			\
												A_Address TEXT NOT NULL,				\
												A_Phone TINYTEXT NOT NULL,			\
												A_Usually_Type TINYTEXT NOT NULL,		\
												A_Usually_Medium TINYTEXT NOT NULL,	\
												A_Usually_Style TINYTEXT NOT NULL,	\
												A_MoneyEarn_LastYear BIGINT NOT NULL,	\
												A_MoneyEarn_ThisYear BIGINT NOT NULL,	\
												CONSTRAINT PRIMARY KEY (A_SSN)		\
												)";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( Artist ) Created");
	});

	sql_CreateTB = "CREATE TABLE IF NOT EXISTS Work(	Title VARCHAR(50) NOT NULL,\
											Artist_SSN INT NOT NULL,			\
											Owner_SSN INT NOT NULL,				\
											Type TINYTEXT NOT NULL,				\
											Medium TINYTEXT NOT NULL,			\
											Style TINYTEXT NOT NULL,			\
											Size TINYTEXT NOT NULL,				\
											Asking_Price BIGINT NOT NULL,		\
											Date_of_Show TIMESTAMP,				\
											Sold BIT(1) NOT NULL DEFAULT 0,		\
											PRIMARY KEY (Title, Artist_SSN),	\
											FOREIGN KEY (Artist_SSN) REFERENCES Artist (A_SSN)\
											);";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( Work ) Created");
	});

	sql_CreateTB = "CREATE TABLE IF NOT EXISTS Sale(	Sold_Title VARCHAR(50) NOT NULL,\
											Artist_SSN INT NOT NULL,\
											Owner_SSN INT NOT NULL,				\
											Customer_SSN INT NOT NULL,			\
											Date_of_sold TIMESTAMP NOT NULL,	\
											Salesperson_SSN	INT	NOT NULL,		\
											Selling_Price INT NOT NULL,			\
											PRIMARY KEY (Artist_SSN, Sold_Title, Date_of_sold),\
											FOREIGN KEY (Customer_SSN) REFERENCES User(U_SSN),\
											FOREIGN KEY (Salesperson_SSN) REFERENCES Salesperson(S_SSN),\
											FOREIGN KEY (Sold_Title, Artist_SSN) REFERENCES Work(Title, Artist_SSN)\
											)";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( Sale ) Created");
	});

	sql_CreateTB = "CREATE TABLE IF NOT EXISTS Negotiate( N_Title VARCHAR(50) NOT NULL,\
										N_Artist_SSN INT NOT NULL,\
										N_Asking_Price INT NOT NULL DEFAULT 0,\
										N_User_SSN INT NOT NULL,\
										N_Giving_Price INT NOT NULL DEFAULT 0,\
										PRIMARY KEY (N_Artist_SSN, N_Title),\
										FOREIGN KEY (N_Artist_SSN, N_Title) REFERENCES Work(Artist_SSN, Title),\
										FOREIGN KEY (N_User_SSN) REFERENCES User(U_SSN))"

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("Table( Negotiate ) Created");
	});

	sql_CreateTB = "CREATE OR REPLACE VIEW comp1_R3 AS\
									SELECT *\
									FROM work\
									LEFT JOIN User ON Work.Owner_SSN=User.U_SSN"

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("View( R_3_component_1 ) Created");
	});

	sql_CreateTB = "CREATE OR REPLACE VIEW Require3 (Title, Author_name, Type, \
	 						Medium, Style, O_Uname, O_Aname, Asking_Price, Date_of_show) AS\
	 						SELECT Title, A_Name, Type, Medium, Style, 		\
	 							  U_Name, A_Name, Asking_Price, Date_of_Show			\
	 						FROM Artist, comp1_R3\
	 						WHERE Artist.A_SSN=comp1_R3.Artist_SSN OR Artist.A_SSN=comp1_R3.Owner_SSN";
	// var sql_CreateTB = "CREATE OR REPLACE VIEW Require3 (Title, Author_name, Type, \
	// 						Medium, Style, O_Uname, O_Aname, Asking_Price, Date_of_show) AS\
	// 						SELECT Title, A_Name, Type, Medium, Style, 		\
	// 							  U_Name, A_Name, Asking_Price, Date_of_Show			\
	// 						FROM Artist, (	SELECT *\
	// 										FROM Work\
	// 										LEFT JOIN User ON Work.Owner_SSN=User.U_SSN) AS L_Table\
	// 						WHERE Artist.A_SSN=L_Table.Artist_SSN OR Artist.A_SSN=L_Table.Owner_SSN";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("View( R_3 ) Created");
	});

	// var sql_CreateTB = "CREATE OR REPLACE VIEW Require7 (O_SSN, O_Uname, O_Uaddr, O_Aname, O_Aaddr, Author_name,\
	// 					Title, Type, Medium, Style, Size, Salesperson_Name, Selling_Price) AS\
	// 					SELECT Owner_SSN, U_Name, U_Address, A_Name, A_Address, A_Name, Title, Type, Medium, Style, Size, S_Name, Selling_Price\
	// 					FROM Artist, (	SELECT *\
	// 									FROM Salesperson, (	SELECT *\
	// 														FROM Work, (SELECT *\
	// 																	FROM Sale\
	// 																	LEFT JOIN User ON Sale.Owner_SSN=User.U_SSN) AS Layer_1\
	// 														WHERE Work(Title, Artist_SSN)=Layer_1(Sold_Title, Artist_SSN) ) AS Layer_2\
	// 									WHERE Salesperson.S_SSN=Layer_2.Salesperson_SSN) AS Layer_3\
	// 					WHERE Artist.A_SSN=Layer_3.Artist_SSN";

	// con.query(sql_CreateTB, function(err, result){
	// 	if(err) throw err;
	// 	console.log("View( R_7 ) Created");
	// });

	sql_CreateTB = "CREATE OR REPLACE VIEW comp1_R9 AS\
								SELECT *\
								FROM Work, Artist\
								WHERE Work.Artist_SSN=Artist.A_SSN";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("View( R_9_Component_1 ) Created");
	});

	sql_CreateTB = "CREATE OR REPLACE VIEW Require9 (Artist, Title, Type, Medium, Style, Asking_Price, Selling_Price, Date_of_sold) AS\
														SELECT A_Name, Sold_Title, Type, Medium, Style, Asking_Price, Selling_Price, Date_of_sold\
														FROM Sale, comp1_R9\
														WHERE (Sale.Sold_Title, Sale.Artist_SSN)=(comp1_R9.Title, comp1_R9.Artist_SSN) \
														ORDER BY Sale.Artist_SSN";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("View( R_9 ) Created");
	});

	sql_CreateTB = "CREATE OR REPLACE VIEW Require11 (SalesPerson, Title, Artist, Asking_Price, Selling_Price, Date_of_sold) AS\
													SELECT Salesperson.S_Name, Title, A_Name, Asking_Price, Selling_Price, Date_of_sold\
													FROM Sale, Salesperson, Work, Artist\
													WHERE Sale.Salesperson_SSN=Salesperson.S_SSN AND (Sale.Sold_Title, Sale.Artist_SSN)=(Work.Title, Work.Artist_SSN) AND Sale.Artist_SSN=Artist.A_SSN";

	con.query(sql_CreateTB, function(err, result){
		if(err) throw err;
		console.log("View( R_11 ) Created");
	});

	con.end(function(err) {
	  // The connection is terminated now
	});
});
