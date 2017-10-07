/**
 *   @author Heinbokel, Doug (dheinbokel@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Weeks 3+4 project 2 Drive-Right || created: 10.6.2017
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');

let policyNum, birthYear, age, monthlyPremium, numberAtFaults, ageFee, premiumMonth, premiumDay, premiumYear, againChoice;
let goAgain;
let lastName, firstName;
const BASE_PRICE = 100, PER_AT_FAULT = 50, CURRENT_YEAR = 2017;

/**
 *   @method
 *   @desc dispatch method for this project
 *   @returns (null)
 */

function main(){
    setPolicyNum();
    setLastName();
    setFirstName();
    setBirthYear();
    setAge();
    setAgeFee();
    setPremiumMonth();
    setPremiumDay();
    setPremiumYear();
    setNumFaults();
    setMonthlyPremium();
    displayInformation();
    setGoAgain();

    if(goAgain === true){
        return main();
    }
    else{
        goodBye();
    }
}

main();

/**
 *   @method
 *   @desc sets the policy number of the customer to a random number, since I'm assuming that this would be done by
 *         the company and not the customer
 *   @returns (null)
 */

function setPolicyNum() {
    policyNum = Math.floor((Math.random()* 1000) + 1);
}
/**
 *   @method
 *   @desc sets the birthYear of the customer
 *         I chose these years for the min and max because the oldest living driver is 105
 *         and the youngest a driver can be for a policy is 15.  I chose 110 to be the oldest for a
 *         policy.
 *   @returns (null)
 */

function setBirthYear() {

    const MIN_YEAR = 1907;
    const MAX_YEAR = 2002;

    birthYear = Number(PROMPT.question("\nWhat year was the customer born? "));
    if (birthYear > MAX_YEAR || birthYear < MIN_YEAR || isNaN(birthYear)){
        console.log("\nSorry, that is not within the acceptable age range for a Drive-Right insurance policy or is not a number.");
        return setBirthYear();
    }
}

/**
 *   @method
 *   @desc sets the age of the customer
 *   @returns (null)
 */

function setAge() {
    age = CURRENT_YEAR - birthYear;
}

/**
 *   @method
 *   @desc sets the last name of the customer
 *   @returns (null)
 */

function setLastName() {
    lastName = PROMPT.question("\nWhat is the customer's last name? ");
}

/**
 *   @method
 *   @desc sets the first name of the customer
 *   @returns (null)
 */

function setFirstName() {
    firstName = PROMPT.question("\nWhat is the customer's first name? ");
}

/**
 *   @method
 *   @desc gets the number of at-fault accidents from the customer
 *   @returns (null)
 */

function setNumFaults() {
    numberAtFaults = Number(PROMPT.question("\nHow many at fault accidents has the customer been in, in the last 3 years? "));
    if (numberAtFaults < 0 || isNaN(numberAtFaults)) {
        console.log("\nSorry, that is not a valid input.");
        return setNumFaults();
    }
}
/**
 *   @method
 *   @desc sets the age fee of the customer...
 *         I created the 45 to 60 age bracket due to it being missing in the problem.
 *         I chose 0 as the added value because that age range seems to be the safest drivers
 *         and I thought that they would get a pass because of that for the age fee.
 *         Also, I chose this order for the ifs because many younger people will be either getting insurance
 *         for the first time, or switching around in their late 20's and 30's.  I don't think 60+ people would switch and
 *         get new policies as often.  So younger numbers for age would show up more often for this process.
 *   @returns (null)
 */

function setAgeFee() {
    if(age > 15 && age < 30 ){
        ageFee = 20;
    }
    else if(age >= 30 && age < 45){
        ageFee = 10;
    }
    else if(age >=45 && age < 60){
        ageFee = 0;
    }
    else{
        ageFee = 30;
    }
}

/**
 *   @method
 *   @desc sets the premium month
 *   @returns (null)
 */

function setPremiumMonth() {
    premiumMonth = Number(PROMPT.question("\nPremium due on which month? (example: 1 = January, 12 = December) "));
    if(premiumMonth < 1 || premiumMonth > 12 || isNaN(premiumMonth)){
        console.log("\nSorry, that is not a valid month.");
        return setPremiumMonth();
    }
}

/**
 *   @method
 *   @desc sets the premium day
 *         I set the options to be the 1st through the 28th of the month so that a month like February couldn't
 *         mess up the program should they try to choose February 31st.
 *   @returns (null)
 */

function setPremiumDay() {
    premiumDay = Number(PROMPT.question("\nPremium due on which day? (Options: 1 through 28 for each month) "));
    if(premiumDay < 1 || premiumDay > 28 || isNaN(premiumDay)){
        console.log("\nSorry, that is not a valid day.");
        return setPremiumDay();
    }
}

/**
 *   @method
 *   @desc sets the premium year
 *   @returns (null)
 */

function setPremiumYear() {
    premiumYear = Number(PROMPT.question("\nPremium due in which year? (Cannot be in the past and can't be more than a year in the future.) "));
    if(premiumYear < CURRENT_YEAR || premiumYear > (CURRENT_YEAR + 1) || isNaN(premiumYear)){
        console.log("\nSorry, that is not a valid year.");
        return setPremiumYear();
    }
}

/**
 *   @method
 *   @desc sets the monthly premium amount
 *   @returns (null)
 */

function setMonthlyPremium() {
    monthlyPremium = BASE_PRICE + ageFee + (numberAtFaults * PER_AT_FAULT);
}

/**
 *   @method
 *   @desc displays the customer policy information
 *   @returns (null)
 */

function displayInformation() {
    console.log(`\nCustomer: ${firstName} ${lastName}, age ${age}, new policy number is ${policyNum} and customer monthly premium will cost \$${monthlyPremium}`);
    console.log(`\nCustomer's first premium due date is: ${premiumMonth}-${premiumDay}-${premiumYear}.`);
}

/**
 *   @method
 *   @desc asks the user if they would like to input another customer record, 0 for no, 1 for yes
 *   @returns (null)
 */

function setGoAgain() {
    againChoice = Number(PROMPT.question("\nWould you like to add another customer? (Type 0 for no, 1 for yes)"));
    if(againChoice === 1){
        goAgain = true;
    }
    else if(againChoice === 0){
        goAgain = false;
    }
    else{
        console.log(`\nInvalid input.`);
        return setGoAgain();
    }
}

/**
 *   @method
 *   @desc displays a goodbye message
 *   @returns (null)
 */

function goodBye() {
    console.log(`\nEnding program...`);
}