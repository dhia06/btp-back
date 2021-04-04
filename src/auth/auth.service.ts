import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import { RegistrationStatus } from 'src/interfaces/registration.status';
import { CreateUserDto } from 'src/user/dto/CreateUser.dto';
import { LoginUserDto } from 'src/user/dto/LoginUser.dto';
import { UserDto } from 'src/user/dto/User.dto';
import { UserService } from 'src/user/user.service';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
const TWILIO_ACCOUNT_SID="AC607ebf7cffe5b93eec13305929fe4498";
 const TWILIO_AUTH_TOKEN="e757c44a5974f73c975bef1e8236c1ba";
  const VERIFICATION_SID="VA9ab7c20871d1199c5b783ed5d60fb8cd" ;
  const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, 
        private readonly jwtService: JwtService,  ) {}



         async register(userDto: CreateUserDto): 
         
          Promise<void> {
            const channel: any = 'sms';
            try {
              ///  console.log(userDto.phonenumber);
             const verificationRequest = await twilio.verify.services(VERIFICATION_SID)
                .verifications
                .create({ to: userDto.phonenumber, channel });
               // console.log("code",await twilio.verify.services(VERIFICATION_SID) );
              // return this.userRepo.signUp(CreateUserDto);
             
                
            } catch (e) {
              console.log('sing error');
          
            }
           
   /*let status: RegistrationStatus = {
        success: true,   
        message: 'user registered',
    };
    try {
        await this.userService.create(userDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    
    }
    return status;  */
}

async singUpverif(userDto:CreateUserDto):Promise<void>{
    
    let verificationResult;
    
      let code =userDto.code;
      let phonenumber=userDto.phonenumber;
    //  console.log(code);
     // console.log('phone',phonenumber)
     // console.log('num,',phonenumber);
     //return this.userRepo.signUp(authCredentialsDto);
       verificationResult = await twilio.verify.services(VERIFICATION_SID)
        .verificationChecks
        .create({ code, to: userDto.phonenumber });
        console.log(verificationResult.status);
        if (verificationResult.status === 'approved') {
          //  console.log("create",userDto.username);
          
            await this.userService.create(userDto); 
    
         
          //this.userRepo.signUp(userDto);
        }
        else {
            console.log("code non valide!! :p")
        }        
      return await verificationResult.status;
      
    }




async login(loginUserDto: LoginUserDto): Promise<any> {    
    // find user in db    
    const user = await this.userService.findByLogin(loginUserDto);
    
    // generate and sign token    
    const token = this._createToken(user);
    
    return {
        username: user.username, ...token,    
    };  
}

private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };    
    const accessToken = this.jwtService.sign(user);    
    return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,    
    };  
}
async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);    
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    }    
    return user;  
}




}
