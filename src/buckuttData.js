'use strict';

// Shim for values
Object.values = obj => Object.keys(obj).map(key => obj[key]);

export default {
    raw : models => {
        /* Articles */
        let articleKinderDelice = new models.Article({
            name : 'Kinder Delice',
            stock: 100
        });

        let articleMars = new models.Article({
            name : 'Mars',
            stock: 100
        });

        let articleKinderCountry = new models.Article({
            name : 'Kinder Country',
            stock: 100
        });

        let articleIceTeaPeche = new models.Article({
            name : 'Ice Tea Pêche',
            stock: 100
        });

        let articleEau = new models.Article({
            name : 'Eau',
            stock: 100
        });

        let articleIceTeaMangue = new models.Article({
            name : 'Ice Tea Mangue',
            stock: 100
        });

        let articleLiptonic = new models.Article({
            name : 'Liptonic',
            stock: 100
        });

        let articleSchweppes = new models.Article({
            name : 'Schweppes',
            stock: 100
        });

        let articleSchweppesAgrum = new models.Article({
            name : 'Schweppes Agrum',
            stock: 100
        });

        let articleCocaCola = new models.Article({
            name : 'Coca-Cola',
            stock: 100
        });

        let articleCrepe = new models.Article({
            name : 'Crêpe',
            stock: 100
        });

        let articleBeer = new models.Article({
            name   : 'Bière',
            alcohol: 1,
            stock  : 100
        });

        /* Categories */
        let categoryBarres = new models.Category({
            name: 'Barres'
        });

        let categoryCanettes = new models.Category({
            name: 'Canettes'
        });

        let categoryGeneral = new models.Category({
            name: 'Général'
        });

        /* Devices */
        let deviceEeetop1 = new models.Device({
            fingerprint     : 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
            name            : 'Eeetop1',
            doubleValidation: true,
            offlineSupport  : true,
            showPicture     : true
        });

        let deviceEeetop2 = new models.Device({
            fingerprint     : 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
            name            : 'Eeetop2',
            doubleValidation: true,
            offlineSupport  : true,
            showPicture     : true
        });

        /* Fundations */
        let fundationUng = new models.Fundation({
            name   : 'UNG',
            website: 'http://ung.utt.fr/',
            mail   : 'ung@utt.fr'
        });

        let fundationFoyer = new models.Fundation({
            name   : 'Foyer',
            website: 'http://utt.fr/',
            mail   : 'foyer@utt.fr'
        });

        let fundationBde = new models.Fundation({
            name   : 'BDE',
            website: 'http://bde.utt.fr/',
            mail   : 'bde@utt.fr'
        });

        /* Groups */

        let groupCotisants = new models.Group({
            name    : 'Cotisants',
            isOpen  : true,
            isPublic: false
        });

        let groupNonCotisants = new models.Group({
            name    : 'Non Cotisants',
            isOpen  : true,
            isPublic: false
        });

        /* MeanOfLogin */
        let molGJEtuCard = new models.MeanOfLogin({
            type: 'etuId',
            data: '22000000353423'
        });

        let molGJEtuMail = new models.MeanOfLogin({
            type: 'etuId',
            data: 'gabriel.juchault@utt.fr'
        });

        /* MeanOfPayment */
        let meanofpaymentCard = new models.MeanOfPayment({
            slug: 'card',
            name: 'Carte'
        });

        let meanofpaymentCash = new models.MeanOfPayment({
            slug: 'cash',
            name: 'Liquide'
        });

        let meanofpaymentCheque = new models.MeanOfPayment({
            slug: 'cheque',
            name: 'Chèque'
        });

        let meanofpaymentGobby = new models.MeanOfPayment({
            slug: 'gobby',
            name: 'Gobby'
        });

        /* Periods */
        let periodEternity = new models.Period({
            name : 'Éternité',
            start: new Date(0),
            end  : new Date(21474000000000)
        });

        let periodPrevious = new models.Period({
            name : 'Avant',
            start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 5),
            end  : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3)
        });

        let periodAfter = new models.Period({
            name : 'Après',
            start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3),
            end  : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 5)
        });

        let periodNow = new models.Period({
            name : 'Maintenant',
            start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2),
            end  : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 2)
        });

        /* Points */
        let pointBde = new models.Point({
            name: 'BDE'
        });

        let pointFoyer = new models.Point({
            name: 'Foyer'
        });

        /* PeriodPoint */
        let periodPointEternityForEEtop1BDE   = new models.PeriodPoint({});
        let periodPointEternityForEEtop2Foyer = new models.PeriodPoint({});

        /* Prices */
        let price50 = new models.Price({
            amount: 50
        });

        let price100F1E = new models.Price({
            amount: 100
        });

        let price1003C = new models.Price({
            amount: 100
        });

        let price250 = new models.Price({
            amount: 250
        });

        /* Promotions */
        let promotionF1e = new models.Promotion({
            name: 'Formule 1€'
        });

        let promotion3crepes = new models.Promotion({
            name: '3 Crêpes'
        });

        /* Rights */
        let rightGJAdmin = new models.Right({
            name   : 'admin',
            isAdmin: true
        });

        /* Sets */
        let setBarresf1e = new models.Set({
            name: 'Barres Formule 1€'
        });

        let setCanettesf1e = new models.Set({
            name: 'Canettes Formule 1€'
        });

        /* Users */
        let userGJ = new models.User({
            firstname  : 'Gabriel',
            lastname   : 'Juchault',
            fullname   : 'Gabriel Juchault',
            nickname   : 'Extaze',
            pin        : '$2a$12$0Hgro3cPeVvZNWrpcBsT2O2AfAfMsoigS9na6V6esH3G462.WV2fm',
            password   : '$2a$12$aqJWiCvjD.azTpE2krKu3.1GDLHApaE.hfz2BM8pIeil.OJ1khST.',
            mail       : 'gabriel.juchault@utt.fr',
            credit     : 1200,
            isTemporary: false
        });

        let articles = {
            articleKinderDelice,
            articleMars,
            articleKinderCountry,
            articleIceTeaPeche,
            articleEau,
            articleIceTeaMangue,
            articleLiptonic,
            articleSchweppes,
            articleSchweppesAgrum,
            articleCocaCola,
            articleCrepe,
            articleBeer
        };

        let categories = {
            categoryBarres,
            categoryCanettes,
            categoryGeneral
        };

        let devices = {
            deviceEeetop1,
            deviceEeetop2
        };

        let fundations = {
            fundationUng,
            fundationFoyer,
            fundationBde
        };

        let groups = {
            groupCotisants,
            groupNonCotisants
        };

        let meansOfLogin = {
            molGJEtuCard,
            molGJEtuMail
        };

        let meansOfPayment = {
            meanofpaymentCard,
            meanofpaymentCash,
            meanofpaymentCheque,
            meanofpaymentGobby
        };

        let periods = {
            periodEternity,
            periodPrevious,
            periodAfter,
            periodNow
        };

        let periodPoints = {
            periodPointEternityForEEtop1BDE,
            periodPointEternityForEEtop2Foyer
        };

        let points = {
            pointBde,
            pointFoyer
        };

        let prices = {
            price50,
            price100F1E,
            price1003C,
            price250
        };

        let promotions = {
            promotionF1e,
            promotion3crepes
        };

        let rights = {
            rightGJAdmin
        };

        let sets = {
            setBarresf1e,
            setCanettesf1e
        };

        let users = {
            userGJ
        };

        let all = Object.values(articles)
            .concat(Object.values(categories))
            .concat(Object.values(devices))
            .concat(Object.values(fundations))
            .concat(Object.values(groups))
            .concat(Object.values(meansOfLogin))
            .concat(Object.values(meansOfPayment))
            .concat(Object.values(periods))
            .concat(Object.values(periodPoints))
            .concat(Object.values(points))
            .concat(Object.values(prices))
            .concat(Object.values(promotions))
            .concat(Object.values(rights))
            .concat(Object.values(sets))
            .concat(Object.values(users));

        let data = {
            articles,
            categories,
            devices,
            fundations,
            groups,
            meansOfLogin,
            meansOfPayment,
            periods,
            periodPoints,
            points,
            prices,
            promotions,
            rights,
            sets,
            users
        };

        return {
            data,
            all
        };
    },
    rels: (models, data) => {
        let arr = [];

        /* Articles - Relationships : cateogry, point, price, sets, promotion */
        data.articles.articleKinderDelice.prices = [ data.prices.price50 ];
        data.articles.articleKinderDelice.sets   = [ data.sets.setBarresf1e ];
        arr.push(data.articles.articleKinderDelice.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleMars.prices = [ data.prices.price50 ];
        data.articles.articleMars.sets   = [ data.sets.setBarresf1e ];
        arr.push(data.articles.articleMars.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleKinderCountry.prices = [ data.prices.price50 ];
        data.articles.articleKinderCountry.sets   = [ data.sets.setBarresf1e ];
        arr.push(data.articles.articleKinderCountry.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleIceTeaPeche.prices = [ data.prices.price50 ];
        data.articles.articleIceTeaPeche.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleIceTeaPeche.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleEau.prices = [ data.prices.price50 ];
        arr.push(data.articles.articleEau.saveAll({
            prices: true
        }));

        data.articles.articleIceTeaMangue.prices = [ data.prices.price50 ];
        data.articles.articleIceTeaMangue.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleIceTeaMangue.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleLiptonic.prices = [ data.prices.price50 ];
        data.articles.articleLiptonic.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleLiptonic.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleSchweppes.prices = [ data.prices.price50 ];
        data.articles.articleSchweppes.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleSchweppes.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleSchweppesAgrum.prices = [ data.prices.price50 ];
        data.articles.articleSchweppesAgrum.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleSchweppesAgrum.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleCocaCola.prices = [ data.prices.price50 ];
        data.articles.articleCocaCola.sets   = [ data.sets.setCanettesf1e ];
        arr.push(data.articles.articleCocaCola.saveAll({
            prices: true,
            sets  : true
        }));

        data.articles.articleCrepe.prices = [ data.prices.price50 ];
        arr.push(data.articles.articleCrepe.saveAll({
            prices: true
        }));

        data.articles.articleBeer.prices = [ data.prices.price250 ];
        arr.push(data.articles.articleBeer.saveAll({
            prices: true
        }));

        /* Category - Relationships : articles */
        data.categories.categoryGeneral.articles = [
            data.articles.articleEau,
            data.articles.articleCrepe,
            data.articles.articleBeer
        ];
        arr.push(data.categories.categoryGeneral.saveAll({
            articles: true
        }));

        data.categories.categoryCanettes.articles = [
            data.articles.articleIceTeaPeche,
            data.articles.articleIceTeaMangue,
            data.articles.articleLiptonic,
            data.articles.articleSchweppes,
            data.articles.articleSchweppesAgrum,
            data.articles.articleCocaCola
        ];
        arr.push(data.categories.categoryCanettes.saveAll({
            articles: true
        }));

        data.categories.categoryBarres.articles = [
            data.articles.articleKinderDelice,
            data.articles.articleMars,
            data.articles.articleKinderCountry
        ];
        arr.push(data.categories.categoryBarres.saveAll({
            articles: true
        }));

        /* Devices - Relationships : periodPoints */
        data.devices.deviceEeetop1.periodPoints = [ data.periodPoints.periodPointEternityForEEtop1BDE ];
        arr.push(data.devices.deviceEeetop1.saveAll({
            periodPoints: true
        }));

        data.devices.deviceEeetop2.periodPoints = [ data.periodPoints.periodPointEternityForEEtop2Foyer ];
        arr.push(data.devices.deviceEeetop2.saveAll({
            periodPoints: true
        }));

        /* Fundations - Relationships : prices, purchases */
        data.fundations.fundationFoyer.prices = [
            data.prices.price50,
            data.prices.price100F1E,
            data.prices.price1003C,
            data.prices.price250
        ];
        arr.push(data.fundations.fundationFoyer.saveAll({
            prices: true
        }));

        /* Groups - Relationships : users, prices */
        data.groups.groupCotisants.users  = [ data.users.userGJ ];
        data.groups.groupCotisants.prices = [
            data.prices.price50,
            data.prices.price100F1E,
            data.prices.price1003C,
            data.prices.price250
        ];
        arr.push(data.groups.groupCotisants.saveAll({
            users : true,
            prices: true
        }));

        /* Periods - Relationships : periodPoints, prices, rights */
        data.periods.periodEternity.periodPoints = [
            data.periodPoints.periodPointEternityForEEtop1BDE,
            data.periodPoints.periodPointEternityForEEtop2Foyer
        ];
        data.periods.periodEternity.prices = [
            data.prices.price50,
            data.prices.price100F1E,
            data.prices.price1003C,
            data.prices.price250
        ];

        arr.push(data.periods.periodEternity.saveAll({
            periodPoints: true,
            prices      : true
        }));

        data.periods.periodNow.rights = [ data.rights.rightGJAdmin ];
        arr.push(data.periods.periodNow.saveAll({
            rights: true
        }));

        /* Points - Relationships : periodPoints, articles, promotions, purchases, reloads */
        data.points.pointFoyer.periodPoints = [ data.periodPoints.periodPointEternityForEEtop2Foyer ];
        data.points.pointFoyer.articles     = [
            data.articles.articleKinderDelice,
            data.articles.articleMars,
            data.articles.articleKinderCountry,
            data.articles.articleIceTeaPeche,
            data.articles.articleEau,
            data.articles.articleIceTeaMangue,
            data.articles.articleLiptonic,
            data.articles.articleSchweppes,
            data.articles.articleSchweppesAgrum,
            data.articles.articleCocaCola,
            data.articles.articleCrepe,
            data.articles.articleBeer
        ];
        data.points.pointFoyer.promotions = [
            data.promotions.promotionF1e,
            data.promotions.promotion3crepes
        ];
        arr.push(data.points.pointFoyer.saveAll({
            articles  : true,
            promotions: true
        }));

        data.points.pointBde.periodPoints = [ data.periodPoints.periodPointEternityForEEtop1BDE ];
        arr.push(data.points.pointBde.saveAll({
            periodPoints: true
        }));

        /* Prices - Relationships : fundation, group, period, articles, promotion */
        data.prices.price50.articles = [
            data.articles.articleMars,
            data.articles.articleKinderCountry,
            data.articles.articleIceTeaPeche,
            data.articles.articleEau,
            data.articles.articleIceTeaMangue,
            data.articles.articleLiptonic,
            data.articles.articleSchweppes
        ];
        arr.push(data.prices.price50.saveAll({
            articles: true
        }));

        data.prices.price100F1E.promotion = data.promotions.promotionF1e;
        arr.push(data.prices.price100F1E.saveAll({
            promotion: true
        }));

        data.prices.price1003C.promotion = data.promotions.promotion3crepes;
        arr.push(data.prices.price1003C.saveAll({
            promotion: true
        }));

        data.prices.price250.articles = [ data.articles.articleBeer ];
        arr.push(data.prices.price250.saveAll({
            articles: true
        }));

        /* Promotions - Relationships : point, price, articles, sets */
        data.promotions.promotionF1e.sets = [
            data.sets.setBarresf1e,
            data.sets.setCanettesf1e
        ];
        arr.push(data.promotions.promotionF1e.saveAll({
            sets: true
        }));

        data.promotions.promotion3crepes.articles = [
            data.articles.articleCrepe,
            data.articles.articleCrepe,
            data.articles.articleCrepe
        ];
        arr.push(data.promotions.promotion3crepes.saveAll({
            articles: true
        }));

        /* Rights - Relationships : period, users */
        data.rights.rightGJAdmin.period = data.periods.periodNow;
        data.rights.rightGJAdmin.users  = [ data.users.userGJ ];
        arr.push(data.rights.rightGJAdmin.saveAll({
            period: true,
            users : true
        }));

        /* Users - Relationships : groups, rights, meansOfLogin */
        data.users.userGJ.meansOfLogin = [
            data.meansOfLogin.molGJEtuCard,
            data.meansOfLogin.molGJEtuMail
        ];
        arr.push(data.users.userGJ.saveAll({
            meansOfLogin: true
        }));

        return arr;
    }
};
