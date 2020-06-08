import { Injectable } from '@nestjs/common';
import {GOALS_URL} from '../../config/global'

@Injectable()
export class GoalService {
    goal():string{
        return GOALS_URL
    }
}
