module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    smsCodeField: 'input#code.input',
    cardNumberField: '#number',
    cardCodeField: 'input#code.card-input',
    checkboxCard1: '#card-1',
    messageField: '//input[@id="comment"]',
    
    //miscellaneous
    outsideCardCode: 'div class="head">Adding a card</div>',
    counterValue: '.counter-value',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    suppotiveButton: 'div=Supportive',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkButton: 'button=Link',
    blancketSwitch: '.switch',
    blancketSwitchCheck: '.switch-input',
    orderButton: 'span.smart-button-main',
    ppCloseButton: '//div[@class="payment-picker open"]//div[@class="section active"]//button[@class="close-button section-close"]',
    plusCounter: 'div=+',
    
    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '.pp-selector',
    addACardModal: '.card-wrapper',
    requirementBody: '.reqs-body',
    carSearchModal: 'div=Car search',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupportive: async function() {
        const supportiveButton = await $(this.suppotiveButton);
        await supportiveButton.waitForClickable();
        await supportiveButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitCardInfo: async function(cardNumber, cardCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.click();
        const paymentModal = await $(this.paymentModal);
        await paymentModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();
        const addACardModal = await $(this.addACardModal);
        await addACardModal.waitForDisplayed();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(cardNumber);
        //fillcardCode
        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.waitForDisplayed();
        await cardCodeField.setValue(cardCode);
        // lose focus and submit card info
        const outsideCardCode = await $(this.cardNumberField);
        await outsideCardCode.click();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForClickable();
        await linkButton.click();
        await paymentModal.waitForDisplayed();
    },

    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const smsCodeField = await $(this.smsCodeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await smsCodeField.setValue(code)
        await $(this.confirmButton).click()
    },
    writeAMessageForADriver: async function(actualMessage) {
        const messageField = await $(this.messageField);
        await messageField.waitForDisplayed ();
        messageField.setValue(actualMessage);
    },
    orderABlanketAndHandkerchiefs: async function() {
        const blancketSwitch = await $(this.blancketSwitch);
        await blancketSwitch.waitForDisplayed();
        await blancketSwitch.click();
    },    
};