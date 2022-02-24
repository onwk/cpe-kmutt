library('tidyverse')
data <- read.csv("vgsales.csv")
#str(data)
data %>%
  mutate_if(is.character, as.factor) -> data
#data %>%
#  mutate_if(is.numeric, as.integer) -> data
summary(data)

data %>%
  filter(Publisher == "Nintendo") %>%
   ggplot(aes(x = Genre, fill = Genre)) + geom_bar() + theme_classic() + ylab("Count")

data %>%
  filter(Publisher == "Nintendo") %>%
  group_by(Genre)%>%
  count(Genre, sort = TRUE)

data %>%
  filter(Global_Sales < quantile(Global_Sales, 0.9)) %>%
  ggplot(aes(x = Global_Sales)) + geom_histogram()

data %>%
  filter(Global_Sales < quantile(Global_Sales, 0.9)) %>%
  summarise(Q1 = quantile(Global_Sales, 0.25),
            mean = mean(Global_Sales),
            Q3 = quantile(Global_Sales,0.75),
            IQR = IQR(Global_Sales))
