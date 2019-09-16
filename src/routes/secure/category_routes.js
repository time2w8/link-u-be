const app = require('express');
const router = app.Router();
const db_pool = require('../../mysql');

router.get('/', async (req, res) => {
    const user = req.user.user;
    const categories = await db_pool.query('SELECT * FROM categories WHERE user_id = ?;', [user.id])
    res.json(categories);
})

router.post('/add', async (req, res) => {
    const user = req.user.user;
    const category = req.body;
    category.user_id = user.id;
    const check = await db_pool.query('SELECT id FROM categories WHERE name = ?', [category.name]);
    if (check[0]) {
        res.send('Category ' + category.name + ' already exists');
    } else {
        await db_pool.query('INSERT INTO categories SET ?', [category], (err, result) => {
            if (err) {
                res.send('ERROR ', err.code);
            }
            if (result) {
                res.send('Category added!');
            }
        })
    }
})

router.delete('/delete', async (req, res) => {
    const user = req.user.user;
    await db_pool.query('DELETE FROM categories WHERE id = ? AND user_id = ?', [req.body.id, user.id], (err, result) => {
        if (err) {
            res.send('ERROR ', err.code);
        }
        if (result) {
            res.send('Category deleted!');
        }
    })
})

router.put('/update', async (req, res) => {
    const user = req.user.user;
    const check = await db_pool.query('SELECT id FROM categories WHERE name = ?', [req.body.name]);
    if (check[0]) {
        res.send('Category ' + category.name + ' already exists');
    } else {
        await db_pool.query('UPDATE categories SET ? WHERE id = ? AND user_id = ?', [req.body, req.body.id, user.id], (err, result) => {
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