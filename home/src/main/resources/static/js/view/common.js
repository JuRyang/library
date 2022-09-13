var CommonJS = {};


CommonJS.Util = CommonJS.prototype = {
	 Loding: function () {
		if ($('.loading-mask').length != 0) $(".loading-mask").remove();
		var tempHtml = "";
		tempHtml += "<div class=\"loading-mask\" style=\"display:none;\">";
		tempHtml += "	<div class=\"loader\">";
		tempHtml += "	<img src=\"/img/ajax-loader-LARGE.gif\" alt=\"로딩중…\" style=\"position: absolute;left: 50%;top:  50%;transform: translate(-50%,-50%);\"/>";
		tempHtml += "	</div>";
		tempHtml += "</div>";

		$("body").append(tempHtml);
		$('.loading-mask').show();

	}
	, LayoutClose: function () {
		$(".loading-mask").remove();
	}
	, CalendarInit : function(){
        if($('#startDt[type=text]').length == 1){
            $('#startDt').datepicker();
            $('#startDt').datepicker("option", "maxDate", $("#endDt").val());
            $('#startDt').datepicker("option","onClose",function(selectedDate) {
                $("#endDt").datepicker("option", "minDate",selectedDate);
            });
        }

        if($('#endDt[type=text]').length == 1){
            $('#endDt').datepicker();
            $('#endDt').datepicker("option", "minDate",$("#startDt").val());
            $('#endDt').datepicker("option","onClose",function(selectedDate) {
                $("#startDt").datepicker("option", "maxDate",selectedDate);
            });
        }
    }
};

/*
 * ajax 공통 모듈 성공시 필터링 추가, 실패시 처리, 로딩중 처리 등 커스터마이즈
 */
CommonJS.Ajax = CommonJS.prototype = {
	 postAjax: function (strURL, objData, resultHandler) {
		        CommonJS.Util.Loding();
		        $.ajax({
		            type: "POST",
		            url: strURL,
		            data: objData,
		            dataType: "json",
		            contentType: 'application/json',
		            success: function (res) {
                        CommonJS.Util.LayoutClose();
                        if (res == null || res == undefined) {
                            alert("오류가 발생하였습니다.");
                            return;
                        }

                        if (res.retcode != "0000") {
                            if (res.retmsg != undefined) {
                                alert(res.retmsg);
                                console.log(res);
                                resultHandler(res);
                            }
                            else {
                                alert("오류가 발생하였습니다.");
                            }
                            return;
                        }

                        resultHandler(res);
		            },
		            beforeSend: function () {
		                /* 통신 전 process (ex. 로딩바 표시) */
		            },
		            error: function (err) {
		                /* 통신 에러 발생시 process */
                        CommonJS.Util.LayoutClose();
		                alert("오류가 발생하였습니다.");
		                console.log(err);
		            }
		        });
	    },

    postAjaxLoding: function (strURL, objData, resultHandler) {
        CommonJS.Util.Loding();
        $.ajax({
    	    type: "POST",
    		url: strURL,
    		data: objData,
    		dataType: "json",
    		success: function (res) {
    		    CommonJS.Util.LayoutClose();
    		    if (res == null || res == undefined) {
    		        alert("오류가 발생하였습니다.");
    		        return;
    		    }

    		    if (res.retcode != "0000") {
    		        if (res.retmsg != undefined) {
    		            alert(res.retmsg);
    		            console.log(res);
    		            resultHandler(res);
    		        }
    		        else {
    		            alert("오류가 발생하였습니다.");
    		        }
    		        return;
    		    }

    		    resultHandler(res);
    		},
    		beforeSend: function () {
    		    /* 통신 전 process (ex. 로딩바 표시) */
    		},
    		error: function (err) {
    		    /* 통신 에러 발생시 process */
    		    CommonJS.Util.LayoutClose();
    		    alert("오류가 발생하였습니다.");
    		    console.log(err);
    		}
        });
    }
    ,postAjaxLodingCallback: function (strURL, objData, resultHandler) {
        CommonJS.Util.Loding();
        $.ajax({
            type: "POST",
            url: strURL,
            data: objData,
            dataType: "json",
            success: function (res) {
                CommonJS.Util.LayoutClose();
                if (res == null || res == undefined) {
                    alert("오류가 발생하였습니다.");
                    return;
                }

                if (res.retcode != "0000") {
                    if (res.retmsg != undefined) {
                        alert(res.retmsg);
                        console.log(res);
                        return ;
                    }
                    else {
                        alert("오류가 발생하였습니다.");
                    }
                    return;
                }

                resultHandler(res);
            },
            beforeSend: function () {
                /* 통신 전 process (ex. 로딩바 표시) */
            },
            error: function (err) {
                /* 통신 에러 발생시 process */
                CommonJS.Util.LayoutClose();
                alert("오류가 발생하였습니다.");
                console.log(err);
            }
        });
    }
      ,postAjaxFormLoding: function (strURL, objData, resultHandler) {
            CommonJS.Util.Loding();
            $.ajax({
                type: 'POST',
                url: strURL,
                data: objData,
                processData: false,
                contentType: false,
                success: function (res) {
                    CommonJS.Util.LayoutClose();
                    if (res == null || res == undefined) {
                        alert("오류가 발생하였습니다.");
                        return;
                    }

                    if (res.retcode != "0000") {
                        if (res.retmsg != undefined) {
                            alert(res.retmsg);
                            console.log(res);
                        } else {
                            alert("오류가 발생하였습니다.");
                        }
                        return;
                    }
                    resultHandler(res);
                },
                beforeSend: function () {
                    /* 통신 전 process (ex. 로딩바 표시) */
                },
                error: function (err) {
                    /* 통신 에러 발생시 process */
                    CommonJS.Util.LayoutClose();
                    alert("오류가 발생하였습니다.");
                    console.log(err);
                }
            });
     }
};

