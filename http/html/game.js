var position_x;
var position_y;
var autoGame_x=new Array();
var autoGame_y=new Array();
var index=0;
var temp=0;
var t;

//启动初始化
window.onload = function() {
  position_x=3;
  position_y=3;
  index=0;
  autoGame_x[index]=position_x;
  autoGame_y[index]=position_y;
  index++;
  create();
  restart();
};

//创建所有的block,并且设置基本属性
function create()
{
  pic=document.getElementById("main");
  for(var i=0;i<4;i++)
  {
    for(var j=0;j<4;j++)
    {
      var T=document.createElement("div");
      T.id="no"+i+j;
      T.className="block";
      T.style.backgroundImage="url(./image/"+i+j+".jpg"+")";
      T.style.height="88px";
      T.style.width="88px";
      T.style.display="inline-block";
      T.style.marginLeft="4px";
      T.style.border="1px #808080 solid";
      T.value_x=i;
      T.value_y=j;
      T.onclick=function(){
        change(this.value_x,this.value_y);
      };
      pic.appendChild(T);
    }
  }
}

//交换两个block的图片
function change(x,y)
{
  var x1=x;
  var y1=y;
  var isChanged=0;
  if(position_x==x&&((position_y-y)==1||(y-position_y)==1))
  {
    var temp1=y;
    y=position_y;
    position_y=temp1;
    isChanged=1;
  }
  if(position_y==y&&((position_x-x)==1||(x-position_x)==1))
  {
    var temp2=x;
    x=position_x;
    position_x=temp2;
    isChanged=1;
  }
  //具体交换
  if(isChanged==1)
  {
    var str="no"+x+y;
    var id=document.getElementById(str);
    var strTemp="no"+x1+y1;
    var temp=document.getElementById(strTemp);
    id.style.transition="0.5s";
    id.style.backgroundImage=temp.style.backgroundImage;
    var str1="no"+position_x+position_y;
    var T=document.getElementById(str1);
    T.style.backgroundImage="url(./image/33.jpg)";
    T.style.transition="0.5s";
    autoGame_x[index]=position_x;
    autoGame_y[index]=position_y;
    index++;
  }
  //检查是否拼好
  if(check()==1)
  {
    var result=document.getElementById("result");
    result.innerHTML="WIN!";
    result.style.color="red";
  }
  else
  {
    var result=document.getElementById("result");
    result.innerHTML="CONTINUE!";
    result.style.color="green";
  }
}

//重置,初始化
function restart()
{
  clearTimeout(t);
  position_x=3;
  position_y=3;
  index=0;
  autoGame_x[index]=position_x;
  autoGame_y[index]=position_y;
  index++;
  clear();
  var i=600;
  while(i)
  {
    //随机数摇号打乱
    var x=parseInt(Math.random()*(4),10);
    var y=parseInt(Math.random()*(4),10);
    change(x,y);
    i--;
  }
}

//自动化执行
function autoGame()
{
  //console.log("index",index);
  temp=index-1;
  execution();
}
function execution()
{
  change(autoGame_x[temp],autoGame_y[temp]);
  temp--;
  t=setTimeout("execution()",200);
  if(temp==-1)
  {
    clearTimeout(t);
    index=0;
    autoGame_x[index]=position_x;
    autoGame_y[index]=position_y;
    index++;
  }
}

//图片归位
function clear()
{
  for(var i=0;i<4;i++)
  {
    for(var j=0;j<4;j++)
    {
      str="no"+i+j;
      T=document.getElementById(str);
      if(i==3&&j==3)
      {
        T.style.backgroundImage="url(./image/33.jpg)";
      }
      else {
        T.style.backgroundImage="url(./image/"+i+j+".jpg"+")";
      }
    }
  }
}

//检查是否完成
function check()
{
  var T=document.getElementsByClassName("block");
  var isCheck=1;
  for(var i=0;i<16;i++)
  {
    var str="url(\"./image/"+T[i].value_x+T[i].value_y+".jpg\")";
    var background=T[i].style.backgroundImage;
    if(background!=str)
    {
      isCheck=0;
      console.log(isCheck);
    }
  }
  return isCheck;
}
