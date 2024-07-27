<?php

add_action('rest_api_init', function () {

    register_rest_route('dateandprice/v1', 'tables/prices', [
        'methods' => WP_REST_SERVER::ALLMETHODS,
        'callback' => 'tour_prices_api_callback'
    ]);

    register_rest_route('dateandprice/v1', 'update_note', [
        'methods' => 'put',
        'callback' => 'update_note'
    ]);

    register_rest_route('dateandprice/v1', 'p_link', [
        'methods' => 'get',
        'callback' => 'get_page_links'
    ]);

    register_rest_route('dateandprice/v1', 'tables/update', [
        'methods' => 'put',
        'callback' => 'update_surfiran_api_callback'
    ]);

    // /(?P<id>\d+)
    register_rest_route('dateandprice/v1', 'tables/delete', [
        'methods' => 'delete',
        'callback' => 'delete_surfiran_api_callback'
    ]);

    register_rest_route('dateandprice/v1', 'tables', [
        'methods' => 'get',
        'callback' => 'get_surfiran_api_callback'
    ]);

    register_rest_route('dateandprice/v1', 'tables', [
        'methods' => 'post',
        'callback' => 'post_surfiran_api_callback'
    ]);
});


function tour_prices_api_callback($data)
{
    global $wpdb;
    $tablename = $wpdb->prefix . "tables";
    $getParams = $data->get_params();

    parse_str($getParams["form_data"], $params);

    $tourPrice = isset($params["tour_price"]) ? $params["tour_price"] : "";
    $saleTourPrice = isset($params["sale_tour_price"]) ? $params["sale_tour_price"] : "";
    $currentTableName = isset($getParams["tablename"]) ? $getParams["tablename"] :  "";

    $args = array(
        'tourprice' => $tourPrice,
        'saletourprice' => $saleTourPrice,
    );

    $where = array(
        'tablename' => $currentTableName,
    );

    $sql = $wpdb->prepare("UPDATE $tablename SET tourprice = %s, saletourprice = %s WHERE tablename = %s LIMIT 1", $args['tourprice'], $args['saletourprice'], $where['tablename']);

    $wpdb->query($sql);

    return "Price Updated";
}

function get_page_links($data)
{
    global $wpdb;
    $tablename = $wpdb->prefix . "posts";
    $params = $data->get_params();

    $page_link = isset($params["page_link"]) ? sanitize_text_field($params["page_link"]) : "";

    if (!empty($page_link)) {
        $get_pages = $wpdb->get_results("SELECT post_title , guid FROM $tablename WHERE post_title LIKE '%$page_link%' AND post_type = 'page' AND (guid IS NOT NULL AND guid <> '') AND post_status = 'publish' LIMIT 10");

        $result = [];

        if (isset($get_pages) && !empty($get_pages)) {
            foreach ($get_pages as $page) {
                $arr_page = get_object_vars($page);
                $result[] = [
                    "title" => $arr_page["post_title"],
                    "link" => $arr_page["guid"]
                ];
            }
        }

        return $result;
    }
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
        $sale_price = sanitize_text_field($params['saleprice'][$i]);
        $tour_status = sanitize_text_field($params['tourstatus'][$i]);
        $form_tablename = sanitize_text_field($params['hidden_tablename'][$i]);
        $position = sanitize_text_field($params['hidden_position'][$i]);

        $args = [
            'startdate'     =>  $start_date,
            'enddate'       =>  $end_date,
            'price'         =>  $price,
            'singleprice'   =>  $single_price,
            'sale_price'    =>  $sale_price,
            'tourstatus'    =>  $tour_status,
            'tablename'     =>  $form_tablename,
            'position'      =>  $position,
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

        $table_id = $params['table_id'];

        $query = "SELECT * FROM $tablename WHERE tablename= %s ORDER BY position ASC";

        $prepare = $wpdb->prepare($query, $table_id);
    } elseif (isset($params['row_id'])) {

        $row_id = $params['row_id'];

        $query = "SELECT date_note FROM $tablename WHERE id= %d";

        $prepare = $wpdb->prepare($query, $row_id);
    } else {

        $query = "SELECT * FROM $tablename";

        $prepare = $query;
    }

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
        $tour_status = (sanitize_text_field($params['hidden_tour_status'][$i]));
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

function update_note($data)
{
    $params = $data->get_params();
    global $wpdb;
    $tablename = $wpdb->prefix . "tables";

    $row_id = sanitize_text_field($params['row_id']);
    $name = sanitize_text_field($params['name']);
    $imgSrc = sanitize_text_field($params['img_src']);
    $skills = sanitize_text_field($params['skills']);
    $page_link = sanitize_text_field($params['page']['link']);
    $page_title = sanitize_text_field($params['page']['title']);

    $note_data = [
        "name" => $name,
        "img_src" => $imgSrc,
        "skills" => $skills,
        "page" => [
            "link" => $page_link,
            "title" => $page_title,
        ]
    ];

    $args = [
        'date_note' => json_encode($note_data),
    ];

    if (!empty($row_id) || isset($row_id)) {
        $wpdb->update($tablename, $args, ['id' => $row_id]);
    }

    return true;
}
