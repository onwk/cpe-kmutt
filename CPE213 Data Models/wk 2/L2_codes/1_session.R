## 1. R session
# The symbol <- assign the vector created by function c() to a variable named x
x <- c(1,2,4)

# Vectors can be used as input to create a new vector
q <- c(x,x,8)

## 2. Variable printing and subsetting
# Printing
q

# Select an individual element of a vector at index 1
q[1]
q[8]

# Subsetting the range of vector
q[1:4]

# Deselect
q[-2]

# Deselect range
q[-1:-4]

# Selective subsetting
q[c(2,5)]

## 3. Calling functions
y <- mean(x)
y1 <- sd(x)

## 4. Internal data
# List of data
data()
Nile
iris
mtcars


## 5. Data types
x1 <- 'hello' # character
x2 <- 1.5 # numeric
x3 <- 2L # integer
x4 <- 1+1i # complex
x5 <- FALSE # logical

##  6. Vectors
# one-element vector
x <- 1
# three-element vector
x <- c(2,4,6)

# vector is imputable (its structure cannot be modified)
x <- c(88,5,12,13)
x <- c(x[1:3],168,x[4])
length(x)

## 7. Matrix is a vector
# Matrix creation
m <- matrix(1:4, nrow = 2)

# Matrix is acually a vector
m + 10:13

## 8. Vector operation
# add/subtract
x <- c(1,2,4)
x + c(5,0,1)
x - 1
x + c(2,1)

# element-wise multiplication
x * c(5,0,4)
# element-wise divisiom
x / c(5,4,-1)
# element-wise modulus
x %% c(5,4,-1)

## 10. NA and NULL
x <- c(88,NA,12,168,13)
x
mean(x)
mean(x,na.rm = TRUE)
x <- c(88,NULL,12,168,13)
mean(x)

## 11. Filtering (row selection)
z <- c(5,2,-3,8)
w <- z[z*z > 8]
w
z*z > 8

x <- c(1,3,8,2,10)
x[x > 3] <- 0
x

## 12. Selection function which() (index selection)
x <- c(1,3,8,2,10)
which(x>3)

## 13. Testing vector equality
x <- c(1,3,5)
y <- x
z <- c(1,3,2)
all(x == y)
all(x == z)
identical(x,y)
identical(x,z)

## 14. Creating matrix
m <- matrix(1:4, nrow = 2, ncol = 2)
m

y <- matrix(1:6, nrow = 2)
y

y <- matrix(1:6, nrow = 2, byrow = TRUE)
y

## 15. Matrix operation
3*m  # scalar multiplication
m %*% m # matrix multiplication
m + m # matrix addition

z <- matrix(1:16, nrow = 4)
z[,2:3] # matrix indexing

z <- matrix(1:6, ncol = 2)
z
cbind(z,rep(1,3))

## 16. Object coersion
# implicit
c(1.7,"a")
c(TRUE,2)
c("a",TRUE)
# explicit
x -> 0:6
class(x)
as.numeric(x)
as.logical(x)
as.character(x)

# 17. List
j <- list(name="Joe", salary = 55000, union = T)
j

j$salary # indexing by name
j[["salary"]] # unlist and indexing by name
j[[2]] # indexing by location

# adding list elements
z <- list(a='abc', b=12)
z
z$c <- TRUE
z
# deleting list element
z[3] <- NULL
z
# getting list size
length(z)
# get names
names(j)
uj <- unlist(j)
class(uj)
uj

## 18. Data frames
data("iris")
iris

# data frame structure
str(iris)

# accessing data frame
iris[[1]]
iris$Sepal.Length
iris[,1]

head(iris)

iris$Sepal.Raio <- iris$Sepal.Length/iris$Sepal.Width
head(iris)

# deleting a column
iris$Sepal.Ratio <- NULL
colnames(iris)

# adding a row
# 1. binding a list to a data frame
tail(rbind(mtcars,list(99,10,200,999,9,9,99,1,1,9,9)))
# 2. use rbind.data.frame
rbind.data.frame(mtcars,c(88,10,200,888,8,8,88,1,1,8,8))

## 19. Factors
x <- c(5,12,13,12)
xf <- factor(x)
xf
str(xf)

## 20. Acitivity 1: Hint
# reading a csv file
# Note: you must change working directory to where you store your files
read.csv("HR-Employee-Attrition.csv", sep=";")
