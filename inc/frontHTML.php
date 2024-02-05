<?php

$number = new NumberFormatter('en-EUR', NumberFormatter::DEFAULT_STYLE);


?>

<div class="dateprice_container" id="datesandprices">
    <div class="dateprice_table_container">
        <div class="table_label">
            <div style="padding: 15px;font-size: 26px;font-weight: bold;">Dates <span class="innertext_label">&</span> Prices</div>
        </div>
        <div class="dateprice_table_header_container">
            <div class="dateprice_table_header_item">Start Date</div>
            <div class="dateprice_table_header_item">End Date</div>
            <div class="dateprice_table_header_item">Availability</div>
            <div class="dateprice_table_header_item">Price</div>
        </div>
        <div class="dateprice_table_body_container">

            <?php foreach ($result as $key => $value) { ?>
                <div class="dateprice_table_row" id="<?php echo $value->id; ?>">
                    <div class="row_card_items">
                        <div class="dateprice_table_item">
                            <div class="table_item_header">Start Date</div>
                            <div class="table_item_content"><?php echo $value->startdate; ?></div>
                        </div>
                        <div class="arrow_icon_dateandprice"></div>
                        <div class="dateprice_table_item align_end_respons">
                            <div class="table_item_header">End Date</div>
                            <div class="table_item_content"><?php echo $value->enddate; ?></div>
                        </div>
                        <div class="dateprice_table_item">
                            <div class="table_item_header status_header_reponse">Availability</div>
                            <div class="table_item_content">
                                 <?php
                                  $icon_limited = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 6%;margin-right: 17px;fill: #ffab12;"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/></svg>';
                                  $icon_in_high_demand = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 6%;margin-right: 10px;fill: #00b7ff;"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/></svg>';
                                  $icon_sold_out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="width: 5%; margin-right: 10px; fill: red;"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48h8V67c0 40.3 16 79 44.5 107.5L158.1 256 76.5 337.5C48 366 32 404.7 32 445v19H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V445c0-40.3-16-79-44.5-107.5L225.9 256l81.5-81.5C336 146 352 107.3 352 67V48h8c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM192 289.9l81.5 81.5C293 391 304 417.4 304 445v19H80V445c0-27.6 11-54 30.5-73.5L192 289.9zm0-67.9l-81.5-81.5C91 121 80 94.6 80 67V48H304V67c0 27.6-11 54-30.5 73.5L192 222.1z"/></svg>';                     
                               ?>
                                <?php switch ($value->tourstatus) {
                                    case 'available':
                                        echo "<div class='status_container' style='color: #5fd573; display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_available'></div>  Available</div>";
                                        break;
                                    case 'guaranteed':
                                        echo "<div class='status_container' style='color: #f1592a;display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_guaranteed'></div>  Tour Guaranteed</div>";
                                        break;
                                    case 'almostsoldout':
                                        echo $icon_limited . "<div class='status_container' style='color: #ffab12; display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_limited_availability'></div>  Limited Availability</div>";
                                        break;
                                    case 'soldout':
                                        echo "<div class='status_container' id="sold-out" style='display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_guaranteed'></div>  Tour Sold Out</div>";
                                        break;
                                } ?>
                            </div>
                        </div>
                        <div class="dateprice_table_item align_end_respons">
                            <div class="table_item_header">Price</div>
                            <div class="table_item_content respons_price">
                                <?php if (!empty($value->sale_price)) { ?>
                                    <div class="sale_price">
                                        <?php echo "<div class='sale_icon'>" . $sale_price_svg . "</div> €" . $number->format($value->sale_price) . " EUR" ?>
                                    </div>
                                <?php } ?>
                                <div class="<?php echo !empty($value->sale_price) ? "have_sale" : "" ?>" <?php echo !empty($value->sale_price) ? "style='margin-right: 0; font-size: 15px;'" : "" ?>>
                                    <?php echo "€ " . $number->format($value->price) . " EUR" ?>
                                </div>
                            </div>
                        </div>
                        <div class="surfiran_toggle_icon">
                            <span class="dashicons dashicons-arrow-down" style="color: #222;"></span>
                        </div>
                    </div>

                    <div class="row_expand" id="<?php echo $value->id; ?>">
                        <?php if (!empty($value->date_note)) { ?>
                            <div class="tour_note">
                                <?php echo base64_decode(str_replace("/", "", $value->date_note)) ?>
                            </div>
                        <?php } ?>
                        <div class="tour_detail">
                            <div class="tour_detail_price"><strong <?php echo !empty($value->sale_price) ? "class='expand_have_sale'" : "" ?>><?php echo "€" . $number->format($value->price) . " EUR";  ?></strong><?php echo !empty($value->sale_price) ? "<strong style='color: #EB0000 !important; '> € " . $number->format($value->sale_price) . " EUR</strong>" : "" ?></div>
                            <?php echo !empty($value->sale_price) ? "<div style='font-size: 12px;color: #0a7bbd;margin-bottom: -10px;margin-top: 10px;'>The stated discount applies to groups of 4 or more.</div>" : "" ?>
                            <div class="tour_detail_desc">per adult in a twin share room</div>
                            <div class="tour_detail_singleprice">Want your own room?</div>
                            <div class="tour_detail_extraprice"><?php echo "Extra pay <strong>€" . $number->format($value->singleprice) . " EUR</strong>"; ?></strong></div>
                        </div>
                        <div class="tour_request_form">
                            <button>
                                <a href="#enquire">Request</a>
                            </button>
                        </div>
                    </div>
                </div>
            <?php }; ?>
        </div>
        <div class="dateprice_table_footer_container">
            <div class="show_more_button">
                Show More
            </div>
            <div>
                <span class="dashicons dashicons-arrow-down" style="margin-top: 2px;"></span>
            </div>
        </div>
    </div>
</div>
