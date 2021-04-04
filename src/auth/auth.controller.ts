import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RegistrationStatus } from 'src/interfaces/registration.status';
import { CreateUserDto } from 'src/user/dto/CreateUser.dto';
import { LoginUserDto } from 'src/user/dto/LoginUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
        
    @Post('register')  
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<void> {    
       // const result: 
       await this.authService.register(createUserDto);
       // if (!result.success) {
        //    throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
       // }
      //  return result;  
    }
    
    @Post('/sigverif')
    singUpverif (@Body()createUserDto:CreateUserDto){
       // let code="5615";
      //console.log("phoneco",createUserDto.phonenumber);
       this.authService.singUpverif(createUserDto);
    } 


    @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return await this.authService.login(loginUserDto);  
    }
    


}
