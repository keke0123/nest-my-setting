import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

interface SendObject {
  payload: any;
  type: string;
}

@Injectable()
export class SlackService {
  
  constructor(
    private readonly config: ConfigService
  ) {}

  public async log({payload, type = 'info'}: SendObject) {
    let color = 'good';
    switch(type) {
        case 'info':
            break;
        case 'error':
            color = 'danger';
            break;
        default:
            break;
    }
    const data = {
        attachments: [
            {
                color: `${color}`,
                pretext: '<!channel> *NEST_API_LOG*',
                text: Object.entries(payload).map(([key, value]) => {
                    return `*${key}* : ${value}`
                }).join('\n')
            }
        ]
    }
    await axios.post(this.config.get('slack.url.log'), data);
  }
}