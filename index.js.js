//=================================================================== ESSENTIAL PART =================================
// npm init -y
//npm install express -s
// npm install nodemon -s
// npm install mysql -s
// yarn add mysql
// npm install path -s // for path
var expresskuch = require("express");
var path = require("path");   // npm install path -s // for path
var app = expresskuch();
var mysql = require("mysql");  // npm install mysql -s
const { urlencoded } = require("express");
const { report, send } = require("process");
var fileuploader = require("express-fileupload");  // for pic dowloading


//         port     behaviour
// app.listen(8726, function () {
//     console.log("server started");
// })

app.listen(process.env.PORT || 5000);

app.use(expresskuch.static("publc"));

var dbconfiguration = {
    host: "ec2-52-212-228-71.eu-west-1.compute.amazonaws.com",
    user: "vykjjpmwqdjppd",
    password: "d177b5b2c705cd855da6a4f9b611627e8695f3392bfcbfb42aa2abc638465a9a",
    database: "d409osj8ia1rj3",

}
var refdb = mysql.createConnection(dbconfiguration);
refdb.connect(function (err) {
    if (err)
        console.log(err);
    else
        console.log("connected to server")
})
//app.use(expressKuch.static("publc"));
//=======================================================  END  =====================================================
//============================================ Index.html =============================================
app.get("/", function (req, resp) {
    var purapath = process.cwd() + "/publc/login,signup.html";
    resp.sendFile(purapath);
    console.log("server started");
})
//=================================================end==================================================
//=================================sending data base of signup ==========================================
//--------------------1 /// getting data of 1
app.get("/recorddata", function (req, resp) {
    refdb.query("insert into medibook values(?,?,?,1)", [req.query.txtemail, req.query.txtpwd, req.query.txtuser], function (err, result) {
        if (err)
            resp.send("This account is in use");
        else
            resp.send("Inserted successfully....");
    })

})
//=================================================end==================================================
//=================================sending data base of signup ==========================================
//--------------------2 /// getting data of 2
app.get("/chklogin", function (req, resp) {
    refdb.query("select * from medibook where email=? and pwd=? and status=1", [req.query.txtemail, req.query.txtpwd], function (err, result) {
        if (err)
            resp.send(err);
        else
            resp.send(result);
    })
})
//=================================================end==================================================
//================================ settings making new password=====================
app.get("/makenewpwd", function (req, resp) {
    ary = [req.query.email, req.query.opwd];
    refdb.query("select * from medibook where email=? and pwd=?", ary, function (err, result) {
        if (err) {
            resp.send(err);
        }
        else if (result.length == 1) {
            ary1 = [req.query.npwd, req.query.email];
            refdb.query("update medibook set pwd=? where email=?", ary1, function (err, result) {
                if (err)
                    resp.send(err);
                else
                    resp.send("Changed successfully......");
            })
        }
        else
            resp.send("invalid Email id or old password");
    })
})
//=====================================end ==============================
// ============== profile page of donor======================
app.use(expresskuch.urlencoded('extended:true')); //converts binary to object
app.use(fileuploader());// for pic downloading
app.post("/profile-save", function (req, resp) {
    //resp.send(req.body);
    // resp.send(req.files.proofpic.name);
    //=======================pic wqala kaaam
    console.log(req.files.proofpic.name); // pic download
    var dt = new Date(); // // pic download to insert date tym
    console.log(dt.toDateString());//pic download to insert date tym
    console.log(dt.toTimeString());//pic download to insert date tym
    console.log(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());//pic download to insert date tym
    var fname = req.body.txtemail + "-" + req.files.proofpic.name;//pic download to insert date tym
    var des = process.cwd() + "/publc/uploads/" + fname;// destination folder where to send pic
    req.files.proofpic.mv(des, function (err) {// moving of folder
        if (err)
            console.log(err);
        else
            console.log("congratulation......!");

    })
    console.log(req.files.profilepic.name); // pic download
    var dt = new Date(); // // pic download to insert date tym
    var fname1 = req.body.txtemail + "-" + req.files.profilepic.name;//pic download to insert date tym
    var des = process.cwd() + "/publc/uploads/" + fname1;// destination folder where to send pic
    req.files.profilepic.mv(des, function (err) {// moving of folder
        if (err)
            console.log(err);
        else
            console.log("congratulation......!");
    })
    // pic wala kaam end=====================
    //console.log(req.body);
    var dataary = [req.body.txtemail, req.body.txtname, req.body.mobile, req.body.address, req.body.state, req.body.city, req.body.proof, req.body.time, fname, fname1];
    refdb.query("insert into dprofile values(?,?,?,?,?,?,?,?,?,?)", dataary, function (err) {
        if (err)
            resp.send(err);
        else
            resp.send("inserted successfully");
    })
})

