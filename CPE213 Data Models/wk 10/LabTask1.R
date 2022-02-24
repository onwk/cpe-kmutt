library(tidyverse)
# Simple Pi
n_hits <- 0
m_trials <- 100000000
counter <- 0
while(counter < m_trials){
  x <- runif(n = 1, min = 0, max = 1)
  y <- runif(n = 1, min = 0, max = 1)
  if(x**2 + y**2 < 1){
      n_hits <- n_hits + 1 
  }
  counter <- counter + 1
}
pie <- 4*n_hits/m_trials
pie

#error <-c()
error <-append(error, abs(pi - pie))
error
ggplot() + geom_point(aes(x = c(10,100,1000,10000,100000,1000000,10000000,100000000), y = error), size = 1) + 
  scale_x_log10() + scale_y_log10() + geom_abline(slope = -0.5) + xlab("m_trials") +
  geom_smooth(aes(x = c(10,100,1000,10000,100000,1000000,10000000,100000000), y = error),method = 'lm', color = 'blue', se = FALSE)
