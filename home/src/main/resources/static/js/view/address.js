/*<![CDATA[*/
var AddressJS = {

//	searchPostCode : function () {
//         new daum.Postcode({
//            oncomplete: function(data) {
//                 $("#postcode").val(data.zonecode);
//                 $("#address").val(data.address + " " +data.buildingName);
//                 $("#detailAddress").val('');
//                 $("#detailAddress").focus();
//            }
//         }).open();
    }

    searchPostCode: function(){
        new daum.Postcode({
            oncomplete: function(data) {
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var jibunAddr = data.jibunAddress; // 지번 주소 변수
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $("#postCode").val(data.zonecode);
                if(roadAddr !== ''){
                   $("#address").val(roadAddr);
                }
                else if(jibunAddr !== ''){
                    $("#address").val(jibunAddr);
                }
                $("#detailAddress").val('');
                $("#detailAddress").focus();
            }
        }).open();
    }


//	insertAddress : function () {
//  		var ValidateEl = $("#addrFrm [data-required]");
//		TckJS.ValidateUtil.ValidateCheck(ValidateEl, function() {
//			var requestData = {}
//			var frm_data = $("#addrFrm").serializeArray();
//			for (var index in frm_data) {
//				requestData[frm_data[index].name] = frm_data[index].value;
//            }
//            TckJS.Ajax.postAjaxLoding("/frt/mmall/address/insert", requestData , function(res) {
//                alert("주소등록을 완료되었습니다");
//                window.location.reload();
//            });
//        });
//	},
//
//	updateAddress : function () {
//  		var ValidateEl = $("#addrFrm [data-required]");
//		TckJS.ValidateUtil.ValidateCheck(ValidateEl, function() {
//			var requestData = {}
//			var frm_data = $("#addrFrm").serializeArray();
//			for (var index in frm_data) {
//				requestData[frm_data[index].name] = frm_data[index].value;
//            }
//            TckJS.Ajax.postAjaxLoding("/frt/mmall/address/update", requestData , function(res) {
//                alert("주소수정을 완료되었습니다");
//                location.reload();
//            });
//        });
//	},
//
//	delAddr : function(){
//      var no = $(".delivery_add_no").val();
//	  TckJS.Ajax.postAjaxLoding("/frt/mmall/address/delete", {delivery_add_no : no} , function(res) {
//	      alert("주소삭제를 완료되었습니다");
//          location.reload();
//	  });
//	}


}
/* ]]> */