`timescale 1ns / 1ps

module scoreSeg(
    input clk,
    input reset,
    input [9:0] score,
    input [9:0] max_score,
    output [6:0] seg,
    output reg [3:0] an
    );
    
    wire [1:0] led_actived_counter;
    reg [19:0] refresh_counter;
    reg [3:0] display;
    
    always @(posedge clk) begin
        refresh_counter <= refresh_counter + 1;
    end
    assign led_actived_counter = refresh_counter[19:18];
    
    always @(*) begin
        case(led_actived_counter)
            2'b00 : begin
                an = 4'b0111;
                if(reset) display = max_score / 1000;
                else display = score / 1000;
            end
            2'b01 : begin
                an = 4'b1011;
                if(reset) display = (max_score % 1000) / 100;
                else display = (score % 1000) / 100;
            end
            2'b10 : begin
                an = 4'b1101;
                if(reset) display = ((max_score % 1000) % 100) / 10;
                else display = ((score % 1000) % 100) / 10;
            end
            2'b11 : begin
                an = 4'b1110;
                if(reset) display = ((max_score % 1000) % 100) % 10; 
                display = ((score % 1000) % 100) % 10; 
            end
        endcase
    end
    bcd7seg bcd1(display,seg);
endmodule
