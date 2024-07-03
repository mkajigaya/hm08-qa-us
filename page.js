module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    smsCodeField: 'input#code.input',
    cardNumberField: '#number',
    cardCodeField: 'input#code.card-input',
    checkboxCard1: '#card-1',
    messageField: '//label[contains(text(), "Message to the driver...")]',
    message: 'input#comment.input',
    
    
    
    //miscellaneous
    outsideCardCode: 'div class="head">Adding a card</div>',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    suppotiveButton: 'div=Supportive',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkButton: 'button=Link',
    requirementButton: 'div=Order requirements',
    blancketSwitch: '//div[contains(text(), "Blanket and handkerchiefs")]//input[@class="switch-input"]',
    orderButton: 'span.smart-button-main',
    ppCloseButton: '//div[@class="payment-picker open"]//div[@class="section active"]//button[@class="close-button section-close"]',
    plusCounter: '//div[@class="r-counter-container"]//div[contains(text(), "Ice cream")]//div[@class=counter-plus]',
    counterValue: '//div[@class="r-counter-container"]//div[contains(text(), "Ice cream")]//div[@class="counter-value"]',


    
    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '.pp-selector',
    addACardModal: '.card-wrapper',
    requirementBody: '.reqs-body',
    carSearchModal: '//div[contains(text(), "Car search")]',

    
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
        //await this.fillCardNumber(cardNumber);
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
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const smsCodeField = await $(this.smsCodeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await smsCodeField.setValue(code)
        await $(this.confirmButton).click()
    },
    writeAMessageForADriver: async function() {
        const messageField = await $(page.messageField);
        await messageField.waitForDisplayed();
        await messageField.click();
        const message = await $(page.message);
        await message.setValue('Get some apples.');
    },
    orderABlanketAndHandkerchiefs: async function() {
        const requirementButton = await $(page.requirementButton);
        await requirementButton.click();
        //check the selecter
        const blancketSwitch = await $(page.blancketSwitch);
        await blancketSwitch.waitForDisplayed();
        await blancketSwitch.click();
    },    
};