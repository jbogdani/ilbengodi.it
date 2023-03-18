$(document).ready(function(){

  $('a.fancybox').fancybox();

  $('.heading h2').each(function(i, el){
    $(el).html($(el).text().replace(/\b([A-Z])/g, "<span class='orange'>$1</span>"));
  });



  if ($('#search_wine').length > 0){
    $('#search_wine').typeWatch({
      wait: 500,
      highlight: true,
      captureLength: 2,
      callback: function(val){

        $(".searcheable li, .searcheable h4").fadeIn();

        if (!val || val == ''){
          return;
        }

        $('.searcheable h4').each(function(){
          var h4 = $(this),
              ul = h4.next('ul');
          if(h4.text().toLowerCase().indexOf(val.toLowerCase()) < 0){
            var found = false;
            ul.find('li').each(function(){
              if($(this).text().toLowerCase().indexOf(val.toLowerCase()) > -1){
                found = true;
                $(this).fadeIn();
              } else {
                $(this).fadeOut();
              }
            });
            if (!found){
              h4.fadeOut();
            }
          }
        });
      }
    });
  }

});
