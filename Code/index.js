'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'HappyThanksgiving';
const introTextMain = `Happy Thanksgiving! My friend Joey and I are here with you to celebrate this wonderful holiday by re-living the story of the first Thanksgiving! Joey say hi!` + `<voice name = "Joey">  Hi kids – get ready to travel with us to a time when the pilgrims first came to America, and met the local native Americans. </voice>` + `  and together, they celebrated the first  Thanksgiving.`+ `<voice name = "Joey"> and while we tell you the story – lets also play a little game,  We will ask you some questions so you can check how much Thanksgiving history you know already – let start and have some fun! </voice>`
const introMusic = '<audio src="soundbank://soundlibrary/musical/amzn_sfx_musical_drone_intro_01"/>' 
const journeyBegins = '<audio src="soundbank://soundlibrary/weather/thunder/thunder_02"/>' + 'The waves were rough, the weather was bad – with lots of storms.' + ' <voice name = "Joey"> In September of the year sixteen hundred and twenty, a ship with 102 brave women men and children left their country in a ship, they are known as the pilgrims. </voice>'+ ' They wanted to go to the new world, where they could live freely and practice what they believed in with no one telling them not to. But it was a rough journey, some of them got very sea sick  – but finally, after more than 2 months on this difficult journey they made it to land.' + '<audio src="soundbank://soundlibrary/human/amzn_sfx_crowd_excited_cheer_01"/>'
const isCorrect = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02"/>'+' You are Correct!';
const isNotCorrect = '<audio src="soundbank://soundlibrary/gameshow/gameshow_04"/>' + 'Oops! not quite. ';
//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = introMusic + introTextMain + journeyBegins;
        //welcome screen message
        let displayText = "Happy Thanksgiving"
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'JourneyBeginsIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers

