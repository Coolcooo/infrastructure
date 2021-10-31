const { assert } = require('chai');

// describe('github', async function() {
//     it('Тест, который пройдет', async function() {
//         await this.browser.url('https://shri.yandex/hw/store/');
//         await this.browser.assertView('plain', '.navbar-brand', {
//             compositeImage: true,
//         });
//
//         // const title = await this.browser.$('#readme h1').getText();
//         // assert.equal(title, 'Hermione');
//     });
// });

const baseUrl = '/hw/store';
it('Верстка должна быть адаптирована под различные экраны', async function () {
    const optionsForScreenShot = {
        allowViewportOverflow: true,
    };
    await this.browser.url(baseUrl + '/');
    await this.browser.execute(() => localStorage.clear());
    await this.browser.refresh();
    await this.browser.setWindowSize(1920, 1080);
    await this.browser.assertView('main_big-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(800, 1080);
    await this.browser.assertView('main_medium-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(600, 1080);
    await this.browser.assertView('main_small-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(480, 1080);
    await this.browser.assertView('main_very-small-size', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/catalog');

    await this.browser.setWindowSize(1920, 1080);
    await this.browser.assertView('catalog_big-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(800, 1080);
    await this.browser.assertView('catalog_medium-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(600, 1080);
    await this.browser.assertView('catalog_small-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(480, 1080);
    await this.browser.assertView('catalog_very-small-size', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/delivery');

    await this.browser.setWindowSize(1920, 1080);
    await this.browser.assertView('delivery_big-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(800, 1080);
    await this.browser.assertView('delivery_medium-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(600, 1080);
    await this.browser.assertView('delivery_small-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(480, 1080);
    await this.browser.assertView('delivery_very-small-size', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/contacts');

    await this.browser.setWindowSize(1920, 1080);
    await this.browser.assertView('contacts_big-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(800, 1080);
    await this.browser.assertView('contacts_medium-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(600, 1080);
    await this.browser.assertView('contacts_small-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(480, 1080);
    await this.browser.assertView('contacts_very-small-size', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/cart');

    await this.browser.setWindowSize(1920, 1080);
    await this.browser.assertView('cart_big-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(800, 1080);
    await this.browser.assertView('cart_medium-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(600, 1080);
    await this.browser.assertView('cart_small-size', '.Application', optionsForScreenShot);
    await this.browser.setWindowSize(480, 1080);
    await this.browser.assertView('cart_very-small-size', '.Application', optionsForScreenShot);
});

it('Страницы: главная, условия доставки и контакты - имеют статическое содержимое', async function () {
    const optionsForScreenShot = {
        allowViewportOverflow: true,
    };
    await this.browser.url(baseUrl + '/');
    await this.browser.refresh();
    await this.browser.setWindowSize(1920, 1080);
    await this.browser.execute(() => localStorage.clear());

    await this.browser.refresh();
    await this.browser.assertView('main_is-static', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/delivery');
    await this.browser.refresh();
    await this.browser.assertView('delivery_is-static', '.Application', optionsForScreenShot);

    await this.browser.url(baseUrl + '/contacts');
    await this.browser.refresh();
    await this.browser.assertView('contacts_is-static', '.Application', optionsForScreenShot);

});

it('Корзина в хедере должна указывать количество уникальных добавленных товаров', async function () {
    await this.browser.url(baseUrl + '/catalog');
    await this.browser.setWindowSize(1920, 1080);
    await this.browser.execute(() => localStorage.clear());
    await this.browser.refresh();

    await this.browser.$('.ProductItem-DetailsLink').click();
    for (let i = 0; i < 5; i += 1) {
        await this.browser.$('.ProductDetails-AddToCart').click();
    }
    let cart = '';
    const elems = await this.browser.$$('.nav-link');
    for (let i = 0; i < elems.length; i += 1) {
        const textOfElem = await elems[i].getText();

        if (textOfElem.includes('Cart')) {
            cart = textOfElem;
        }
    }

    assert.include(cart, '1');

    await this.browser.url(baseUrl + '/cart');
    const count = await this.browser.$('.Cart-Count').getText();
    assert.include(count, '5');

    await this.browser.url(baseUrl + '/cart');
    await this.browser.$('.Cart-Clear').click();
    const table = await this.browser.$('.Cart-Table');
    assert.equal(table.error && table.error.error, 'no such element');


});

