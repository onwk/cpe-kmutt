`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/30/2020 11:19:12 AM
// Design Name: 
// Module Name: top
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


module top(
    input clk,
    input [0:0] sw,
    output [6:0] seg,
    output [0:0] an
    );
    wire clk_1Hz;
    wire [3:0] q;
    divider d1(clk,clk_1Hz);
    counter c1(clk_1Hz,sw[0],q);
    bcdto7seg b1(q,seg);
    assign an[0] = 1'b0;
endmodule
