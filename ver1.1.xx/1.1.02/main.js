import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
//import { world } from "mojang-minecraft"
//import { ActionFormData } from "mojang-minecraft.ui"
//ActionFormData
world.events.beforeItemUse.subscribe((useEvent) => {
    if (useEvent.source.typeId != "minecraft:player") return;
    if (useEvent.item.typeId == "bridge:tpitem") {
        actionFormAppear(useEvent.source);
    }

    function actionFormAppear2(p) {
        const mainGui = new ActionFormData()
            .title(`運営のみ`)
    }

    function actionFormAppear(p) {
        const mainGui = new ActionFormData()
            .title(`テレポート`)
            .button(`HUB`, 'textures/items/bed_white')
            .button(`採掘場`, 'textures/items/wooden_pickaxe')
            .button(`ショップ`, 'textures/items/emerald')
            .button(`PVP(採掘量500から)`, 'textures/items/diamond_sword')
            .button(`放置場`, 'textures/items/bed_red')
            .button(`coming soon`, 'textures/items/')
            .button(`coming soon`, 'textures/items/enchanted_book');
        mainGui.show(p).then((response) => {
            if (!response.canceled) modalFormAppear(p, response.selection);
        })
    };

    function modalFormAppear(p, n) {
        if (n == 0) {
            p.runCommandAsync(`tp @s 0 10 0`);
        } else if (n == 1) {
            p.runCommandAsync(`tp @s 0 -1 24`);
        } else if (n == 2) {
            p.runCommandAsync(`tp @s 0 -19 0`);
        } else if (n == 3) {
            p.runCommandAsync(`tp @s 61 -60 81`);
        } else if (n == 4) {
            p.runCommandAsync(`tp @s -10000 -60 -10000`);
        } else if (n == 5) {
            p.runCommandAsync(`tp @s 0 0 0`);
        } else if (n == 6) {
            p.runCommandAsync(`tp @s 0 0 0`);
        }
    }
});
// custom command
world.events.beforeChat.subscribe((chatData) => {
    const { sender, message } = chatData;
    if (message === ".hub") {
        chatData.cancel = true;
        sender.runCommandAsync(`tp @s 0 3 0`);
        sender.tell("§l§ahubにtpしましたー!!");
    };
    if (message === ".help") {
        chatData.cancel = true;
        sender.tell("§l§b-----help-----");
        sender.tell("§l§b.hubでhubに戻る");
        sender.tell("§l§b.tp でテレポート");
        sender.tell("§l§b使用例");
        sender.tell("§l§b.tp hub/saikutu/pvp/shop");
        sender.tell(".ansi on/off 暗視エフェクト追加/除去")
    };
    /**if (message === ".fly on") {
        chatData.cancel = true;
        if (sender.hasTag = "vip") {
            sender.runCommandAsync(`ability @s mayfly true`);
            sender.tell("§l§aflyをONにしました!!");
        }
        if (sender.hasTag = "novip") {
            sender.tell("§l§c権限がありません");
        };
    };
    if (message === ".fly off") {
        chatData.cancel = true;
        if (sender.hasTag = "vip") {
            sender.runCommandAsync(`ability @s mayfly false`);
            sender.tell("§l§aflyをOFFにしました!!")
        }
        if (sender.hasTag = "novip") {
            sender.tell("§l§c権限がありません")
        };
    };*/
    if (message === ".ansi on") {
        chatData.cancel = true;
        sender.addTag("ansi");
        sender.tell("§l§a暗視on");
    }
    if (message === ".ansi off") {
        chatData.cancel = true;
        sender.removeTag("ansi");
        sender.tell("§l§a暗視off");
    }
});
world.events.beforeItemUse.subscribe
/**
world.events.playerJoin.subscribe((pj) => {
    pj.player.runCommandAsync(`tp @s 0 3 0`)
});*/
world.events.beforeChat.subscribe((chatDatarank) => {
    const { message, sender } = chatDatarank;

    let rank = sender
        .getTags()
        .find((tag) => tag.startsWith("rank:"))
        ?.split(":")[1];

    if (!rank) return;

    chatDatarank.cancel = true;

    world.sendMessage(rank + " " + sender.name + ": " + message);
})
