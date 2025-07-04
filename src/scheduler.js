import cron from 'node-cron';
import { commitAndPushAll } from "./git";


export async function schedulePushCommand(frequency) {
    cron.schedule(frequency, () => {
        try{
            console.log("commiting and pushing all repo");
        commitAndPushAll();
        }
        catch (e){
            console.error("Error occured: ",e.message);
        }
    })    
}