import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise-native'


@Injectable()
export class ActionHelperService {
    actionHandler(option:any){
        return new Promise<any>((resolve, reject) =>{
            request(option, (err:any, response:any, body:any) =>{
                if(err) {
                    console.log(err)
                }
                if(body){
                    try{
                        body = JSON.parse(body)
                        if(body){
                            resolve({
                                isSuccess:true,
                                data:body.body,
                                err
                            })
                        }
                        else{
                            resolve({
                                isSuccess:false,
                                errorData: new HttpException('DATA_NOT_FOUND', HttpStatus.NOT_FOUND)
                            })
                        }
                    }
                    catch(e){
                        resolve({
                            isSuccess:false,
                            error: new HttpException('SOMETHING_WRONG', HttpStatus.INTERNAL_SERVER_ERROR)
                        })
                    }
                }
            })
        })
    }
}
