var express = require('express');
var router = express.Router();
const controllers = require('./controller');

router.get('/',controllers.BoardList);
router.post('/',controllers.BoardWrite);
router.get('/edit/:id',controllers.BoardUpdateSearch);      // 수정 전 조회
router.put('/:id',controllers.boardUpdate);
router.delete('/:id',controllers.boardDelete);

router.get('/add',function(req, res){
    res.render('board/boardAdd');
})

module.exports = router;