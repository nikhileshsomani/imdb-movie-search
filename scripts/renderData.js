(function(window, document, $) {

    render = {

        handleScript: function(scriptElement, context, putInElement) {
        	$('#overlay').remove();
            var templateScript = $(scriptElement).html(),
                template = Handlebars.compile(templateScript),
                compiledHTML = template(context);
            $(putInElement).html(compiledHTML);
        },

        loading : function() {
            var over = '<div id="overlay">' +
                '<img id="loading" src="http://bit.ly/pMtW1K">' +
                '</div>';
            $(over).appendTo('body');
        }

    }



})(window, document, $);
