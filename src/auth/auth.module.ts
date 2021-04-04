import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';


@Module({  
  imports: [    
      UserModule,    
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
      }),
      JwtModule.register({
        secret:   "dhiasecretkey",
        signOptions: {
          expiresIn: 3600
          },
      }),
  ], 
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],  
  exports: [AuthService,
      PassportModule, 
      JwtModule
  ],
})
export class AuthModule {}
