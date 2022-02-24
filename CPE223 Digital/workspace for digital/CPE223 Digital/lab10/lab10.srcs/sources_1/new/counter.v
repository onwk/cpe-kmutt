`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/30/2020 10:49:55 AM
// Design Name: 
// Module Name: counter
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module counter(
    input clk_in,
    input [0:0] sw,
    output reg [3:0] led
    );
    initial led = 0;
    always @(posedge clk_in)
    begin
        if(!sw[0])
            led = 4'b0000;
        else
            if(led == 4'b1001)
                led = 4'b0000;
            else 
                led = led + 1;
    end
endmodule
