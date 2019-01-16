/* function times(){
  var nowDate = new Date();
 var year = nowDate.getFullYear();
 var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
  : nowDate.getMonth() + 1;
 var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
 var dateStr = year + "-" + month + "-" + day;
 return dateStr;
}

function timer(strtime){
  var date = new Date(strtime);
  //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
  // 可以这样做
  var date = new Date(strtime.replace(/-/g, '/'));
  time3 = Date.parse(date);
  return time3;
} */

  function userdata(){
          var dialogBox = api.require('dialogBox');
            dialogBox.alert({
                texts: {
                    title: '万能影视',
                    content: '当前为游客状态,是否登录?',
                    leftBtnTitle: '取消',
                    rightBtnTitle: '登录'
                },
                styles: {
                    bg: '#fff',
                    w: 300,
                    title: {
                        marginT: 20,
                        icon: 'widget://icon/risk.png',
                        iconSize: 30,
                        titleSize: 14,
                        titleColor: '#000'
                    },
                    content: {
                        color: '#000',
                        size: 14
                    },
                    left: {
                        marginB: 7,
                        marginL: 20,
                        w: 130,
                        h: 35,
                        corner: 2,
                        bg: '#999999',
                        color: '#fff',
                        size: 12
                    },
                    right: {
                        marginB: 7,
                        marginL: 10,
                        w: 130,
                        h: 35,
                        corner: 2,
                        bg: '#626ec0',
                        color: '#fff',
                        size: 12
                    }
                }
            }, function(ret) {
                if (ret.eventType == 'left') {
                    var dialogBox = api.require('dialogBox');
                    dialogBox.close({
                        dialogName: 'alert'
                    });
                }else{
                  var dialogBox = api.require('dialogBox');
                  dialogBox.close({
                      dialogName: 'alert'
                  });
                  api.openWin({
                      name: 'login',
                      url: 'login.html',
                      allowEdit: true,
                      scrollEnabled: false,
                      animation:{
                          type:"fade"
                      },
                      softInputMode: 'pan'
                  });
                }
            });
} 

function getvideo(n){
          var url=n.getAttribute("data-url");
         var useruid = localStorage.getItem('user_id');
				 var time = localStorage.getItem('user_time');
				 var timestamp = Date.parse(new Date())/1000;
				 
         if(useruid<1){
					api.alert({
							title: '温馨提示',
							msg: '请先登陆后使用',
					});
					api.openWin({
							name: 'login',
							url: './login.html',
							delay: 300
					});
					return;
         }
				 
				 if (time>timestamp) {
				       api.showProgress({
				           title: 'VIP登录中...',
				           modal: false
				       });
				       setTimeout("playRadio();",1000);
				       var delay = 0;
				       if(api.systemType != 'ios'){
				           delay = 300;
				       }
							 
				      api.openWin({
				      		name: 'video_win',
				      		url: './video_win.html',
				      		delay:1000,
				      		animation:{
				      				type:"fade"
				      		},
				      		pageParam: {
				      				url: url
				      		}
				      });
				      setTimeout(function(){api.hideProgress();}, 1000);
				 
				     }else if (time == -1) {
				       api.showProgress({
				           title: 'VIP登录中...',
				           modal: false
				       });
				       setTimeout("playRadio();",2000);
				       var delay = 0;
				       if(api.systemType != 'ios'){
				           delay = 300;
				       }
							 
				      api.openWin({
				      		name: 'video_win',
				      		url: './video_win.html',
				      		delay:1000,
				      		animation:{
				      				type:"fade"
				      		},
				      		pageParam: {
				      				url: url
				      		}
				      });
				      setTimeout(function(){api.hideProgress();}, 1000);
				 
				 
				     }else if (time<timestamp){
				       var dialogBox = api.require('dialogBox');
				       dialogBox.alert({
				           texts: {
				               content: '您的VIP会员已过期，请及时续费！',
				               leftBtnTitle: '让我想想',
				               rightBtnTitle: '去开通'
				           },
				           styles: {
				               bg: '#fff',
				               w: 300,
				               content: {
				                   color: '#000',
				                   size: 14
				               },
				               left: {
				                   marginB: 7,
				                   marginL: 20,
				                   w: 130,
				                   h: 35,
				                   corner: 2,
				                   bg: '#ff7600',
				                   color: '#fff',
				                   size: 14
				               },
				               right: {
				                   marginB: 7,
				                   marginL: 10,
				                   w: 130,
				                   h: 35,
				                   corner: 2,
				                   bg: '#ff7600',
				                   color: '#fff',
				                   size: 14
				               }
				           }
				       }, function(ret) {
				           if (ret.eventType == 'left') {
				               var dialogBox = api.require('dialogBox');
				               dialogBox.close({
				                   dialogName: 'alert'
				               });
				           }else if (ret.eventType == 'right') {
				             api.openWin({
				                 name: 'open_vip_win',
				                 url: './open_vip_win.html',
				                 delay: 300
				             });
				             var dialogBox = api.require('dialogBox');
				             dialogBox.close({
				                 dialogName: 'alert'
				             });
				           }
				       });
				     }
				 
				 
				 
        
          }


//
/* function h5(n){
          var url=n.getAttribute("data-url");
         var useruid = localStorage.getItem('user_id');
         if(typeof(useruid) == 'undefined'){
            userdata();
         }else{
         api.showProgress({
             title: 'Vip登入中..',
             modal: true
         });
        api.openWin({
            name: 'video_win',
            url: 'video_win.html',
            delay:1000,
            animation:{
                type:"fade"
            },
            pageParam: {
                url: url
            }
        });
        setTimeout(function(){api.hideProgress();}, 1000);
          }
}
 */




