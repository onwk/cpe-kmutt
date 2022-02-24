clear;
clc;
load('D:\ONW\CPE3-1\CPE315_Signals\wk 15\imgBio\blood.mat'); % you can use whos to view the loaded variable
% h=1/10*ones(1,10); %10 point-moving average
h=[0.5,0.5]; % 2 point-moving average
y =conv2(B,h);
imshow(B,[0 255]);
