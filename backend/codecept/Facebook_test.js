Feature('Facebook Tests');

Scenario('Facebook Post Reactions', (I) => {
    I.amOnPage('https://www.facebook.com');
    I.fillField('#email', 'ethanaclifton1997@gmail.com');
    I.fillField('#pass', secret(''));
    I.click('Log In');
    I.amOnPage('https://www.facebook.com/starlesscincinnati');
    pause();
});

xScenario('Facebook Post Times', (I) => {
    I.amOnPage('https://www.facebook.com');
    //pause();
});

xScenario('Facebook Like Count', (I) => {
    I.amOnPage('https://www.facebook.com');
    //pause();
});

xScenario('Facebook Follower Count', (I) => {
    I.amOnPage('https://www.facebook.com');
    //pause();
});
