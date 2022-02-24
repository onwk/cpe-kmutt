`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/29/2020 12:16:05 AM
// Design Name: 
// Module Name: divider
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


module divider(
    input clock,
    output clk_out
    );
    reg elapsed; //elapsed time 1 sec
    reg [27:0]state;
    
    always@(posedge clock)
        if(state == 100000000) state <= 0;
        else state <= state+1;
    always@(state)
        if(state == 100000000) elapsed = 1;
        else elapsed = 0;
    assign clk_out = elapsed;
endmodule
