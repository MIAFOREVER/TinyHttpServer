//储存算术表达式
var stringResult="";
function calculate(id)
{
  var storeresult="";
  //输入"C"清除掉最后一位
  if(id === "C")
  {
    stringResult=stringResult.substring(0,stringResult.length-1);
    show.innerHTML=stringResult;
  }
  //输入"CE"全部清除
  else if (id === "CE")
  {
    stringResult="";
    show.innerHTML=stringResult;
  }
  //输入"="运算出结果
  else if (id === "=")
  {
    storeresult=result(stringResult);
    show.innerHTML=storeresult;
    stringResult="";
  }
  //字符串+1
  else
  {
    stringResult+=id;
    show.innerHTML=stringResult;
  }

}
function result(string)
{
  try
  {
     string=eval(string);
  }
  catch(exception)
  {
    //如果输入表达式异常,弹窗警告
     alert("Error! Please input correct expression.");
     string="0";
  }
  string=eval(string);
  //console.log(string);//控制台调试
  return string;
}
