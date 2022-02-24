`timescale 1ns / 1ps

module VGASync(
    input clk_in, 
    input [0:0] reset,
    output reg [10:0] H_Count,
    output reg [10:0] V_Count,
    output reg HSync, 
    output reg VSync,
    output reg [0:0] led
    );
    
    //signal HxV : 800x600
    //Ative Horizontal : 800        Ative Vertical   : 600
    //Front Hrizontal  : 40         Front Vertical   : 1
    //Sync Horizontal  : 128        Sync Vertical    : 4
    //Back Horizontal  : 88         Back Vertical    : 23
    //Total Pixels     : 1056       Total Pixels     : 628 
    
    reg V_enable;
    
    initial begin
        H_Count  = 0;
        V_Count = 0;
        V_enable = 0;
        HSync = 0;
        VSync = 0;
    end
    
    //Pixels Count
    always @(posedge clk_in) begin
        if(reset[0] == 0) begin
            led[0] = 0;
            if(H_Count < 1056) begin
                H_Count = H_Count + 1;
                V_enable = 0;
            end
            else begin
                H_Count = 1;
                V_enable = 1;
            end
            if(V_enable == 1) begin
                if(V_Count < 628) V_Count = V_Count + 1;
                else V_Count = 0;
            end
        end
        else begin
            led[0] = 1;
            H_Count = 0;
            V_Count = 0;
        end
    end 
    
    //VSync & HSync signal
    always @(posedge clk_in) begin
        if(reset[0] == 0) begin
           if(H_Count > 838 && H_Count < 968) HSync = 1;
            else HSync = 0;
            if(V_Count > 600 && V_Count < 605) VSync = 1;
            else VSync = 0; 
        end
    end 
    
endmodule
