import express from 'express';
import path from 'path';

const rootPath = process.cwd() + '/';

var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(rootPath, 'public/', 'chat.html'));
});

module.exports = router;