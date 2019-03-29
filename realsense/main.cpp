#include"RealSense.cpp"
#include<opencv2/opencv.hpp>
using namespace cv;
int main()
{
    RealSense rs;
    rs.initRS();
    Mat test=rs.getMatFromRS();
    imshow("test",test);
    waitKey();
    rs.stopRS();
    return 0;
}