		clear;
   		clc;
     	
load('circuit.mat');
        	subplot(2,2,1);  imshow (B);
        	y1 = edge(B,'prewitt'); % change method to Canny, Sobel
     		subplot (2,2,2); imshow(y1,[0 1]);

        	y2 = edge(B,'canny'); 
     		subplot (2,2,3); imshow(y2,[0 1]);

        	y3 = edge(B,'sobel');
        	subplot (2,2,4); imshow(y3,[0 1]);