//===================end==========================

//=================================================================
app.get("/chkdata", function (req, resp) {
    //0   // 1
    refdb.query("select * from dprofile where emailid=?", [req.query.txtemail], function (err, resultAryofObj) {
        if (err)
            resp.send(err);
        else {
            //console.log(resultAryofObj);
            resp.send(resultAryofObj);
        }

    })
})
//============================================================
//================== profile update===============//

app.post("/profile-update", function (req, resp) {

    if (req.body.txtname == "") { resp.send("Fill data"); }
    else {
        var fname;
        var fname1;
        if (req.files != null) {

           

            if (req.files.profilepic) {

                console.log(req.files.profilepic.name); // pic download
                var dt = new Date(); // // pic download to insert date tym
                fname1 = req.body.txtemail + "-" + req.files.profilepic.name;//pic download to insert date tym
                var des = process.cwd() + "/publc/uploads/" + fname1;// destination folder where to send pic
                req.files.profilepic.mv(des, function (err) {// moving of folder
                    if (err)
                        console.log(err);
                    else
                        console.log("congratulation......!");
                })
            }

            else {
                fname1 = req.body.hdn1;
            }
            if (req.files.proofpic) {
                //console.log(req.files.proofpic.name); // pic download
                var dt = new Date(); // // pic download to insert date tym
                console.log(dt.toDateString());//pic download to insert date tym
                console.log(dt.toTimeString());//pic download to insert date tym
                console.log(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());//pic download to insert date tym
                fname = req.body.txtemail + "-" + req.files.proofpic.name;//pic download to insert date tym
                var des = process.cwd() + "/publc/uploads/" + fname;// destination folder where to send pic
                req.files.proofpic.mv(des, function (err) {// moving of folder
                    if (err)
                        console.log(err);
                    else
                        console.log("congratulation......!");
                })
            }
            else {
                fname = req.body.hdn;
            }
        }
        else {
            fname1 = req.body.hdn1;
            fname = req.body.hdn;
        }

        // pic wala kaam end=====================
        //console.log(req.body);
        var dataary = [req.body.txtname, req.body.mobile, req.body.address, req.body.state, req.body.city, req.body.proof, req.body.time, fname, fname1, req.body.txtemail];
        refdb.query("update dprofile set name=?,mobile=?,address=?,state=?,city=?,prooftype=?,timmings=?,proofpic=?,profilepic=? where emailid=?", dataary, function (err) {
            if (err)
                resp.send(err);
            else
                resp.send("updated successfully");
        })
    }
})
//====================end=-==============
//=================================listing==========================
//app.use(expresskuch.urlencoded('extended:true')); //converts binary to object
//app.use(fileuploader());// for pic downloading
app.post("/list-medicine", function (req, resp) {
    //get sey picture nhi ayegi
    //post nl hee ayu............... .post ----multipart
    //app use wli files baar baar nhi lgaani hundi.......
    //resp.send(req.query);

    // resp.send(req.files.med); // pic download================ wrong
    //    console.log(req.files.med.name); // pic download
    //     var dt = new Date(); // // pic download to insert date tym
    //     console.log(dt.toDateString());//pic download to insert date tym
    //     console.log(dt.toTimeString());//pic download to insert date tym
    //     console.log(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());//pic download to insert date tym
    var fname = req.files.med.name;//pic download to insert date tym
    var des = process.cwd() + "/publc/uploads/" + fname;// destination folder where to send pic
    req.files.med.mv(des, function (err) {// moving of folder
        if (err)
            console.log(err);
        else
            console.log("congratulation......!");
        //resp.send(req.query);

    })
    var dataary = [req.body.txtemail, req.body.txtname, req.body.pack, req.body.qty, req.body.expdate, req.body.comp, fname, req.body.desc];
    refdb.query("insert into medicines values(?,?,?,?,?,?,?,?,current_date())", dataary, function (err) {
        if (err)
            resp.send(err);
        else
            resp.send("inserted successfully");
    })
})
//=============================end======================
//==============fetch all users==================
app.get("/admin-panel", function (req, resp) {
    var purapath = process.cwd() + "/publc/admin-panel.html";
    resp.sendFile(purapath);
    console.log("server started");
})
//================================================================
//==============fetch all users==================
app.all("/fetch-all-user", function (req, resp) {
    // resp.send("hy");

    refdb.query("Select * from medibook", function (err, resultAryofObj) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(resultAryofObj)
        }

    })
});
//================================================================
app.get("/blockstatus", function (req, resp) {

    refdb.query("update medibook set status=? where email=?", [req.query.statuss, req.query.emaill], function (err, result) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send("Blocked")
        }

    })
});
//===================================================
app.get("/resumestatus", function (req, resp) {

    refdb.query("update medibook set status=? where email=?", [req.query.statuss, req.query.emaill], function (err, result) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send("Resume")
        }

    })
});
//===========================================================
app.all("/all-donor-data", function (req, resp) {
    // resp.send("hy");

    refdb.query("Select * from dprofile", function (err, resultAryofObj) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(resultAryofObj)
        }

    })
});
//=============================================================
app.get("/deletedonor", function (req, resp) {

    refdb.query("delete from dprofile where emailid=?", [req.query.emailid], function (err, result) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send("Deleted")
        }

    })
});
//============================================================================
app.post("/profile-needy-save", function (req, resp) {
    //resp.send(req.body);
    // resp.send(req.files.proofpic.name);
    //=======================pic wqala kaaam
    console.log(req.files.proofpic.name); // pic download
    var dt = new Date(); // // pic download to insert date tym
    console.log(dt.toDateString());//pic download to insert date tym
    console.log(dt.toTimeString());//pic download to insert date tym
    console.log(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());//pic download to insert date tym
    var fname = req.body.txtemail + "-" + req.files.proofpic.name;//pic download to insert date tym
    var des = process.cwd() + "/publc/uploads/" + fname;// destination folder where to send pic
    req.files.proofpic.mv(des, function (err) {// moving of folder
        if (err)
            console.log(err);
        else
            console.log("congratulation......!");

    })
    console.log(req.files.profilepic.name); // pic download
    var dt = new Date(); // // pic download to insert date tym
    var fname1 = req.body.txtemail + "-" + req.files.profilepic.name;//pic download to insert date tym
    var des = process.cwd() + "/publc/uploads/" + fname1;// destination folder where to send pic
    req.files.profilepic.mv(des, function (err) {// moving of folder
        if (err)
            console.log(err);
        else
            console.log("congratulation......!");
    })
    // pic wala kaam end=====================
    //console.log(req.body);
    var dataary = [req.body.txtemail, req.body.txtname, req.body.mobile, req.body.address, req.body.state, req.body.city, req.body.proof, req.body.time, fname, fname1];
    refdb.query("insert into nprofile values(?,?,?,?,?,?,?,?,?,?)", dataary, function (err) {
        if (err)
            resp.send(err);
        else
            resp.send("inserted successfully");
    })
})

