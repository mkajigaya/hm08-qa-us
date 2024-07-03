const page = require('../../page');
const helper = require('../../helper')

describe('Order a taxi', () => {
    it('should set addresses', async () => {
        await browser.url(`/`);
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField);
        await toField.setValue('1300 1st St');
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await expect(callATaxiButton).toBeExisting();
    });

    it('should select Supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const supportiveButton = await $(page.suppotiveButton);
        await expect(supportiveButton.parentElement()).toHaveElementClass('active');
    });

    it('should fill the phone number', async () => { 
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        let countryCode = '+1';
        let phoneNumber = await helper.getPhoneNumber(countryCode);  
        await page.fillPhoneNumber(phoneNumber);
        const nextButton = await $(page.nextButton);
        await expect(nextButton).toBeClickable();
    });

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        let cardNumber = await helper.getCardNumber();
        let cardCode = await helper.getCardCode();
        await page.submitCardInfo(cardNumber, cardCode);
        const checkboxCard1 = await $(page.checkboxCard1);
        await expect(checkboxCard1).toHaveAttribute('checked');
    });

    it('should write a message for a driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.writeAMessageForADriver();
        await expect(message).toHaveAttribute('value', 'Get some apples.');
    });

    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await page.orderABlanketAndHandkerchiefs(); 
        await expect(blancketSwitch).toBeEnabled; // how do I verify this?
    });

    it('should order 2 Ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const requirementButton = await $(page.requirementButton);
        await requirementButton.click();
        // plusCounter & counterValue likely to have wrong selecters.
        const plusCounter = await $(page.plusCounter);
        await plusCounter.click();
        await plusCounter.click();
        const counterValue = await $(page.counterValue);
        await expect(counterValue).toHaveAttribute('counter-value', 2);
    });

    it('should show the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        let countryCode = '+1';
        let phoneNumber = await helper.getPhoneNumber(countryCode);  
        await page.submitPhoneNumber(phoneNumber);
        let cardNumber = await helper.getCardNumber();
        let cardCode = await helper.getCardCode();
        await page.submitCardInfo(cardNumber, cardCode);
        const ppCloseButton = await $(page.ppCloseButton);
        await ppCloseButton.click();
        await page.writeAMessageForADriver();
        const orderButton = await $(page.orderButton);
        await orderButton.toBeDisplayed();
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();
    });

    
});
