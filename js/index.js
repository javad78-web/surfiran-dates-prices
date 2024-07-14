jQuery(document).ready(function ($) {
  $(document).on("click", "#move_up", function () {
    let row = $(this).closest(".table-row");
    let current_pos = row.find(".position").val();
    let perv_pos = row.prev().find(".position").val();

    if (row.index() > 0 && row.prev().index() != -1) {
      row.find(".position").val(Number(current_pos) - 1);
      row
        .prev()
        .find(".position")
        .val(Number(perv_pos) + 1);
      row.prev().before(row);
    }
  });

  $(document).on("click", "#move_down", function () {
    let row = $(this).closest(".table-row");
    let current_pos = row.find(".position").val();
    let perv_pos = row.next().find(".position").val();

    if (row.index() < $(".table-body-container .table-row").length) {
      row.find(".position").val(Number(current_pos) + 1);
      row
        .next()
        .find(".position")
        .val(Number(perv_pos) - 1);
      row.next().after(row);
    }
  });

  $(".delete_table").on("click", function () {
    let delete_table = $(this).attr("id");

    $.confirm({
      title: "Delete Table!",
      content: "Are you sure you want delete this table ?!",
      type: "red",
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: "Delete",
          btnClass: "btn-red",
          action: function () {
            $.ajax({
              url:
                surfiranDatePrice.site_route +
                `/wp-json/dateandprice/v1/tables/delete?tablename=${delete_table}`,
              method: "delete",
              success: function () {
                $.alert({
                  title: "Delete",
                  content: `Table ${delete_table} Successfully Deleted.`,
                  type: "green",
                  buttons: {
                    ok: function () {
                      location.reload();
                    },
                  },
                });
              },
              error: function (er) {
                console.log(er);
              },
            });
          },
        },
        close: function () {},
      },
    });
  });

  let tablename_new;

  $(document).on("click", ".delete_row", function (event) {
    let row_id = $(this).attr("id");
    let row = $(this).parents(".table-row");
    let table_length = $(".table-body-container .table-row").length;
    let next_row = row.next();

    let new_length = $(
      '.table-body-container .table-row[style*="border: 2px solid red"]'
    ).length;

    let old_length = $(
      '.table-body-container .table-row[style*="border: 1px solid #c5c5c5"]'
    ).length;

    console.log(row_id);

    if (row_id) {
      if (old_length == 1 && table_length == 1) {
        return $.alert({
          title: "Not permitted",
          content:
            "This is the only row in the table! If you want to delete the table, please use the delete option on the main page.",
          type: "orange",
          buttons: {
            ok: function () {},
          },
        });
      }

      if (old_length == 1 && new_length > 0) {
        return $.alert({
          title: "Not permitted",
          content:
            "You cannot delete this row! Please save the changes first, and then proceed with deleting this row.",
          type: "orange",
          buttons: {
            ok: function () {},
          },
        });
      }

      $.confirm({
        title: "Delete Row!",
        content: `Are you sure you want delete this row ?! <br> Make Sure Click on Save Change After Delete This.`,
        type: "red",
        typeAnimated: true,
        buttons: {
          tryAgain: {
            text: "Delete",
            btnClass: "btn-red",
            action: function () {
              if (table_length > 1 && next_row.length > 0) {
                row.nextAll().each(function () {
                  let position_val = $(this).find(".position").val();
                  let new_position = position_val - 1;
                  $(this).find(".position").val(new_position);
                  console.log(new_position);
                });
              }

              setTimeout(function () {
                $.ajax({
                  url:
                    surfiranDatePrice.site_route +
                    `/wp-json/dateandprice/v1/tables/delete?id=${row_id}`,
                  method: "delete",
                  error: function (er) {
                    console.log(er);
                  },
                });

                row.remove();
              }, 1000);

              row.fadeOut("slow");
            },
          },
          close: function () {},
        },
      });
    } else {
      $.confirm({
        title: "Delete Row!",
        content: "Are you sure you want delete this row ?!",
        type: "red",
        typeAnimated: true,
        buttons: {
          tryAgain: {
            text: "Delete",
            btnClass: "btn-red",
            action: function () {
              let table_length = $(".table-body-container .table-row").length;

              let next_row = row.next();

              if (table_length > 1 && next_row.length > 0) {
                row.nextAll().each(function () {
                  let position_val = $(this).find(".position").val();
                  let new_position = position_val - 1;
                  $(this).find(".position").val(new_position);
                });
              }
              row.fadeOut("slow");
              setTimeout(() => {
                row.remove();
              }, 1000);
            },
          },
          close: function () {},
        },
      });
    }
  });

  let new_rowid = 0;

  $(".add-row").click(function () {
    new_rowid = new_rowid + 1;

    position_new = $(".table-body-container .table-row").length + 1;

    output =
      '<div class="table-row" new_row_id="' +
      new_rowid +
      '" style="border: 2px solid red;">';
    output +=
      '<div class="table-body-item move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></div>';
    output +=
      '<div class="table-body-item"><input type="text" name="startdate[]" id="start_date' +
      new_rowid +
      '" class="datepicker" placeholder="Start Date" /></div>';
    output +=
      '<div class="table-body-item"><input type="text" name="enddate[]" id="end_date' +
      new_rowid +
      '" class="datepicker" placeholder="End Date" /></div>';
    output +=
      '<div class="table-body-item"><input type="text" name="price[]" id="price" class="price" placeholder="Price" /></div>';
    output +=
      '<div class="table-body-item"><input type="text" name="singleprice[]" id="single_price" class="single_price" placeholder="Single Price" /></div>';
    output +=
      '<div class="table-body-item"><input type="text" name="saleprice[]" id="sale_price' +
      new_rowid +
      '" class="sale_price" placeholder="Sale Price" /></div>';
    output += `<div class="table-body-item">
        <select name="tourstatus[]" id="tour_status" class="tour_status">
        <option value="available">Available</option>
        <option value="guaranteed">Guaranteed</option>
        <option value="fillingfast">Filling Fast</option>
        <option value="almostsoldout">Almost Sold Out</option>
        <option value="soldout">Sold Out</option>
        </select>
        </div>`;
    output +=
      '<div class="table-body-item options_btn"><div class="btn_option_tab"><span class="dashicons dashicons-admin-generic"></span></div></div>';
    output += `<div class="options_tab" style="display: none;">
                  <button type="button" name="delete_row" class="surf-custom-btn delete-btn delete_row">Delete</button>
               </div>`;
    output +=
      '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' +
      tablename_new +
      '" />';
    output +=
      '<input type="hidden" name="hidden_position[]" id="position" class="position" value="' +
      position_new +
      '" />';
    output += "</div>";

    $("#edit_table .table-body-container").append(output);

    let new_length = $(".table-body-container .table-row").length;

    let new_hieght =
      $(".table-body-container .table-row").innerHeight() * new_length;

    $(".table-body-container").scrollTop(
      $(".table-body-container").scrollTop() + new_hieght
    );

    $(".datepicker").each(function () {
      $(this).datepicker({
        dateFormat: "D d M, yy",
      });
    });
  });

  $(".btn-edit").click(function () {
    const id = $(this).attr("id");
    $(".main_overlay").css("display", "flex");
    $(".submit");
    $.ajax({
      url:
        surfiranDatePrice.site_route +
        `/wp-json/dateandprice/v1/tables?table_id=${id}`,
      method: "GET",
      success: function (data) {
        data.map((row) => {
          tablename_new = row.tablename;

          let price = row.price.replace(/€|EUR|,|\s/g, "");

          let singleprice = row.singleprice.replace(/€|EUR|,|\s/g, "");

          let status = row.tourstatus.toLowerCase();

          let format_status = status.replace(" ", "");

          output =
            '<div class="table-row" style="border: 1px solid #c5c5c5;" id="row_' +
            row.id +
            '">';
          output +=
            '<div class="table-body-item move_row"><div id="move_up"><span class="dashicons dashicons-arrow-up"></span></div><div id="move_down"><span class="dashicons dashicons-arrow-down"></span></div></div>';
          output +=
            '<div class="table-body-item"><input type="text" name="startdate[]" id="start_date' +
            row.id +
            '" class="datepicker" value="' +
            row.startdate +
            '" placeholder="Start Date" /></div>';
          output +=
            '<div class="table-body-item"><input type="text" name="enddate[]" id="end_date' +
            row.id +
            '" class="datepicker" value="' +
            row.enddate +
            '" placeholder="End Date" /></div>';
          output +=
            '<div class="table-body-item"><input type="text" name="price[]" id="price' +
            row.id +
            '" class="price" value="' +
            price +
            '"  placeholder="Price" /></div>';
          output +=
            '<div class="table-body-item"><input type="text" name="singleprice[]" id="single_price' +
            row.id +
            '" class="single_price" value="' +
            singleprice +
            '" placeholder="Single Price" /></div>';
          output +=
            '<div class="table-body-item"><input type="text" name="saleprice[]" id="sale_price' +
            row.id +
            '" class="sale_price" value="' +
            row.sale_price +
            '" placeholder="Sale Price" /></div>';
          output += `<div class="table-body-item">
                    <select name="tourstatus[]" id="tour_status${
                      row.id
                    }" class="tour_status">
                    <option value="available" ${
                      format_status === "available" ? "selected" : ""
                    }>Available</option>
                    <option value="guaranteed" ${
                      format_status === "guaranteed" ? "selected" : ""
                    }>Tour Guaranteed</option>
                    <option value="fillingfast" ${
                      format_status === "fillingfast" ? "selected" : ""
                    }>Limited Availability</option>
                    <option value="soldout" ${
                      format_status === "soldout" ? "selected" : ""
                    }>Tour Sold Out</option>
                    </select>
                    </div>`;
          output +=
            '<div class="table-body-item options_btn" id="' +
            row.id +
            '"><div class="btn_option_tab"><span class="dashicons dashicons-admin-generic"></span></div></div>';
          output += `<div id="${row.id}" class="options_tab" style="display: none;">
                      <button type="button" name="tour_note" class="surf-custom-btn tour-note-btn" id=${row.id}>Note</button>
                      <button type="button" name="delete_row" class="surf-custom-btn delete-btn delete_row" id=${row.id}>Delete</button>
                     </div>`;
          output += `<input type="hidden" name="hidden_tournote[]" id="tournote" row_id=${
            row.id
          } class="tournote" value=${
            row.date_note == "PHA+PGJyIGRhdGEtbWNlLWJvZ3VzPSIxIj48L3A+"
              ? ""
              : row.date_note
          }>`;
          output +=
            '<input type="hidden" name="hidden_tablename[]" id="tablename" class="tablename" value="' +
            row.tablename +
            '" />';
          output +=
            '<input type="hidden" name="hidden_position[]" id="position' +
            row.id +
            '" class="position" value="' +
            row.position +
            '" />';
          output +=
            '<input type="hidden" name="hidden_id[]" id="row_id" value="' +
            row.id +
            '" />';
          output += "</div>";

          $("#edit_table .table-body-container").append(output);

          $(".datepicker").each(function () {
            $(this).datepicker({
              dateFormat: "D d M, yy",
            });
          });
        });
      },
      error: function (e) {
        console.log(e);
      },
    }).done(function () {
      $(".main_overlay").css("display", "none");
    });

    $(".view_and_edit").fadeIn();
    $(".view_and_edit").css("display", "flex");
    $(".view_and_edit .body-container .body-header-container .title").text(
      `Edit Table ${id}`
    );
  });

  $(".close-btn").click(function closeModal() {
    $(".view_and_edit").fadeOut("Fast");
    $("body").css("overflow", "auto");
    setTimeout(function () {
      output = `<div class="table-header-container">
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
        </div> `;
      $("#edit_table").html(output);
    }, 500);
  });

  $(document).on("click", ".btn_option_tab", function optionTab() {
    const get_current_row_id = $(this).parent().attr("id");
    const option_parent = $(this).parent();
    const option_tab = option_parent.next(".options_tab");
    const option_tab_id = option_tab.attr("id");
    if (option_tab.css("display") == "none") {
      $(document).find(".options_tab").css("display", "none");
      option_tab.show("fast");
      option_tab.css("display", "flex");
    } else {
      option_tab.css("display", "none");
      option_tab.hide("fast");
    }
  });

  let popup_note = $(".note_popup");
  let textArea;
  let note_row_id;
  let mainNotePopup;

  $(document).on("click", ".tour-note-btn", function () {
    mainNotePopup = $(".main_note_popup");
    $(".note_load_overlay").css("display", "flex");
    const textEditor = mainNotePopup.children()[0];
    const textEditorID = $(textEditor).attr("id");
    const noteHTML = $(textEditor).find("iframe").contents();
    textArea = noteHTML.find("#tinymce");
    note_row_id = $(this).attr("id");
    mainNotePopup.attr("id", note_row_id);
    const newID = $(textEditor).attr(
      "id",
      `wp-note-content-${note_row_id}-wrap`
    );
    // if (!/\d/.test(textEditorID) || textEditorID.match(/\d+/)[0] != id) {
    //   $(textEditor).attr("id", newID);
    // }

    $.get(
      `${surfiranDatePrice.site_route}/wp-json/dateandprice/v1/tables?row_id=${note_row_id}`
    )
      .done(function (data) {
        $(".note_load_overlay").css("display", "none");
        let decodeHTML;
        const tournote_value = $(`.tournote[row_id = ${note_row_id}]`).val();
        if (tournote_value.includes("/")) {
          decodeHTML = atob(tournote_value.replaceAll("/", ""));
        } else {
          decodeHTML = atob(tournote_value);
        }
        popup_note.show("fast");
        data.map((row) => {
          textArea.html(decodeHTML);
        });
      })
      .fail(function (err) {
        console.log(err.responseText);
      });
  });

  $(document).on("click", ".submit-note", function () {
    encodeCode = textArea.html().replace(/[\uFEFF]/g, "");
    const encodeHTML = btoa(encodeCode);

    $(".tournote").each(function () {
      tournote_row_id = $(this).attr("row_id");

      if (tournote_row_id == mainNotePopup.attr("id")) {
        if (encodeHTML == "PHA+PGJyIGRhdGEtbWNlLWJvZ3VzPSIxIj48L3A+") {
          $(this).val("");
        } else {
          $(this).val(encodeHTML);
        }
      }

      $(".note_popup").hide();
    });
  });

  $(document).on("click", ".close_note_popup", function () {
    popup_note.hide("fast");
  });

  $(this).on("click", function (e) {
    if (
      e.target.outerHTML ==
      '<span class="dashicons dashicons-admin-generic"></span>'
    ) {
      return false;
    } else {
      $(document).find(".options_tab").hide();
    }
  });

  $(document).on("submit", "#table-form-php", function (event) {
    event.preventDefault();
    form_data = $(this).serialize();
    $.alert({
      title: "Updated",
      content: "Table Updated Successfully &#128578;",
      type: "green",
      buttons: {
        ok: function () {
          $.ajax({
            url:
              surfiranDatePrice.site_route +
              `/wp-json/dateandprice/v1/tables/update`,
            method: "PUT",
            data: form_data,
            success: function (data) {
              console.log("UPDATED");
            },
            error: function (err) {
              console.log(err.responseText);
            },
          });
          $(".view_and_edit").fadeOut("Fast");
          setTimeout(function () {
            output = `<div class="table-header-container">
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
                        </div> `;
            $("#edit_table").html(output);
          }, 500);
        },
      },
    });
  });

  $(document).on("submit", "#toure_price_form", function (event) {
    event.preventDefault();
    const tablename = $("#tablename").val();
    form_data = $(this).serialize();
    $.ajax({
      url:
        surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/tables/prices`,
      method: "POST",
      data: {
        form_data,
        tablename,
      },
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err.responseText);
      },
    }).done(function () {
      $.alert({
        title: "Updated",
        content: "Tour Prices Successfully Changed &#128578;",
        type: "green",
        buttons: {
          ok: function () {},
        },
      });
    });
  });

  $(".choose-image").on("click", function () {
    wp.media.editor.send.attachment = function (props, attachment) {
      $(".blank-image").attr("src", attachment.url);
    };
    wp.media.editor.open();
    return false;
  });

  let typingTimer;
  let doneTypingInterval = 500;

  $(".link-search").on("input", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  function doneTyping() {
    $(".page_search").append(
      `<div class="spinner-grow spinner-grow-sm text-secondary" role="status"></div>`
    );

    let searchQuery = $(".link-search").val();

    if (searchQuery.length == 0) {
      $(".page_search .spinner-grow").remove();
      $(".search_link_result").empty();
    }

    $.get(
      `${surfiranDatePrice.site_route}/wp-json/dateandprice/v1/p_link?page_link=${searchQuery}`
    ).done(function (pages) {
      $(".page_search .spinner-grow").remove();
      $(".search_link_result").empty();
      if (pages.length > 0) {
        pages.map(function (page) {
          $(".search_link_result").append(
            `<div data-link="${page.link}">${page.title}</div>`
          );
        });
      } else {
        $(".search_link_result").html(`<div>Nothing Found!</div>`);
      }
    });
  }
});
