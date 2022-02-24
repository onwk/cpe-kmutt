clear;
clc;
load('D:\ONW\CPE3-1\CPE315_Signals\wk 15\imgBio\blood.mat');
h=[1,-1];
y =conv2(B,h);
imshow(B,[0 255]);