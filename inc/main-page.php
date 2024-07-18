<?php

global $wpdb;

$tablename = $wpdb->prefix . 'tables';

$query = "SELECT tablename FROM $tablename";


$result = $wpdb->get_results($wpdb->prepare($query));

// var_dump($result);
$tablename = array_map(function ($obj) {
    return $obj->tablename;
}, $result);

$exist_tables = array_unique($tablename);

?>



<div class="container-main">
    <h1>Date & Price</h1>
    <div class="tables">
        <h2>Tables</h2>
        <div class="btn-container-main">
            <a class="btn-main" href="<?php echo admin_url('admin.php?page=add-new-table') ?>">Add New Table</a>
        </div>
    </div>
    <?php if (empty($exist_tables)) { ?>
        <div class="notable_text">Add New Table By Click On Button Add New Table On Above Of This.</div>
    <?php
    } else { ?>
        <div class="tables-list">
            <div class="header-list">
                <div class="name">Table Name</div>
                <div class="options">Options</div>
                <div class="options">ShortCode</div>
            </div>
            <div class="body-list">
                <?php
                foreach ($exist_tables as $tablename) { ?>
                    <?php if (!empty($tablename)) { ?>
                        <div class="item-list">
                            <div class="table_name"><?php echo $tablename; ?></div>
                            <div class="edit">
                                <button id="<?php echo $tablename; ?>" class="btn-edit">View & Edit</button>
                                <button id="<?php echo $tablename; ?>" class="btn btn-danger delete_table">Delete Table</button>
                            </div>
                            <div class="shortcode"><?php echo "[" . strtolower(str_replace([',', '_', '-', " "], '', $tablename)) . " table='" . $tablename . "']"; ?></div>
                        </div>
            <?php }
                }
            } ?>

            </div>
        </div>
</div>
<div class="view_and_edit_container">
    <div class="view_and_edit">
        <div class="note_load_overlay">
            <div class="spinner_local">
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        </div>
        <div class="header-container">
            <div class="close-modal">
                <span class="dashicons dashicons-no close-btn"></span>
            </div>
        </div>
        <div class="body-container">
            <div class="body-header-container">
                <div class="title"></div>
                <div class="tour_price_container">
                    <div class="header_tour_price">
                        <h3>Add Prices For Tour</h3>
                        <small>The prices are shown only on the tour link everywhere it is used on the site, not on the table.</small>
                    </div>
                    <div class="body_tour_price">
                        <form class="tour_price_form" id="toure_price_form" method="POST">
                            <input type="text" name="tour_price" placeholder="Tour Price">
                            <input type="text" name="sale_tour_price" placeholder="Sale Tour Price">
                            <button type="submit" class="btn btn-dark">Save Prices</button>
                        </form>
                    </div>
                </div>
                <div class="desc__for_edit">
                    <!>Warning: Make sure to save and update the table after any changes in the table by clicking the <u>Save Changes</u> button.<!>
                </div>
            </div>
            <div class="body-content-container">
                <form class="form-container" method="POST" id="table-form-php">
                    <?php wp_nonce_field('wp_rest') ?>
                    <div class="table-container" id="edit_table">

                        <div class="table-header-container">
                            <div class="table-header-item"></div>
                            <div class="table-header-item">Start Date</div>
                            <div class="table-header-item">End Date</div>
                            <div class="table-header-item">Price</div>
                            <div class="table-header-item">Single Price</div>
                            <div class="table-header-item">Sale Price</div>
                            <div class="table-header-item">Tour Status</div>
                            <div class="table-header-item">Options</div>
                        </div>
                        <div class="table-body-container">
                            <div class="main_overlay">
                                <div class="spinner_local">
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="submit-form-btn">
                        <button class="btn btn-primary submit-form" type="submit">Save Changes</button>
                        <button class="btn btn-success add-row" type="button">Add Row</button>
                    </div>
                </form>
                <div class="note_popup_container">
                    <div class="note_popup">
                        <div class="header_note_popup">
                            <div class="_title">Add Tour Guide</div>
                            <div class="close_note_popup">
                                <span class="dashicons dashicons-no"></span>
                            </div>
                        </div>
                        <div class="main_note_popup">
                            <div class="guide_image">
                                <img class="blank-image" src="<?= plugins_url("css/icon/B-img.webp", dirname(__FILE__)) ?>" alt="Blank Image" width="100px" height="100px">
                                <button class="btn btn-primary choose-image">Choose Image</button>
                            </div>
                            <div class="guide_details">
                                <label>Guide Skills</label>
                                <input type="text" class="guide-skills" placeholder="Proficiency">
                                <div class="warning"></div>
                                <div class="input-help">Enter the Skills, separating them with commas</div>
                            </div>
                            <div class="page_search">
                                <label>Search in Pages</label>
                                <input type="text" class="link-search" placeholder="Search for a Link">
                                <div class="input-help">If the page is not found, it is not published.</div>
                                <div class="selected_page"></div>
                            </div>
                            <div class="page_result">
                                <div class="search_link_result"></div>
                            </div>
                        </div>
                        <div class="footer_note_popup">
                            <button class="btn btn-success submit-note" type="submit">Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- global $editor_value; -->
<!-- wp_editor($editor_value, 'note-content', []); -->