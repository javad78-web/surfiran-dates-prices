<?php

/*
  Plugin Name: Dates & Prices
  Version: 1.0
  Author: Miko | Email : mj.cloner@gmail.com
  Description: Table Maker For Surfiran Dates & Prices.
*/


if (!defined('ABSPATH')) exit;

// This is Just For Comment and git test 
class TourDate
{
    public $tables;
    public $tableName;
    public $charset;

    function __construct()
    {

        require_once plugin_dir_path(__FILE__) . 'inc/route-api.php';

        require_once plugin_dir_path(__FILE__) . 'inc/shortcodes.php';

        global $wpdb;
        $this->charset = $wpdb->get_charset_collate();
        $this->tables = $wpdb->prefix . "tables";
        $this->tableName = $wpdb->prefix . "tableName";
        add_action('init', [$this, 'loadFrontAssets']);
        add_action('init', [$this, 'loadGlobalAdminAssets']);
        add_action('activate_surfiran-tourdate/surfiran-tourdate.php', [$this, 'onActivate']);
        add_action('admin_menu', [$this, 'date_and_price_page']);
    }

    function loadFrontAssets()
    {
        if (!is_admin()) {
            wp_register_script('loadfrontScript', plugin_dir_url(__FILE__) . 'js/frontend.js', ['jquery']);
            wp_register_style('loadfrontStyle', plugin_dir_url(__FILE__) . 'css/frontend.css');
        }
    }

    function loadGlobalAdminAssets()
    {
        $mainpage_url = admin_url('admin.php?page=date-and-price');
        $subpage_url = admin_url('admin.php?page=add-new-table');

        $current = site_url() . $_SERVER['REQUEST_URI'];

        if (is_admin() && $current === $mainpage_url || $current === $subpage_url) {

            wp_enqueue_script('bootstrapcdnscriptMain', '//cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/js/bootstrap.min.js');
            // wp_enqueue_script('jqueryscriptMainlastver', plugin_dir_url(__FILE__) . 'js/jquery-3-7.js');
            wp_register_script('jqueryuiscriptMain', plugin_dir_url(__FILE__) . 'js/datepicker.js');
            wp_register_script('jqueryuithemescriptMain', plugin_dir_url(__FILE__) . 'js/jquery-ui.js', ['jquery']);
            wp_register_script('jqueryconfirmscript', plugin_dir_url(__FILE__) . 'js/jquery-confirm.js', ['jquery']);

            wp_enqueue_style('bootstrapcdnstyleMain', '//cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/css/bootstrap.min.css');
            wp_enqueue_style('jqueryuistyleMain', '//cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.css');
            wp_enqueue_style('jqueryuithemestyleMain', '//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css');
            wp_enqueue_style('jqueryConfirmStyle', plugin_dir_url(__FILE__) . 'css/jquery-confirm.css');
        }
    }

    function onActivate()
    {
        global $wpdb;
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        $wpdb->query("CREATE TABLE $this->tables (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            startdate varchar(60) NOT NULL DEFAULT '',
            enddate varchar(60) NOT NULL DEFAULT '',
            price varchar(60) NOT NULL DEFAULT '',
            singleprice varchar(60)  NOT NULL DEFAULT '',
            tourstatus varchar(60) NOT NULL DEFAULT '',
            tablename varchar(60) NOT NULL DEFAULT '',
            position bigint(20) NOT NULL DEFAULT 0,
            PRIMARY KEY  (id)
          ) $this->charset;");
    }
    function date_and_price_page()
    {
        $main_page = add_menu_page(
            'Date & Price',
            'Date & Price',
            'manage_options',
            'date-and-price',
            [$this, 'date_and_price_callback'],
            'dashicons-calendar-alt',
        );
        add_submenu_page(
            'date-and-price',
            'Date & Price',
            'All Tables',
            'manage_options',
            'date-and-price',
            [$this, 'date_and_price_callback'],
        );
        $add_new_page = add_submenu_page(
            'date-and-price',
            'Add New Table',
            'Add New Table',
            'manage_options',
            'add-new-table',
            [$this, 'add_new_table_callback'],
        );
        add_action("load-{$main_page}", [$this, 'load_main_scripts']);
        add_action("load-{$add_new_page}", [$this, 'load_sub_scripts']);
    }


    function view_table_callback()
    {
        require_once plugin_dir_path(__FILE__) . 'inc/view-table.php';
    }
    function add_new_table_callback()
    {
        require_once plugin_dir_path(__FILE__) . 'inc/add-table.php';
    }

    function date_and_price_callback()
    {
        require_once plugin_dir_path(__FILE__) . 'inc/main-page.php';
    }

    function load_main_scripts()
    {
        wp_enqueue_script('jqueryuiscriptMain');
        wp_enqueue_script('jqueryuithemescriptMain');
        wp_enqueue_script('jqueryconfirmscript');
        wp_enqueue_style('mainstyle', plugin_dir_url(__FILE__) . 'css/main.css');
        wp_enqueue_style('wp-editor');

        add_filter('mce_buttons', [$this, 'customize_editor_toolbar']);
        // add_filter('mce_buttons_2', [$this, 'customize_tinymce_init']);

        wp_enqueue_style('custom-editor-styles', plugin_dir_url(__FILE__) . 'css/custom-editor-styles.css');
        wp_enqueue_script('mainscript', plugin_dir_url(__FILE__) . 'js/index.js', ['jqueryuiscriptMain']);
        wp_enqueue_script('wp-editor');
        wp_enqueue_script('wp-hooks');
        wp_enqueue_script('wp-word-count');
        wp_localize_script('mainscript', 'surfiranDatePrice', [
            'site_route' => site_url()
        ]);
    }

    // Customize the TinyMCE initialization settings
    // function customize_tinymce_init($buttons)
    // {
    //     // var_dump($buttons);
    //     // Remove the full-screen tool from the toolbar
    //     $fullscreen_key = array_search('fullscreen', $buttons);
    //     var_dump($fullscreen_key);
    //     // if ($fullscreen_key !== false) {
    //     //     unset($buttons[$fullscreen_key]);
    //     // }
    //     // return $buttons;
    // }
    function customize_editor_toolbar($buttons)
    {
        // Add font size selector to the toolbar
        $buttons[] = 'fontsizeselect';
        return $buttons;
    }

    function load_sub_scripts()
    {
        wp_enqueue_script('jqueryuiscriptMain');
        wp_enqueue_script('jqueryuithemescriptMain');
        wp_enqueue_script('jqueryconfirmscript');
        wp_enqueue_script('subscript', plugin_dir_url(__FILE__) . 'js/sub-index.js');
        wp_enqueue_style('substyle', plugin_dir_url(__FILE__) . 'css/sub-main.css');
        wp_localize_script('subscript', 'surfiranDatePrice', [
            'site_route' => site_url()
        ]);
    }
}

$date_and_price = new TourDate();
