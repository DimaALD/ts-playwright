import { Page } from '@playwright/test';

import { LoginPage } from './login.page';
import { HomePage } from './home.page';
import { ShoppingCartPage } from './shopping.cart.page';
import { CheckoutStepOnePage } from './checkout.step.one.page';
import { CheckoutStepTwoPage } from './checkout.step.two.page';
import { CheckoutCompletePage } from './checkout.complete.page';

export const pageProvider = (page: Page) => ({
    login: new LoginPage(page),
    home: new HomePage(page),
    shoppingCart: new ShoppingCartPage(page),
    checkoutStepOne: new CheckoutStepOnePage(page),
    checkoutStepTwo: new CheckoutStepTwoPage(page),
    checkoutComplete: new CheckoutCompletePage(page),
});
