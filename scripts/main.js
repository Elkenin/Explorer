// CHAT TRIGGERS
import { world , system} from '@minecraft/server';

const prefix = "+";

function cmdScoreboard(player, type, scoreId, score) {
    player.runCommandAsync(`scoreboard players ${type} @s[tag=!admin] ${scoreId} ${score}`)
}

system.runInterval(()=>{
    world.getAllPlayers().forEach(e=>{
        //const merit = world.scoreboard.getObjective("Merit")?.getScore(e); //Get player Merit
        const merit = world.scoreboard.getObjective("Merit"); //Get player Merit
        const gold = world.scoreboard.getObjective("Gold"); //Get player Gold
        const isShowActionbar = world.scoreboard.getObjective("isShowActionbar");
        if(merit==undefined) {
            world.scoreboard.addObjective("Merit", "Merit").setScore(e,0);
        }
        if(gold==undefined) {
            world.scoreboard.addObjective("Gold", "Gold").setScore(e,0);
        }
        if(isShowActionbar==undefined) {
            world.scoreboard.addObjective("isShowActionbar", "isShowActionbar").setScore(e,1);
        }
        //console.warn(isShowActionbar?.getScore(e))
        if(isShowActionbar.getScore(e)==1) {
            e.runCommandAsync(`titleraw @s[tag=!admin] actionbar {"rawtext":[{"text":"§9Merit:§f ${merit.getScore(e)}"},{"text":"\n§eGold:§f ${gold.getScore(e)}"}]}`); //Actionbar
        }
        
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
                e.runCommandAsync(`say @s[scores={Merit=..1500}] not qualified`);
            }
            
          })
    }
    //TELEPORT TO GUILD
    else if (chat == prefix+"tp guild") {
        data.cancel = true;
        world.getDimension("overworld").getPlayers().forEach(e=>{
            if(e.name == player.name) {
                e.runCommandAsync(`tp @s[tag=blue] 5580	68 -4239`);
                e.runCommandAsync(`tp @s[tag=red] 1775	64	-2626`);
                e.runCommandAsync(`tp @s[tag=white] 6094 66	5782`);
                e.runCommandAsync(`tp @s[tag=violet] -7142	69 5488`);
                e.runCommandAsync(`tp @s[tag=lime] -2262 87 -672`);
                e.runCommandAsync(`tp @s[tag=orange] -5306	77 4987`);
                e.runCommandAsync(`tp @s[tag=magenta] -3859	80 -3228`);
                e.runCommandAsync(`tp @s[tag=yellow] 959 68 539`);
                e.runCommandAsync(`tp @s[tag=brown] 2771 70	2639`);
                e.runCommandAsync(`tp @s[tag=black] -3431 71 1872`);
                e.runCommandAsync(`tp @s[tag=darkgreen] 2471 114 6182`);
                e.runCommandAsync(`tp @s[tag=gray] -3868 70 -3176`);
            }
          })
    }
})
