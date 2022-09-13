let blocker = document.createElement('div');
blocker.id = 'divBlocker';
blocker.className = 'ui-blocker';

let _loader = document.createElement('div');
_loader.id = 'divLoader';
_loader.className = 'ui-loader';

let Common = {
    ResizeBlocker: function () {
        blocker.style.width = '100%';
        blocker.style.height = window.screen.availHeight + 'px';
    },
    // 페이지를 조작할 수 없도록 막음.
    Block: function (opacity) {
        opacity = opacity || '0.3';
        opacity = parseFloat(opacity);
        Common.ResizeBlocker();
        if (!document.getElementById('divBlocker')) {
            blocker.style.cssText += 'opacity:' + opacity + ';filter:alpha(opacity=' + (opacity * 100) + ')';
            document.body.appendChild(blocker);
        } else {
            document.getElementById('divBlocker').style.cssText += 'opacity:' + opacity + ';filter:alpha(opacity=' + (opacity * 100) + ')';
        }
        $(window).unbind('resize', Common.ResizeBlocker);
        $(window).bind('resize', Common.ResizeBlocker);
    },

    // 페이지를 조작할 수 있도록 품.
    Unblock: function () {
        var blk = document.getElementById('divBlocker');
        if (blk) {
            document.body.removeChild(blk);
        }
        $(window).unbind('resize', Common.ResizeBlocker);
    },

    Loader: function (show) {
        if (show) {
            if (!document.getElementById('divLoader')) {
                document.body.appendChild(_loader);
            }
        } else {
            let blk = document.getElementById('divLoader');
            if (blk) {
                document.body.removeChild(blk);
            }
        }
    },

    // 파일 드래그 효과 추가
    // wrap: 드래그 오버 영역
    // el: 효과가 출력될 영역
    BindDroppableEffect: function (el, wrap) {
        var dragging = 0,
            dropZoneTag = '<div class="dropzone"><div class="dropzone-cover"></div><p>마우스 버튼을 놓으면 업로드됩니다.</p></div>';

        wrap = wrap || el;

        el.css('position', 'relative');

        wrap.bind({
            'dragenter': function (e) {
                dragging++;
                if (dragging === 1) {
                    $(dropZoneTag).css({ width: el.outerWidth() - 1, height: el.outerHeight() - 1, left: '0px', top: '0px' }).prependTo(el);
                    el.addClass("block-event");
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            'dragover': function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            'dragleave drop': function (e) {
                dragging--;
                if (dragging === 0) {
                    el.removeClass("block-event");
                    el.find("div.dropzone").remove();
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    },
    UnbindDroppableEffect: function (wrap, el) {
        wrap.unbind('dragenter dragover dragleave drop');
        if (el) el.css('position', 'static');
    },
    BindDroppable: function (el, overCallback, outCallback) {
        var dragging = 0;

        el.bind({
            'dragenter': function (e) {
                dragging++;
                if (dragging === 1) {
                    overCallback();
                    el.addClass("block-event");
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            'dragover': function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            'dragleave drop': function (e) {
                dragging--;
                if (dragging === 0) {
                    el.removeClass("block-event");
                    outCallback();
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    },
    UnbindDroppable: function (el) {
        el.unbind('dragenter dragover dragleave drop');
    },

    // 지정한 자리까지 문자 출력
    CondenseString: function (str, length) {
        if (!str) return null;
        if (str.length >= length) {
            return $.trim(str.substr(0, length - 1)) + "..";
        } else {
            return str;
        }
    },
    //Json형식의 날짜를 YYYY-MM-DD HH:MM:SS로 변경
    ConvertJsonDateToFormat: function (jsonDate, format) {
        var date = new Date(parseInt(jsonDate.substr(6)));
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var second = ("0" + date.getSeconds()).slice(-2);

        if (format == 1) {
            date = year + "-" + month + "-" + day;
        }
        else if (format == 2) {
            date = year + "-" + month + "-" + day + " " + hour + ":" + minute;
        }
        else if (format == 3) {
            date = month + "-" + day;
        }
        else {
            date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        }

        return date;
    },ConvertStringDate: function (jsonDate) {
        return jsonDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    },
    //URL 파라미터값 가져오기
    GetUrlParamValue: function (key) {
        var params = new RegExp(key + '=' + '(.+?)(&|$)').exec(window.location.href);

        if (params == null) {
            return "";
        }
        else {
            return params[1];
        }
    },
    GetSequnceMath: function(){


        return (parseInt(Common.GetUrlParamValue("page"))-1)*parseInt(Common.GetUrlParamValue("pageSize"))
    },
    GetSequnce: function(key, key2){


        return key-(key2 + Common.GetSequnceMath() );
    },
    FormData: function (frmid, selected) {

        let requestData = {}
        let frm_data = $("#" + frmid).find(selected).serializeArray();

        for (let index in frm_data) {
            requestData[frm_data[index].name] = frm_data[index].value;
        }

        return requestData;
    },
    //리스트로 이동
    GoList: function (pageName, pageNameWithPath) {
        var referrerIndex = document.referrer.indexOf(pageName);

        if (referrerIndex > -1) {
            history.back();
        }
        else {
            location.href = pageNameWithPath;
        }
    },

};

    ///tmpl 확장
(function ($) {
    $.extend(jQuery.tmpl.tag, {
        "for": {
            _default: { $2: "var i=1;i<=1;i++" },
            open: 'for ($2){',
            close: '};'
        }
    });
})(jQuery);


jQuery.extend({

    getURLParam: function (strParamName) {
        var strReturn = "";
        var strHref = window.location.href;
        var bFound = false;

        var cmpstring = strParamName + "=";
        var cmplen = cmpstring.length;

        if (strHref.indexOf("?") > -1) {
            var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
            var aQueryString = strQueryString.split("&");
            for (var iParam = 0; iParam < aQueryString.length; iParam++) {
                if (aQueryString[iParam].substr(0, cmplen) == cmpstring) {
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    bFound = true;
                    break;
                }

            }
        }
        if (bFound == false) return null;
        return strReturn;
    }
});

// form serialize 를 object 로 반환
jQuery.fn.serializeObject = function () {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function () {
                    obj[this.name] = this.value;
                });
            } //if ( arr ) {
        }
    }
    catch (e) { alert(e.message); }
    finally { }

    return obj;
};
// 배열 remove 함수 추가
Array.prototype.remove = function (idx) {
    return (idx < 0 || idx > this.length) ? this : this.slice(0, idx).concat(this.slice(idx + 1, this.length));
};
/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

    "use strict"; // jshint ;_;


    /* MODAL CLASS DEFINITION
     * ====================== */

    var Modal = function (element, options) {
        this.options = options
        this.$element = $(element)
            .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
        this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
    }

    Modal.prototype = {

        constructor: Modal

        , toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']()
        }

        , show: function () {
            var that = this
                , e = $.Event('show')

            this.$element.trigger(e)

            if (this.isShown || e.isDefaultPrevented()) return

            this.isShown = true

            this.escape()
            
            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade')

                if (!that.$element.parent().length) {
                    that.$element.appendTo(document.body) //don't move modals dom position
                }

                that.$element
                    .show()

                if (transition) {
                    that.$element[0].offsetWidth // force reflow
                }

                that.$element
                    .addClass('in')
                    .attr('aria-hidden', false)

                that.enforceFocus()

                transition ?
                    that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
                    that.$element.focus().trigger('shown')

            })
            
            //document.body.style.width = "100%";
            //document.body.style.position = "fixed";
            document.body.style.overflow = "hidden";
        }

        , hide: function (e) {
            e && e.preventDefault()

            var that = this

            e = $.Event('hide')

            this.$element.trigger(e)

            if (!this.isShown || e.isDefaultPrevented()) return

            this.isShown = false

            this.escape()

            $(document).off('focusin.modal')

            this.$element
                .removeClass('in')
                .attr('aria-hidden', true)

            $.support.transition && this.$element.hasClass('fade') ?
                this.hideWithTransition() :
                this.hideModal()

            //document.body.style.width = "";
            //document.body.style.position = "";
            document.body.style.overflow = "";
        }

        , enforceFocus: function () {

            $(document)
                .off('focusin.bs.modal') // guard against infinite focus loop
                .on('focusin.bs.modal', $.proxy(function (e) {
                    if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                        this.$element.trigger('focus')
                        this.$element.focus()
                    }
                }, this))

        }
        , escape: function () {
            var that = this
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.modal', function ( e ) {
                    e.which == 27 && that.hide()
                })
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal')
            }
        }

        , hideWithTransition: function () {
            var that = this
                , timeout = setTimeout(function () {
                that.$element.off($.support.transition.end)
                that.hideModal()
            }, 500)

            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout)
                that.hideModal()
            })
        }

        , hideModal: function (that) {
            this.$element
                .hide()
                .trigger('hidden')

            this.backdrop()
        }

        , removeBackdrop: function () {
            this.$backdrop.remove()
            this.$backdrop = null
        }

        , backdrop: function (callback) {
            var that = this
                , animate = this.$element.hasClass('fade') ? 'fade' : ''

            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate

                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                    .appendTo(document.body)

                this.$backdrop.click(
                    this.options.backdrop == 'static' ?
                        $.proxy(this.$element[0].focus, this.$element[0])
                        : $.proxy(this.hide, this)
                )

                if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

                this.$backdrop.addClass('in')

                doAnimate ?
                    this.$backdrop.one($.support.transition.end, callback) :
                    callback()

            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')

                $.support.transition && this.$element.hasClass('fade')?
                    this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
                    this.removeBackdrop()

            } else if (callback) {
                callback()
            }
        }
    }


    /* MODAL PLUGIN DEFINITION
     * ======================= */

    var old = $.fn.modal

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('modal')
                , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.modal.defaults = {
        backdrop: true
        , keyboard: true
        , show: true
    }

    $.fn.modal.Constructor = Modal


    /* MODAL NO CONFLICT
     * ================= */

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    /* MODAL DATA-API
     * ============== */

    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this)
            , href = $this.attr('href')
            , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
            , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

        e.preventDefault()

        $target
            .modal(option)
            .one('hide', function () {
                $this.focus()
            })
    })

}(window.jQuery);

$(document).on({
    'show.bs.modal': function() {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    },
    'hidden.bs.modal': function() {
        if ($('.modal:visible').length > 0) {
            // restore the modal-open class to the body element, so that scrolling works
            // properly after de-stacking a modal.
            setTimeout(function() {
                $(document.body).addClass('modal-open');
            }, 0);
        }
    }
}, '.modal');
