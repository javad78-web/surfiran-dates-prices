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

  let row = $(".dateprice_table_row");

  for (let i = 10; i < row.length; i++) {
    $(row[i]).css("display", "none");
  }

  if (row.length > 10) {
    $(".dateprice_table_footer_container").css("display", "flex");
  } else {
    $(".dateprice_table_footer_container").css("display", "none");
  }

  $(".dateprice_table_footer_container").on("click", function () {
    for (let i = 10; i < row.length; i++) {
      if ($(row[i]).css("display") == "none") {
        $(row[i]).slideDown();
        $(this).css({
          "background-color": "rgb(21, 86, 124)",
        });
        $(".show_more_button").text("Show Less");

        $(".dateprice_table_footer_container")
          .find("span")
          .addClass("dashicons-arrow-up");
      } else {
        $(row[i]).slideUp();
        $(this).css({
          "background-color": "#0a7bbd",
        });
        $(".show_more_button").text("Show More Upcoming Dates");
        $(".dateprice_table_footer_container")
          .find("span")
          .removeClass("dashicons-arrow-up");
      }
    }
  });

  const display_width = $(document).innerWidth();

  if (display_width < 865) {
    $(".tour_note").find("*").removeAttr("style");
    $(".tour_note").css("fontSize", "13px");
  }
  $(document).on("click", ".dateprice_table_row", function () {
    if ($(this).hasClass("soldout")) {
      return false;
    } else {
      const display_width = $(document).innerWidth();

      if (display_width < 865) {
        $(".row_expand").css("display") == "flex";
        return;
      }

      // let row_id = $(this).attr('id');

      let expand_id = $(this).find(".row_expand");

      if (expand_id.css("display") == "none") {
        $(".row_card_items").removeAttr("style");

        $(this).find(".row_card_items").css({
          backgroundColor: "#b7d6eb70",
          color: "black",
        });

        $(".row_expand").slideUp("fast");
        $(".surfiran_toggle_icon span").removeClass("dashicons-arrow-up");
        $(this).find("span").addClass("dashicons-arrow-up");

        // Can use Animate instead of slideUp or slideDown
        expand_id
          .css({
            display: "flex",
            opacity: 0,
          })
          .animate({
            opacity: 1,
          });
      } else {
        expand_id.slideUp("fast");
        setTimeout(() => {
          $(this).find("span").removeClass("dashicons-arrow-up");
          $(this).find(".dashicons-arrow-down").css({ color: "#222" });
          $(".row_card_items").removeAttr("style");
        }, 200);
      }
    }
  });

  if (window.innerWidth < 866) {
    $(".tour_note").each(function () {
      $(this).next().after($(this));
    });
  }

  $(".tour_note").each(function () {
    const child_span = $(this).find("span");
    child_span.addClass("no-before");
  });
});
