import { ApiProperty } from "@nestjs/swagger";

export class SampleDefaultReturn {
  @ApiProperty({ example: 'success', description: 'message' })
  message: string;
  @ApiProperty({ example: '', description: 'data' })
  data: string;
}