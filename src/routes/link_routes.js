const express = require('express');
const router = express.Router();
const db_pool = require('../mysql');

router.get('/', async (req, res) => {
    const links = await db_pool.query('SELECT * FROM links;')
    console.log(links);
    res.send('link router working!');
})

router.post('/add', async (req, res) => {
    await db_pool.query('INSERT INTO links SET ?', [req.body], (err, result) => {
        if (err) {
            console.error(err);
            res.send('ERROR ', err.code);
        }
        if (result) {
            console.log(result);
            res.send('Link added!');
        }
    })

})

router.delete('/delete', async (req, res) => {
    await db_pool.query('DELETE FROM links WHERE id = ?', [req.body.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send('ERROR ', err.code);
        }
        if (result) {
            console.log(result);
            res.send('Link deleted!');
        }
    })
})

router.put('/update', async (req, res) => {
    await db_pool.query('UPDATE links SET ? WHERE id = ?', [req.body.obj, req.body.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send('ERROR ', err.code);
        }
        if (result) {
            console.log(result);
            res.send('Link updated!');
        }
    })
})

module.exports = router;