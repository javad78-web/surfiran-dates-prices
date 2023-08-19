<?php

add_action('rest_api_init', 'get_date_surfiran_api');
add_action('rest_api_init', 'post_date_surfiran_api');
add_action('rest_api_init', 'delete_date_surfiran_api');
add_action('rest_api_init', 'update_date_surfiran_api');


function update_date_surfiran_api()
{
    register_rest_route('dateandprice/v1', 'tables/update', [
        'methods' => 'put',
        'callback' => 'update_surfiran_api_callback'
    ]);
}
function delete_date_surfiran_api()
{
    // /(?P<id>\d+)
    register_rest_route('dateandprice/v1', 'tables/delete', [
        'methods' => 'delete',
        'callback' => 'delete_surfiran_api_callback'
    ]);
}
function get_date_surfiran_api()
{
    register_rest_route('dateandprice/v1', 'tables', [
        'methods' => 'get',
        'callback' => 'get_surfiran_api_callback'
    ]);
}
function post_date_surfiran_api()
{
    register_rest_route('dateandprice/v1', 'tables', [
        'methods' => 'post',
        'callback' => 'post_surfiran_api_callback'
    ]);
}

function update_surfiran_api_callback($data)
{
    $params = $data->get_params();
    global $wpdb;
    $tablename = $wpdb->prefix . "tables";

    $row_count = count($params['hidden_tablename']);


    for ($i = 0; $i < $row_count; $i++) {

        global $id;

        if (isset($params['hidden_id'][$i])) {
            $id = $params['hidden_id'][$i];
        } else {
            unset($id);
        }

        $start_date = sanitize_text_field($params['startdate'][$i]);
        $end_date = sanitize_text_field($params['enddate'][$i]);
        $price = sanitize_text_field($params['price'][$i]);
        $single_price = sanitize_text_field($params['singleprice'][$i]);
        $tour_status = sanitize_text_field($params['tourstatus'][$i]);
        $form_tablename = sanitize_text_field($params['hidden_tablename'][$i]);
        $position = sanitize_text_field($params['hidden_position'][$i]);


        $args = [
            'startdate'     =>  $start_date,
            'enddate'       =>  $end_date,
            'price'         =>  $price,
            'singleprice'   =>  $single_price,
            'tourstatus'    =>  $tour_status,
            'tablename'     =>  $form_tablename,
            'position'      =>  $position
        ];

        if (empty($id) || !isset($id)) {
            $wpdb->insert($tablename, $args);
        } else {

            $wpdb->update($tablename, $args, ['id' => $id]);
        }
    }

    return "Update Success";
}
function delete_surfiran_api_callback($data)
{
    global $wpdb;

    $tablename = $wpdb->prefix . "tables";

    $params = $data->get_params();

    global $row_id;

    global $table_name_delete;

    if (isset($params['id'])) {
        $row_id = sanitize_text_field($params['id']);
    } else {
        unset($row_id);
    }

    if (isset($params['tablename'])) {
        $table_name_delete = sanitize_text_field($params['tablename']);
    } else {
        unset($table_name_delete);
    }



    if (empty($row_id) || !isset($row_id)) {
        $query = "DELETE FROM $tablename WHERE tablename= '$table_name_delete'";

        $prepare = $wpdb->prepare($query);

        $delete = $wpdb->query($prepare);

        return $delete;
    } else {
        $query = "DELETE FROM $tablename WHERE id= '$row_id'";

        $prepare = $wpdb->prepare($query);

        $delete = $wpdb->query($prepare);

        return $delete;
    }
}
function get_surfiran_api_callback($data)
{
    global $wpdb;
    $tablename = $wpdb->prefix . "tables";
    $params = $data->get_params();

    if (isset($params['table_id'])) {

        $table_id = sanitize_text_field($params['table_id']);

        $query = "SELECT * FROM $tablename WHERE tablename= '$table_id' ORDER BY position ASC";
    } else {
        $query = "SELECT * FROM $tablename";
    }

    $prepare = $wpdb->prepare($query);

    $result = $wpdb->get_results($prepare);

    return $result;
}

function post_surfiran_api_callback($data)
{
    global $wpdb;
    $tablename = $wpdb->prefix . 'tables';
    $params = $data->get_params();

    $row_count = count($params['hidden_tablename']);

    for ($i = 0; $i < $row_count; $i++) {

        $start_date = sanitize_text_field($params['hidden_start_date'][$i]);
        $end_date = sanitize_text_field($params['hidden_end_date'][$i]);
        $price = sanitize_text_field($params['hidden_price'][$i]);
        $single_price = sanitize_text_field($params['hidden_single_price'][$i]);
        $tour_status = sanitize_text_field($params['hidden_tour_status'][$i]);
        $form_tablename = sanitize_text_field($params['hidden_tablename'][$i]);
        $position = sanitize_text_field($params['hidden_position'][$i]);


        $args = [
            'startdate'     =>  $start_date,
            'enddate'       =>  $end_date,
            'price'         =>  $price,
            'singleprice'   =>  $single_price,
            'tourstatus'    =>  $tour_status,
            'tablename'     =>  $form_tablename,
            'position'      =>  $position
        ];

        $wpdb->insert($tablename, $args);
    }

    return "Success";
}
