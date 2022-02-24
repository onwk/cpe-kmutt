data <- read.csv("L8-demand.csv",sep = ";")
data
str(data)
summary(data)
cor(data)

mod1 <- lm(Target..Total.orders. ~ Non.urgent.order, data)
summary(mod1)

mod2 <- lm(Target..Total.orders. ~ Urgent.order, data)
summary(mod2)

mod3 <- lm(Target..Total.orders. ~ Urgent.order + Order.type.A, data)
summary(mod3)

mod4 <- lm(Target..Total.orders. ~ Urgent.order + Order.type.B, data)
summary(mod4)

mod5 <- lm(Target..Total.orders. ~ Urgent.order + Order.type.C, data)
summary(mod5)

mod6 <- lm(Target..Total.orders. ~ Urgent.order + Fiscal.sector.orders, data)
summary(mod6)

mod7 <- lm(Target..Total.orders. ~ Urgent.order + Banking.orders..1., data)
summary(mod7)

mod8 <- lm(Target..Total.orders. ~ Urgent.order + Banking.orders..1. + Order.type.B, data )
summary(mod8)

mod9 <- lm(Target..Total.orders. ~ Urgent.order + Banking.orders..2. + Order.type.B, data )
summary(mod9)

mod10 <- lm(Target..Total.orders. ~ Urgent.order + Banking.orders..3. + Order.type.B, data )
summary(mod10)
