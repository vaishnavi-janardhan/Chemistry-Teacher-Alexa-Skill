'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const SKILL_NAME = 'Chemistry Teacher';
const HELP_MESSAGE = 'You can ask me for the formula or name of a chemical compound, or you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Thank you! Goodbye!';
const ERROR_MESSAGE = 'Sorry, I dont know that. What else can I help you with?'

const compounds = [
    {
        "name" : "copper sulfate",
        "formula" : "CuSO4",
    },
    {
        "name" : "sodium bicarbonate",
        "formula" : "NaHCO3"
    },
    {
        "name" : "nitric acid",
        "formula" : "HNO3"
    },
    {
        "name" : "sodium hydroxide",
        "formula" : "NaOH"
    },
    {
        "name" : "methanol",
        "formula" : "CH3OH"
    },
    {
        "name" : "methane",
        "formula" : "CH4"
    },
    {
        "name" : "benzene",
        "formula" : "C6H6"
    },
    {
        "name" : "glucose",
        "formula" : "C6H12O6"
    },
    {
        "name" : "ammonia",
        "formula" : "NH3"
    },
    {
        "name" : "ethanol",
        "formula" : "C2H5OH"
    },
    {
        "name" : "sodium chloride",
        "formula" : "NaCl"
    },
    {
        "name" : "acetic acid",
        "formula" : "CH3COOH"
    },
    {
        "name" : "phosphoric acid",
        "formula" : "H3PO4"
    },
    {
        "name" : "carbon dioxide",
        "formula" : "CO2"
    },
    {
        "name" : "sulfuric acid",
        "formula" : "H2SO4"
    },
    {
        "name" : "hydrochloric acid",
        "formula" : "HCl"
    },
    {
        "name" : "water",
        "formula" : "H2O"
    },
    {
        "name" : "barium sulfate",
        "formula" : "BaSO4"
    },
    ];

const handlers = {
    'LaunchRequest': function () {
        this.response.speak('Hello there! <amazon:effect name="whispered">Chemical compounds sound scary?</amazon:effect> Don\'t worry, I am here to help. I can tell you the ' +
                                'name and formula of compounds. What do you want to know?').listen('What do you want?');
        this.emit(':responseReady');
    },
    'ChemicalFormulaIntent': function () {
        var chemName = null;
        if(this.event.request.intent.slots.ChemicalCompoundName.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH')
            chemName = this.event.request.intent.slots.ChemicalCompoundName.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        var formula = null;
        for(var i = 0; i < compounds.length; i++) {
            if (compounds[i].name == chemName)
                formula = compounds[i].formula;
        }
        if(formula != null)
            this.response.speak('The formula of ' + chemName + ' is ' + '<say-as interpret-as = "characters">' + formula + '</say-as>. What ' +
                                    'else can I help you with?').listen(HELP_REPROMPT);
        else
            this.response.speak('Sorry, I dont know this. What else can I help you with?').listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'ChemicalNameIntent' : function() {
        var chemFormula = null;
        if(this.event.request.intent.slots.ChemicalFormula.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH')
            chemFormula = this.event.request.intent.slots.ChemicalFormula.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        var name = null;
        for(var i = 0; i < compounds.length; i++) {
          if(compounds[i].formula == chemFormula)
                name = compounds[i].name;
        }
        if(name != null)
            this.response.speak('The name of ' + '<say-as interpret-as = "characters">' + chemFormula + '</say-as>' + ' is ' + name +
             '. What else can I help you with?').listen(HELP_REPROMPT);
        else
            this.response.speak('Sorry, I dont know this. What else can I help you with?').listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        this.response.speak(ERROR_MESSAGE).listen(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak(ERROR_MESSAGE).listen(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
