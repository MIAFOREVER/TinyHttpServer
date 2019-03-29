/*
    Author:张昊
    Data:2018-12-14
    Version: 0.1.0
*/

#include <librealsense/rs.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui.hpp>

using namespace std;
using namespace rs;

class RealSense{
    //彩色摄像头分辨率最大支持 1920X1080 30FPS
    //深度摄像头分辨率只最大支持 640X480 60FPS
    #define INPUT_WIDTH_1 1920
    #define INPUT_HEIGHT_1 1080
    #define FRAMERATE_1 30
    #define INPUT_WIDTH_2 320
    #define INPUT_HEIGHT_2 240
    #define FRAMERATE_2 60
    #define LARGE 2 //1920X1080
    #define SMALL 1 //640X480
    #define DEPTH_CAMERA_OFF 0
    #define DEPTH_CAMERA_ON 1
    private:
    //默认参数
    context      _rs_ctx;
    device&      _rs_camera = *_rs_ctx.get_device( 0 );
    intrinsics   _depth_intrin;
    intrinsics  _color_intrin;
    private:
    bool initialize_streaming(int type=LARGE,int mode=DEPTH_CAMERA_OFF)
    {
        bool success = false;
        if( _rs_ctx.get_device_count( ) > 0 )
        {
            if(type==LARGE)
                _rs_camera.enable_stream( rs::stream::color, INPUT_WIDTH_1, INPUT_HEIGHT_1, rs::format::rgb8, FRAMERATE_1 );
            else if(type==SMALL)
                _rs_camera.enable_stream( rs::stream::color, INPUT_WIDTH_2, INPUT_HEIGHT_2, rs::format::rgb8, FRAMERATE_2 );
            if(mode==DEPTH_CAMERA_ON)
            {
                _rs_camera.enable_stream( rs::stream::depth, INPUT_WIDTH_2, INPUT_HEIGHT_2, rs::format::z16, FRAMERATE_2 );
            }
            _rs_camera.start( );
            success = true;
        }
        return success;
    }
    public:
    void initRS(int type=LARGE,int mode=DEPTH_CAMERA_OFF)
    {
        rs::log_to_console( rs::log_severity::warn );
        if( !initialize_streaming(type,mode) )
        {
            std::cout << "Unable to locate a camera" << std::endl;
            rs::log_to_console( rs::log_severity::fatal );
        }
    }
    void getRGBMatFromRS(cv::Mat& src)
    {
        if( _rs_camera.is_streaming( ) )
            _rs_camera.wait_for_frames( );
        _color_intrin       = _rs_camera.get_stream_intrinsics( rs::stream::color );
        cv::Mat rgb( _color_intrin.height,
                            _color_intrin.width,
                            CV_8UC3,
                            (uchar *)_rs_camera.get_frame_data( rs::stream::color ) );
        cv::cvtColor( rgb, rgb, cv::COLOR_BGR2RGB );
        src=rgb.clone();
    }
    void getDepthMatFromRS(cv::Mat&src)
    {
        if( _rs_camera.is_streaming( ) )
            _rs_camera.wait_for_frames( );
        _depth_intrin       = _rs_camera.get_stream_intrinsics( rs::stream::depth );
        cv::Mat depth16( _depth_intrin.height,
                                  _depth_intrin.width,
                                  CV_16U,
                                  (uchar *)_rs_camera.get_frame_data( rs::stream::depth ) );
        cv::Mat depth8u = depth16;
        depth8u.convertTo( depth8u, CV_8UC1, 255.0/1000 );
        src=depth8u.clone();
    }
    //必须使用stop停止
    void stopRS()
    {
        _rs_camera.stop( );
    }
};
using namespace cv;
int main()
{
    RealSense rs;
    rs.initRS(LARGE,DEPTH_CAMERA_ON);
    Mat RGB;
    Mat depth;
    while(waitKey()!='q')
    {
        rs.getRGBMatFromRS(RGB);
        rs.getDepthMatFromRS(depth);
        imshow("depth",depth);
        imshow("RGb",RGB);
    }
    
    rs.stopRS();
    return 0;
}
