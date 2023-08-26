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
                                <?php switch ($value->tourstatus) {
                                    case 'available':
                                        echo "<div class='status_icon_dateandprice_available'></div><div style='color: #00c853;'>Available</div>";
                                        break;
                                    case 'guaranteed':
                                        echo "<div class='status_icon_dateandprice_guaranteed'></div><div style='color: #f1592a;'>Guaranteed</div>";
                                        break;
                                    case 'fillingfast':
                                        echo "Filling Fast";
                                        break;
                                    case 'almostsoldout':
                                        echo "Almost Sold Out";
                                        break;
                                    case 'soldout':
                                        echo "Sold Out";
                                        break;
                                } ?>
                            </div>
                        </div>
                        <div class="dateprice_table_item align_end_respons">
                            <div class="table_item_header">Price</div>
                            <div class="table_item_content respons_price">
                                <?php echo !empty($value->sale_price) ? "€" . $number->format($value->sale_price) . " EUR" : "€" . $number->format($value->price) . " EUR"; ?>
                            </div>
                        </div>
                        <div class="surfiran_toggle_icon">
                            <span class="dashicons dashicons-arrow-down" style="margin-left: -25px; color: black;"></span>
                        </div>
                    </div>

                    <div class="row_expand" id="<?php echo $value->id; ?>">
                        <div class="tour_note">
                            <?php echo base64_decode(str_replace("/", "", $value->date_note)) ?>
                        </div>
                        <div class="tour_detail">
                            <div class="tour_detail_price"><strong <?php echo !empty($value->sale_price) ? "class='have_sale'" : "" ?>><?php echo "€" . $number->format($value->price) . " EUR";  ?></strong><?php echo !empty($value->sale_price) ? "<strong> € " . $number->format($value->sale_price) . " EUR</strong>" : "" ?></div>
                            <div class="tour_detail_desc">per adult in a twin share room</div>
                            <div class="tour_detail_singleprice">Want your own room ?<strong style="margin-left: 5px;"> <?php echo " €" . $number->format($value->singleprice) . " EUR"; ?></strong></div>
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