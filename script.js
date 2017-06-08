    var bookInfo = {
        books: [

        ]
    };

    var fetch = function (isbn) {
        var url = 'https://www.googleapis.com/books/v1/volumes?q=' + $('.searchBy').val() + ':' + $('.input').val() + '&Pagination=maxResults'
        $.ajax({
            method: "GET",
            url: url,
            success: function (data) {
                console.log(data);

                for (var i = 0; i < data.items.length; i++) {
                    bookInfo.books.push({
                        title: data.items[i].volumeInfo.title,
                        author: data.items[i].volumeInfo.authors,
                        description: data.items[i].volumeInfo.description,
                        imgsrc: data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : 'http://www.library.psychol.cam.ac.uk/images/GenericBook',
                        link: data.items[i].volumeInfo.infoLink

                    });
                };
                renderBook()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }

        })
    }



    var renderBook = function () {
        $('.result').empty()
        var source = $('#render-post').html();
        var template = Handlebars.compile(source);
        var newHTML = template(bookInfo);
        $('.result').append(newHTML);

    };


    $('.search').click(fetch)