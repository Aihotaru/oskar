$(function() {
    $('.table1>tbody>tr:odd').hide();

    $('.table1>tbody>tr:even').on('click', function(e){
        var $active = $target = $(e.target);
        if ($target.prop("tagName") == "TD") {
            $active = $target.parent();
        }
        var $subTable = $active.next();
        $subTable.toggle();
    });
});




$(".search-but").on("click", function(){
    $(this).toggleClass('open');
    $(".search-area").toggle();
});
