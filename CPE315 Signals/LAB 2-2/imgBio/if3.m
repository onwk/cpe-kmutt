	clear;
      clc;
      load('saltpep.mat'); 
      subplot(1,2,1); % divide the image to panels for displaying multiple 	image
      imshow(B)
      y = medfilt2(B);
      subplot(1,2,2);
      imshow(y,[0 255]);
