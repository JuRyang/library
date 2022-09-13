var LoginJS = {

    login : function(){
   console.log("2");
            if ($("#remember").is(":checked")) {
                LoginJS.setCookie("userId", $("#userId").val(), 30);
                LoginJS.setCookie("userPwd", $("#userPwd").val(), 30);
            } else {
                LoginJS.deleteCookie("userId");
                LoginJS.deleteCookie("userPwd");
            }

        var requestData = {}
        var frm_data = $("#loginForm").serializeArray();
        var formData = new FormData();

        for (var index in frm_data) {
                requestData[frm_data[index].name] = frm_data[index].value;
        }
//        CommonJS.Ajax.postAjaxLoding("/login/ajax/login", requestData, function(res) {
//            if(res.retcode == "0000"){
//                    alert("로그인하였습니다.");
//            }
//        });
         $.ajax({
            type: 'POST',
            url: '/login/ajax/login',
            data: requestData,
            dataType: "json",
            success: function (res) {
                if(res != null){
                   if(res.retcode == "0000"){ //로그인 성공 시
                      alert("로그인이 완료되었습니다.");
                   }else{
                       if (res.retmsg != undefined) {
                            alert(res.retmsg);
                       }else {
                            $("#errmsg").text("오류가 발생하였습니다");
                       }
                       return false;
                  }
                }
             },
            beforeSend: function () { },
            error: function (err) {
                console.log(err);
            }
           });
    },
    setCookie : function(name, value, days){
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },

    getCookie : function(name){
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },

    deleteCookie : function(name){
        LoginJS.setCookie(name, '', -1);
    }

}
