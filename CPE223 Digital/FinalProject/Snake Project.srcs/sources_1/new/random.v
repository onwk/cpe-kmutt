`timescale 1ns / 1ps

module random(
    input clk_in,
    output reg [10:0] x,
    output reg [10:0] y
    );
   
    reg [10:0] rand_X = 40;
    reg [10:0] rand_Y = 50;
    
    //Create seed to random a number
    always @(posedge clk_in) begin
        if(rand_X < 20) rand_X = 60;
        else if(rand_X > 780) rand_X = 50;
        else rand_X = rand_X + 7;
        if(rand_Y < 20) rand_Y = 80;
        else if(rand_Y > 580) rand_Y = 70;
        else rand_Y = rand_Y + 5;
        x = rand_X;
        y = rand_Y;
    end
endmodule
