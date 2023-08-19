jQuery(document).ready(function ($) {

    $(".datepicker").each(function () {
        $(this).datepicker({
            dateFormat: "D d M, yy"
        });
    })

    $(window).on('beforeunload', function () {
        $('#start_date').val("");
        $('#end_date').val("");
        $('#price').val("");
        $('#single_price').val("");
        $('#tourstatus').val("");
    })

    const defaultValue = () => {
        $('#start_date').val("");
        $('#end_date').val("");
        $('#price').val("");
        $('#single_price').val("");
        $('#tourstatus').val('available');
    }

    $(document).on('click', '#move_up', function () {

        let row = $(this).closest('tr');

        let current_pos = row.find('.position').val();

        let perv_pos = row.prev().find('.position').val();

        if (row.index() > 0 && row.prev().index() != 0) {
            row.find('.position').val(Number(current_pos) - 1)
            row.prev().find('.position').val(Number(perv_pos) + 1)
            row.prev().before(row);
        }
    });

    $(document).on('click', '#move_down', function () {
        var row = $(this).closest('tr');

        let current_pos = row.find('.position').val();

        let perv_pos = row.next().find('.position').val();

        if (row.index() < $('table tbody tr').length) {
            row.find('.position').val(Number(current_pos) + 1)
            row.next().find('.position').val(Number(perv_pos) - 1)
            row.next().after(row);
        }
    });


    // Counter For Each Row ID; 
    let count = 0;

    let position;

    $('#add-row').click(function () {

        let error_tablename = '';
        let error_start_date = '';
        let error_end_date = '';
        let error_price = '';
        let error_single_price = '';

        let tablename = '';
        let start_date = '';
        let end_date = '';
        let price = '';
        let single_price = '';
        let show_price = '';
        let show_singleprice = '';
        let tour_status = $('#tourstatus').val();
        let show_tourstatus = $('#tourstatus option:selected').text();


        if ($('#tablename').val() == '') {
            error_tablename = 'Table Name is required.';
            $('#error_tablename').text(error_tablename);
            $('#tablename').css('border-color', '#cc0000');
            tablename = '';
        }
        else {
            error_tablename = '';
            $('#error_tablename').text(error_tablename);
            $('#tablename').css('border-color', '');
            tablename = $('#tablename').val();
        }
        if ($('#start_date').val() == '') {
            error_start_date = 'Start Date is required';
            $('#error_start_date').text(error_start_date);
            $('#start_date').css('border-color', '#cc0000');
            start_date = '';
        }
        else {
            error_start_date = '';
            $('#error_start_date').text(error_start_date);
            $('#start_date').css('border-color', '');
            start_date = $('#start_date').val();
        }
        if ($('#end_date').val() == '') {
            error_end_date = 'End Date is required.';
            $('#error_end_date').text(error_end_date);
            $('#end_date').css('border-color', '#cc0000');
            end_date = '';
        }
        else {
            error_end_date = '';
            $('#error_end_date').text(error_end_date);
            $('#end_date').css('border-color', '');
            end_date = $('#end_date').val();
        }
        if ($('#price').val() == '') {
            error_price = 'Price is required.';
            $('#error_price').text(error_price);
            $('#price').css('border-color', '#cc0000');
            price = '';
        }
        else {
            error_price = '';
            $('#error_price').text(error_price);
            $('#price').css('border-color', '');
            const num = parseInt($('#price').val());
            const format = num.toLocaleString();
            show_price = "€" + format + " EUR";
            price = $('#price').val();
        }
        if ($('#single_price').val() == '') {
            error_single_price = 'Single Price is required.';
            $('#error_single_price').text(error_single_price);
            $('#single_price').css('border-color', '#cc0000');
            single_price = '';
        }
        else {
            error_single_price = '';
            $('#error_single_price').text(error_single_price);
            $('#single_price').css('border-color', '');
            const num = parseInt($('#single_price').val());
            const format = num.toLocaleString();
            show_singleprice = "€" + format + " EUR";
            single_price = $('#single_price').val();
        }
        if (error_tablename != '' || error_start_date != '' || error_end_date != '' || error_price != '' || error_single_price != '') {
            return false;
        }
        else {
            if ($('#add-row').text() == 'Add Row') {
                $('.placeholder_row').remove();
                position = $('#new_table tbody tr').length;
                count = count + 1;
                output = '<tr id="row_' + count + '">';
                output += '<td class="move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></td>';
                output += '<td>' + start_date + ' <input type="hidden" name="hidden_start_date[]" id="start_date' + count + '" class="start_date" value="' + start_date + '" /></td>';
                output += '<td>' + end_date + ' <input type="hidden" name="hidden_end_date[]" id="end_date' + count + '" class="end_date" value="' + end_date + '" /></td>';
                output += '<td>' + show_price + ' <input type="hidden" name="hidden_price[]" id="price' + count + '" class="price" value="' + price + '" /></td>';
                output += '<td>' + show_singleprice + ' <input type="hidden" name="hidden_single_price[]" id="single_price' + count + '" class="single_price" value="' + single_price + '" /></td>';
                output += '<td>' + show_tourstatus + ' <input type="hidden" name="hidden_tour_status[]" id="tour_status' + count + '" class="tour_status" value="' + tour_status + '" /></td>';
                output += '<td><button type="button" name="edit_row" class="btn btn-info btn-xs edit-btn edit_row" id="' + count + '">Edit</button><button type="button" name="delete_row" class="btn btn-danger btn-xs delete-btn delete_row" id="' + count + '">Delete</button></td>';
                output += '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' + tablename + '" />';
                output += '<input type="hidden" name="hidden_position[]" id="position' + count + '" class="position" value="' + position + '" />';
                output += '</tr>';
                $('#new_table').append(output);
                defaultValue();
            }
            else {
                let row_id = $('#hidden_row_id').val();
                let position = $('#hidden_position').val();
                output = '<td class="move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></td>';
                output += '<td>' + start_date + ' <input type="hidden" name="hidden_start_date[]" id="start_date' + row_id + '" class="start_date" value="' + start_date + '" /></td>';
                output += '<td>' + end_date + ' <input type="hidden" name="hidden_end_date[]" id="end_date' + row_id + '" class="end_date" value="' + end_date + '" /></td>';
                output += '<td>' + show_price + ' <input type="hidden" name="hidden_price[]" id="price' + row_id + '" class="price" value="' + price + '" /></td>';
                output += '<td>' + show_singleprice + ' <input type="hidden" name="hidden_single_price[]" id="single_price' + row_id + '" class="single_price" value="' + single_price + '" /></td>';
                output += '<td>' + show_tourstatus + ' <input type="hidden" name="hidden_tour_status[]" id="tour_status' + row_id + '" class="tour_status" value="' + tour_status + '" /></td>';
                output += '<td><button type="button" name="edit_row" class="btn btn-info btn-xs edit-btn edit_row" id="' + row_id + '">Edit</button><button type="button" name="delete_row" class="btn btn-danger btn-xs delete-btn delete_row" id="' + row_id + '">Delete</button></td>';
                output += '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' + tablename + '" />';
                output += '<input type="hidden" name="hidden_position[]" id="position' + row_id + '" class="position" value="' + position + '" />';
                $('#row_' + row_id + '').html(output);
                $('#add-row').text('Add Row').removeClass('btn-info');
                $('.form-table-content').removeClass('form-table-edit');
                $('#cancel-edit').remove();
                $('.edit_row').attr('disabled', false);
                $('.delete_row').attr('disabled', false);
                defaultValue();
            }
        }
    });



    $(document).on('click', '.edit_row', function () {
        let row_id = $(this).attr("id");
        let start_date = $('#start_date' + row_id + '').val();
        let end_date = $('#end_date' + row_id + '').val();
        let position = $('#position' + row_id + '').val();
        let price = $('#price' + row_id + '').val();
        let single_price = $('#single_price' + row_id + '').val();
        // let formatPrice = price.replace(/€|,|EUR| /g, "");
        // let formatSinglePrice = single_price.replace(/€|,|EUR| /g, "");
        let tour_status = $('#tour_status' + row_id + '').val();
        // let status_tolowercase = tour_status.toLowerCase().replace(/\s/g, '');
        $('#start_date').val(start_date);
        $('#end_date').val(end_date);
        $('#price').val(price);
        $('#single_price').val(single_price);
        // $('#tourstatus').val(status_tolowercase);
        $('#tourstatus').val(tour_status);
        $('#hidden_row_id').val(row_id);
        $('#hidden_position').val(position);
        $('#add-row').text('Edit Row').addClass('btn-info');
        let cancelBtn = '<button id="cancel-edit" class="btn btn-danger" type="button" style="width: 120px; margin-left: 10px;">Cancel</button>';
        $('.add_row_btn').append(cancelBtn);
        $('.form-table-content').addClass('form-table-edit');
        $('.edit_row').attr('disabled', true);
        $('.delete_row').attr('disabled', true);
    });

    $(document).on('click', '#cancel-edit', function () {
        $('#add-row').text('Add Row').removeClass('btn-info');
        $('.form-table-content').removeClass('form-table-edit');
        $('#cancel-edit').remove();
        $('.edit_row').attr('disabled', false);
        $('.delete_row').attr('disabled', false);
        defaultValue();
    })

    $(document).on('click', '.delete_row', function () {
        var row_id = $(this).attr("id");

        let position = $(this).parents("tr").find('.position').val();

        let table_length = $('#new_table tbody tr').length - 1;

        let next_row = $(this).parents("tr").next();

        let current_row = $(this);

        $.confirm({
            title: 'Delete Row!',
            content: 'Are you sure you want delete this Row ?!',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Delete',
                    btnClass: 'btn-red',
                    action: function () {
                        if ($('#new_table tbody tr').length < 3) {
                            $('#new_table tbody').append("<tr class='placeholder_row'><td colspan='7' class='form_placeholder'>Table Rows Are Placed Here !</td></tr>")
                        }
                        if (table_length > 1 && next_row.length > 0) {
                            current_row.parents("tr").nextAll().each(function () {
                                let position_val = $(this).find('.position').val();
                                let new_position = position_val - 1;
                                $(this).find('.position').val(new_position);
                            });
                        }

                        $('#row_' + row_id + '').hide(500);
                        setTimeout(function () {
                            $('#row_' + row_id + '').remove();
                        }, 500)
                    }
                },
                close: function () {
                }
            }
        });

    });

    $('#table-form-php').on('submit', function (event) {
        event.preventDefault();
        let counter = 0
        $('.start_date').each(function () {
            counter = counter + 1;
        })
        if (counter > 0) {
            const form_data = $(this).serialize();

            $.confirm({
                title: 'Save',
                content: 'Are you sure want save this table ?<br>I suggest to you do more Edit on it',
                type: 'blue',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Save',
                        btnClass: 'btn-blue',
                        action: function () {
                            $('.overlay').css('display', 'flex')
                            $.ajax({
                                url: surfiranDatePrice.site_route + "/wp-json/dateandprice/v1/tables",
                                method: "POST",
                                data: form_data,
                                success: function (data) {


                                },
                                error: function (e) {
                                    console.log(e);
                                }
                            }).done(function () {
                                $('.overlay').css('display', 'none')
                                $.alert({
                                    'title': 'Congratulation',
                                    'content': 'Table Create Successfully. &#128578;',
                                    'type': 'green',
                                    buttons: {
                                        ok: function () {
                                            location.reload();
                                        }
                                    }
                                })
                            })
                        }
                    },
                    cansel: function () {
                    }
                }
            });

        } else {
            $.alert({
                'title': 'Not permitted',
                'content': 'At least Add One Row on Table',
                'type': 'orange',
                buttons: {
                    ok: function () {

                    }
                }
            })
        }
    });
});