CommonJS.ValidateUtil = CommonJS.prototype = {
    ValidateCheck: function (el, submitHandler) {
        if (el.length == 0) return null;
        var is_submit = true

        el.each(function (index, el) {
            if (el.value == "" || el.value == undefined) {
                alert($(el).data("required"));
                el.focus();
                is_submit = false;
                return false;
            }

            if (el.hasAttribute("data-number")) {
                if (!(/[0-9]/.test(el.value))) {
                    alert("숫자만 입력이 가능합니다.");
                    el.focus();
                    is_submit = false;
                    return false;
                }
            }

            if (el.hasAttribute("maxlength")) {
                if (el.value.trim().length > parseInt(el.getAttribute("maxlength"))) {
                    alert(el.getAttribute("maxlength").int() + "글자 이하로 입력하세요.");
                    el.focus();
                    is_submit = false;
                    return false;
                }
            }

            if (el.hasAttribute("data-minlength")) {
                if (el.value.trim().length < parseInt(el.getAttribute("data-minlength"))) {
                    alert(el.getAttribute("data-minlength").int() + "글자 이상으로 입력하세요.");
                    el.focus();
                    is_submit = false;
                    return false;
                }
            }
        });
        if (is_submit) submitHandler();
    }
};

var CommonUtilJS = {
    MakeFolderName: function (name, boardNo, digits) {
        var intFolderName = parseInt(boardNo / digits);
        var zero = '';
        intFolderName = intFolderName.toString();

        if (intFolderName.length < digits) {
            for (var i = 0; i < 3 - intFolderName.length; i++)
                zero += '0';
        }
        zero + intFolderName
        var folderPath = "/" + name + "/" + zero + intFolderName + "/" + boardNo;
        return folderPath;
    }
	,correctPhoneOrTelNumber : function (el){
		el.on("keyup", function (event) {
			$(this).val($(this).val().replace(/[^0-9\-]/g, ''));
		});

		el.on("change", function (event) {
			if(this.value.length > 8){
				var isPhone =  this.value.substring(0,2) == "01" ? true : false;
				if(isPhone) this.value = Common.correctPhoneNumber_text(this.value);
				else  this.value = Common.correctTelNumber_text(this.value);
			}
		})
	},
    correctPhoneNumber: function (el) {
        el.on("keyup", function (event) {
            $(this).val($(this).val().replace(/[^0-9\-]/g, ''));
        });

        el.on("change", function (event) {
            var el_value = $(this).val();
            el_value = el_value.replace(/[-]/g, '');

            var val_length = el_value.length;
            if (val_length == 10) {
                $(this).val(el_value.replace(/(\d{3})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else if (val_length == 11) {
                $(this).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else {
                el_value = el_value.substring(0, 11)
                $(this).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
        });

        if(el.val() != ""){
        	var el_value = el.val().replace(/[-]/g, '');
            var val_length = el_value.length;
            if (val_length == 10) {
                $(el).val(el_value.replace(/(\d{3})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else if (val_length == 11) {
                $(el).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else {
                el_value = el_value.substring(0, 11)
                $(el).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
        }
    },
    correctTelNumber: function (el) {
        el.on("keyup", function (event) {
            $(this).val($(this).val().replace(/[^0-9\-]/g, ''));
        });

        el.on("change", function (event) {
            var el_value = $(this).val();
            el_value = el_value.replace(/[-]/g, '');

            var val_length = el_value.length;
            if (val_length == 9) {
                $(this).val(el_value.replace(/(\d{2})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else if (val_length == 10) {
            	if(el_value.substring(0,2) == "02"){
            		$(this).val(el_value.replace(/(\d{2})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            	}  else {
            		$(this).val(el_value.replace(/(\d{3})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            	}
            }
            else {
                el_value = el_value.substring(0, 11)
                $(this).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
        });

        if(el.val() != ""){
        	var el_value = el.val().replace(/[-]/g, '');

            var val_length = el_value.length;
            if (val_length == 9) {
                $(el).val(el_value.replace(/(\d{2})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            }
            else if (val_length == 10) {
            	if(el_value.substring(0,2) == "02"){
            		$(el).val(el_value.replace(/(\d{2})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            	}  else {
            		$(el).val(el_value.replace(/(\d{3})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3'));
            	}
            }
            else {
                el_value = el_value.substring(0, 11)
                $(el).val(el_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3'));
            }
        }
    },
    correctPhoneNumber_text: function (value) {
        var return_value = value;
        return_value = return_value.replace(/[-]/g, '');

        var val_length = return_value.length;
        if (val_length == 10) {

        }
        else if (val_length == 11) {
            return_value = return_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3')
        }
        else {
			if(val_length > 11) return_value = return_value.substring(0,11);
            return_value = return_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3')
        }
        return return_value;
    },
	correctTelNumber_text: function (value) {
		var return_value = value;
		return_value = return_value.replace(/[-]/g, '');
		var val_length = return_value.length;
		if (val_length == 9) {
			return_value = return_value.replace(/(\d{2})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3');
		}
		else if (val_length == 10) {
			if(return_value.substring(0,2) == "02"){
				return_value = return_value.replace(/(\d{2})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3');
			}  else {
				return_value = return_value.replace(/(\d{3})\-?(\d{1,3})-?(\d{1,4})/, '$1-$2-$3');
			}
		}
		else {
			return_value = return_value.substring(0, 11);
			return_value = return_value.replace(/(\d{3})\-?(\d{1,4})-?(\d{1,4})/, '$1-$2-$3');
		}

		return return_value;
	},
    onlyNumber: function (el) {
        el.on("keyup", function (event) {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });
    },
    GetIEVersion: function () {
        var word;
        var agent = navigator.userAgent.toLowerCase();

        // IE old version ( IE 10 or Lower )
        if (navigator.appName == "Microsoft Internet Explorer") word = "msie ";

        // IE 11
        else if (agent.search("trident") > -1) word = "trident/.*rv:";
        // Microsoft Edge
        else if (agent.search("edge/") > -1) word = "edge/";
        // 그외, IE가 아니라면 ( If it's not IE or Edge )
        else return -1;
        var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
        if (reg.exec(agent) != null) return parseFloat(RegExp.$1 + RegExp.$2);

        return -1;
    },
    IECheck: function () {
        var agent = navigator.userAgent.toLowerCase();
        var Result = true;

        // IE old version ( IE 10 or Lower )
        if (navigator.appName == "Microsoft Internet Explorer") {
            var reg = new RegExp("msie ([0-9]{1,})(\\.{0,}[0-9]{0,1})");
            if (reg.exec(agent) != null) {
                var Version = parseFloat(RegExp.$1 + RegExp.$2);
                if (Version <= 9) Result = false;
            }
        }

        return Result;
    }, EnterEvent: function (TarEl, CallBack) {
        $(TarEl).keyup(function () {
            if (event.keyCode == 13) {
                if (CallBack != null && CallBack != undefined)
                    CallBack();
            }
        })
    }
    ,GetExtension: function (filePath) {  // 파일 확장자 반환
        return filePath.substr(filePath.lastIndexOf('.') + 1, filePath.length - (filePath.lastIndexOf('.') + 1));
    },
    isCellPhone :function (p) {
    	p = p.split('-').join('');
    	var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})|(010[1-9][0-9]{6})$/;
    	return regPhone.test(p);
   	},
   	isTel : function (p){
        if (/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(p)) {
            return true;
        }
        return false;
   	},
   	chkEmail : function (str) {
//   	    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
   	    if (regExp.test(str)) return true;
   	    else return false;
   	},
    chkIdentification:function(str, str2){
     var yy = str.substring(0,2);
     var mm = str.substring(2,4);
     var dd = str.substring(4,6);
     var gender = str2.substring(0,1);
     var ck=0;

     if (str.length != 6 || str2.length != 7 || mm < 1 || mm > 12 || dd < 0 || dd > 31 || gender > 4 || gender < 1) return false;

     return true;
    }
}

function maxLengthCheck(object){
if (object.value.length > object.maxLength){
  //object.maxLength : 매게변수 오브젝트의 maxlength 속성 값입니다.
  object.value = object.value.slice(0, object.maxLength);
}
}


function goFileUpload(obj){
    $("#" + obj).click();
}

function goFileUpload(obj, idx){
    CURRENT_OBJECT_STORY_IDX = idx;
    $("#" + obj).click();
}

function goFileUpload(obj){
    $("#" + obj).click();
}

function goFileUpload(obj, idx){
    CURRENT_OBJECT_STORY_IDX = idx;
    $("#" + obj).click();
}

function uploadImageChange(obj, nameObj){
    var src = getFileExtension(obj.value);

    if (src == "") {
        return;
    } else if ( !((src.toLowerCase() == "gif") || (src.toLowerCase() == "jpg") || (src.toLowerCase() == "jpeg") || (src.toLowerCase() == "png") || (src.toLowerCase() == "bmp")) ) {
        alert("gif/jpg/png/bmp 파일만 지원합니다.");
        return;
    }

    let file = obj.files[0];
    var size = file.size || file.fileSize;
    if( size > (1024 * 1024 * 10) )
    {
        alert( '파일용량은 10MB 를 넘을수 없습니다.' );
        return;
    }

    $("#" + nameObj).val(obj.value);


        var reader = new FileReader();
        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("imagePreview").src = e.target.result;
        };
        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
}

function getFileExtension( filePath ) {
    var lastIndex = -1;
    lastIndex = filePath.lastIndexOf('.');
    var extension = "";

    if ( lastIndex != -1 ){
        extension = filePath.substring( lastIndex+1, filePath.len );
    } else {
        extension = "";
    }
    return extension.toLowerCase();
}

function getEditorContent(objId){
    return window.document.getElementById(objId).contentWindow.Editor.getContent();
}

function setThumbnail(event, el, id, size) {
  var reader = new FileReader();
  reader.onload = function(event) {
    function img() {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      document.querySelector("#" + id).appendChild(img);
      $(el).css({
        height: 0
      });
      $(el).next().css({
            borderWidth: 0
          });
          $("#" + id)
            .next()
            .attr("class", "ic-circle-close-gy po-rt0 po-top0");
        }
        if ($("#" + id).children().length == 0) {
          img();
        } else {
          $("#" + id)
            .find("img")
            .remove();
          img();
        }
      };

    // 사이즈체크
    if(size != undefined){
        var maxSize  = size * 1024 * 1024;
        var fileSize = fileSize = event.target.files[0].size;
        if(fileSize > maxSize)
        {
            el.value = "";
            alert("첨부파일 사이즈는 "+size+"MB 이내로 등록 가능합니다.    ");
            return;
        }
    }

    reader.readAsDataURL(event.target.files[0]);
}

function setVideoThumbnail(event, el, id, size) {
    var reader = new FileReader();
    reader.onload = function(event) {
        function video() {
            var video = document.createElement("video");
            video.style = "width:100%;height:100%";
            video.setAttribute("playsinline", "");
            video.setAttribute("autoplay", "");
            video.setAttribute("muted", "");
            video.setAttribute("loop", "");
            var video_source = document.createElement("source");
            video_source.setAttribute("src", event.target.result);
            video.appendChild(video_source);
            document.querySelector("#" + id).appendChild(video);
            $(el).css({
                height: 0
            });
            $(el).next().css({
                borderWidth: 0
            });
            $("#" + id)
                .next()
                .attr("class", "ic-circle-close-gy po-rt0 po-top0");
        }
        if ($("#" + id).children().length == 0) {
            video();
        } else {
            $("#" + id)
                .find("video")
                .remove();
            video();
        }
    };

    // 사이즈체크
    if(size != undefined){
        var maxSize  = size * 1024 * 1024;
        var fileSize = fileSize = event.target.files[0].size;
        if(fileSize > maxSize)
        {
            el.value = "";
            alert("첨부파일 사이즈는 "+size+"MB 이내로 등록 가능합니다.    ");
            return;
        }
    }

    reader.readAsDataURL(event.target.files[0]);
}
// 이미지 삭제하기
function removeImg(btn, target) {
    if (!$(btn).hasClass("ic-plus")) {
        $(btn).parent().css({
            borderWidth: "1px"
        });
        $(btn).parent().prev().css({
            height: "200px"
        });
        $(btn).prev().children().remove();
        $(btn).attr("class", "ic-plus po-center");

        // file 초기화
        $uploadFile = $(btn).closest(target).find("input[type='file']");
        var agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
            $uploadFile.replaceWith($uploadFile.clone(true));
        } else {
            $uploadFile.val("");
        }
    }
}
