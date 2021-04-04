import { IsEmail, IsNotEmpty } from "class-validator";
import { Unique } from "typeorm";
@Unique(['email']) 
@Unique(['username'])
export class CreateUserDto {  
    phonenumber:string;
    @IsNotEmpty()
      username: string;
    @IsNotEmpty()
      password: string;
    @IsNotEmpty()
   
    @IsEmail()
    
      email: string;
      code:string;
     
      
}
