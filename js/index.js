jQuery(document).ready(function ($) {

    $(document).on('click', '#move_up', function () {
        let row = $(this).closest('.table-row');
        let current_pos = row.find('.position').val();
        let perv_pos = row.prev().find('.position').val();

        if (row.index() > 0 && row.prev().index() != -1) {
            row.find('.position').val(Number(current_pos) - 1)
            row.prev().find('.position').val(Number(perv_pos) + 1)
            row.prev().before(row);
        }
    });

    $(document).on('click', '#move_down', function () {

        var row = $(this).closest('.table-row');
        let current_pos = row.find('.position').val();
        let perv_pos = row.next().find('.position').val();

        if (row.index() < $('.table-body-container .table-row').length) {
            row.find('.position').val(Number(current_pos) + 1)
            row.next().find('.position').val(Number(perv_pos) - 1)
            row.next().after(row);
        }
    });


    $('.delete_table').on('click', function () {
        let delete_table = $(this).attr('id');

        $.confirm({
            title: 'Delete Table!',
            content: 'Are you sure you want delete this table ?!',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Delete',
                    btnClass: 'btn-red',
                    action: function () {
                        $.ajax({
                            url: surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/tables/delete?tablename=${delete_table}`,
                            method: "delete",
                            success: function () {

                                $.alert({
                                    'title': 'Delete',
                                    'content': `Table ${delete_table} Successfully Deleted.`,
                                    'type': 'green',
                                    buttons: {
                                        ok: function () {
                                            location.reload();

                                        }
                                    }
                                })
                            },
                            error: function (er) {
                                console.log(er);
                            }
                        })
                    }
                },
                close: function () {
                }
            }
        });
    })

    let tablename_new;

    $(document).on('click', '.delete_row', function (event) {
        let row_id = $(this).attr('id');
        let row = $(this).parents(".table-row");
        let table_length = $('.table-body-container .table-row').length;
        let next_row = row.next();

        let new_length = $('.table-body-container .table-row[style*="border: 2px solid red"]').length;

        let old_length = $('.table-body-container .table-row[style*="border: 1px solid #c5c5c5"]').length;

        // console.log("old " + old_length);
        // console.log("new " + new_length);

        if (row_id) {

            if (old_length == 1 && table_length == 1) {
                return $.alert({
                    'title': 'Not permitted',
                    'content': 'This is the only row in the table! If you want to delete the table, please use the delete option on the main page.',
                    'type': 'orange',
                    buttons: {
                        ok: function () {

                        }
                    }
                })
            }

            if (old_length == 1 && new_length > 0) {
                return $.alert({
                    'title': 'Not permitted',
                    'content': 'You cannot delete this row! Please save the changes first, and then proceed with deleting this row.',
                    'type': 'orange',
                    buttons: {
                        ok: function () {

                        }
                    }
                })
            }

            $.confirm({
                title: 'Delete Row!',
                content: `Are you sure you want delete this row ?! <br> Make Sure Click on Save Change After Delete This.`,
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Delete',
                        btnClass: 'btn-red',
                        action: function () {
                            if (table_length > 1 && next_row.length > 0) {
                                row.nextAll().each(function () {
                                    let position_val = $(this).find('.position').val();
                                    let new_position = position_val - 1;
                                    $(this).find('.position').val(new_position);
                                    console.log(new_position);
                                });
                            }

                            setTimeout(function () {
                                $.ajax({
                                    url: surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/tables/delete?id=${row_id}`,
                                    method: "delete",
                                    error: function (er) {
                                        console.log(er);
                                    }
                                })

                                row.remove();
                            }, 1000)

                            row.fadeOut("slow");
                        }
                    },
                    close: function () {
                    }
                }
            });

        } else {
            $.confirm({
                title: 'Delete Row!',
                content: 'Are you sure you want delete this row ?!',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Delete',
                        btnClass: 'btn-red',
                        action: function () {
                            let table_length = $('.table-body-container .table-row').length;

                            let next_row = row.next();

                            if (table_length > 1 && next_row.length > 0) {
                                row.nextAll().each(function () {
                                    let position_val = $(this).find('.position').val();
                                    let new_position = position_val - 1;
                                    $(this).find('.position').val(new_position);
                                });
                            }
                            row.fadeOut("slow");
                            setTimeout(() => {
                                row.remove();
                            }, 1000)
                        }
                    },
                    close: function () {
                    }
                }
            });

        }
    });


    let new_rowid = 0;

    $('.add-row').click(function () {



        new_rowid = new_rowid + 1;

        position_new = $('.table-body-container .table-row').length + 1;

        output = '<div class="table-row" id="' + new_rowid + '" style="border: 2px solid red;">';
        output += '<div class="table-body-item move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></div>';
        output += '<div class="table-body-item"><input type="text" name="startdate[]" id="start_date' + new_rowid + '" class="datepicker" /></div>';
        output += '<div class="table-body-item"><input type="text" name="enddate[]" id="end_date' + new_rowid + '" class="datepicker" /></div>';
        output += '<div class="table-body-item"><input type="text" name="price[]" id="price" class="price" /></div>';
        output += '<div class="table-body-item"><input type="text" name="singleprice[]" id="single_price" class="single_price" /></div>';
        output += `<div class="table-body-item">
        <select name="tourstatus[]" id="tour_status" class="tour_status">
        <option value="available">Available</option>
        <option value="guaranteed">Guaranteed</option>
        <option value="fillingfast">Filling Fast</option>
        <option value="almostsoldout">Almost Sold Out</option>
        <option value="soldout">Sold Out</option>
        </select>
        </div>`;
        output += '<div class="table-body-item" style="text-align: center;"><button type="button" name="delete_row" class="btn btn-danger btn-xs delete-btn delete_row" id="">Delete</button></div>';
        output += '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' + tablename_new + '" />';
        output += '<input type="hidden" name="hidden_position[]" id="position" class="position" value="' + position_new + '" />';
        output += '</div>';

        $('#edit_table .table-body-container').append(output);

        let new_length = $('.table-body-container .table-row').length;

        let new_hieght = $('.table-body-container .table-row').innerHeight() * new_length;

        $('.table-body-container').scrollTop($('.table-body-container').scrollTop() + new_hieght);

        $('.datepicker').each(function () {
            $(this).datepicker({
                dateFormat: "D d M, yy"
            });
        });
    });

    $('.btn-edit').click(function () {

        const id = $(this).attr('id');
        $('.main_overlay').css('display' , 'flex');
        $.ajax({
            url: surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/tables?table_id=${id}`,
            method: "GET",
            success: function (data) {
                data.map((row) => {

                    tablename_new = row.tablename;

                    let price = row.price.replace(/€|EUR|,|\s/g, "");

                    let singleprice = row.singleprice.replace(/€|EUR|,|\s/g, "");

                    let status = row.tourstatus.toLowerCase();

                    let format_status = status.replace(" ", "");

                    output = '<div class="table-row" style="border: 1px solid #c5c5c5;" id="row_' + row.id + '">';
                    output += '<div class="table-body-item move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></div>';
                    output += '<div class="table-body-item"><input type="text" name="startdate[]" id="start_date' + row.id + '" class="datepicker" value="' + row.startdate + '" /></div>';
                    output += '<div class="table-body-item"><input type="text" name="enddate[]" id="end_date' + row.id + '" class="datepicker" value="' + row.enddate + '" /></div>';
                    output += '<div class="table-body-item"><input type="text" name="price[]" id="price' + row.id + '" class="price" value="' + price + '" /></div>';
                    output += '<div class="table-body-item"><input type="text" name="singleprice[]" id="single_price' + row.id + '" class="single_price" value="' + singleprice + '" /></div>';
                    output += `<div class="table-body-item">
                    <select name="tourstatus[]" id="tour_status${row.id}" class="tour_status">
                    <option value="available" ${format_status === "available" ? "selected" : ""}>Available</option>
                    <option value="guaranteed" ${format_status === "guaranteed" ? "selected" : ""}>Guaranteed</option>
                    <option value="fillingfast" ${format_status === "fillingfast" ? "selected" : ""}>Filling Fast</option>
                    <option value="almostsoldout" ${format_status === "almostsoldout" ? "selected" : ""}>Almost Sold Out</option>
                    <option value="soldout" ${format_status === "soldout" ? "selected" : ""}>Sold Out</option>
                    </select>
                    </div>`;
                    output += '<div class="table-body-item" style="text-align: center;"><button type="button" name="delete_row" class="btn btn-danger btn-xs delete-btn delete_row" id="' + row.id + '">Delete</button></div>';
                    output += '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' + row.tablename + '" />';
                    output += '<input type="hidden" name="hidden_position[]" id="position' + row.id + '" class="position" value="' + row.position + '" />';
                    output += '<input type="hidden" name="hidden_id[]" id="row_id" value="' + row.id + '" />';
                    output += '</div>';

                    $('#edit_table .table-body-container').append(output);


                    $('.datepicker').each(function () {
                        $(this).datepicker({
                            dateFormat: "D d M, yy"
                        });
                    });

                })
            },
            error: function (e) {
                console.log(e);
            }
        }).done(function () {
            $('.main_overlay').css('display' , 'none');
        })



        $('.view_and_edit').fadeIn();
        $('.view_and_edit').css('display', 'flex');
        $('body').css('overflow', 'hidden');
        $('.view_and_edit .body-container .body-header-container .title').text(`Edit Table ${id}`);

    })

    $('.close-btn').click(function closeModal() {
        $('.view_and_edit').fadeOut("Fast");
        $('body').css('overflow', 'auto');
        setTimeout(function () {
            output =
                `<div class="table-header-container">
            <div class="table-header-item" style="margin-left: -6% ;"></div>
            <div class="table-header-item">Start Date</div>
            <div class="table-header-item">End Date</div>
            <div class="table-header-item">Price</div>
            <div class="table-header-item">Single Price</div>
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
        </div> `
            $('#edit_table').html(output);
        }, 500)

    })

    $(document).on('submit', '#table-form-php', function (event) {

        event.preventDefault();
        form_data = $(this).serialize();
        $.alert({
            'title': 'Updated',
            'content': 'Table Updated Successfully &#128578;',
            'type': 'green',
            buttons: {
                ok: function () {
                    $.ajax({
                        url: surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/tables/update`,
                        method: "PUT",
                        data: form_data,
                        success: function (data) {
                            console.log("UPDATED");
                        },
                        error: function (err) {
                            console.log(err.responseText);
                        }
                    })
                    $('.view_and_edit').fadeOut("Fast");
                    setTimeout(function () {
                        output =
                            `<div class="table-header-container">
                            <div class="table-header-item" style="margin-left: -6% ;"></div>
                            <div class="table-header-item">Start Date</div>
                            <div class="table-header-item">End Date</div>
                            <div class="table-header-item">Price</div>
                            <div class="table-header-item">Single Price</div>
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
                        </div> `
                        $('#edit_table').html(output);
                    }, 500)
                }
            }
        })
    })
})