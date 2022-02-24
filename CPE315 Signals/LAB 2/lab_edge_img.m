clear;
    clc;
    load('echart.mat');
    show_img(echart,1,1);
    
    
    y = conv2(echart,[1 -1],'same');
    show_img(y);
    
    
%    all_new = edge(echart);
%    all= ~all_new;
%    show_img(all);