jQuery(document).ready(function ($) {

	
	 $(".tour_request_form").on("click", function () {
    let content_row = $(this).parents(".row_expand").prev();
    let start_date = $(content_row).children()[0];
    let start_date_text = $(start_date).find(".table_item_content").text();

    //Select input select  from Gravity Form //

    let form = $(".tour_enquiry_form");

    let child_form = form.find(".ginput_container_select")[0];

    let form_select = child_form.children;

    $(form_select).val(start_date_text);
  });
	

    let row = $('.dateprice_table_row')

    for (let i = 10; i < row.length; i++) {

        $(row[i]).css('display', 'none');
    }
	
	if (row.length > 10) {
    		$(".dateprice_table_footer_container").css("display", "flex");
  		} else {
    		$(".dateprice_table_footer_container").css("display", "none");
  		}

    $('.dateprice_table_footer_container').on('click', function () {

        for (let i = 10; i < row.length; i++) {

            if ($(row[i]).css('display') == 'none') {
                $(row[i]).slideDown();
                $(this).css({
                    'background-color': '#ff6868',
                    'text-shadow': 'none',
                    'color': 'black'
                });
                $('.show_more_button').text('Show Less')
        
                $('.dateprice_table_footer_container').find('span').addClass('dashicons-arrow-up')

            } else {
                $(row[i]).slideUp();               
                $(this).css({
                    'background-color': '#c2f7ff',
                    'text-shadow': '-1px 1px 4px white',
                    'color': '#00000094'
                })
                $('.show_more_button').text('Show More')        
                $('.dateprice_table_footer_container').find('span').removeClass('dashicons-arrow-up')
            }
        }
        
    });


    $(document).on('click', '.dateprice_table_row', function () {

		const display_width = $(document).innerWidth();

		if (display_width < 865) {
		  $(".row_expand").css("display") == "flex";
		  return;
		}
		
        // let row_id = $(this).attr('id');
        let expand_id = $(this).find('.row_expand');


        if (expand_id.css('display') == 'none') {
            $('.row_expand').slideUp();
            $('.toggle_icon span').removeClass('dashicons-arrow-up');
            $(this).find('span').addClass('dashicons-arrow-up');
            // expand_id.slideDown();
            // expand_id.css('display' , 'flex');

            // Can use Animate instead of slideUp or slideDown
            expand_id.css({
                'display': 'flex',
                'opacity': 0
            }).animate({
                'opacity': 1
            }, 1000);
        } else {
            expand_id.slideUp();
            setTimeout(() => {

                $(this).find('span').removeClass('dashicons-arrow-up');
            }, 200)

            // expand_id.animate({
            //     'opacity': 0
            // }, 500, function () {
            //     expand_id.css('display', 'none');
            // });
        }
    })
});