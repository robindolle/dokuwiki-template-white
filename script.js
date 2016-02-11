(function($) {
    var fadeOption = {duration: 150};

    function toggleLeft() {
        $('#sidebar_bg').show('fade', fadeOption);
        $('#dokuwiki__aside').show();
    }

    function toggleRight() {
        $('#sidebar_bg').show('fade', fadeOption);
        $('#dokuwiki__tools').show();
    }

    function preventParentWheel(e) {
    	var curScrollPos = $(this).scrollTop();
    	var scrollableDist = $(this).prop('scrollHeight') - $(this).outerHeight();
    	var wheelEvent = e.originalEvent;
    	var dY = wheelEvent.deltaY;

    	if (dY < 0 && curScrollPos <= 0) {
    		return false;
    	}
    	if (dY > 0 && curScrollPos >= scrollableDist) {
    		return false;
    	}
    }

    function bindEvents() {
        $('.sidebar').on('wheel scroll', preventParentWheel);
        $('.btn_left').click(function() {
            toggleLeft();
        });
        $('.btn_right').click(function() {
            toggleRight();
        });
        $('#sidebar_bg').click(function() {
            $(this).hide('fade', fadeOption);
            $('#dokuwiki__aside').hide();
            $('#dokuwiki__tools').hide();
        });
        $('.btn_search').click(function() {
            $('div.search').toggle();
            $('div.search').find('input.edit').focus();
        });
    }

    function initUI() {
        // Move TOC
        if ($('.page h2').length > 0) {
            $('#dw__toc').insertBefore($('.page h2:first'));
        } else {
            $('#dw__toc').insertAfter($('.page h1:first').next('.level1'));
        }
        // Anchor link should be shifted by header pixel
        $(window).on("hashchange", function () {
            window.scrollTo(window.scrollX, window.scrollY - 48);
        });
    }

    $(function() {
        initUI();
        bindEvents();
    });
})(jQuery);
