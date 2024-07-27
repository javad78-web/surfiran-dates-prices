jQuery(document).ready(function ($) {
  let tour_guide_info = {
    name: "",
    img_src: surfiranDatePrice.blankImg,
    skills: "",
    page: {
      title: "",
      link: "",
    },
  };

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

  $(document).on("click", ".add-row", function () {
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
    $("#edit_table .table-body-container").empty();
    $("#edit_table .table-body-container").append(`<div class="main_overlay">
                                <div class="spinner_local">
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                </div>
                            </div>`);
    $(".main_overlay").css("display", "flex");
    $(".submit");
    $.ajax({
      url:
        surfiranDatePrice.site_route +
        `/wp-json/dateandprice/v1/tables?table_id=${id}`,
      method: "GET",
      success: function (data) {},
      error: function (e) {
        console.log(e);
      },
    }).done(function (data) {
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
      $(".main_overlay").css("display", "none");
      $(".view_and_edit_container").find(
        ".header-container"
      ).append(`<div class="close-modal">
                <span class="dashicons dashicons-no close-btn"></span>
            </div>`);
      $(".form-container").find(".submit-form-btn").append(`
              <button class="btn btn-primary submit-form" type="submit">Save Changes</button>
              <button class="btn btn-success add-row" type="button">Add Row</button>
              `);
    });

    $(".view_and_edit_container").fadeIn();
    $(".view_and_edit_container").css("display", "flex");
    $(".view_and_edit .body-container .body-header-container .title").text(
      `Edit Table ${id}`
    );
  });

  $(document).on("click", ".close-btn", function closeModal() {
    $(".view_and_edit_container").find(".header-container").empty();
    $("#edit_table .table-body-container").empty();
    $(".form-container").find(".submit-form-btn").empty();

    $(".view_and_edit_container").fadeOut("Fast");
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

  $(document).on("click", ".tour-note-btn", function () {
    $(".note_load_overlay").css("display", "flex");
    const note_row_id = $(this).attr("id");
    $(".note_popup_container").remove();

    $.get(
      `${surfiranDatePrice.site_route}/wp-json/dateandprice/v1/tables?row_id=${note_row_id}`
    )
      .done(function (res) {
        if (res[0].date_note.length > 0) {
          tour_guide_info = JSON.parse(res[0].date_note);
        }

        const mainNotePopup = `
          <div class="note_popup_container" id="${note_row_id}">
          <div class="note_popup">
              <div class="header_note_popup">
                  <div class="_title">Add Tour Guide</div>
                  <div class="close_note_popup">
                      <span class="dashicons dashicons-no"></span>
                  </div>
              </div>
              <div class="main_note_popup">
                  <div class="guide_image">
                      <img class="blank-image" src="${
                        tour_guide_info.img_src
                      }" alt="Blank Image">
                      <button class="btn btn-primary choose-image">Choose Image</button>
                  </div>
                  <div class="guide_name">
                      <label>Name</label>
                      <input type="text" class="guide-name" placeholder="Enter Guide Full Name" value="${
                        tour_guide_info.name
                      }">
                      <div class="warning"></div>
                  </div>
                  <div class="guide_details">
                      <label>Skills</label>
                      <input type="text" class="guide-skills" placeholder="Proficiency (Optional)" value="${
                        tour_guide_info.skills
                      }">
                      <div class="warning"></div>
                      <div class="input-help">Enter the Skills, separating them with commas</div>
                  </div>
                  <div class="page_search">
                      <label>Search in Pages</label>
                      <input type="text" class="link-search" placeholder="Search for a Link">
                      <div class="input-help">If the page is not found, it's not publish.</div>
                      <div class="selected_page">
                        ${
                          tour_guide_info.page.link.length > 0
                            ? `<a href="${tour_guide_info.page.link}" target="_blank"> Selected Page: <span>${tour_guide_info.page.title}</span></a>`
                            : ""
                        }
                      </div>
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
          `;

        $(".note_load_overlay").css("display", "none");
        $(".body-content-container").append(mainNotePopup);
        $(".note_popup_container").fadeIn(300);
        $(".note_popup_container").css("display", "flex");
      })
      .fail(function (err) {
        console.log(err.responseText);
      });
  });

  $(document).on("click", ".close_note_popup", function () {
    tour_guide_info = {
      name: "",
      img_src: surfiranDatePrice.blankImg,
      skills: "",
      page: {
        title: "",
        link: "",
      },
    };

    $(".note_popup_container").hide("fast");
    setTimeout(() => {
      $(".note_popup_container").remove();
    }, 500);
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
            success: function (data) {},
            error: function (err) {
              console.log(err.responseText);
            },
          });
          $(".view_and_edit_container").fadeOut("Fast");
          $(".view_and_edit_container").find(".header-container").empty();
          $("#edit_table .table-body-container").empty();
          $(".form-container").find(".submit-form-btn").empty();

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
      success: function (data) {},
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

  let typingTimer;
  let doneTypingInterval = 500;

  $(document).on("click", ".choose-image", function () {
    wp.media.editor.open();
    wp.media.editor.send.attachment = function (props, attachment) {
      $(".blank-image").attr("src", attachment.url);
      tour_guide_info.img_src = attachment.url;
    };
    return false;
  });

  // search on pages

  $(document).on("input", ".link-search", function () {
    clearTimeout(typingTimer);
    if ($(".link-search").val().trim().length == 0) {
      $(".page_search .spinner-grow").remove();
      $(".search_link_result").empty();
      $(".link-search").css({
        border: "1px solid #e0e0e0",
      });
      return;
    }

    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  function doneTyping() {
    $(".search_link_result").empty();
    if ($(".page_search").find(".spinner-grow").length == 0) {
      $(".page_search").append(
        `<div class="spinner-grow spinner-grow-sm text-primary" role="status"></div>`
      );
    }

    let searchInput = $(".link-search").val().trim();

    $.get(
      `${surfiranDatePrice.site_route}/wp-json/dateandprice/v1/p_link?page_link=${searchInput}`,
      function (data) {
        $(".search_link_result").empty();
        $(".link-search").css({
          border: "2px solid #0fa90f",
        });
      }
    )
      .done(function (pages) {
        $(".page_search .spinner-grow").remove();
        $(".search_link_result").empty();

        if (pages.length > 0) {
          pages.map(function (page) {
            $(".search_link_result").append(
              `<div class="link_result" data-link="${page.link}">
                <div class="page_title">${page.title}</div>
                <span>${page.link}</span>
              </div>`
            );
          });
        } else {
          $(".link-search").css({
            border: "2px solid #a90f0f",
          });
          $(".search_link_result").html(
            `<div style="padding: 10px;font-size: 17px;font-weight: bold;color: #a90f0f;">Nothing Found!</div>`
          );
        }
      })
      .fail(function () {
        $(".link-search").css({
          border: "2px solid #a90f0f",
        });
      });
  }

  // Click Event on page links Result...

  $(document).on("click", ".search_link_result .link_result", function () {
    clearTimeout(typingTimer);

    tour_guide_info.page.link = $(this).attr("data-link");
    tour_guide_info.page.title = $(this).find(".page_title").text();

    $(".selected_page").html(
      `<a href="${tour_guide_info.page.link}" target="_blank">Selected Page: <span>${tour_guide_info.page.title}</span></a>`
    );

    $(".link-search").val("");
    $(".search_link_result").empty();
  });

  // Add the Guide Name
  $(document).on("input", ".guide-name", function () {
    const guideNameVal = $(this).val().trim();
    if (!validTourGuide.name(guideNameVal)) {
      $(".guide_name .warning").html("The entered name is not valid!");
      tour_guide_info.name = "";
      return;
    }

    $(".guide_name .warning").html("");
    tour_guide_info.name = guideNameVal;
  });

  // Add the Guide Skills
  $(document).on("input", ".guide-skills", function () {
    const guideSkillsInput = $(this);
    let skillsInputVal = guideSkillsInput.val().trim();
    const warningSelector = ".guide_details .warning";
    const borderColorError = "2px solid #a90f0f";
    const borderColorDefault = "1px solid #e0e0e0";

    const updateStyles = (isError, message) => {
      guideSkillsInput.css({
        border: isError ? borderColorError : borderColorDefault,
      });
      $(warningSelector).html(message);
    };

    if (!validTourGuide.skill(skillsInputVal)) {
      updateStyles(true, "Some characters are not valid");
      tour_guide_info.skills = "";
      return;
    }

    if (skillsInputVal[skillsInputVal.length - 1] === ",") {
      skillsInputVal = skillsInputVal.slice(0, -1);
    }

    tour_guide_info.skills = skillsInputVal;
    updateStyles(false, "");
  });

  // save tour giude info for each tour date ...

  $(document).on("click", ".submit-note", function () {
    const note_id = $(".note_popup_container").attr("id");

    if (!isNaN(note_id) && tour_guide_info) {
      if (
        tour_guide_info.img_src.trim().length === 0 ||
        tour_guide_info.img_src.trim() === surfiranDatePrice.blankImg
      ) {
        console.log("Select a Photo ...");
        return;
      }
      if (tour_guide_info.name.trim().length === 0) {
        console.log("Enter Name ...");
        return;
      }

      if (tour_guide_info.page.link.trim().length === 0) {
        console.log("Select a Page ...");
        return;
      }

      $.ajax({
        url:
          surfiranDatePrice.site_route + `/wp-json/dateandprice/v1/update_note`,
        method: `PUT`,
        data: {
          row_id: note_id,
          name: tour_guide_info.name,
          img_src: tour_guide_info.img_src,
          skills: tour_guide_info.skills,
          page: tour_guide_info.page,
        },
      }).done(function (res) {
        if (res != true) {
          console.error(res);
          return;
        }
        tour_guide_info = {
          name: "",
          img_src: surfiranDatePrice.blankImg,
          skills: "",
          page: {
            title: "",
            link: "",
          },
        };
        $(".note_popup_container").hide("fast");
        setTimeout(() => {
          $(".note_popup_container").remove();
        }, 500);
      });
    }
  });

  // Validate the name , img and skill guid ....
  // page link not valid for now ...
  const validTourGuide = {
    name: function (name) {
      if (name.length > 0 && !/^[a-zA-Z ,.'-]+$/.test(name)) {
        return false;
      }
      return true;
    },
    img: function (src) {
      const regex_pattern = /""/;
      if (!regex_pattern.test(src)) {
        return false;
      }
      return true;
    },
    skill: function (skills) {
      if (
        skills.length > 0 &&
        !/^[a-zA-Z'* ]+(?:,[a-zA-Z'* ]*[a-zA-Z'*][a-zA-Z'* ]*)*(?:,)?$/.test(
          skills
        )
      ) {
        return false;
      }
      return true;
    },
  };
});
