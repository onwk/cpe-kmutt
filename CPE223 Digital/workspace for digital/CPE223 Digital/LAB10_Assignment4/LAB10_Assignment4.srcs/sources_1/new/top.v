`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 11/06/2020 10:42:59 AM
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
    input reset,
    output [6:0] seg,
    output reg [3:0] ano
    );
    wire clk_2;
    wire [5:0] count;
    reg [19:0] refresh_counter;
    wire [1:0] led_actived_counter;
    reg [3:0] display;
    divide(clk, clk_2);
    counter(clk_2, reset, count);
     always @(posedge clk)
       begin 
        refresh_counter <= refresh_counter + 1;
       end 
    assign led_actived_counter = refresh_counter[19:18]; // anode activating signals for 4 LEDs, digit period of 2.6ms
    // decoder to generate anode signals 
    always @(*) 
        begin
        case (led_actived_counter)
            2'b00 : begin // Not display
                    ano = 4'b1111;
                    display = 0;
                end
            2'b01 : begin // Not display
                    ano = 4'b1111;
                    display = 0;
                end
            2'b10 : begin
                    ano = 4'b1101; // Deactive LED1, LED2, LED4
                    display = count / 10; //  Decimal
                end
            2'b11 : begin
                    ano = 4'b1110; // Deactive LED1, LED2, LED3
                    display = count % 10; // Unit
                end
        endcase
    end
    bcdto7seg(display, seg); // Display number to 7 segment
endmodule
