import { Injectable } from '@nestjs/common';
const MessagingResponse = require('twilio').twiml.MessagingResponse;
import {FeedbackService} from '../feedback/feedback.service'
import {GoalService} from '../goal/goal.service'
import {ReflectionService} from '../reflection/reflection.service'
import {UserSessionService} from '../user-session/user-session.service'
import {LatestFeedBackService} from '../latest-feed-back/latest-feed-back.service'
import { promises as asyncFs } from 'fs';
import * as fs from 'fs'
import { ContactSupportService } from 'src/contact-support/contact-support.service';

@Injectable()
export class GreetingService {
    constructor(private readonly feedbackService: FeedbackService, 
        private readonly goalService: GoalService,
        private readonly reflectionService: ReflectionService,
        private readonly userSessionService: UserSessionService,
        private readonly latestFeedbackService: LatestFeedBackService,
        private readonly contactService: ContactSupportService
    ) {}
    async greeting(req:any, res:any){
        const whatsappNumber = req.body.From.split("+")[1]
        let message = req.body.Body.toLowerCase()
        let twiml = new MessagingResponse();
        if(fs.existsSync(`${whatsappNumber}.json`)){
           if(message == "#"){
                this.userSessionService.userSessionDelete(whatsappNumber)
        }
            else
            {
                let userData = JSON.parse(fs.readFileSync(`${whatsappNumber}.json`, 'utf8'));
                // if(userData.userChoice && userData.contactChoice)
                // {
                //     twiml.message("ALREADY_DONE")
                //     res.writeHead(200, {'Content-Type': 'text/xml'});
                //     res.end(twiml.toString());
                // }
                if(!userData.userChoice){
                    const userInfo:object = {
                        userChoice: message,
                        contactChoice:null,
                        isDeletable:true
                    }
                    // await asyncFs.writeFile(`${whatsappNumber}.json`, JSON.stringify(userInfo), 'utf8');
                    await this.userSessionService.fsPromiseManagement(whatsappNumber, userInfo)
                    userData = JSON.parse(fs.readFileSync(`${whatsappNumber}.json`, 'utf8'));
                }
                switch(userData.userChoice){
                    case "1":
                        this.userSessionService.userSessionDelete(whatsappNumber)
                        twiml.message(this.feedbackService.feedback())
                        twiml.message("Please Press # for more options")
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                        break;
                    case "2":
                        this.userSessionService.userSessionDelete(whatsappNumber)
                        twiml.message(this.goalService.goal())
                        twiml.message("Please Press # for more options")
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                        break;
                    case "3":
                        this.userSessionService.userSessionDelete(whatsappNumber)
                        twiml.message(this.reflectionService.reflection())
                        twiml.message("Please Press # for more options")
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                        break;
                    case "4":
                        this.userSessionService.userSessionDelete(whatsappNumber)
                        twiml.message(this.latestFeedbackService.latestFeedback())
                        twiml.message("Please Press # for more options")
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                        break;
                    case "5":
                        if(userData.isDeletable){
                            const userInfo:object = {
                                userChoice: null,
                                contactChoice:null
                            }
                            // await asyncFs.writeFile(`${whatsappNumber}.json`, JSON.stringify(userInfo), 'utf8');
                            await this.userSessionService.fsPromiseManagement(whatsappNumber, userInfo)
                            userData = JSON.parse(fs.readFileSync(`${whatsappNumber}.json`, 'utf8'));
                        }
                        let data = await this.contactService.contactSupport(whatsappNumber, userData,message)
                        twiml.message(data)
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                        break;
                    default:
                        this.userSessionService.contactSessionManagement(whatsappNumber, null, null)
                        twiml.message("PLEASE SELECT ANY ONE OPTION")
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
                    }
            }
        }
            else
            {
                const defaultData: object = 
                {
                    userChoice: null,
                    contactChoice: null
                }
                this.userSessionService.userSessionCreate(whatsappNumber, defaultData)
                twiml.message("WELCOME TO TRUQU ORGANISATION")
                twiml.message("What Would you like to do?")
                twiml.message(`1) Ask For FeedBack
                            \n2)Manage Your Goals
                            \n3)Manage Your Reflections
                            \n4)Read Latest FeedBack
                            \n5)Contact Support`)
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
        }
    }
}

