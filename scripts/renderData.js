(function(window, document, $) {

    render = {


        /**
         * Renders retrived data into templates to target location
         * @global
         * @param {css Selector} scriptElement - Handlebar template name
         * @param {css Selector} putInElement - target location
         * @param {Object} context - Object to be passed
         */

        handleScript: function(scriptElement, context, putInElement) {
            var templateScript = $(scriptElement).html(),
                template = Handlebars.compile(templateScript),
                compiledHTML = template(context);
            $(putInElement).html(compiledHTML);
        },

        /**

        * Loader to show the loading of data.
        * @param{none} none
        * @return{none} none

        */

        loading: function() {
            var over = '<div id="overlay">' +
                '<img id="loading" src="http://bit.ly/pMtW1K">' +
                '</div>';
            $(over).appendTo('body');
        }

    }



})(window, document, $);
