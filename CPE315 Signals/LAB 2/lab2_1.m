   clear;
    clc;
    load('lena512.mat');
    show_img(lena512,1,1);
    lena20 = lena512(20,:);
    lena100 = lena512(100,:);
    lena250 = lena512(250,:);
    figure(2);
    subplot(3,1,1);
    plot(lena20)
    subplot(3,1,2);
    plot(lena100)
    subplot(3,1,3);
    plot(lena250)