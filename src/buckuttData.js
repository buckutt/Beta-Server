'use strict';

export default models => {
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
        name : 'Bière',
        stock: 100
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
        name     : 'UNG',
        website  : 'http://ung.utt.fr/',
        mail     : 'ung@utt.fr'
    });

    let fundationFoyer = new models.Fundation({
        name     : 'Foyer',
        website  : 'http://utt.fr/',
        mail     : 'foyer@utt.fr'
    });

    let fundationBde = new models.Fundation({
        name     : 'BDE',
        website  : 'http://bde.utt.fr/',
        mail     : 'bde@utt.fr'
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
        start: new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 5),
        end  : new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 3)
    });

    let periodAfter = new models.Period({
        name : 'Après',
        start: new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 3),
        end  : new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 5)
    });

    let periodNow = new models.Period({
        name : 'Maintenant',
        start: new Date() - new Date(1000 * 60 * 60 * 24 * 30 * 2),
        end  : new Date() + new Date(1000 * 60 * 60 * 24 * 30 * 2)
    });

    /* Points */
    let pointBde = new models.Point({
        name: 'BDE',
    });

    let pointFoyer = new models.Point({
        name: 'Foyer',
    });

    /* PeriodPoint */
    let periodPointEternityForEEtop1BDE   = new models.PeriodPoint({});
    let periodPointEternityForEEtop2Foyer = new models.PeriodPoint({});

    /* Prices */
    let price50 = new models.Price({
        amount: 50,
    });

    let price100F1E = new models.Price({
        amount: 100,
    });

    let price1003C = new models.Price({
        amount: 100,
    });

    let price250 = new models.Price({
        amount: 250,
    });

    /* Promotions */
    let promotionF1e = new models.Promotion({
        name: 'Formule 1€',
    });

    let promotion3crepes = new models.Promotion({
        name: '3 Crêpes',
    });

    /* Rights */
    let rightGJAdmin = new models.Right({
        name   : 'admin',
        isAdmin: true,
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

    /* Articles - Relationships : cateogry, point, price, sets, promotion */
    articleKinderDelice.cateogry = categoryBarres;
    articleKinderDelice.points   = [ pointFoyer ];
    articleKinderDelice.prices   = [ price50 ];
    articleKinderDelice.sets     = [ setBarresf1e ];

    articleMars.category = categoryBarres;
    articleMars.points   = [ pointFoyer ];
    articleMars.prices   = [ price50 ];
    articleMars.sets     = [ setBarresf1e ];

    articleKinderCountry.category = categoryBarres;
    articleKinderCountry.points   = [ pointFoyer ];
    articleKinderCountry.prices   = [ price50 ];
    articleKinderCountry.sets     = [ setBarresf1e ];

    articleIceTeaPeche.category = categoryCanettes;
    articleIceTeaPeche.points   = [ pointFoyer ];
    articleIceTeaPeche.prices   = [ price50 ];
    articleIceTeaPeche.sets     = [ setCanettesf1e ];

    articleEau.category = categoryGeneral;
    articleEau.points   = [ pointFoyer ];
    articleEau.prices   = [ price50 ];

    articleIceTeaMangue.category = categoryCanettes;
    articleIceTeaMangue.points   = [ pointFoyer ];
    articleIceTeaMangue.prices   = [ price50 ];
    articleIceTeaMangue.sets     = [ setCanettesf1e ];

    articleLiptonic.category = categoryCanettes;
    articleLiptonic.points   = [ pointFoyer ];
    articleLiptonic.prices   = [ price50 ];
    articleLiptonic.sets     = [ setCanettesf1e ];

    articleSchweppes.category = categoryCanettes;
    articleSchweppes.points   = [ pointFoyer ];
    articleSchweppes.prices   = [ price50 ];
    articleSchweppes.sets     = [ setCanettesf1e ];

    articleSchweppesAgrum.category = categoryCanettes;
    articleSchweppesAgrum.points   = [ pointFoyer ];
    articleSchweppesAgrum.prices   = [ price50 ];
    articleSchweppesAgrum.sets     = [ setCanettesf1e ];

    articleCocaCola.category = categoryCanettes;
    articleCocaCola.points   = [ pointFoyer ];
    articleCocaCola.prices   = [ price50 ];
    articleCocaCola.sets     = [ setCanettesf1e ];

    articleCrepe.category   = categoryGeneral;
    articleCrepe.points     = [ pointFoyer ];
    articleCrepe.prices     = [ price50 ];
    articleCrepe.promotions = [ promotion3crepes ];

    articleBeer.category   = categoryGeneral;
    articleBeer.points     = [ pointFoyer ];
    articleBeer.prices     = [ price250 ];

    /* Categories - Relationships : articles */
    categoryBarres.articles = [
        articleKinderDelice,
        articleMars,
        articleKinderCountry
    ];

    categoryCanettes.articles = [
        articleIceTeaPeche,
        articleIceTeaMangue,
        articleLiptonic,
        articleSchweppes,
        articleSchweppesAgrum,
        articleCocaCola,
    ];

    categoryGeneral.articles = [
        articleEau,
        articleCrepe,
        articleBeer
    ];

    /* Devices - Relationships : points */
    deviceEeetop1.points       = [ pointFoyer ];
    deviceEeetop1.periodPoints = [ periodPointEternityForEEtop1BDE ];

    deviceEeetop2.points       = [ pointFoyer ];
    deviceEeetop2.periodPoints = [ periodPointEternityForEEtop2Foyer ];

    /* Fundations - Relationships : groups, prices */
    fundationFoyer.prices = [
        price50,
        price100F1E,
        price1003C,
        price250
    ];

    fundationBde.groups = [
        groupCotisants,
        groupNonCotisants
    ];

    /* Groups - Relationships : fundation, users, prices */
    groupCotisants.fundation = fundationFoyer;
    groupCotisants.users     = [ userGJ ];
    groupCotisants.prices    = [
        price50,
        price100F1E,
        price1003C,
        price250
    ];

    /* MeanOfLogin - Relationships : user */
    molGJEtuCard.user = userGJ;
    molGJEtuMail.user = userGJ;

    /* Periods - Relationships : prices, rights */
    periodEternity.prices = [
        price50,
        price100F1E,
        price1003C,
        price250
    ];

    periodNow.users = [ rightGJAdmin ];

    /* Points - Relationships : articles, promotions */
    pointFoyer.articles = [
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
    ];

    pointFoyer.promotions = [
        promotionF1e,
        promotion3crepes
    ];

    pointFoyer.periodPoints = [ periodPointEternityForEEtop2Foyer ];

    pointBde.periodPoints = [ periodPointEternityForEEtop1BDE ];

    /* PeriodPoint - Relationships : points, periods, devices */
    periodPointEternityForEEtop1BDE.point   = pointBde;
    periodPointEternityForEEtop1BDE.period  = periodEternity;
    periodPointEternityForEEtop1BDE.devices = [ deviceEeetop1 ];
    periodPointEternityForEEtop2Foyer.point   = pointFoyer;
    periodPointEternityForEEtop2Foyer.period  = periodEternity;
    periodPointEternityForEEtop2Foyer.devices = [ deviceEeetop2 ];

    /* Prices - Relationships : fundation, group, period, articles, promotion */
    price50.fundation = fundationFoyer;
    price50.group     = groupCotisants;
    price50.period    = periodEternity;
    price50.articles  = [
        articleMars,
        articleKinderCountry,
        articleIceTeaPeche,
        articleEau,
        articleIceTeaMangue,
        articleLiptonic,
        articleSchweppes,
        articleSchweppesAgrum,
        articleCocaCola,
        articleCrepe
    ];

    price100F1E.fundation = fundationFoyer;
    price100F1E.group     = groupCotisants;
    price100F1E.period    = periodEternity;
    price100F1E.promotion = promotionF1e;

    price1003C.fundation = fundationFoyer;
    price1003C.group     = groupCotisants;
    price1003C.period    = periodEternity;
    price1003C.promotion = promotion3crepes;

    price250.fundation = fundationFoyer;
    price250.group     = groupCotisants;
    price250.period    = periodEternity;
    price250.articles  = [ articleBeer ];

    /* Promotions - Relationships : point, price, articles, sets */
    promotionF1e.point = pointFoyer;
    promotionF1e.price = price100F1E;
    promotionF1e.sets  = [ setBarresf1e, setCanettesf1e ];

    promotion3crepes.point    = pointFoyer;
    promotion3crepes.price    = price1003C;
    promotion3crepes.articles = [
        articleCrepe,
        articleCrepe,
        articleCrepe
    ];

    /* Rights - Relationships : period, users */
    rightGJAdmin.period = periodNow;
    rightGJAdmin.users  = [ userGJ ];

    /* Sets - Relationships : promotion, articles */
    setBarresf1e.promotion = promotionF1e;
    setBarresf1e.articles  = [
        articleKinderDelice,
        articleMars,
        articleKinderCountry
    ];

    setCanettesf1e.promotion = promotionF1e;
    setCanettesf1e.articles  = [
        articleIceTeaPeche,
        articleIceTeaMangue,
        articleSchweppes,
        articleSchweppesAgrum,
        articleCocaCola
    ];

    /* Users - Relationships : groups, rights, meansOfLogin */
    userGJ.groups       = [ groupCotisants ];
    userGJ.rights       = [ groupCotisants ];
    userGJ.meansOfLogin = [ molGJEtuCard, molGJEtuMail ];

    let articles = [
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
    ];

    let categories = [
        categoryBarres,
        categoryCanettes,
        categoryGeneral
    ];

    let devices = [
        deviceEeetop1,
        deviceEeetop2
    ];

    let fundations = [
        fundationUng,
        fundationFoyer,
        fundationBde
    ];

    let groups = [
        groupCotisants,
        groupNonCotisants
    ];

    let meansOfLogin = [
        molGJEtuCard,
        molGJEtuMail
    ];

    let meansOfPayment = [
        meanofpaymentCard,
        meanofpaymentCash,
        meanofpaymentCheque,
        meanofpaymentGobby
    ];

    let periods = [
        periodEternity,
        periodPrevious,
        periodAfter,
        periodNow
    ];

    let points = [
        pointBde,
        pointFoyer
    ];

    let prices = [
        price50,
        price100F1E,
        price1003C,
        price250
    ];

    let promotions = [
        promotionF1e,
        promotion3crepes
    ];

    let rights = [
        rightGJAdmin
    ];

    let sets = [
        setBarresf1e,
        setCanettesf1e
    ];

    let users = [
        userGJ
    ];

    let data = {
        articles,
        categories,
        devices,
        fundations,
        groups,
        meansOfLogin,
        meansOfPayment,
        periods,
        points,
        prices,
        promotions,
        rights,
        sets,
        users
    };

    return data;
};
