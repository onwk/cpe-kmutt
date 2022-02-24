library(tidyverse)
library(caret)
library(e1071)

data <- read.csv("credit-approval.csv",sep = ",")
data
str(data)
summary(data)

data %>%
  filter(A1 !="?",A2 !="?", A4 !="?", A5 !="?", A6 !="?", A7 !="?", A14 !="?") -> data
data

data$A16 <- factor(ifelse(data$A16 == "+", 1,0))
model <- glm(A16 ~ A2+A8 +A2:A8, data, family = binomial)
res1 <- predict(model,data,type = "response")
# res1
res1c <-factor(ifelse(res1 > 0.2,1,0))
# res1c
confusionMatrix(res1c, data$A16, mode = "prec_recall", positive="1")
