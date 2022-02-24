%--- play_scale.m
%---
%keys = [ 40 42 44 45 47 49 51 52 ];
%keys = [52 0 51 50 51 50 49 0 52 48];
keys = [54 57 44 57 59 57 54 47 52];
%--- NOTES: C D E F G A B C
% key #40 is middle-C
% tone=output from calling note.m
dur = 0.25 * ones(1,length(keys));
% dur = [0.25 0.25 0.75 0.75 0.5 0.5];
fs = 10000; %-- use 11025 Hz on PC/Mac, 8000 on UNIX
xx = zeros(1,sum(dur)*fs+1);
n1 = 1;
for kk = 1:length(keys)
keynum = keys(kk);

tone = note(keynum,dur);
n2 = n1 + length(tone) - 1;	
xx(n1:n2) = xx(n1:n2) + tone;
n1 = n2;
end
sound( xx, fs )

function tone = note(keynum,dur)
% NOTE Produce a sinusoidal waveform corresponding to a
% given piano key number
%
% usage: tone = note (keynum, dur)
% freq= the frequency calculated by the ratio from A440
% tone = the output sinusoidal waveform
% keynum = the piano keyboard number of the desired note
% dur = the duration (in seconds) of the output note
%
fs = 8000; %-- use 11025 Hz on PC/Mac, 8000 on UNIX
tt = 0:(1/fs):dur;
freq = 440*(2^(1/12))^(keynum-49);

tone = sin(2*pi*freq*tt);
end