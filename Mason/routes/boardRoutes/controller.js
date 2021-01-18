const models = require('../../models');

// read
exports.BoardList = (req, res) => {
    models.post.findAll()
        .then(result => {
            res.render("board/boardList", {
                posts: result
            });
        })
        .catch(function (err) {
            console.log("[ERR][BOARD][SEARCH] search data..........fail");
            console.log("장애) "+err);
        });
};

// create
exports.BoardWrite = (req, res) => {
    let body = req.body;

    models.post.create({
        title: body.inputTitle,
        content: body.inputContent,
        writer: body.inputWriter
    })
        .then(result => {
            console.log("[LOG][BOARD][CREATE] create data..........ok");
            res.redirect("/board");
        })
        .catch(err => {
            console.log("[ERR][BOARD][CREATE] create data..........fail");
            console.log("장애) "+err);
        });
};

//update
exports.BoardUpdateSearch = (req, res) => {
    let postID = req.params.id;

    models.post.findOne({
        where: { id: postID }
    })
        .then(result => {
            res.render("board/boardEdit", {
                post: result
            });
        })
        .catch(err => {
            console.log("[ERR][BOARD][UPDATE] search data..........fail");
            console.log("장애) "+err);
        });
};

exports.boardUpdate = (req, res, next) => {
    let postID = req.params.id;
    let body = req.body;

    models.post.update({
        title: body.editTitle,
        content: body.editContent,
        writer: body.editWriter
    }, {
        where: { id: postID }
    })
        .then(result => {
            console.log("[LOG][BOARD][UPDATE] update data..........ok");
            res.redirect("/board");
        })
        .catch(err => {
            console.log("[ERR][BOARD][UPDATE] update data..........fail");
            console.log("장애) "+err);
        });
};

// delete
exports.boardDelete = (req, res, next) => {
    let postID = req.params.id;

    models.post.destroy({
        where: { id: postID }
    })
        .then(result => {
            res.redirect("/board")
        })
        .catch(err => {
            console.log("[ERR][BOARD][DELETE] delete data..........fail");
            console.log("장애) "+err);
        });
};

// /board -> 작성하기 버튼
exports.boardDirectWrite = (req, res) => {
    res.render('board/boardAdd');
}

exports.BoardDetailSearch = (req, res) => {
    let postID = req.params.id;

    models.post.findOne({
        where: { id: postID }
    })
        .then(result => {
            res.render("board/boardDetail", {
                post: result
            });
        })
        .catch(err => {
            console.log("[ERR][BOARD][DETAIL] search data..........fail");
            console.log("장애) "+err);
        });
};