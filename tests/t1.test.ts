import { test, expect } from '@utils/test.fixtures';
import { CREDENTIALS } from '@data/constants';

test.describe('login', () => {
    test(`Check that user can Add item in cart`, async ({ po }) => {
        await test.step('Log in', async () => {
            await po.login.open('https://www.saucedemo.com/');

            await po.login.login(CREDENTIALS.STANDARD);

            expect(po.home.isOpened()).toBe(true);
        });

        await test.step('Add items to cart', async () => {
            await po.home.addItemToCart('Sauce Labs Backpack');

            await po.home.addItemToCart('Sauce Labs Bolt T-Shirt');

            await po.home.header.openShoppingCart();

            const item1 = await po.shoppingCart.getShoppingCartItemByTitle('Sauce Labs Backpack');

            const item2 = await po.shoppingCart.getShoppingCartItemByTitle('Sauce Labs Bolt T-Shirt');

            expect(await item1.getTitle()).toBe('Sauce Labs Backpack');
            expect(await item1.getPrice()).toBe('$29.99');
            expect(await item1.getNumberOfItems()).toBe('1');

            expect(await item2.getTitle()).toBe('Sauce Labs Bolt T-Shirt');
            expect(await item2.getPrice()).toBe('$15.99');
            expect(await item2.getNumberOfItems()).toBe('1');
        });

        await test.step('Checkout and fill user form', async () => {
            await po.shoppingCart.checkoutButton.click();

            await po.checkoutStepOne.fillForm({ firstName: 'test', lastName: 'test', zipCode: '123456' });

            await po.checkoutStepOne.checkoutInfoFormComponent.continueButton.click();

            expect(po.checkoutStepTwo.isOpened()).toBe(true);
        });

        await test.step('Verify payment info summary', async () => {
            const itemsTotalPrice = await po.checkoutStepTwo.calcTotalPriceForCartItems();

            const summaryInfo = await po.checkoutStepTwo.getSummaryInfo();

            expect(`Item total: $${itemsTotalPrice}`).toBe(summaryInfo.priceWithoutTaxes);

            await po.checkoutStepTwo.checkoutSummaryInfoComponent.finishButton.click();

            expect(po.checkoutComplete.isOpened()).toBe(true);
        });

        await test.step('Verify completed checkout page', async () => {
            const completeText = await po.checkoutComplete.getCompleteText();

            expect(completeText.header).toBe('THANK YOU FOR YOUR ORDER');

            expect(completeText.text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        });
    });
});
