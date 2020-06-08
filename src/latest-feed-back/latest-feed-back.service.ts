import { Injectable } from '@nestjs/common';
import {FEEDBACK_URL}  from '../../config/global'


@Injectable()
export class LatestFeedBackService {
    latestFeedback():string{
        return FEEDBACK_URL
    }
}
