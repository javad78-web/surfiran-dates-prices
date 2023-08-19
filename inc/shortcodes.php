<?php

function exists_tables()
{

    global $wpdb;

    $tablename = $wpdb->prefix . 'tables';

    $query = "SELECT tablename FROM $tablename";

    $result = $wpdb->get_results($wpdb->prepare($query));

    // var_dump($result);
    $tablename = array_map(function ($obj) {
        return $obj->tablename;
    }, $result);

    $exist_tables = array_unique($tablename);

    $formated_tablename = array_map(function ($obj) {
        return strtolower(str_replace([',', '_', '-', " "], "", $obj));
    }, $exist_tables);

    return $formated_tablename;
}

foreach (exists_tables() as $tablename) {
    add_shortcode($tablename, 'tablename_callback');
};

function tablename_callback($attr)
{

    wp_enqueue_style('loadfrontStyle');

    wp_enqueue_script('loadfrontScript');

    return shortcodefunction($attr);
}


function shortcodefunction($attributes)
{

    global $form_tablename;

    global $wpdb;

    $tablename = $wpdb->prefix . "tables";

    if (isset($attributes['table'])) {
        foreach ($attributes as $attr) {
            $form_tablename = sanitize_text_field($attr);
        }
    };

    $query = "SELECT * FROM $tablename WHERE tablename= '$form_tablename' ORDER BY position ASC";

    $prepare = $wpdb->prepare($query);

    $result = $wpdb->get_results($prepare);

    return frontEndShortCode($result);
}

function frontEndShortCode($result)
{
    ob_start();
    require_once plugin_dir_path(__FILE__) . 'frontHTML.php';
    return ob_get_clean();
}
