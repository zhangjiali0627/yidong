//2016.04.28.afternoon
//1.解决类名获取的兼容函数
//classname：所要找的类名
//father:通过父元素来找这个类名（若不定义，则通过整个文档来找这个类名）
	function getClassName(classname,father){
		father=father||document;//决定从父类中寻找还是从文档中寻找；
		// 当第二个参数传值时，就按传的值走，没有传时按document走
		//判断浏览器
		if(father.getElementsByClassName){//条件为真时，代表火狐和谷歌浏览器
			return father.getElementsByClassName(classname);//返回类名；
		}else{//条件为假时，代表IE浏览器；
			var all=father.getElementsByTagName("*");
			//获取元素一共有四种方式，除了classname外：ID Tag Name   *表示选中所有元素。
			var newarr=[];//用来存放所取出的元素；
			for(var i=0;i<all.length;i++){//遍历数组
				if(checkRe(all[i].className,classname)){//如果条件为真时，表示找到了此类名
					newarr.push(all[i]);//将元素放入新的数组中
				}
			}
			return newarr;//将新数组返回
		}
	}
	function checkRe(str,classname){//判断str与classname是否一样
		var arr=str.split(" ");//将空格作为分隔符转换数组
		for(var j=0;j<arr.length;j++){//遍历数组
			if(arr[j]==classname){//判断元素与classname是否相同，相同时返回true
				return true;
			}
		}
		return false;//所有的比较结束以后，返回false
	}





//2016.05.03.afternoon
//2.纯文本的兼容函数
//obj:对象
//val:要设置的内容（须为纯文本）
	function getText(obj,val){
		if(val==undefined){//获取功能
			if(obj.textContent){//FF chrome
				return obj.textContent;
			}else{//IE
				return obj.innerText;
			}
		}else{//设置功能
			if(obj.textContent){//FF chrome
				obj.textContent=val;
			}else{//IE
				obj.innerText=val;
			}
		}
	}


//2016.05.03.afternoon
//3.获取样式的兼容函数
//obj:对象
//attr:属性
function getStyle(obj,attr){
	if(obj.currentStyle){//IE
		//字符串转换成数值类型的方法
		// Number();
		// parseInt();
		// parseFloat();
		return parseInt(obj.currentStyle[attr]);//"80px" 80
	}else{//ff
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}

//4.获取元素的兼容函数
/*$(".box");
  $("#box");
  $("li");*/
 //selector:表示选择器，与CSS的选择器一样   . #
 //father:父容器
 function  $(selector,father) {
 	// 给父容器设置默认值
 	//document对现有的方法 所以需要提前将".father"转换为document对象
 	father=father||document;
 	//对selector做判断
 	if(typeof selector=="string"){//必须是字符串
 		selector.replace(/^\s*|\s*$/g,"");//前面的（/^\s*|\s*$/g）用来去除字符串左右的空格，后面的（""）为用
 		if(selector.charAt(0)=="."){//条件为真时，字符串为类名
 			//".box" 转换为"box" .slice / .substring /.substr
 			return getClassName(selector.slice(1),father);
 		}else if(selector.charAt(0)=="#"){//是ID名
 			return father.getElementById(selector.slice(1));
 			//正则的规范：//
 		}else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
 			return father.getElementsByTagName(selector);
 		}
 	}else if(typeof selector=="function"){
 		//是一个函数时，执行window.onload事件
 		window.onload=function(){
 			selector();//
 		}
 	}
 }




 /*****************************************************************/
 // 2016.05.06
 //5、获取子元素的兼容函数
 function getChild(father,type){
 	type=type||"a";
 	var all=father.childNodes;
 	var arr=[];
 	for (var i=0;i<all.length;i++) {
 		if(type=="a"){//只获取元素子节点
	 		if(all[i].nodeType==1){
	 			arr.push(all[i]);
	 		}
	 	}else if(type=="b"){//获取元素+文本子节点
	 		if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && all[i].nodeType==3)){
	 			arr.push(all[i]);
	 		}
	 	}
 	};
 	return arr;
 }


 // 6、获得子节点中的第一个
function getFirst(father){
	return getChild(father)[0];
}


 // 7、获得子节点中的最后一个
 function getLast(father){
	return getChild(father)[(getChild(father).length)-1];
}
 // 8、通过指定下标来获得子节点中的一个
 function getNum(father,type,num){
 	return getChild(father,type)[num];
}


//2016.05.07 
//9.获取上一个兄弟节点的兼容函数
//obj:一个元素节点
function getUp(obj){
	var up=obj.previousSibling;//上一个 null
	if(up==null){
		return false;
	}
	while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
		up=up.previousSibling;
		if(up==null){
		return false;
	}	
	}
	// 条件满足时，接着再找（条件为注释节点或者文本节点中为空字符串时,条件满足）
	return up;
}

//10.获取下一个兄弟节点的兼容函数
//obj:一个元素节点
function getDown(obj){
	var down=obj.nextSibling;//下一个  null
	if(down==null){
		return false;
	}
	while(down.nodeType==8 || (down.nodeType==3 && down.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
		down=down.nextSibling;
		if(down==null){
			return false;
		}
	}
	// 条件满足时，接着再找（条件为注释节点或者文本节点中为空字符串时,条件满足）
	return down;
}

//  //9、获得指定下标元素的下一个兄弟节点
//  function getNext(father,type,num){
//  	return getChild(father,type)[num+1];
// }
// //10、获得指定下标元素的上一个兄弟节点
//  function getBefore(father,type,num){
//  	return getChild(father,type)[num-1];
// }

//11、插入到某个对象之后
function insertAfter(father,newNode,obj){
	var down=getDown(obj);
	if(down){
		father.insertBefore(newNode,down);
	}else{
		father.appendChild(down);
	}
	
}



/**********************************/
// 2016.05.09
//12、事件绑定的兼容函数
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		return obj.addEventListener(event,fun,false);
	}else{
		return obj.attachEvent('on'+event,function(){fun.call(obj)}); 
	}
}

//13.删除绑定事件
function deleteEvent(obj,event,fun){
	if(obj.removeEventListener){
		return obj.removeEventListener(event,fun,false)
	}else{
		return obj.detachEvent('on'+event,fun);
	}
}

//2016.05.09下午
//14.滚轮事件
function mouseWheel(obj,up,down){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);
		//chrome,safari -webkitdocument.
		obj.addEventListener("DOMMouseScroll",scrollFn,false);
		//firefox -moz-
	}

	function scrollFn(e){//确定滚轮方向
		var ev=e||window.event;
		//阻止浏览器的的默认行为
		if(ev.preventDefault){
			ev.preventDefault();//FF chrome
		}else{
			ev.returnValue=false;//IE
		}
		var val=ev.detail||ev.wheelDelta;
		if(val==-3 || val==120){
			if(up){
				up();
			}
		}else if(val==3 || val==-120){
			if(down){
				down();
			}
		}

	}
}

//2016.05.10下午
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/

/**********************************/
// 2016.05.11下午
//16、事件对象阻止浏览器默认行为函数
function preventDefault(e){
	var ev=e||window.event
	if (ev.preventDefault){
		return ev.preventDefault(); //阻止默认浏览器动作(W3C)
	}else{
		return ev.returnValue = false;//IE中阻止函数器默认动作的方式
	}
}

//17、阻止事件流函数
function preventElement(e){
	var ev=e||window.event
	if (ev.cancelBubble){
		return ev.cancelBubble=true; //IE中阻止事件流
	}else{
		return ev.stopPropagation();//FF中阻止事件流
	}
}