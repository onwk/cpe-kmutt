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
freq =440*(2^(1/12))^(keynum-49);

tone =sin(2*pi*freq*tt);
