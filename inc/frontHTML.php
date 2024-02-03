<?php

$number = new NumberFormatter('en-EUR', NumberFormatter::DEFAULT_STYLE);

$sale_price_svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<g>
<path d="M13.1328,23.8701L13.1328,23.8701c-0.1953,0-0.3848-0.042-0.5645-0.125c-0.1221-0.0537-0.3018-0.1328-11.9414-11.6982
   L0.4316,11.853c-0.2554-0.2563-0.4009-0.605-0.4019-0.96l-0.0459-9.5054C-0.02,0.6465,0.584,0.0337,1.3296,0.022l9.3418-0.0508
   c0.3604,0,0.7764,0.0474,1.1318,0.3989L23.5439,11.998c0.2588,0.2559,0.4014,0.5977,0.4023,0.9609s-0.1396,0.7041-0.3955,0.9619
   l-9.459,9.5488C13.8398,23.7246,13.4902,23.8701,13.1328,23.8701z M10.6714,0.9712L10.2236,0.98L1.3398,1.022
   C1.167,1.0249,0.9829,1.1606,0.9839,1.3828l0.0459,9.5068c0,0.0942,0.0396,0.1865,0.1074,0.2549l0.1948,0.1934
   c7.0039,6.959,11.3906,11.2754,11.7334,11.5449c-0.0293-0.0244,0.0176-0.0127,0.0674-0.0127c0.0908,0,0.1836-0.0391,0.248-0.1035
   l9.46-9.5508c0.0684-0.0693,0.1055-0.1592,0.1055-0.2539c0-0.0957-0.0381-0.1855-0.1055-0.2529L11.0996,1.0811
   C11.0264,1.0083,10.9399,0.9712,10.6714,0.9712z"/>
<path d="M5.5376,7.9614c-1.3486,0-2.4458-1.0972-2.4458-2.4463c0-1.3486,1.0972-2.4458,2.4458-2.4458s2.4458,1.0972,2.4458,2.4458
   C7.9834,6.8643,6.8862,7.9614,5.5376,7.9614z M5.5376,4.0693c-0.7974,0-1.4458,0.6484-1.4458,1.4458s0.6484,1.4463,1.4458,1.4463
   s1.4458-0.6489,1.4458-1.4463S6.335,4.0693,5.5376,4.0693z"/>
</g>
<rect x="-0.0136" y="0.0001" fill="none" width="24" height="24"/>
</svg>';
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
                                  $icon_limited = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 6%;margin-right: 10px;fill: #ffab12;"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/></svg>';
                                                       
                               ?>
                                <?php switch ($value->tourstatus) {
                                    case 'available':
                                        echo "<div class='status_container' style='color: #00c853;display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_available'></div>Available</div>";
                                        break;
                                    case 'guaranteed':
                                        echo "<div class='status_container' style='color: #f1592a;display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_guaranteed'></div>Guaranteed</div>";
                                        break;
                                    case 'fillingfast':
                                        echo "<div class='status_container' style='color: blue;display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_limited_availability'></div>In High Demand</div>";
                                        break;
                                    case 'almostsoldout':
                                        echo $icon_limited . "<div class='status_container' style='color: #ffab12; display: flex;justify-content: center;align-items: center;'><div class='status_icon_dateandprice_in_high_demand'></div>Limited Availability</div>";
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
