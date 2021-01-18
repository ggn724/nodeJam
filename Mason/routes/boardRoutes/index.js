var express = require('express');
var router = express.Router();
const controllers = require('./controller');

router.get('/',controllers.BoardList);
router.post('/',controllers.BoardWrite);
router.get('/edit/:id',controllers.BoardUpdateSearch);      // 수정 전 조회
router.put('/:id',controllers.boardUpdate);
router.delete('/:id',controllers.boardDelete);

router.get('/add',controllers.boardDirectWrite);        // 게시글에서 작성하기 버튼
router.get('/detail/:id',controllers.BoardDetailSearch);

module.exports = router;