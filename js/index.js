let prevToken = "";
let nextToken = "";

function videos(pageToken) {

    $("#searchVideo").empty();
    $(".results").empty();

    var userInput = ($("#searchVideo").val());

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        data: {
            part: "snippet",
            key: "AIzaSyBb7Nw-NjUC0Geb_RrTCtCTyn3hzIy2wLE",
            q: userInput,
            maxResults: 10,
            type: "video",
            pageToken: pageToken
        },
        method: "GET",
        dataType: "json",
        success: function(responseJson){
            //Add functionality
            responseJson.items.forEach(function(vid){

                let newVideo = $(`<div class="video"></div>`);
                let vidLink = "https://www.youtube.com/watch?v=" + vid.id.videoId;
                newVideo.append(`<h3><a href="${vidLink}" target="_blank"> ${vid.snippet.title}</a></h3>`);
                newVideo.append(`<a href="${vidLink}" target="_blank"><img src="${vid.snippet.thumbnails.high.url}" alt="Video" href="${vidLink}" /></a>`);
                $(".results").append(newVideo);
                prevToken = responseJson.prevPageToken;
                nextToken = responseJson.nextPageToken;
            });
        },
        error: function(err){
            console.log(err);
        }
    });

}


$("#searchForm").submit(function(Event){
    event.preventDefault();

    videos("");
})


$(".navig").on("click", ".previousB", (event) => {
    event.preventDefault();

    videos(prevToken);
    console.log("Previous");
})

$(".navig").on("click", ".nextB", (event) => {
    event.preventDefault();

    videos(nextToken);
    console.log("Next");
})