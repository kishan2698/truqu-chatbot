import { Injectable } from '@nestjs/common';
import { promises as asyncFs } from 'fs';
import * as fs from 'fs'
import { UserSessionService } from 'src/user-session/user-session.service';
import {CONTACT_PRICING_URL, CONTACT_MENU_UNDERSTANDING_URL} from '../../config/global'

@Injectable()
export class ContactSupportService {
    constructor(private readonly userService:UserSessionService){}
    async contactSupport(number:string, userData:any, message:string):Promise<string>{
        if(userData.userChoice){
            if(!userData.contactChoice){
                const userContactInfo:object = {
                    userChoice: userData.userChoice,
                    contactChoice:message,
                    isDeletable:true
                }
                //await asyncFs.writeFile(`${number}.json`, JSON.stringify(userContactInfo), 'utf8');
                await this.userService.fsPromiseManagement(number,userContactInfo)
                userData = JSON.parse(fs.readFileSync(`${number}.json`, 'utf8'));
            }
            switch(userData.contactChoice){
                case "1":
                    if(userData.isDeletable){
                        this.userService.contactSessionManagement(number, userData.userChoice, message)
                        return `PLEASE ENTER BUG`
                        }
                        else{
                           let data =await this.contactSupportReply(number, userData, message)
                           return data
                        }
                case "2":
                    if(userData.isDeletable){
                        this.userService.contactSessionManagement(number, userData.userChoice, message)
                        return `PLEASE ENTER YOUR FEATURE`
                    }
                    else{
                        let data =await this.contactSupportReply(number, userData, message)
                        return data
                    }
                case "3":
                        this.userService.userSessionDelete(number)
                        return CONTACT_MENU_UNDERSTANDING_URL + "\nPlease enter # for more options"
                case "4":
                        this.userService.userSessionDelete(number)
                        return CONTACT_PRICING_URL + "\nPlease enter # for more options"
                case "5":
                    if(userData.isDeletable){
                        this.userService.contactSessionManagement(number, userData.userChoice, message)
                        return `PLEASE TYPE YOUR QUERY`
                    }
                    else{
                        let data =await this.contactSupportReply(number, userData, message)
                        return data
                    }
                default:
                    this.userService.contactSessionManagement(number, null, null)
                    return `PLEASE SELECT ANY ONE OPTION`
            }
        }
        else{
            this.userService.userSessionManagement(number,message)
            return `Pls choose your support category:-
            \n1)Report bug
            \n2)Report new feature
            \n3)Need help in understanding the Menu
            \n4)Pricing
            \n5)Others`
        }
    }  
    async contactSupportReply(number:string, userData:any, message:string):Promise<string>{
           switch(userData.contactChoice){
                case "1":
                   this.userService.userSessionDelete(number)
                   return `Thanks For Reporting Bug\nPlease enter # for more options `
                case "2":
                    this.userService.userSessionDelete(number)
                    return `Thanks For Your New Feature\nPlease enter # for more options`
                case "5":
                    this.userService.userSessionDelete(number)
                    return `ThankYou\nPlease enter # for more options`
                default:
                    this.userService.contactSessionManagement(number, null, null)
                    return `Please Select Valid Option`
        }
    }
}
