import { Injectable } from '@nestjs/common';
import {REFLECTIONS_URL} from '../../config/global'

@Injectable()
export class ReflectionService {
    reflection():string{
        return REFLECTIONS_URL
    }
}