// the journey begins
const JourneyBeginsIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'JourneyBeginsIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let firstAnswer = intent.slots.firstAnswer.value.toLowerCase() ;
      let iScore = 0
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    

      let speechSuffix = ' the ship was called the Mayflower.  Now  - lets carry on with our story. '; 
      let nextStory = ' Once the pilgrims landed – they realized that they actually got a little lost on the way, and ended up more north of where they had planned to go.'+ '<voice name = "Joey"> They found a village that was abandoned – </voice>' + '<audio src="soundbank://soundlibrary/nature/amzn_sfx_strong_wind_whistling_01"/> '+ '<voice name = "Joey"> no one lived there any more.  They decided to settle down, setup a colony and gave it a name.  They also put together a document called the Mayflower Compact. This document had their plans to set up an equal and just government structure. </voice>';
      if (firstAnswer == 'mayflower' || firstAnswer == 'the mayflower') {
          iScore ++;
         speechText = isCorrect +  speechSuffix + nextStory;
      }
     else {
         speechText = isNotCorrect + speechSuffix + nextStory;
     }
     sessionAttributes.totalScore = iScore;
      displayText = `The Pilgrims Set Out for the New World`;
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'SettleInIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// Settling in
const SettleInIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SettleInIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let secondAnswer = intent.slots.secondAnswer.value.toLowerCase() ;
      let iScore = 0
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    

      let speechSuffix = ' the pilgrims had landed in cape cod, Massachussettes.  Now  - lets carry on with our story. '; 
      let nextStory = 'After reaching america, things did not get better for the pilgrims. They did not know how to live in these conditions, it was winter and they were tired, many of them were sick. ' + ' <voice name = "Joey"> But help soon came – the local native americans took care of them, trained them on how to survive the winter, how to grow corn, extract sap from maple trees, catch fish in the rivers and avoid poisonous plants. </voice>';
      if (secondAnswer == 'cape cod') {
          iScore ++;
         speechText = isCorrect +  speechSuffix + nextStory;
      }
     else {
         speechText = isNotCorrect + speechSuffix + nextStory;
     }
     sessionAttributes.totalScore = sessionAttributes.totalScore + iScore;
     handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      displayText = `The Pilgrims Settled Down in America`;
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'ColonyNameIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

  // Colony Name Intent

  const ColonyNameIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ColonyNameIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let thirdAnswer = intent.slots.thirdAnswer.value.toLowerCase() ;
      let iScore = 0
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    

      let speechSuffix = ' the pilgrims named the colony plymouth - the same name as the port in England they had sailed from. Lets continue with our story. '; 
      let nextStory = 'With the help from the tribe the pilgrim settled down, began to hunt for food, learned to grow beans corn and squash. At the end of the next summer, they celebrated their first harvest with a 3 day festival. This was the first Thanksgiving.' + '<audio src="soundbank://soundlibrary/video_tunes/video_tunes_10"/>';
      if (thirdAnswer == 'plymouth') {
          iScore ++;
         speechText = isCorrect +  speechSuffix + nextStory;
      }
     else {
         speechText = isNotCorrect + speechSuffix + nextStory;
     }
     sessionAttributes.totalScore = sessionAttributes.totalScore + iScore;
     handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      displayText = `The Pilgrims Settled Down in America`;
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'HarvestIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// Harvest Intent
const HarvestIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HarvestIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let fourthAnswer = intent.slots.fourthAnswer.value.toLowerCase() ;
      let iScore = 0
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    

      let speechSuffix = ' the tribe that helped the pilgrims were called the wampanoag. without them the pilgrims would not have survived. '; 
      let nextStory = 'the pilgrims and the native Americans celebrated together, it was a big party - they enjoyed the fruits of the harvest, they ate fish and shellfish, potatoes, fruits and vegetables and pumpkin pies' +'<voice name = "Joey"> but there was no turkey in the menu, Can you believe it, no Turkey? </voice>';
      if (fourthAnswer == 'wampanoag' || fourthAnswer == 'the wampanoag') {
          iScore ++;
         speechText = isCorrect +  speechSuffix + nextStory;
      }
     else {
         speechText = isNotCorrect + speechSuffix + nextStory;
     }
 
     sessionAttributes.totalScore = sessionAttributes.totalScore + iScore;
      displayText = `The Pilgrims Settled Down in America`;
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'WrapUpIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };


  // Wrap up 
  const WrapUpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WrapUpIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let fifthAnswer = intent.slots.fifthAnswer.value.toLowerCase() ;
      let iScore = 0
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      iScore = sessionAttributes.totalScore = sessionAttributes.totalScore

      let speechSuffix = ' It was president abraham lincoln. He made thanksgiving a national holiday. '; 
      let nextStory = ' <break time="1s"/>'+' But most importantly, we hope you enjoyed the story – and learned how things end happily when different people get to know each other, help each other and make new friends. Have a wonderful thanksgiving with your family and friends.' + '<voice name = "Joey"> Happy Thanksgiving. </voice>' + 'Goodbye!';
      if (fifthAnswer == 'abraham lincoln' || fifthAnswer == 'lincoln') {
          iScore ++;
         speechText =  isCorrect +  speechSuffix + 'now lets see how you did with the quiz.' +' <break time="1s"/>'+ 'You got ' + iScore + ' out of 5 right' + nextStory;
      }
     else {
         speechText =  isNotCorrect + speechSuffix +  'now lets see how you did with the quiz.'+ '<break time="1s"/>' + ' You got ' + iScore + ' out of 5 right' + nextStory;
     } 
      displayText = `Happy Thanksgiving`;
        return handlerInput.responseBuilder
 
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(true)
        .getResponse();
      
    }
  };



//end Custom handlers


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

// Repeat
// repeat intent - to repeat what was said
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speechText = '';
        speechText = 'Sure, '+ sessionAttributes.speechText;
        
       
        let displayText = 'Happy Thanksgiving!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

// Fall back
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        //help text 
        let speechText = 'I am Sorry, I did not understand that. I am going to start over - but if you have to go, just say stop'
        return handlerInput.responseBuilder
          .addDelegateDirective({
            name: 'JourneyBeginsIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
// Help intent
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text 
        let speechText = 'This is the story of the first thanksgiving'
        let displayText = 'Happy Thanksgiving'
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                        JourneyBeginsIntentHandler,
                        SettleInIntentHandler,
                        ColonyNameIntentHandler,
                        HarvestIntentHandler,
                        WrapUpIntentHandler,
                         HelpIntentHandler,
                         RepeatIntentHandler,
                         FallbackIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
