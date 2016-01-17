$(document).ready(function() {

    function generator() {
        var quote = [
            "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.@Buddha",

            "The most important thing is to enjoy your life - to be happy - it's all that matters.@Audrey Hepburn",
            "Life's most persistent and urgent question is, 'What are you doing for others?'@Martin Luther King"
        ];
        var randomQuoteStr = quote[Math.floor(Math.random() * quote.length)];
        var quoteStr = randomQuoteStr.split('@');
        $(".saying").text(quoteStr[0]);
        $(".author").text(quoteStr[1]);
    }

    generator();

    $("button").click(function() {
        generator();
    });
});
