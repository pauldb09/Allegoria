'use strict';

const Command = require('../../utils/Command.js');
const moment = require("moment")

class Help extends Command {
    constructor() {
        super({
            name: 'clan-home',
            category: '<:clan:929660809880141874> Clan',
            description: 'Gives informations about your current clan or another clan',
            options: [{
                    type: "STRING",
                    name: "clan_name",
                    description: "The clan you want to get informations to",
                    required: false,
                },

            ],
            example: [],
        })
    }

    async run(ctx, userDB) {
            if (!userDB.done) return ctx.errorMessage("Calm down! You have to complete the configuration of your account! Do `/setup-profile`")
            const name = ctx.args.getString("clan_name")
            if (name) {
                const clan = await ctx.database.getClan(name)
                if (!clan) return ctx.errorMessage("This clan doesn't exists")
                if (clan.private) return ctx.errorMessage("This clan is private so you wan't get informations about it.")
                const d = moment(clan.creation_date);
                const discordDate = `<t:${d.unix()}:R>`;
                ctx.reply({
                            embeds: [{
                                        color: "#efaa66",
                                        author: { name: clan.clanName, icon_url: ctx.author.displayAvatarURL({ size: 512, format: "png" }), url: "https://discord.gg/6wa4U5sAMe" },
                                        description: `${clan.description?clan.description:`[${clan.clanName}](https://allego.me/clan/${clan.clanID}) hasn't a bio yet.`}`,
    fields: [{
            name: "► General",
            value: `<:calendar_check:929414534089801748> Creation: ${discordDate}\n <:crown:929355795500531772> Master: <@${clan.clan_owner}>\n<:profile:929660871477706752> Members: ${clan.members.length}\n<:check:768425408763789332> Verified: ${clan.verified_clan?"<:check:847244236277678080>":"<:reject:929356899336486942>"}\n<:shield:929355693834797106> Bans: ${clan.members_banned.length}\nDiscord server: ${clan.discord_server?`[Click Here](${clan.discord_server})`:"Not set"}`
        },
        {
            name: "► Ressources",
            value: `Coins: ${clan.coins} <:gold_bag:929356637154717697>\nWood: ${clan.ressources.wood} <:wood:929664990066114570>`
        }
    ]
}],
            })
            } else {
                if (!userDB.clan) return ctx.errorMessage(`You are not in a clan yet. Please provide a clan ID to get the informations to`)
                const clan = await ctx.database.getClan(userDB.clan)
                const d = moment(clan.creation_date);
                const discordDate = `<t:${d.unix()}:R>`;
                ctx.reply({
                            embeds: [{
                                        color: "#efaa66",
                                        author: { name: clan.clanName, icon_url: ctx.author.displayAvatarURL({ size: 512, format: "png" }), url: "https://discord.gg/6wa4U5sAMe" },
                                        description: `${clan.description?clan.description:`[${clan.clanName}](https://allego.me/clan/${clan.clanID}) hasn't a bio yet.`}`,
                    fields: [{
                            name: "► General",
                            value: `<:calendar_check:929414534089801748> Creation: ${discordDate}\n <:crown:929355795500531772> Master: <@${clan.clan_owner}>\n<:profile:929660871477706752> Members: ${clan.members.length}\n<:check:768425408763789332> Verified: ${clan.verified_clan?"<:check:847244236277678080>":"<:reject:929356899336486942>"}\n<:shield:929355693834797106> Bans: ${clan.members_banned.length}\nDiscord server: ${clan.discord_server?`[Click Here](${clan.discord_server})`:"Not set"}`
                        },
                        {
                            name: "► Ressources",
                            value: `Coins: ${clan.coins} <:gold_bag:929356637154717697>\nWood: ${clan.ressources.wood} <:wood:929664990066114570>`
                        }
                    ]
                }],
            })
        }
    }

}

module.exports = new Help;