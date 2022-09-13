var JoinJS = {

    insertJoin : function(){
        var requestData = {}
        var userTel = $("#tel1").val()+$("#tel2").val()+$("#tel3").val();
        var aggrement = $("#aggrement").val();
        var frm_data = $("#jointForm").serializeArray();
                var formData = new FormData();
                debugger;
                for (var index in frm_data) {
                        requestData[frm_data[index].name] = frm_data[index].value;
                }
                CommonJS.Ajax.postAjaxLoding("/join/ajax/insertJoin", requestData, function(res) {
                    if(res.retcode == "0000"){
                            alert("회원가입 완료하였습니다.");
                    }
                });
    },

    searchPostCode : function () {
             new daum.Postcode({
                oncomplete: function(data) {
                     $("#postcode").val(data.zonecode);
                     $("#address").val(data.address + " " +data.buildingName);
                     $("#detailAddress").val('');
                     $("#detailAddress").focus();
                }
             }).open();
        }

}
