`timescale 1ns / 1ps

module bcd7seg(
    input [3:0] led,
    output reg [6:0] seg
    );
    
    wire a, b, c, d, e, f, g;
    assign a = (led == 1 || led == 4)? 1 : 0;
    assign b = (led == 5 || led == 6)? 1 : 0;
    assign c = (led == 2)? 1 : 0;
    assign d = (led == 1 || led == 4 || led == 7)? 1 : 0;
    assign e = (led == 8 || led == 6 || led == 2 || led == 0)? 0 : 1;
    assign f = (led == 1 || led == 2 || led == 3 || led == 7)? 1 : 0;
    assign g = (led == 0 || led == 1 || led == 7)? 1 : 0; 
    always @ (a, b, c, d, e, f, g)
        seg = {g, f, e, d, c, b, a};
endmodule
