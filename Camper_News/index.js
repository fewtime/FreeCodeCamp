var STEP = 10;
var JSON_URL = "http://www.freecodecamp.com/news/hot";

// $(window).on("load", function() {
$(document).ready(function() {
    var currentJsonIndex = STEP;
    drawPage(-1, STEP);

    // window.onscroll = function() {
    //     if (checkScrollSide("#posts", ".post")) {
    //         drawPage(STEP, currentJsonIndex);
    //     }
    // };
});

function drawPage(currentIndex, step) {
    console.log(currentIndex);
    $.getJSON(JSON_URL, function(json) {
        addPosts(json, currentIndex, STEP);
        waterFall("#posts", ".post", 10, 10);
    });
}

function addPosts(json, currentIndex, step) {
    if (currentIndex === -1) {
        currentIndex = 0;
        step = json.length;
    }

    for (var i = currentIndex; i < step; ++i) {
        var currentData = json[i];
        var imageURL = currentData.author.picture;
        var title = currentData.headline;
        var author = "By: " + currentData.author.username;
        var like = "♥ " + currentData.rank;
        var date = new Date(currentData.timePosted).toGMTString().slice(0, -13);
        date = "Posted on: " + date;
        var description = currentData.metaDescription;

        var link = $("<a>").attr("href", currentData.link);
        var titleWithLink = $("<a>").attr("href", currentData.link).append(title);
        var authorWithLink = $("<a>").attr("href", "http://www.freecodecamp.com/" + currentData.author.username).append(author);

        var $post = addDiv("post", $("#posts"));
        // var $authorPhoto = $("<div>").addClass("author-photo").appendTo($post);
        var $linkForImg = link.appendTo($post);
        $("<img>").attr("src", imageURL).addClass("author-photo").appendTo($linkForImg);

        var $postInfo = addDiv("post-info", $post);
        addDiv("post-title", $postInfo).append(titleWithLink);
        addDiv("post-author", $postInfo).append(authorWithLink);
        addDiv("post-like", $postInfo).append(like);
        addDiv("post-time", $postInfo).append(date);
        addDiv("post-description", $postInfo).append(description);
    }
}

function waterFall(parent, child, marginWidth, marginHeight) {
    var $aPost = $(parent + ">" + child);
    var postWidth = $aPost.eq(0).width() + marginWidth * 2;
    var postPerLine = Math.floor( $(window).width() / postWidth);
    $(parent).css({
        'width': postWidth * postPerLine,
        'margin': '0px auto',
        'position': 'relative'
    });

    var colsHeight = [];
    $aPost.each(function(index, value) {
        var postHeight = $aPost.eq(index).height();
        if (index < postPerLine) {
            colsHeight[index] = postHeight;
        } else {
            var minHeight = Math.min.apply(null, colsHeight);
            var minHeightIndex = colsHeight.indexOf(minHeight);
            $(value).css({
                'position': 'absolute',
                'top': minHeight + marginHeight,
                'left': $aPost.eq(minHeightIndex).position().left
            });
            colsHeight[minHeightIndex] += ($aPost.eq(index).height() + marginHeight);
        }
    });
}

function addDiv(className, parent) {
    return $("<div>").addClass(className).appendTo(parent);
}

// function checkScrollSide(parent, child) {
//     var $aPost = $(parent + ">" + child);
//     var lastPostHeight = $aPost.last().get(0).offsetTop + Math.floor($aPost.last().height() / 2);
//     var scrollTop = $(window).scrollTop();
//     var documentHeight = $(document).height();
//     return (lastPostHeight < scrollTop + documentHeight) ? true : false;
// }
