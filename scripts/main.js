// CHAT TRIGGERS
import { world , system} from '@minecraft/server';

const prefix = "+";
const guild = {
    Meilleur: ["Me","§5", "violet", {x: -7142, y:69, z:5488}],	 
    Maharlika: ["Ma","§9", "blue", {x: 5580, y:68, z:-4239}],
    Bakunawa: ["Ba","§a", "lime", {x: -2262, y:87, z:-672}],
    Inferno_Lions: ["IL","§c", "red", {x: 1775, y:64, z:-2626}], 
    Golden_Pirates: ["GP","§e", "yellow", {x: 959, y:68, z: 539}],
    Martlock: ["Ma","§7", "black", {x: -3431, y:71, z: 1872}],
    Deus: ["De","§f", "white", {x: 6094, y:66, z:5782}], 	
    Slapsoil_Nexus: ["SN","§p", "brown", {x: 2771, y:70, z: 70}],
    Helio_Imperium: ["HI","§d", "magenta", {x: -3859, y:80, z:-3228}],
    Minokawa: ["Mi","§6", "orange", {x: -5306, y:77, z:4987}],
    Celeste: ["Ce","§7", "gray", {x: -3868, y:70, z: -3176}],
    Shinsei: ["Sh","§2", "darkgreen", {x: 2471, y:114, z: 6182}]
    
    ,Mercenary: ["GL","§r", "guildless", {x: 5580, y:68, z:-4239}] //Guildless - beta
    }
function cmdScoreboard(player, type, scoreId, score) {
    player.runCommandAsync(`scoreboard players ${type} @s[tag=!admin] ${scoreId} ${score}`)  //Changescoreboard Value
}

function chatRank(player, clanTag, color, Merit, msg, data) {
    data.cancel = true;
    player.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<${color}${clanTag}§r | ${Merit}> ${msg}"}]}`); //Chat rank broadcast
}

 function tpGuild(player, x,y,z) {
    //console.warn(`tp ${player} ${x} ${y} ${z}`)
    player.runCommandAsync(`tp @s ${x} ${y} ${z}`)
 }

function meritRank(score) { //MeritRAnk
    if(score >= 500 && score < 1000) return "E";
     else if(score >= 1000 && score < 1500) return "D";
     else if (score >= 1500 && score < 2500) return "C";
     else if (score >= 2500 && score < 4000) return "B";
     else if (score >= 4000 && score < 6500) return "A";
     else if (score >= 6500 && score < 10500) return "S";
     else if (score >= 10500 && score < 17500) return "SS";
     else if (score >= 17500 && score < 27500) return "SSS";
     else if (score >= 27500) return "CLASS LEGENDARY";
     else return "F";
}

system.runInterval(()=>{
    world.getAllPlayers().forEach(e=>{
        const merit = world.scoreboard.getObjective("Merit"); //Get player Merit
        const gold = world.scoreboard.getObjective("Gold"); //Get player Gold
        const isShowActionbar = world.scoreboard.getObjective("isShowActionbar");

            if(merit==undefined) {
                world.scoreboard.addObjective("Merit", "Merit").setScore(e,0); // Add objective if objective is undefined
            }
            if(gold==undefined) {
                world.scoreboard.addObjective("Gold", "Gold").setScore(e,0); // Add objective if objective is undefined
            }
            if(isShowActionbar==undefined) {
                world.scoreboard.addObjective("isShowActionbar", "isShowActionbar").setScore(e,1); // Add objective if objective is undefined -- (1) = showbar / (0) hidebar
            } 
            if(isShowActionbar.getScore(e)==1) {
                e.runCommandAsync(`titleraw @s[tag=!admin] actionbar {"rawtext":[{"text":"§9Merit:§f ${merit.getScore(e)}"},{"text":"\n§eGold:§f ${gold.getScore(e)}"}]}`); //Actionbar
            }
       //AUTO RANK
    })
}, 0); //Interval....20 = 1seconds


world.beforeEvents.chatSend.subscribe((data)=>{
    let words = ["b1lat", "b3lat", "belat", "bilat", "bob0", "bobo", "bobp", "bugaret", "bulbol", "d1ckson", "fck u btch", "fcker", "fuck you", "gago", "k1ffy", "k3ffy", "kepay", "kiffy", "kys", "nigga", "p3n1s", "p3nis", "pakshet", "pakyu", "pen1s", "pota", "punyeta", "puta", "putragis", "shet", "stupid fkcer", "stupid shit", "t1t3", "tanga", "tangina mo", "tarantado", "tit1", "tit3", "tite", "ulol", "walang kwenta"];

    let found = words.some(word => data.message .toLowerCase().includes(word));
    let chat = data.message;
    let player = data.sender;
    //Detect Bad Words
    if (found) {
        data.cancel = true;
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§3[System] §4No Bad Words Allowed"}]}`);
    }
     //Hide Actionbar
    else if (chat == prefix+"hidebar") {
        data.cancel = true;
        cmdScoreboard(player, "set", "isShowActionbar", 0);
    }
    //Show Actionbar
    else if (chat == prefix+"showbar") {
        data.cancel = true;
        cmdScoreboard(player, "set", "isShowActionbar", 1);
    }
    //TELEPORT TO LOBBY
    else if (chat == prefix+"tp lobby") {
        data.cancel = true;
        world.getDimension("overworld").getPlayers().forEach(e=>{
            if(e.name == player.name) {
                e.runCommandAsync(`tp @s 2 123 -21`);
                return true;
            }
          })
    }
    //TELEPORT TO NETHER
    else if (chat == prefix+"tp nether") {
        data.cancel = true;
        world.getDimension("overworld").getPlayers().forEach(e=>{
            if(e.name == player.name) {
                e.runCommandAsync(`tp @s[scores={Merit=1500..}] 191 163 -21`);
                e.runCommandAsync(`tell @s[scores={Merit=..1500}] not qualified`);
            }
          })
    }
    //TELEPORT TO GUILD
    else if (chat == prefix+"tp guild") {
        data.cancel = true;
        
        let found = false;
        world.getDimension("overworld").getPlayers().forEach(e=>{
            if(e.name == player.name) {

                player.getTags().forEach(tag=>{
                    for (let key in guild) {
                        if (guild[key][2].includes(tag)) {
                            tpGuild(player, guild[key][3].x, guild[key][3].y, guild[key][3].z)
                            found = true;
                            break;
                        }
                    }
                     
                    });
            }
          })
          if (!found) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§3[System] §4You must have a guild first"}]}`)
        }
    } else {
        let found = false;
        player.getTags().forEach(tag=>{
        for (let key in guild) {
            if (guild[key].includes(tag)) {
                chatRank( player, guild[key][0], guild[key][1], meritRank(world.scoreboard.getObjective("Merit").getScore(player)), chat, data);
                found = true;
                break;
            }
        }
        });
        if (!found) {
            chatRank( player, guild.Mercenary[0], guild.Mercenary[1], meritRank(world.scoreboard.getObjective("Merit").getScore(player)), chat, data);
        }
    }
})