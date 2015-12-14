(function(window, document, $) {

    imdbSearch = {


        topMovies: [],


        /**

        * This function fetches the  ImdbId ID of an actor/actress.
        * @param{string} name - name of an actress/actor
        * @return{none} none

        */
        _getImdbID: function(name) {
            $.ajax({
                context: this,
                async: false,
                url: 'http://localhost:3002/' + name,
                method: 'GET',
                beforeSend: function() {
                    render.loading();
                },
                success: function(result) {
                    if (result == "No such actor/actress found.") {
                        $('.search-box').addClass('invalid');
                        $('.search-input').val("").attr('placeholder', result);
                        $('#overlay').remove();
                    } else {
                        $('.search-box').removeClass('invalid');
                        this._getTopMovies(result);
                    }
                },
                error: function(err) {
                    console.log(err);
                },
            })
        },

        /**

        * This function fetches top 3Movies of the actor/actress IMDB-rating-wise.
        * @param{String} nameID - imdb name ID of the actor/actress
        * @return{none} none

        */

        _getTopMovies: function(nameID) {
            this.topMovies = [];
            $.ajax({
                context: this,
                url: 'http://localhost:3002/name/' + nameID,
                dataType: 'html',
                method: 'GET',
                success: function(result) {
                    var html = $.parseHTML(result);
                    var moviesList = $(html).find('.lister-item');
                    var self = this;
                    moviesList.each(function(i, dom) {
                        if (i < 3) {
                            var movieName = $(dom).find('.lister-item-content h3 a').html(),
                                movieYear = $(dom).find('.lister-item-year').html(),
                                movieLength = $(dom).find('.runtime').html(),
                                movieGenre = $(dom).find('.genre').html(),
                                movieRuntime = $(dom).find('.runtime').html(),
                                movieCertificate = $(dom).find('.certificate').html(),
                                movieImdbRating = $(dom).find('.ratings-imdb-rating').data('value'),
                                movieImg = $(dom).find('.lister-item-image a img').attr('loadlate'),
                                movieId = $(dom).find('.lister-item-image').data('tconst'),
                                votedBy = $(dom).find('[name="nv"]').data('value');
                            obj = {
                                'movieName': movieName,
                                'movieYear': movieYear,
                                'movieLength': movieLength,
                                'movieGenre': movieGenre,
                                'movieImdbRating': movieImdbRating,
                                'movieRuntime': movieRuntime,
                                'movieCertificate': movieCertificate,
                                'movieImg': movieImg,
                                'movieId': movieId,
                                'votedBy': votedBy
                            }
                            self.topMovies.push(obj);
                        }
                    })
                    this._getTopReviews();
                },
                error: function(err) {
                    console.log(err);
                }
            })
        },

        /**

        * This function fetches the top 3 reviews of all the movies fetched above.
        * @param{none} none
        * @return{none} none

        */
        _getTopReviews: function() {
            var self = this;
            var reviews;
            this.topMovies.forEach(function(obj, i) {
                if (i < 3) {
                    self.topMovies[i]['movieReviews'] = [];
                    self.topMovies[i]['movieImdbLink'] = "http://www.imdb.com/title/" + self.topMovies[i]['movieId'] + "/"
                    $.ajax({
                        context: self,
                        complete: function() {
                            $('#overlay').remove();
                        },
                        url: 'http://localhost:3002/review/' + obj['movieId'],
                        method: 'GET',
                        async: false,
                        success: function(result) {
                            var html = $.parseHTML(result);
                            review = $(html).find('#tn15content hr').nextUntil('.yn');
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    })
                    for (var y = 0; y < 6; y = y + 2) {
                        if ($(review).find('h2').length) {
                            self.topMovies[i]['movieReviews'].push({
                                'reviewTitle': $(review[y]).find('h2').html(),
                                'reviewMain': review[y + 1].innerHTML
                            })
                        } else {
                            self.topMovies[i]['movieReviews'].push({
                                'reviewMain': "No Reviews"
                            });
                            return;
                        }
                    }
                }
            })
            var data = {
                "Movies": self.topMovies
            }
            render.handleScript('#movie-template', data, '#template-target')
        }



    }


})(window, document, $);
