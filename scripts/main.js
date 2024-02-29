// CHAT TRIGGERS
import { world } from '@minecraft/server';

const prefix = "+";

world.beforeEvents.chatSend.subscribe((data)=>{
    let words = ["b1lat", "b3lat", "belat", "bilat", "bob0", "bobo", "bobp", "bugaret", "bulbol", "d1ckson", "fck u btch", "fcker", "fuck you", "gago", "k1ffy", "k3ffy", "kepay", "kiffy", "kys", "nigga", "p3n1s", "p3nis", "pakshet", "pakyu", "pen1s", "pota", "punyeta", "puta", "putragis", "shet", "stupid fkcer", "stupid shit", "t1t3", "tanga", "tangina mo", "tarantado", "tit1", "tit3", "tite", "ulol", "walang kwenta"];

    let found = words.some(word => data.message .toLowerCase().includes(word));
    let chat = data.message;
    if (found) {
        data.cancel = true;
        world.getDimension("overworld").runCommandAsync(`tell ${data.sender.name} No bad words allowed`);
    }
    //TELEPORT TO LOBBY
    else if (chat == "+tp lobby") {
        world.getAllPlayers().forEach(e=>{
            if(e.name == data.sender.name) {
                e.runCommandAsync(`tp @s 2 123 -21`);
            }
            
          })
    }
    //TELEPORT TO NETHER
    else if (chat == "+tp nether") {
        world.getAllPlayers().forEach(e=>{
            if(e.name == data.sender.name) {
                e.runCommandAsync(`tp @s[scores={Merit=1500..}] 191 163 -21`);
                e.runCommandAsync(`say @s[scores={Merit=..1500}] not qualified`);
            }
            
          })
    }
    //TELEPORT TO GUILD
    else if (chat == "+tp guild") {
        world.getAllPlayers().forEach(e=>{
            if(e.name == data.sender.name) {
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
                e.runCommandAsync(`tp @s[tag=dark_green] 2471114 6182`);
                e.runCommandAsync(`tp @s[tag=gray] -3868 70 -3176`);
            }
          })
    }
})
