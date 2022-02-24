`timescale 1ns / 1ps

module snake(
    input clock,
    input PS2Clk,
    input PS2Data,
    input [0:0] reset,
    input left,right,up,down,
    input [3:0] sw,
    output HSync,
    output VSync,
    output [0:0] led,
    output [7:0] k,  //show keyboard
    output [6:0] seg,
    output [3:0] an,
    output reg [3:0] vgaRed,
    output reg [3:0] vgaGreen,
    output reg [3:0] vgaBlue
    );
    
    wire clk_hf, clk_lf;
    wire [10:0] H_Count, V_Count;
    wire [10:0] x;
    wire [10:0] y;
//    wire [7:0] keyboard_data;
//    reg [7:0] key;
    reg [5:0] size = 3;
    reg foodMax;
    reg foodMin;
    reg head;
    reg body;
    reg border;
    reg display;
    reg [10:0] body_X[0:63];
    reg [10:0] body_Y[0:63]; 
    reg [10:0] food_X;
    reg [10:0] food_Y;
    reg [1:0] direction = 2'b00;
    reg eat1 = 0;
    reg eat2 = 0;
    reg hit = 0;
    reg game_over = 0;
    reg [9:0] score = 0;
    reg [9:0] max_score = 0;
    reg [5:0] count1 = 0;
    reg [5:0] count2 = 0;
    
    divide U1(clock,reset,clk_hf,clk_lf,led);
    VGASync U2(clk_hf,reset,H_Count,V_Count,HSync,VSync,led);
    random U3(clk_hf,x,y);
    //keyboard U4(PS2Clk,PS2Data,keyboard_data,k);
   
    initial begin
        food_X = x;
        food_Y = y;
        body_X[0] = 500;
        body_Y[0] = 300;
    end
    
//    reg [10:0] rand;
//    initial rand = 500;
//    always @(eat1 or eat2) begin
//        rand = $urandom%10;
//    end
    
    always @(posedge clk_hf) begin
        border = (H_Count < 20 || V_Count < 20 || (H_Count > 779 && H_Count < 800) || (V_Count > 579 && V_Count < 600));
        display = ~border;
//        if(rand < 400) begin
//            foodMax = (H_Count > food_X && H_Count < (food_X+20) && V_Count > food_Y && V_Count < (food_Y+20));
//        end   
//        else begin
            foodMin = (H_Count > food_X && H_Count < (food_X+15) && V_Count > food_Y && V_Count < (food_Y+15));
//        end
        hit = (body_X[0] < 20 || (body_X[0]+10) > 779 || body_Y[0] < 20 || (body_Y[0]+10) > 579);
        game_over = (head && body);
        eat1 = (head && foodMin);
//        eat2 = (head && foodMax);
        if(eat1 == 1) begin
            score = score + 3;
            size = size + 1;
            food_X = x;
            food_Y = y;
            if(food_X > 740) food_X = 90;
            if(food_Y > 540) food_Y = 250;
        end
//        if(eat2 == 1) begin
//            score = score + 5;
//            size = size + 2;
//            food_X = y;
//            food_Y = x;
//            if(food_X > 740) food_X = 90;
//            if(food_Y > 540) food_Y = 250;
//        end
        if(reset[0] == 1 || hit == 1 || game_over == 1) begin
            if(score > max_score) max_score <= score;
            score = 0;
            size = 3;
        end
    end
    scoreSeg U5(clock,reset[0],score,max_score,seg,an);
    
    always @(posedge clk_lf) begin
        if(reset[0] == 0) begin
            if(hit == 1 || game_over == 1) begin
                direction = 2'b00;
                body_X[0] = y;
                body_Y[0] = x;
                if(body_X[0] > 740) body_X[0] = 300;
                if(body_Y[0] > 540) body_Y[0] = 450;
            end
            for(count1 = 63; count1 > 0; count1 = count1 - 1) begin
                if(count1 <= size) begin
                    body_X[count1] = body_X[count1-1];
                    body_Y[count1] = body_Y[count1-1];
                end
            end
            if(sw[0]) begin
                if(direction == 2'b01) direction = 2'b01;
                else direction = 2'b00;
            end
            else if(sw[1]) begin
                if(direction == 2'b00) direction = 2'b00;
                else direction = 2'b01;
            end
            else if(sw[2]) begin
                if(direction == 2'b11) direction = 2'b11;
                else direction = 2'b10;
            end
            else if(sw[3]) begin
                if(direction == 2'b10) direction = 2'b10;
                else direction = 2'b11;
            end
            else direction = direction;
            case(direction)
                2'b00 : body_X[0] = body_X[0] - 15;
                2'b01 : body_X[0] = body_X[0] + 15;
                2'b10 : body_Y[0] = body_Y[0] - 15;
                2'b11 : body_Y[0] = body_Y[0] + 15;
            endcase
        end
        else begin
            body_X[0] = y;
            body_Y[0] = x;
            if(body_X[0] > 740) body_X[0] = 400;
            if(body_Y[0] > 540) body_Y[0] = 350;
        end
    end
   
    reg body_check;
    always @(posedge clk_hf) begin
        body_check = 0;
        for(count2 = 1; count2 < size; count2 = count2 + 1) begin
            if(body_check == 0) begin
                body = ((H_Count > body_X[count2] && H_Count < (body_X[count2]+15)) 
                       && (V_Count > body_Y[count2] && V_Count < (body_Y[count2]+15)));
                body_check = body;
            end
        end
        head = ((H_Count > body_X[0] && H_Count < (body_X[0]+15)) && (V_Count > body_Y[0] && V_Count < (body_Y[0]+15)));
    end
   
    wire R = (~display && border) || (display && foodMax);
    wire G = (display && (foodMin || foodMax));
    wire B = (display && (head || body));
    
    always @(posedge clk_hf) begin
        vgaRed = {8{R}};
        vgaGreen = {8{G}};
        vgaBlue = {8{B}};
    end
endmodule
