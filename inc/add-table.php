<div class="overlay">
    <div class="spinner_local">
        <div class="spinner-border text-info" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
</div>
<div class="add-new-container">


    <h1>Add New Table</h1>
    <h5>Use it for new posts.</h5>
    <div class="form-table" id="table-form">
        <?php wp_nonce_field('wp_rest') ?>
        <div class="c-tablename">
            <label for="tablename">Table Name</label>
            <input type="text" id="tablename" name="tablename" placeholder="Enter Table Name ..." />
            <div class="text-muted">Fill in this item once.</div>
            <span id="error_tablename" class="text-danger"></span>
        </div>
        <div class="form-table-content">
            <div class="c-start-date">
                <label for="startdate">Start Date</label>
                <input type="text" id="start_date" class="datepicker" name="startdate" placeholder="Start Date" />
                <span id="error_start_date" class="text-danger"></span>
            </div>
            <div class="c-end-date">
                <label for="enddate">End Date</label>
                <input type="text" id="end_date" class="datepicker" name="enddate" placeholder="End Date" />
                <span id="error_end_date" class="text-danger"></span>
            </div>
            <div class="c-price">
                <label for="price">Price</label>
                <input type="text" id="price" name="price" placeholder="Price" />
                <span id="error_price" class="text-danger"></span>
            </div>
            <div class="c-single-price">
                <label for="singleprice">Single Price</label>
                <input type="text" id="single_price" name="singleprice" placeholder="Single Price" />
                <span id="error_single_price" class="text-danger"></span>
            </div>
            <div class="c-tourstatus">
                <label for="tourstatus">Tour Status</label>
                <select id="tourstatus" name="tourstatus">
                    <option value="available">Available</option>
                    <option value="guaranteed">Guaranteed</option>
                    <option value="fillingfast">Filling Fast</option>
                    <option value="almostsoldout">Almost Sold Out</option>
                    <option value="soldout">Sold Out</option>
                </select>
            </div>
            <div class="add_row_btn">
                <button id="add-row" class="btn btn-success" type="button" style="width: 120px;">Add Row</button>
            </div>
            <input type="hidden" name="row_id" id="hidden_row_id" />
            <input type="hidden" name="position" id="hidden_position" />
        </div>
    </div>

    <form class="form-table" method="POST" id="table-form-php">
        <?php wp_nonce_field('wp_rest') ?>
        <table class="table table-striped table-bordered" id="new_table">
            <tr>
                <th style="width: 20px;">Move</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Single Price</th>
                <th>Tour Status</th>
                <th>Options</th>
            </tr>
            <tr class="placeholder_row">
                <td colspan="7" class="form_placeholder">Table Rows Are Placed Here !</td>
            </tr>
        </table>
        <button class="btn btn-primary submit-form" style="width: 120px;" type="submit">Save Table</button>
    </form>
</div>