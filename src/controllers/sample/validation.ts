import { Transform, Type } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";

// param 은 가능하면 controller 에서 직접 받도록 하자
export class Validation1Param {
  @IsString()
  type: string;

  @Transform((id) => {
    // console.log('id', id);
    return parseInt(id.value);
  })
  @IsNumber()
  id: number;
}

export class Validation1Query {

  name: string;

  age: number;
}