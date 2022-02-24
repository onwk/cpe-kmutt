clear;
clc;
load('lena512.mat');
B = [1/6 1/6 1/6 1/6 1/6]';
y_lena=conv2(lena512,B);
show_img(y_lena,1,1);