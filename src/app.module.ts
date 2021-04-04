import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactService } from './contacts/contact.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsModule } from './contacts/contacts.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'braintest',
    username: 'root',
    password: '',
   // port:4000,
    
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities:true,
  }), ContactsModule, AuthModule, UserModule,  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
