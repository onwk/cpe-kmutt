# count the number of odd integers in x
oddcount <- function(x) {
  k <- 0 
  fot(n in x){
    if(n %% 2 == 1) k <- k+1
  }
  return(k)
}