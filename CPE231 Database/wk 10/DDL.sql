CREATE  TABLE EMPLOYEE(
	EmployeeID Int(11)  NOT NULL AUTO_INCREMENT,
	LastName	  Char(25)		   NOT NULL,
	FirstName	  Char(25)	     NOT NULL,
	CellPhone			          Char(12)		   NOT NULL,
	ExperienceLevel		Char(15)	NOT NULL,
	PRIMARY KEY(EmployeeID)
	);
    
CREATE  TABLE OWNER(
	OwnerID	Int(11)				     NOT NULL AUTO_INCREMENT,
	OwnerName Char(50) 		   NOT NULL,
	OwnerEmail Varchar(100)		   NULL DEFAULT NULL,
	OwnerType	Char(12)	 NULL DEFAULT NULL,
	PRIMARY KEY(OwnerID)
	);
    
CREATE  TABLE PROPERTY(
	PropertyID Int(11)				     NOT NULL AUTO_INCREMENT,
	PropertyName Char(50) 		   NOT NULL,
	Street Char(35)		   NOT NULL,
	City Char(35)		   NOT NULL,
	State Char(2)		   NOT NULL,
	Zip Char(10)		   NOT NULL,
	OwnerID Int(11)		   NOT NULL,
	PRIMARY KEY(PropertyID),
	FOREIGN KEY(OwnerID)
	REFERENCES OWNER(OwnerID)
	);

CREATE  TABLE SERVICE(
	PropertyID Int(11)				     NOT NULL,
	EmployeeID Int(11)				     NOT NULL,
	ServiceDate DateTime				     NOT NULL,
	HoursWorked Decimal(4,2)		   NULL DEFAULT NULL,
	PRIMARY KEY(PropertyID,EmployeeID,ServiceDate),
	FOREIGN KEY(EmployeeID)
	REFERENCES EMPLOYEE(EmployeeID),
	FOREIGN KEY(PropertyID)
	REFERENCES PROPERTY(PropertyID)
	);