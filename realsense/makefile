all:RealSense test
RealSense:RealSense.cpp
	g++ -o RealSense RealSense.cpp `pkg-config --cflags --libs  opencv` -lrealsense
test:test.cpp
	g++ -o test test.cpp `pkg-config --cflags --libs glfw3 glu gl opencv` -lrealsense