library(tidyverse)
data <- read.csv("superstore.csv", sep = '|')
data
summary(data)
data %>%
  group_by(Order.Date, Order.ID) %>%
  summarise(n = n())

# 1.
data %>%
  select(Order.ID, Order.Date) %>%
  distinct() %>%
  group_by(Order.Date) %>%
  summarise(n = n()) %>%
  ggplot() + geom_histogram(aes(x = n), binwidth = 1, fill = 'orange') +
  xlab('Number of Daily Order') + ylab('Number of dat that has x order')

# 2.
data %>%
  mutate(ProcessTime = as.Date(Ship.Date) - as.Date(Order.Date)) %>%
  group_by(Category) %>%
  ggplot(aes(x = ProcessTime, fill = Category)) + geom_bar(position = 'dodge')

# 3.
data %>%
  mutate(ProcessTime = as.Date(Ship.Date) - as.Date(Order.Date)) %>%
  ggplot(aes(x = ProcessTime, fill = 'red')) + geom_density()

# 4.
data %>%
  mutate(ProcessTime = as.Date(Ship.Date) - as.Date(Order.Date)) %>%
  select(ProcessTime) -> OrderTime
# Sampling
  quantile(OrderTime$ProcessTime, runif(1000)) -> y
  sampling <- c()
sampling <- append(sampling, as.numeric(y))
ggplot() + geom_histogram(aes(x = sampling), binwidth = 1) 
# raw data
ggplot() + geom_histogram(aes(x = OrderTime$ProcessTime), binwidth = 1)

# 6.
data %>%
  mutate(DayInWeek = format(as.Date(Order.Date), format= "%a")) %>%
  group_by(DayInWeek) %>%
  summarise(n = n(), Sales = sum(Sales)) %>%
  filter(DayInWeek == 'ศ.') -> oldFri

data %>%
  mutate(DayInWeek = format(as.Date(Order.Date), format = "%a")) %>%
  group_by(DayInWeek) %>%
  summarise(n =n(), Sales = sum(Sales)) %>%
  mutate(Sales = ifelse(DayInWeek == 'ศ.', Sales * 1.5, Sales)) %>%
  filter(DayInWeek == 'ศ.') -> newFri

  rbind(oldFri, newFri) %>%
  ggplot() + geom_col(aes(x = DayInWeek, y = Sales, fill = Sales))
                    
