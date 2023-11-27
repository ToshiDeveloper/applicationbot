import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import DiscordModal from 'discord-modal';
import {Client,MessageEmbed} from 'discord.js';
import { createSpinner } from "nanospinner";
import Database from "st.db";
import ms from 'ms';
import express from 'express';
import synchronizeSlashCommands from './util/SyncCommands.mjs'
import commandResponse from './util/commandResponse.mjs'
const app = express()
const questions_db = new Database({path:"./util/questions.yml"})
const users_applys_db = new Database({path:"./util/users_applys.yml"})
const config_db = new Database({
  path:"./util/config.yml",
  encryption: {
    password:process.env["REPLIT_DB_URL"]
  }
})




app.get("/", (req, res) => {
 res.send("Bot and website started!")
})




getStarted()
async function getStarted(){
  if(await config_db.has({key:`config`}) == true) return await startBot()
  setTimeout(async()=> {
     const ask1 = await inquirer.prompt({
       name:"token_bot",
       type:'password',
       message:`Put your Bot token :`,
       mask:"*"
     })
     const ask2 = await inquirer.prompt({
       name:"owernid",
       type:'input',
       message:`Enter your Account Discord ID`,
     })
     const ask3 = await inquirer.prompt({
       name:"status_bot",
       type:'input',
       message:`Type in the status of the bot you want`,
     })
     const ask4 = await inquirer.prompt({
       name:"status_type",
       type:'list',
       message:`Choose the type of bot status`,
       choices:[
         "PLAYING","LISTENING","WATCHING","COMPETING"
       ]
     })
     await config_db.set({
       key:`config`,
       value:{
         token_bot:ask1.token_bot.replaceAll("\\","").replaceAll("~",""),
         owernid:ask2.owernid.replaceAll("\\","").replaceAll("~",""),
         status_bot:ask3.status_bot.replaceAll("\\","").replaceAll("~",""),
         status_type:ask4.status_type.replaceAll("\\","").replaceAll("~","")
       }
     })
     return await startBot()
  },3500)
} 


async function startBot(){
  console.clear()
  const spinner = createSpinner(`Processing..`).start()
  const client = new Client({intents: ['GUILDS', 'GUILD_MESSAGES']})
  const config = await config_db.get({key:`config`})
  client.login(config.token_bot).then(()=>{
    spinner.update({ text: 'Running the bot...' })
  }).catch(()=>{

    spinner.error({ text: 'Invalid Bot Token' })
  })
  DiscordModal(client)
  client.on("ready",async()=>{
    await synchronizeSlashCommands(client)
    client.user.setActivity(config.status_bot, { type:config.status_type });
    let bot_invite_link = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
    spinner.success({ text: `Logged in as ${client.user.tag} (${client.user.id})`})
     app.get('/',(r, s) => {
       s.send({message:"Bot by TN hazem#6101",youtube_channel:"https://www.youtube.com/c/TNhazem"})
      }).post('/',async(r, s) => {
        s.send({
          message:"Bot by TN hazem#6101",  youtube_channel:"https://www.youtube.com/c/TNhazem"
        })
        if(await config_db.has({key:`uptime`}) != true){
          console.log("\u001b[32m✔ \u001b[0mUptime has been done successfully")
          await config_db.set({key:`uptime`,value:true})
        }
      })
     .get("/invite", (req, res) => res.status(301).redirect(bot_invite_link))
     .listen(3000)
     console.log("\u001b[32m▣\u001b[0m \u001b[0mBot Run By \u001b[34;1mTN hazem#6101\u001b[0m")
     console.log("\u001b[32m▣ \u001b[0m\u001b[0m\u001b[40;1m\u001b[34;1mhttps://"+process.env.REPL_ID+".id.repl.co/invite\u001b[0m")
  })
  client.on(`interactionCreate`, async(interaction)=> await commandResponse(client,interaction,config))
  client.on("interactionTextInput",async(interaction)=>{
    if(interaction.customId.startsWith("opentextinput")){
      let customId = interaction.customId.split("-")[1]
      if(await questions_db.has({key:customId}) != true) return await interaction.reply({content:`:x: هذا التقديم لم يعد متاحا`,ephemeral:true})
      await interaction.deferReply({ephemeral:true})
      let data = await questions_db.get({key:customId})
      let time = ms(Date.now() - new Date(await users_applys_db.get({key:`time_${interaction.user.id}`})))
      let embed = new MessageEmbed() 
      .setTitle(data.name)
      .setColor('#2f3136')
      .setAuthor("apply send from "+interaction.user.tag,interaction.user.avatarURL())
      .setThumbnail(interaction.user.avatarURL())
      .setFooter(`Bot dev By c4 team`)
      .addField(`time spent`, `${time}` || "0s")
      interaction.fields.forEach((field)=>{
        embed.addField(data.questions[+field.custom_id.split("_")[0]].label,`\`\`\`${field.value}\`\`\``,true)
      })
      await client.channels.cache.get(data.channellogId).send({embeds:[embed]}).then(async()=>{
        await interaction.editReply({content:`☑ Your submission has been sent successfully`,ephemeral:true})
        await users_applys_db.set({key:`apply_${interaction.user.id}_${customId}`,value:true})
      }).catch(async()=>{
        await interaction.editReply({content:`❎Failed to submit your submission `,ephemeral:true})
      })
     }
  })
}

/*==================================================================
* code by TN hazem#6101 
* server https://discord.gg/c4clan
* youtube https://www.youtube.com/c/TNhazem
* © 2022 c4 taem ✔. All Rights Reserved To  TN hazem.
==================================================================*/
