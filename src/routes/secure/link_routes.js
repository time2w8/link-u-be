const express = require('express');
const router = express.Router();
const db_pool = require('../../mysql');

router.get('/', async (req, res) => {
    const user = req.user.user;
    const links = await db_pool.query('SELECT * FROM links WHERE user_id = ?;', [user.id]);
    res.json(links);
})

router.post('/add', async (req, res) => {
    const user = req.user.user;
    const link = req.body;
    link.user_id = user.id;
    const check = await db_pool.query('SELECT id FROM links WHERE name = ?', [link.name])
    if (check[0]) {
        res.send('Link ' + link.name + ' already exists');
    } else {
        await db_pool.query('INSERT INTO links SET ?', [link], (err, result) => {
            if (err) {
                res.send('ERROR ', err.code);
            }
            if (result) {
                res.send('Link added!');
            }
        })
    }
})

router.delete('/delete', async (req, res) => {
    const user = req.user.user;
    await db_pool.query('DELETE FROM links WHERE id = ? AND user_id = ?', [req.body.id, user.id], (err, result) => {
        if (err) {
            res.send('ERROR ', err.code);
        }
        if (result) {
            res.send('Link deleted!');
        }
    })
})

router.put('/update', async (req, res) => {
    const user = req.user.user;
    const link = req.body;
    const check = await db_pool.query('SELECT id FROM links WHERE name = ?', [link.name]);
    if (check[0]) {
        res.send('Link ' + link.name + ' already exists');
    } else {
        await db_pool.query('UPDATE links SET ? WHERE id = ? AND user_id = ?', [req.body, req.body.id, user.id], (err, result) => {
            if (err) {
                res.send('ERROR ', err.code);
            }
            if (result) {
                res.send(result);
            }
        })
    }
})

module.exports = router;