`timescale 1ns / 1ps

module keyboard(
    input ps2_clk,
    input ps2_data,
    output reg [7:0] data_out,
    output reg [7:0] led
    );
    
    reg [3:0] bit_counter = 0;
    reg [10:0] data_current = 8'hf0;
    reg [10:0] data_previous = 8'hf0;
    reg bit_check;
    
    always @(negedge ps2_clk) begin
        data_current[bit_counter] = ps2_data;
        bit_counter = bit_counter + 1;
        if(bit_counter == 11) begin
            bit_counter = 0;
            data_previous = data_current;
            if(data_previous == 8'hf0) begin
                data_out <= data_current;
            end
        end
    end
endmodule
