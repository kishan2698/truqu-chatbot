import { Injectable } from '@nestjs/common';
import {FEEDBACK_URL}  from '../../config/global'

@Injectable()
export class FeedbackService {
    feedback():string{
        return FEEDBACK_URL
    }
}