app.post("/profile-needy-update", function (req, resp) {

    if (req.body.txtname == "") { resp.send("Fill data"); }
    else {
        var fname;
        var fname1;
        if (req.files != null) {

            if (req.files.proofpic) {
                //console.log(req.files.proofpic.name); // pic download
                var dt = new Date(); // // pic download to insert date tym
                console.log(dt.toDateString());//pic download to insert date tym
                console.log(dt.toTimeString());//pic download to insert date tym
                console.log(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());//pic download to insert date tym
                fname = req.body.txtemail + "-" + req.files.proofpic.name;//pic download to insert date tym
                var des = process.cwd() + "/publc/uploads/" + fname;// destination folder where to send pic
                req.files.proofpic.mv(des, function (err) {// moving of folder
                    if (err)
                        console.log(err);
                    else
                        console.log("congratulation......!");
                })
            }
            else {
                fname = req.body.hdn;
            }

            if (req.files.profilepic) {

                console.log(req.files.profilepic.name); // pic download
                var dt = new Date(); // // pic download to insert date tym
                var fname1 = req.body.txtemail + "-" + req.files.profilepic.name;//pic download to insert date tym
                var des = process.cwd() + "/publc/uploads/" + fname1;// destination folder where to send pic
                req.files.profilepic.mv(des, function (err) {// moving of folder
                    if (err)
                        console.log(err);
                    else
                        console.log("congratulation......!");
                })
            }

            else {
                fname1 = req.body.hdn1;
            }
        }
        else {
            fname1 = req.body.hdn1;
            fname = req.body.hdn;
        }

        // pic wala kaam end=====================
        //console.log(req.body);
        var dataary = [req.body.txtname, req.body.mobile, req.body.address, req.body.state, req.body.city, req.body.proof, req.body.time, fname, fname1, req.body.txtemail];
        refdb.query("update nprofile set name=?,mobile=?,address=?,state=?,city=?,prooftype=?,timmings=?,proofpic=?,profilepic=? where emailid=?", dataary, function (err) {
            if (err)
                resp.send(err);
            else
                resp.send("updated successfully");
        })
    }
})
//====================end=-==============
app.get("/chkneedydata", function (req, resp) {
    //0   // 1
    refdb.query("select * from nprofile where emailid=?", [req.query.txtemail], function (err, resultAryofObj) {
        if (err)
            resp.send(err);
        else {
            //console.log(resultAryofObj);
            resp.send(resultAryofObj);
        }

    })
})
//============================================================
app.all("/all-needy-data", function (req, resp) {
    // resp.send("hy");

    refdb.query("Select * from nprofile", function (err, resultAryofObj) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(resultAryofObj)
        }

    })
});
//========================================================================
app.get("/deleteneedy", function (req, resp) {

    refdb.query("delete from nprofile where emailid=?", [req.query.emailid], function (err, result) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send("Deleted")
        }

    })
});
app.all("/getcities",function(req,resp){
    refdb.query("select distinct city from dprofile",function(err,result){
        if(err)
        {
            resp.send(err)
        }
        else
        {
            resp.send(result)
        }
    })
})
app.get("/fetchmedicine",function(req,resp){         // use of inner join for joining to tables of xamp
    refdb.query("select distinct medicine from medicines inner join dprofile on medicines.emailid=dprofile.emailid where dprofile.city=?",[req.query.city],function(err,result){
        if(err)
        {
            resp.send(err)
        }
        else
        {
            resp.send(result)
        }
    })
})
app.get("/fetchmedcard",function(req,resp){         // use of inner join for joining to tables of xamp
    refdb.query("select * from medicines inner join dprofile on medicines.emailid=dprofile.emailid where dprofile.city=? and medicines.medicine=?",[req.query.city,req.query.medicine],function(err,result){
        if(err)
        {
            resp.send(err)
        }
        else
        {
            resp.send(result)
        }
    })
})
app.get("/getlisteditems",function(req,resp){         // use of inner join for joining to tables of xamp
    refdb.query("select * from medicines where emailid=?",[req.query.emailid],function(err,result){
        if(err)
        {
            resp.send(err)
        }
        else
        {
            resp.send(result)
        }
    })
})
app.get("/delete-medicine", function (req, resp) {

    refdb.query("delete from medicines where medicine=?", [req.query.med], function (err, result) {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send("Deleted")
        }

    })
});