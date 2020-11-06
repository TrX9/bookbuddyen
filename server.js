const Telegraf = require('telegraf')

const bot = new Telegraf('1497207999:AAERf8x1l6bs8KTVe_lHy07vCiaLqhrP0pw')

const mysql = require('mysql');
var emoji = require('node-emoji').emoji;

const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, function() {
  console.log("Server started.......");
});


const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'i7bceRoBi1',
  password: 'Gzvvth3i3q',
  database: 'i7bceRoBi1',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) throw err; ;
  console.log('Connected!');
});

var minutes = 4, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 4 minutes check");
  // do your stuff here
  var sql = "SELECT * FROM Profiles";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record selected");
  });
}, the_interval);

var myData = [];

bot.start((ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,  'Hi ' + ctx.chat.first_name + '!  ' + emoji.wave + emoji.slightly_smiling_face + '\n\nClick "My Profile" to create / edit your profile, or "Match Me" to find a match!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Find A Match", callback_data:"match"}]
      ]
    }
    
  })
  console.log(ctx.chat)
})

bot.help((ctx) => {
  ctx.reply("This bot can perform the following commands\n  - /help\n\n - /mainmenu\n")
})


bot.command('/mainmenu', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'Hi ' + ctx.chat.first_name + '!  ' + emoji.wave + emoji.slightly_smiling_face + '\n\nClick "My Profile" to create / edit your profile, or "Match Me" to find a match!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Match Me", callback_data:"match"}]
      ]
    }
    
  })
          //console.log(ctx.chat.username);
})

bot.action('mainmenu', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,  'Hi ' + ctx.chat.first_name + '!  ' + emoji.wave + emoji.slightly_smiling_face + '\n\nClick "My Profile" to create / edit your profile, or "Match Me" to find a match!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Match Me", callback_data:"match"}]
      ]
    }
    
  })
          //console.log(ctx.chat.username);
})

bot.action('profile', (ctx) =>{
  
  myData.length = 0
  
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + ' Let us start with your gender, you are a' +emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Male", callback_data:"M"},{text: "Female", callback_data:"F"}]
      ]
    }
  })
})

bot.action('M', (ctx) =>{
  ctx.deleteMessage()
  myData.push(ctx.chat.first_name);
  myData.push(ctx.chat.username);
  myData.push("M");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Your age:' +emoji.large_blue_diamond ,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Over 18", callback_data:"over"},{text: "Under 18", callback_data:"under"}]
      ]
    }
  })
})

bot.action('F', (ctx) =>{
  ctx.deleteMessage()
  myData.push(ctx.chat.first_name);
  myData.push(ctx.chat.username);
  myData.push("F");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Your age:' +emoji.large_blue_diamond ,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Over 18", callback_data:"over"},{text: "Under 18", callback_data:"under"}]
      ]
    }
  })
})

bot.action('over', (ctx) =>{
  ctx.deleteMessage()
  myData.push("over");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'какой ваш любимый жанр?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Business literature", callback_data:"business"},{text: "Detectives and thrillers", callback_data:"detective"}],
        [{text: "Documentary literature", callback_data:"documentary"},{text: "Home, crafts, leisure, hobby", callback_data:"leisure"}],
        [{text: "Art, art history, design", callback_data:"art"},{text: "Computers and Internet", callback_data:"computers"}],
        [{text: "Literature for children", callback_data:"literkids"},{text: "Romance novels", callback_data:"love"}],
        [{text: "Science, education", callback_data:"science"},{text: "Poetry", callback_data:"poetry"}],
        [{text: "Adventure", callback_data:"adventure"},{text: "Religion, spirituality, esotericism", callback_data:"religion"}],
        [{text: "Reference literature", callback_data:"reference"},{text: "Fantasy", callback_data:"fantasy"}],
        [{text: "Psychology", callback_data:"psychology"},{text: "Philosophy", callback_data:"philosophy"}],
        [{text: "Technology", callback_data:"technique"},{text: "Classics", callback_data:"classics"}],
        [{text: "Other", callback_data:"other"}]
      ]
    }
    
  })
})

