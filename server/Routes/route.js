const express = require ("express");
const Router = express.Router();

const {display_all_todos,add_info,display_single_info,delete_info,edit_info} = require("../controller/to-do");

Router.route("/display").get(display_all_todos);
Router.route("/add").post(add_info);

Router.route("/display/:id").get(display_single_info);
Router.route("/delete/:id").delete(delete_info)
Router.route("/edit/:id").put(edit_info)


module.exports = Router;