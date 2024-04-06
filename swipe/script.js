var div = document.querySelectorAll('.commonBox')

    // Set dynamic sizes for each side
    var topSize = "50px";
    var rightSize = "100px";
    var bottomSize = "75px";
    var leftSize = "25px";

    div.style.borderTopWidth = topSize;
    div.style.borderRightWidth = rightSize;
    div.style.borderBottomWidth = bottomSize;
    div.style.borderLeftWidth = leftSize;

    // Adjust width and height accordingly
    div.style.width = `calc(100% - ${parseInt(leftSize) + parseInt(rightSize)}px)`;
    div.style.height = `calc(100% - ${parseInt(topSize) + parseInt(bottomSize)}px)`;