bot.action('under', (ctx) =>{
  ctx.deleteMessage()
  myData.push(ctx.chat.first_name);
  myData.push(ctx.chat.username);
  myData.push("under");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'какой ваш любимый жанр?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Business literature", callback_data:"business"},{text: "Detectives and thrillers", callback_data:"detective"}],
        [{text: "Documentary literature", callback_data:"documentary"},{text: "Home, crafts, leisure, hobby", callback_data:"leisure"}],
        [{text: "Art, art history, design", callback_data:"art"},{text: "Computers and Internet", callback_data:"computers"}],
        [{text: "Literature for children", callback_data:"literkids"},{text: "Romance novels", callback_data:"love"}],
        [{text: "Science, education", callback_data:"science"},{text: "Poetry", callback_data:"poetry"}],
        [{text: "Adventure", callback_data:"adventure"},{text: "Religion, spirituality, esotericism", callback_data:"religion"}],
        [{text: "Reference literature", callback_data:"reference"},{text: "Fantasy", callback_data:"fantasy"}],
        [{text: "Psychology", callback_data:"psychology"},{text: "Philosophy", callback_data:"philosophy"}],
        [{text: "Technology", callback_data:"technique"},{text: "Classics", callback_data:"classics"}],
        [{text: "Other", callback_data:"other"}]
      ]
    }
    
  })
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    GENRE CHOOSING 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('business', (ctx) =>{
  ctx.deleteMessage()
  myData.push("business");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('detective', (ctx) =>{
  ctx.deleteMessage()
    myData.push("detective");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('documentary', (ctx) =>{
  ctx.deleteMessage()
      myData.push("documentary");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('leisure', (ctx) =>{
  ctx.deleteMessage()
        myData.push("leisure");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('art', (ctx) =>{
  ctx.deleteMessage()
          myData.push("art");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('computers', (ctx) =>{
  ctx.deleteMessage()
            myData.push("computers");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('literkids', (ctx) =>{
  ctx.deleteMessage()
              myData.push("literkids");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('love', (ctx) =>{
  ctx.deleteMessage()
                myData.push("love");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('science', (ctx) =>{
  ctx.deleteMessage()
                  myData.push("science");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('poetry', (ctx) =>{
  ctx.deleteMessage()
                    myData.push("poetry");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('adventure', (ctx) =>{
  ctx.deleteMessage()
                      myData.push("adventure");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('religion', (ctx) =>{
  ctx.deleteMessage()
                        myData.push("religion");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('reference', (ctx) =>{
  ctx.deleteMessage()
                          myData.push("reference");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('fantasy', (ctx) =>{
  ctx.deleteMessage()
                            myData.push("fantasy");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('psychology', (ctx) =>{
  ctx.deleteMessage()
                              myData.push("psychology");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('philosophy', (ctx) =>{
  ctx.deleteMessage()
                                myData.push("philosophy");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('technique', (ctx) =>{
  ctx.deleteMessage()
                                  myData.push("technique");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('classics', (ctx) =>{
  ctx.deleteMessage()
                                    myData.push("classics");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})

bot.action('other', (ctx) =>{
  ctx.deleteMessage()
                                      myData.push("other");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What language would you like to read the book in?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Russian language", callback_data:"russian"},{text: "English language", callback_data:"english"},{text: "French language", callback_data:"french"}],
        [{text: "Spanish language", callback_data:"spanish"},{text: "Chinese language", callback_data:"chinese"},{text: "German language", callback_data:"german"}]
      ]
    }
  })
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    LANGUAGE CHOOSING

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('russian', (ctx) =>{
  ctx.deleteMessage()
  myData.push("russian");
  ctx.telegram.sendMessage(ctx.chat.id,  emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })

})

bot.action('english', (ctx) =>{
  ctx.deleteMessage()
    myData.push("english");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })
})

bot.action('french', (ctx) =>{
  ctx.deleteMessage()
      myData.push("french");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })
})

bot.action('spanish', (ctx) =>{
  ctx.deleteMessage()
  myData.push("spanish");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })
})

bot.action('chinese', (ctx) =>{
  ctx.deleteMessage()
    myData.push("chinese");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })
})

bot.action('german', (ctx) =>{
  ctx.deleteMessage()
      myData.push("german");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What period of history would you like to read?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Antiquity", callback_data:"antiquity"},{text: "Middle Ages", callback_data:"MA"},{text: "16th century", callback_data:"16th"}],
        [{text: "17th century", callback_data:"17th"},{text: "18th century", callback_data:"18th"},{text: "19th century", callback_data:"19th"}],
        [{text: "20th century literature", callback_data:"20th"},{text: "21st century literature", callback_data:"21st"}],
        [{text: "Not Important", callback_data:"notImportantperiod"}]
      ]
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    LANGUAGE INTERESTED IN

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('antiquity', (ctx) =>{
  ctx.deleteMessage()
  myData.push("antiquity");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('MA', (ctx) =>{
  ctx.deleteMessage()
    myData.push("MA");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('16th', (ctx) =>{
  ctx.deleteMessage()
      myData.push("16th");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('17th', (ctx) =>{
  ctx.deleteMessage()
        myData.push("17th");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('18th', (ctx) =>{
  ctx.deleteMessage()
          myData.push("18th");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('19th', (ctx) =>{
  ctx.deleteMessage()
            myData.push("19th");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('20th', (ctx) =>{
  ctx.deleteMessage()
              myData.push("20th");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('21st', (ctx) =>{
  ctx.deleteMessage()
                myData.push("21st");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

bot.action('notImportantperiod', (ctx) =>{
  ctx.deleteMessage()
                myData.push("notImportantperiod");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'Are you interested in foreign or Russian literature?'+ emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Foreign, namely English", callback_data:"FEnglish"}],
        [{text: "Foreign, namely French", callback_data:"FFrench"}],
        [{text: "Foreign, namely Spanish", callback_data:"FSpanish"}],
        [{text: "Foreign, namely Chinese", callback_data:"FChinese"}],
        [{text: "Foreign, namely German", callback_data:"FGerman"}],
        [{text: "Russian literature", callback_data:"RLiter"}],
        [{text: "Not Important", callback_data:"notImportantLinterest"}]
      ]
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    Book Length

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('FEnglish', (ctx) =>{
  ctx.deleteMessage()
  myData.push("FEnglish");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('FFrench', (ctx) =>{
  ctx.deleteMessage()
    myData.push("FFrench");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('FSpanish', (ctx) =>{
  ctx.deleteMessage()
      myData.push("FSpanish");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('FChinese', (ctx) =>{
  ctx.deleteMessage()
  myData.push("FChinese");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('FGerman', (ctx) =>{
  ctx.deleteMessage()
    myData.push("FGerman");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('RLiter', (ctx) =>{
  ctx.deleteMessage()
      myData.push("RLiter");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

bot.action('notImportantLinterest', (ctx) =>{
  ctx.deleteMessage()
      myData.push("notImportantLinterest");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'How long should the book be?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "More than 1000 pages", callback_data:"Over1000"},{text: "500-1000 pages", callback_data:"Over500"},{text: "100-500 pages", callback_data:"Over100"}],
        [{text: "Less than 100 pages", callback_data:"Over0"},{text: "Not Important", callback_data:"notImportant"}]
      ]
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    Book Format

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('Over1000', (ctx) =>{
  ctx.deleteMessage()
  myData.push("Over1000");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond +  'What book format is preferable for you?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Audiobook", callback_data:"audiobook"},{text: "Printed", callback_data:"Printed"},{text: "Electronic", callback_data:"electronic"}]
      ]
    }
  })
})

bot.action('Over500', (ctx) =>{
  ctx.deleteMessage()
    myData.push("Over500");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What book format is preferable for you?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Audiobook", callback_data:"audiobook"},{text: "Printed", callback_data:"Printed"},{text: "Electronic", callback_data:"electronic"}]
      ]
    }
  })
})

bot.action('Over100', (ctx) =>{
  ctx.deleteMessage()
      myData.push("Over100");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What book format is preferable for you?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Audiobook", callback_data:"audiobook"},{text: "Printed", callback_data:"Printed"},{text: "Electronic", callback_data:"electronic"}]
      ]
    }
  })
})

bot.action('Over0', (ctx) =>{
  ctx.deleteMessage()
  myData.push("Over0");
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What book format is preferable for you?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Audiobook", callback_data:"audiobook"},{text: "Printed", callback_data:"Printed"},{text: "Electronic", callback_data:"electronic"}]
      ]
    }
  })
})

bot.action('notImportant', (ctx) =>{
  ctx.deleteMessage()
    myData.push("notImportant");
  console.log(myData)
  console.log(ctx.chat.username, ctx.chat.first_name, myData[0])
  ctx.telegram.sendMessage(ctx.chat.id, emoji.large_blue_diamond + 'What book format is preferable for you?' + emoji.large_blue_diamond,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Audiobook", callback_data:"audiobook"},{text: "Printed", callback_data:"Printed"},{text: "Electronic", callback_data:"electronic"}]
      ]
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////    Short Description

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.action('audiobook', (ctx) =>{
  ctx.deleteMessage()
  myData.push("audiobook");
  insertToDB()
  ctx.telegram.sendMessage(ctx.chat.id, 'Thank you for filling out the form! \ n \ n You can now click "Match Me" to check if there is a match, or "My Profile" to edit!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Match Me", callback_data:"match"}]
      ]
    }
    
  })
      
 })

bot.action('Printed', (ctx) =>{
  ctx.deleteMessage()
  myData.push("Printed");
  insertToDB()  
  ctx.telegram.sendMessage(ctx.chat.id, 'Thank you for filling out the form! \ n \ n You can now click "Match Me" to check if there is a match, or "My Profile" to edit!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Match Me", callback_data:"match"}]
      ]
    }
    
  })
})

bot.action('electronic', (ctx) =>{
  ctx.deleteMessage()
  myData.push("electronic");
  insertToDB()  
  ctx.telegram.sendMessage(ctx.chat.id, 'Thank you for filling out the form! \ n \ n You can now click "Match Me" to check if there is a match, or "My Profile" to edit!',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "My Profile", callback_data:"profile"},{text: "Match Me", callback_data:"match"}]
      ]
    }
    
  })
})

//bot.use((ctx) => {
//  ctx.reply("Hi!")
//})


bot.action('match', (ctx) =>{
  var sql ="SELECT t.*, 0.30*(t1.genre = t.genre) + 0.10*(t1.bLanguage = t.bLanguage) + 0.14*(t1.bPeriod = t.bPeriod) + 0.15*(t1.bLanInterest = t.bLanInterest) + 0.16*(t1.bLength = t.bLength) + 0.15*(t1.bFormat = t.bFormat) as score from Profiles t inner join Profiles t1 on t1.username <> t.username where t1.username = '" + ctx.chat.username + "' order by score desc LIMIT 4";
  connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(result[2].score);
        if(result.length < 1 || result == undefined)
        {
          ctx.telegram.sendMessage(ctx.chat.id, 'please create a profile to continue!',
          {
            reply_markup: {
              inline_keyboard: [
                [{text: "Create Profile", callback_data:"profile"}]
              ]
              }
          })
        }
        else if(result[0].score>0.50)
          {
            var age1;
            var gender1;
            var scorepercentage;
            scorepercentage = result[0].score*100;
            scorepercentage = Math.ceil(scorepercentage);
            if(result[0].age=="over"){age1 = "Over 18"}
            else { age1 = "Under 18" }
            if(result[0].gender=="M"){gender1 = "Male"}
            else { gender1 = "Female" }
            ctx.telegram.sendMessage(ctx.chat.id, emoji.green_book + emoji.closed_book + 'You have a match!! '+ emoji.closed_book + emoji.green_book + '\n\nYour match is @' + result[0].username +'  '+ emoji.arrow_left + emoji.arrow_left + '\nИмя: '+ result[0].name + '\nВозраст: '+ age1 +'\nПол: '+ gender1 +'\n Your matching score is: ' + scorepercentage + '%\n\n Нажмите на имя пользователя, чтобы начать беседу!',
            {
                reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"},{text: "show different result", callback_data:"match_next1"}]
                ]
                }
            })
          }
        else if(result[0].score<0.50)
          {
            ctx.telegram.sendMessage(ctx.chat.id, 'К сожалению, на данный момент нет совпадений.' + emoji.pensive,
            {
              reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"}]
                ]
                }
            })
          }
        //else ctx.telegram.sendMessage(ctx.chat.id, 'No match yet, check back later!')

      
    });
  
})

bot.action('match_next1', (ctx) =>{
    var sql ="SELECT t.*, 0.30*(t1.genre = t.genre) + 0.10*(t1.bLanguage = t.bLanguage) + 0.14*(t1.bPeriod = t.bPeriod) + 0.15*(t1.bLanInterest = t.bLanInterest) + 0.16*(t1.bLength = t.bLength) + 0.15*(t1.bFormat = t.bFormat) as score from Profiles t inner join Profiles t1 on t1.username <> t.username where t1.username = '" + ctx.chat.username + "' order by score desc LIMIT 4";
    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(result[2].score);
      
        if(result[1].score>0.50)
          {
            var age1;
            var gender1;
            var scorepercentage;
            scorepercentage = result[1].score*100;
            scorepercentage = Math.ceil(scorepercentage);

            if(result[1].age=="over"){age1 = "Over 18"}
            else { age1 = "Under 18" }
            if(result[1].gender=="M"){gender1 = "Male"}
            else { gender1 = "Female" }
            ctx.telegram.sendMessage(ctx.chat.id, emoji.green_book + emoji.closed_book + 'You have a match!! '+ emoji.closed_book + emoji.green_book + '\n\nYour match is @' + result[1].username +'  '+ emoji.arrow_left + emoji.arrow_left + '\nИмя: '+ result[1].name + '\nВозраст: '+ age1 +'\nПол: '+ gender1 +'\n Your matching score is: ' + scorepercentage + '%\n\n Нажмите на имя пользователя, чтобы начать беседу!',
            {
                reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"},{text: "show different result", callback_data:"match_next2"}]
                ]
                }
            })
          }
        else if(result[1].score<0.50)
          {
            ctx.telegram.sendMessage(ctx.chat.id, 'Sorry, there are no more matches at the moment..' + emoji.pensive,
            {
              reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"}]
                ]
                }
            })
          }
        //else ctx.telegram.sendMessage(ctx.chat.id, 'No match yet, check back later!')

      
    });
})

bot.action('match_next2', (ctx) =>{
  var sql ="SELECT t.*, 0.30*(t1.genre = t.genre) + 0.10*(t1.bLanguage = t.bLanguage) + 0.14*(t1.bPeriod = t.bPeriod) + 0.15*(t1.bLanInterest = t.bLanInterest) + 0.16*(t1.bLength = t.bLength) + 0.15*(t1.bFormat = t.bFormat) as score from Profiles t inner join Profiles t1 on t1.username <> t.username where t1.username = '" + ctx.chat.username + "' order by score desc LIMIT 4";
  connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(result[2].score);
      
        if(result[2].score>0.50)
          {
            var age1;
            var gender1;
            var scorepercentage;
            scorepercentage = result[2].score*100;
            scorepercentage = Math.ceil(scorepercentage);

            if(result[2].age=="over"){age1 = "Over 18"}
            else { age1 = "Under 18" }
            if(result[2].gender=="M"){gender1 = "Male"}
            else { gender1 = "Female" }
            ctx.telegram.sendMessage(ctx.chat.id, emoji.green_book + emoji.closed_book + 'You have a match!! '+ emoji.closed_book + emoji.green_book + '\n\nYour match is @' + result[2].username +'  '+ emoji.arrow_left + emoji.arrow_left + '\nИмя: '+ result[2].name + '\nВозраст: '+ age1 +'\nПол: '+ gender1 +'\n Your matching score is: ' + scorepercentage + '%\n\n Нажмите на имя пользователя, чтобы начать беседу!',
            {
                reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"},{text: "show different result", callback_data:"match_next3"}]
                ]
                }
            })
          }
        else if(result[2].score<0.50)
          {
            ctx.telegram.sendMessage(ctx.chat.id, 'Sorry, there are no more matches at the moment..' + emoji.pensive,
            {
              reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"}]
                ]
                }
            })          
          }
        //else ctx.telegram.sendMessage(ctx.chat.id, 'No match yet, check back later!')

      
    });
})

bot.action('match_next3', (ctx) =>{
  var sql ="SELECT t.*, 0.30*(t1.genre = t.genre) + 0.10*(t1.bLanguage = t.bLanguage) + 0.14*(t1.bPeriod = t.bPeriod) + 0.15*(t1.bLanInterest = t.bLanInterest) + 0.16*(t1.bLength = t.bLength) + 0.15*(t1.bFormat = t.bFormat) as score from Profiles t inner join Profiles t1 on t1.username <> t.username where t1.username = '" + ctx.chat.username + "' order by score desc LIMIT 4";
  connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(result[2].score);
      
        if(result[3].score>0.50)
          {
            var age1;
            var gender1;
            var scorepercentage;
            scorepercentage = result[3].score*100;
            scorepercentage = Math.ceil(scorepercentage);

            if(result[3].age=="over"){age1 = "Over 18"}
            else { age1 = "Under 18" }
            if(result[3].gender=="M"){gender1 = "Male"}
            else { gender1 = "Female" }
            ctx.telegram.sendMessage(ctx.chat.id, emoji.green_book + emoji.closed_book + 'You have a match!! '+ emoji.closed_book + emoji.green_book + '\n\nYour match is @' + result[3].username +'  '+ emoji.arrow_left + emoji.arrow_left + '\nИмя: '+ result[3].name + '\nВозраст: '+ age1 +'\nПол: '+ gender1 +'\n Your matching score is: ' + scorepercentage + '%\n\n Нажмите на имя пользователя, чтобы начать беседу!',
            {
                reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"},{text: "show different result", callback_data:"match_next4"}]
                ]
                }
            })
          }
        else if(result[3].score<0.50)
          {
            ctx.telegram.sendMessage(ctx.chat.id, 'Sorry, there are no more matches at the moment..' + emoji.pensive,
            {
              reply_markup: {
                inline_keyboard: [
                  [{text: "Back to Menu", callback_data:"mainmenu"}]
                ]
                }
            })
          }
        //else ctx.telegram.sendMessage(ctx.chat.id, 'No match yet, check back later!')

      
    });
})

bot.action('match_next4', (ctx) =>{
  ctx.telegram.sendMessage(ctx.chat.id, 'Sorry, there are no more matches at the moment..' + emoji.pensive,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Back to Menu", callback_data:"mainmenu"}]
      ]
      }
  })
        })


function insertToDB()
{
  var sql = "DELETE FROM Profiles WHERE username = '"+ myData[1] +"';INSERT INTO Profiles (name, username,gender, age, genre, bLanguage, bPeriod, bLanInterest, bLength, bFormat) VALUES ('" + myData[0] + "','" + myData[1] + "','" + myData[2] + "','" + myData[3] + "','" + myData[4] + "','" + myData[5] + "','" + myData[6] + "','" + myData[7] + "','" + myData[8] + "','" + myData[9] + "')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}
bot.launch()
