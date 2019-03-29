#libRealSense
## 安装
### 方式一:
`https://www.ncnynl.com/archives/201706/1775.html`
### 方式二:
`$./steup.sh`
## 使用方式
`
class{
    public:
    initRS();
    getRGBMatFromRS();
    getDepthMatFromRS();
    stopRS();
}
`
`
#include"RealSense.hpp"
...
RealSense rs;
