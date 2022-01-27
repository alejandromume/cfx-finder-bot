const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const fetch = require("node-fetch")
const https = require("https")

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login("TOKEN")

bot.on('message', msg => {
    
    if(msg.content.startsWith(">cfind")){

        const args3 = msg.content.slice(">cfind".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        
        var headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.3",
        }
        
        https.get(urlfivem, function(res) {

            if(res.statusCode == 404){

                const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                msg.channel.send(mensaje);

            }else{

                fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {

                    if(!out["Data"]["connectEndPoints"][0].startsWith("http")) {

                        var split = `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/" + split[0]
                        fetch(urlip)
                            .then(res => res.json())
                            .then((out2) => {

                                if (out["icon"]) {
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new Discord.MessageAttachment(file, "graph.png")
                                    const mensaje = new Discord.MessageEmbed()

                                        .setColor("#c73e10")
                                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                                        .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\`\n\n/players.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/players.json)\n/info.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/info.json)\n/dynamic.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)`)
                                        .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                                        .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                                        .setThumbnail("attachment://graph.png")
                                        .attachFiles(att)

                                    msg.channel.send(mensaje);
                                } else {
                                    const mensaje = new Discord.MessageEmbed()
                                        .setColor("#c73e10")
                                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                                        .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\`\n\n/players.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/players.json)\n/info.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/info.json)\n/dynamic.json: [Click here](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)`)
                                        .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                                        .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                                    msg.channel.send(mensaje);
                                }


                            })

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                            .setColor("#c73e10")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .setDescription("```\n Cannot find server details...```")
                            .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                        msg.channel.send(mensaje);
                    }
                }).catch(() => {
                    const mensaje = new Discord.MessageEmbed()
                        .setColor("#c73e10")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Invalid Code```")
                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                    msg.channel.send(mensaje);

            })
        }

    })
        

    }else if(msg.content.startsWith(">cip")){
        const args3 = msg.content.slice(">cip".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){
                const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                msg.channel.send(mensaje);
            }else{
                fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    const mensaje = new Discord.MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                    .setColor("#c73e10")
                    .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                    .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                    msg.channel.send(mensaje);
                }).catch(() => {
                    const mensaje = new Discord.MessageEmbed()
                        .setColor("#c73e10")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Invalid Code```")
                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                    msg.channel.send(mensaje);

                })
            }
            
        })
        
    }else if(msg.content.startsWith(">help")){

        const mensaje = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setColor("#c73e10")
        .addField("\<:info:820801226216177684> CFX Server Info", "`>cfind [cfx code]`")
        .addField("\<:ip:820801530172801035> Get Server IP", "`>cip [cfx code]`")
        .addField("\<:logo:820801824050905129> Get Server Logo", "`>clogo [cfx code]`")
        .addField("\<:tags:820801679208349737> Get Server Tags", "`>ctags [cfx code]`")
        .addField("\<:resources:863110994791235624> Get Server Resources", "`>cresources [cfx code]`")
        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
        msg.channel.send(mensaje);
    
    }else if(msg.content.startsWith(">clogo")){

        const args3 = msg.content.slice(">clogo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    
                        if(!out["Data"]["connectEndPoints"][0].startsWith("http")){
                            var urlip = `http://${out["Data"]["connectEndPoints"][0]}/info.json`
                                                            
                                fetch(urlip)
                                .then(res => res.json())
                                .then((out2) => {
                                    
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new Discord.MessageAttachment(file, "icon.png")
                                    const mensaje = new Discord.MessageEmbed()
        
                                    .setColor("#c73e10")
                                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                                    //.setDescription("Image from server")
                                    .setImage("attachment://icon.png")
                                    //.setThumbnail("attachment://graph.png")
                                    .attachFiles(att)
        
                                    msg.channel.send(mensaje);
                                })
                        }
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
            msg.channel.send(mensaje);

        })
    }else if(msg.content.startsWith(">ctags")){

        const args3 = msg.content.slice(">clogo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["vars"]["tags"] && out["Data"]["hostname"]){

                        var tags = out["Data"]["vars"]["tags"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .addField("Server Name", `\`${name}\``.substring(0, 390))
                        .addField("Server Tags", `\`${tags}\``.substring(0, 1024))
                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                        msg.channel.send(mensaje);

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .setDescription("```\n Cannot find server tags```")
                        msg.channel.send(mensaje);
                    }
                    
                
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
            msg.channel.send(mensaje);

        })

    }else if(msg.content.startsWith(">cresources")){

        const args3 = msg.content.slice(">cresources".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["resources"] && out["Data"]["hostname"]){

                        var resources = out["Data"]["resources"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .addField("Server Name", `\`${name}\``.substring(0, 390))
                        .addField("Server Resources", `\`${resources}\``.substring(0, 1024))
                        .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                        msg.channel.send(mensaje);

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#c73e10")
                        .setDescription("```\n Cannot find server tags```")
                        msg.channel.send(mensaje);
                    }
                    
                
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
            msg.channel.send(mensaje);

        })
    
    }else if(msg.content.startsWith(">cowner")){
        const args3 = msg.content.slice(">cowner".length).split(' ');
        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
        .then(res => res.json())
        .then((out) => {
            if(out["Data"]["ownerName"]){
                const mensaje = new Discord.MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setColor("#c73e10")
                .addField("Owner Name", `\`${out["Data"]["ownerName"]}\``)
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
                 msg.channel.send(mensaje);
            }
        }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#c73e10")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("Coded by 𝗮𝗹𝗲𝗷𝗮𝗻𝗱𝗿𝗼𝗺𝘂𝗺𝗲#𝟐𝟎𝟔𝟒")
            msg.channel.send(mensaje);

        })
    }

})

