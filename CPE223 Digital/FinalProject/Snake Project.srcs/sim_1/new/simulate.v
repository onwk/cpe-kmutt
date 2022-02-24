`timescale 1ns / 1ps

module simulate;
    reg clk = 0;
    reg l = 0, r = 0, u = 1, d = 0;
    wire [0:0] reset = 0;
    //wire clk_40Hz, uClock;
    //wire [10:0] H_Count;
    //wire [10:0] V_Count;
    wire HSync;
    wire VSync;
    wire [3:0] R;
    wire [3:0] G;
    wire [3:0] B;
    //wire [10:0] x,y;

    snake top(clk,reset,l,r,u,d,HSync,VSync,R,G,B);
    always #5 begin
        clk = ~clk;
    end
endmodule