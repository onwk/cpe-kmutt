clear;
clc;
load('blood.mat');
subplot(1,2,1); % divide the image to panels for displaying multiple 	image
imshow(B)
sd=2;
y = imgaussfilt(B, sd);
subplot(1,2,2);
imshow(y,[0 255]);