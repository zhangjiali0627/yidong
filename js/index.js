//topnav开始
	var topnavyiji=$(".topnav-yiji"); 
	var topnaverji=$(".topnav-erji");
	var t2=$(".t1");
	for(var i=0;i<topnavyiji.length;i++){
		topnavyiji[i].index=i;
		topnavyiji[i].onmouseover=function(){	
			topnaverji[this.index].style.display="block";
			topnaverji[this.index].style.color="#fff";
			topnavyiji[this.index].style.background="#fff";
			topnavyiji[this.index].style.color="#25b2fe";
			t2[this.index].style.color="#25b2fe";
		}
		topnavyiji[i].onmouseout=function(){
			topnaverji[this.index].style.display="none";
			topnaverji[this.index].style.color="";
			topnavyiji[this.index].style.background="";
			topnavyiji[this.index].style.color="";
			t2[this.index].style.color="";
		}
	}
//topnav结束
//srk开始
	var srk=$('.srk')[0];
		srk.onfocus=function(){
			if(this.value=="包月流量包"){
				this.value="";
				srk.style.boxShadow="1px 1px 2px #25b2fe"; 
			}
		}
		srk.onblur=function(){
			if(this.value==""){
				this.value="包月流量包";
				srk.style.boxShadow="";
			}
		}

//srk结束
//Phone开始
	var Pnumber=$('.Pnumber')[0];
		Pnumber.onfocus=function(){
			if(this.value=="请输入手机号码"){
				this.value="";
			}
		}
		Pnumber.onblur=function(){
			if(this.value==""){
				this.value="请输入手机号码";
			}
		}


//Phone结束
//nav开始
	var nav=$(".nav")[0];
	var dh2=$(".dh2",nav);
	var dh1=$(".dh1",nav);
	var erji=$(".erji",nav);
	for(var i=0;i<dh2.length;i++){
		dh2[i].index=i;
			hover(dh2[i],function(){
				dh2[this.index].style.background="#f3f3f3";
				dh2[this.index].style.color="#0085d0";
				dh1[this.index].style.background="#f3f3f3";
				dh1[this.index].style.color="#0085d0";
				erji[this.index].style.display="block";
			},function(){
				dh2[this.index].style.background="";
				dh2[this.index].style.color="";
				dh1[this.index].style.background="";
				dh1[this.index].style.color="";
				erji[this.index].style.display="none";
			});
	}

//nav结束
//banner开始
	var bannerbox=$(".banner")[0];
	var as=$("a",bannerbox);
	var button=$(".btnbox")[0];
	var btn=$(".btn",button);
	var left=$(".banner-left",bannerbox)[0];
	var right=$(".banner-right",bannerbox)[0];

	 	for (var i = 1; i < as.length; i++) {
	   		as[i].style.left="750px";
	   }
	   var now=0;//在bannerbox范围内的下标
	   var next=0;//在bannerbox外边的下标
	   function moveLeft1(){
	   	  next++;
	   	  if(next>=as.length){
	   	  	next=0;
	   	  }
	      as[next].style.left="740px";
	      animate(as[now],{left:-740});
	      animate(as[next],{left:0});
	      for (var i = 0; i < btn.length; i++) {
	      	btn[i].id="";
	        as[i].style.zIndex=0;
	      }
	      btn[next].id="active";
	      as[next].style.zIndex=1;
	      now=next;
	   }
	   var tt1=setInterval(moveLeft1,2000);

	   bannerbox.onmouseover=function(){
	   	  clearInterval(tt1);
	   	  left.style.display="block";
	   	  right.style.display="block";
	   }
	   bannerbox.onmouseout=function(){
	   	  tt1=setInterval(moveLeft1,2000);
	   	  left.style.display="none";
	   	  right.style.display="none";
	   }

	   right.onclick=function(){
	       moveLeft1()
	   }

	   left.onclick=function(){
	      next--;
	   	  if(next<=-1){
	   	  	 next=as.length-1;
	   	  }
	      as[next].style.left="-740px";
	      animate(as[now],{left:740});
	      animate(as[next],{left:0});
	      for (var i = 0; i < btn.length; i++) {
	      	btn[i].id="";
	        as[i].style.zIndex=0;
	      };
	      btn[next].id="active";
	      as[next].style.zIndex=1;
	      now=next;
	   }

	    for (var i = 0; i < btn.length; i++) {
	      btn[i].index=i;
	      btn[i].onmouseover=function(){
	        
	        for(var j=0;j<as.length;j++){
	          if(j>=this.index){
	            as[j].style.left="740px"
	          }else{
	            as[j].style.left="0"
	          }
	          btn[j].id="";
	          as[j].style.zIndex=0
	        }
	        if(this.index==0){
	          as[as.length-1].style.left=0;
	        }

	        btn[this.index].id="active";;
	        as[this.index].style.zIndex=1;
	        if(this.index!=as.length-1){
	          animate(as[this.index],{left:0},function(){
	            as[as.length-1].style.left="-740px"  
	          })
	        }else{
	          animate(as[this.index],{left:0})
	        }        
	        next=this.index;
	      }
	    }
		
//banner结束

//固定定位开始
	var gddw=$(".gddw")[0];
	var kflogo=$(".kflogo");
	for(var i=0;i<kflogo.length;i++){
		kflogo[i].index=i;
		hover(kflogo[i],function(){
			animate(kflogo[this.index],{right:32});
		},function(){
			animate(kflogo[this.index],{right:-30});
		})
	}
//固定定位结束

//
var topcolumn=$(".colu",".top-column");
// var columntop=$(".column-top");
	function moveDown(){
		$(".column-top").animate({left:"-275px"},function(){
			$(".topcolumn-main").first().insertAfter($(".topcolumn-main:last"));
			$(".column-top").css({left:"0"});	
		});	
			
	}
	var tto=setInterval(moveDown,2000);
	$(".colu",".top-column").mouseover(function(){
		clearInterval(tto);
	}).mouseout(function(){
		tto=setInterval(moveDown,2000);
	});
	$(".main-left",".colu").click(function(){
		moveDown();		
	})
	$(".main-right",".colu").click(function(){
		$(".topcolumn-main").last().insertBefore($(".topcolumn-main").first());
		$(".column-top").css({left:"-275px"});
		$(".column-top").animate({left:"0"},function(){
		});	
	});	
//按需加载
	var foot1=$( ".foot1");
	document.onscroll=function(){
	var tops=document.body.scrollTop||document.documentElement.scrollTop;
	var ch=document.documentElement.clientHeight;
		for(var i=0;i<foot1.length;i++){
			if(foot1[i].offsetTop<=tops+ch){
				var imgs=$("img",foot1[i]);
				for(var j=0;j<imgs.length;j++){
					var src=imgs[j].getAttribute("data-src");
					imgs[j].src=src;
				}
			}
		}
	}