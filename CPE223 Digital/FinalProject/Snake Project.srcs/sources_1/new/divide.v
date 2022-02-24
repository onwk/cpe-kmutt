`timescale 1ns / 1ps

module divide(
    input clk_in,
    input [0:0] reset,
    output reg clk_out,
    output reg update_clk_out,
    output reg [0:0] led
    );
    
    reg counter = 0;
    reg [27:0] update_counter; 
    
    always @(posedge clk_in) begin
        counter = ~counter;
        clk_out = counter;
        if(update_counter  < 25000000) begin
            update_counter = update_counter + 1;
            update_clk_out = 0;
        end
        else begin
            update_counter = 0;
            update_clk_out = 1;
        end
    end
endmodule
