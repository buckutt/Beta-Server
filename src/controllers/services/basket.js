import APIError from '../../APIError';
import logger   from '../../log';
import express  from 'express';
import Promise  from 'bluebird';

let log = logger(module);

/**
 * Basket controller. Handles purchases and reloads
 * @param {Application} app Express main application
 */
export default app => {
    let models = app.locals.models;
    let router = new express.Router();

    router.post('/services/basket', (req, res, next) => {
        // Purchases documents
        let purchases = [];
        // Reloads documents
        let reloads   = [];
        // Stock reduciton queries
        let stocks    = [];

        let queryLog  = '';

        if (!Array.isArray(req.body.basket)) {
            return next(new APIError(400, 'Invalid basket'));
        }

        let totalCost = req.body.basket
            .map(item => {
                if (item.type === 'purchase') {
                    return -1 * item.cost;
                } else if (item.type === 'reload') {
                    return item.credit;
                }
            })
            .reduce((a, b) => a + b);

        if (req.user.credit < totalCost) {
            return next(new APIError(400, 'Not enough credit'));
        }

        queryLog += `User ${req.user.fullname} `;

        req.body.basket.forEach(item => {
            if (item.type === 'purchase') {
                // Purchases
                let purchase = new models.Purchase({
                    buyerId    : 'id',
                    fundationId: 'id',
                    pointId    : 'id',
                    promotionId: 'id',
                    sellerId   : 'id'
                });

                queryLog += `buys ${item.title} `;
                purchase.articles = ['id', 'id'];

                // Stock reduction
                item.articles.forEach(article => {
                    let stockReduction = models.Article
                        .get(article)
                        .udpate(doc => doc.sub('stock', 1))
                        .run();

                    stocks.push(stockReduction);
                });

                purchases.push(purchase.saveAll({
                    articles: true
                }));
            } else if (item.type === 'reload') {
                queryLog += `reloads ${item.credit} `;

                // Reloads
                let reload = new models.Reload({
                    credit  : '',
                    trace   : '',
                    pointId : '',
                    buyerId : '',
                    sellerId: ''
                });

                reloads.push(reload);
            }
        });

        log.info(queryLog);

        let everythingSaving = purchases.concat(reloads).concat(stocks);
        Promise
            .all(everythingSaving)
            .then(() =>
                res
                    .status(200)
                    .json({
                        newCost: req.user.credit - totalCost
                    })
                    .end()
            );
    });
};
