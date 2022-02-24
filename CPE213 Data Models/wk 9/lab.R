library('tidyverse')
data <- read.csv("StudentsPerformance.csv")
str(data)
summary(data)

data %>%
  #filter(math.score > 20) %>%
  ggplot() + geom_histogram(aes(x = math.score),bins = 10, color = 'black')

data %>%
  group_by(math.score) %>%
  summarise(count = n()) -> MathScore

mathcdf <- ecdf(MathScore$count)
plot(mathcdf)

#Sampling
quantile(MathScore$count, runif(10))
