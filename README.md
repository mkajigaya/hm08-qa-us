# Sprint 8 project
* In this project, the student tested Urban Routes, a ride request app.
* The student wrote automated tests to check the functionality of Urban Routes, specifically the full process of ordering a taxi: 1. Setting the address 2. Selecting Supportive plan 3. Filling in the phone number 4. Adding a credit card 5. Writing a message for the driver 6. Ordering a Blanket and handkerchiefs 7. Ordering 2 Ice creams 8. The car search modal appears
* Test scripts for each step can be found in createAnOrder.e2e.js file in the 'test\specs' folder.
* The student used the Page Object Model. Page objects and functions can be found in page.js and helper.js.

# Device/environment description
* Device - HP Pavilion Laptop
* OS - Windows 11 HOME
* Browser - Google Chrome Version 126.0.6478.127 (Official Build) (64-bit)
* Remote server URL generated at: https://tripleten.com/trainer/qa-engineer-us/lesson/b95d5224-306b-4339-a301-94c5bc373960/?from=program

# Tools used
* Dev Tool
* VS Code
* GitHub
* WebdriverIO

# Techniques used
* Functional testing

# How to run the tests
1. To generate a remote server URL, click the black recutangle button with "Start" text at the Sprint8 project page (via the link in the # Device/environment description). Copy the server address.
2. Open 'wdio.conf.js' file in 'hm08-qa-us' directory, paste the address in between the quotation marks for 'baseUrl' on the line 31 (example: baseUrl: 'https://cnt-b2837e24-bf48-403d-9417-70e84950a452.containerhub.tripleten-services.com'), and save the change.
3. Execute the 'npm run wdio' command from the project directory in the terminal to run all tests.