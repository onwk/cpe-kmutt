## 0. Load 4_EDAWR.RData by double click the file or load from the Files panel

storms
cases
pollution

# 1. tidyr: gather
library(tidyr)
gather(cases, "year", "n", 2:4)

# 2. tidyr: spread
spread(pollution, size, amount)

# 3. tidyr: separate
storms2 <- separate(storms, date, c("year","month","date"), sep = "-")
storms2

# 4. tidyr: unite
unite(storms2, "date", year, month, day, sep = "/")

# 5. dplyr: select
library(dplyr)
# select columns
select(storms, storm, pressure)
# deselect column
select(storms, -storm)
# select range
select(storms, wind:date)

# 5. dplyr: filter
# filter one condition
filter(storms, wind >= 50)
# filter two conditions
filter(storms, wind >= 50, storm %in% c("Alberto", "Alex", "Allison"))

# 6. dplyr: mutate
mutate(storms,
       ratio = pressure / wind,
       inverse = ratio^-1)

# 7. dplyr: summarise
summarise(pollution, median = median(amount), variance = var(amount))
pollution %>% summarise(median = median(amount), variance = var(amount))
pollution %>% summarise(median = median(amount), variance = var(amount), n = n())

# 8. dplyr: arrange
arrange(storms, wind)
arrange(storms, desc(wind))
arrange(storms, wind)
arrange(storms, wind, date)

# 9. dplyr: %>% 
select(storms, storm, pressure)
storms %>% select(storm, pressure)

filter(storms, wind >= 50)
storms %>% filter(wind >= 50)
storms %>% filter(wind >= 50) %>% select(storm, pressure)

storms %>% 
  mutate(ratio = pressure / wind) %>% 
  select(storm, ratio) -> storms_ratio

# 10. group_by + summarise()
pollution %>% group_by(city)
pollution %>% 
  group_by(city) %>% 
  summarise(median = median(amount), variance = var(amount), n = n())

# 11. Set operation
y <- data.frame(x1 = c('A','B','C'), x2 = 1:3)
z <- data.frame(x1 = c('B','C','D'), x2 = 2:4)
bind_cols(y, z)
bind_rows(y, z)
union(y, z)
intersect(y, z)
setdiff(y, z)

# 12. Database operations
songs <- data.frame(song = c("Across the Universe", "Come Together", "Hello Goodbye", "Peggy Sue"),
                    name = c("John","John","Paul","Buddy"))
artists <- data.frame(name = c("George","John","Paul","Ringo"),
                      plays = c("sitar","guitar","bass", "drums"))
left_join(songs, artists, by = "name")
inner_join(songs, artists, by = "name")
semi_join(songs, artists, by = "name")
anti_join(songs, artists, by = "name")
